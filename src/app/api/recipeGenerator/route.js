import OpenAI from "openai";
import { getAuthSession } from "@/app/utils/auth";
import {prisma} from "../../utils/db"
import { NextResponse } from "next/server";
import { searchYouTube, getRelatedVideos } from "../../utils/yt";

async function fetchOpenAICompletionsStream(messages, callback) {
  const OPEN_API_KEY = process.env.OPENAI_API_KEY;

  const openai = new OpenAI({ apiKey: OPEN_API_KEY });
  const aiModel = "gpt-3.5-turbo";

  try {
    const completion = await openai.chat.completions.create({
      model: aiModel,
      messages: messages,
      temperature: 1,
      stream: true,
    });

    for await (const chunk of completion) {
      callback(chunk);
    }
  } catch (error) {
    console.error("Error fetching data from OpenAI API:", error);
    throw new Error("Error fetching data from OpenAI API.");
  }
}

async function saveRecipe(userId, recipe, videoIds) {
  try {
    const savedRecipe = await prisma.recipe.create({
      data: {
        userId,
        ...recipe,
        videoIds
      },
    });
    console.log('Recipe saved to database with videos:', savedRecipe);
  } catch (error) {
    console.error('Error saving recipe to database:', error);
  }
}

async function saveRelatedVideos(userId) {
  const recipes = await prisma.recipe.findMany({
    where: {
      userId,
    },
    select: {
      videoIds: true,
    },
  });

  const allVideoIds = recipes.flatMap(recipe => recipe.videoIds);

  if (allVideoIds.length === 0) {
    return NextResponse.json(
      {
        success: false,
        error: "No video ids for this user",
      },
      { status: 500 }
    );
  }

  const randomIndex = Math.floor(Math.random() * allVideoIds.length);

  const randomVideoId = allVideoIds[randomIndex];

  const videoIds = await getRelatedVideos(randomVideoId);

  const shuffledVideoIds = videoIds.sort(() => 0.5 - Math.random());

  const selectedVideoIds = shuffledVideoIds.slice(0, 5);

  await prisma.suggestion.upsert({
    where: {
      userId,
    },
    update: {
      videoIds: selectedVideoIds,
    },
    create: {
      userId,
      videoIds: selectedVideoIds,
    },
  });
}

export async function GET(req) {
  const session = await getAuthSession()

  if (!session) {
    return NextResponse.json({
      success: false,
      error: "Unauthorized request"
    },{ status: 500 })
  }

  const { searchParams } = new URL(req.url);
  const ingredients = searchParams.get('ingredients');
  const mealType = searchParams.get('mealType');
  const cuisine = searchParams.get('cuisine');
  const cookingTime = searchParams.get('cookingTime');
  const complexity = searchParams.get('complexity');

  // Create a ReadableStream to stream data
  const stream = new ReadableStream({
    async start(controller) {
      let fullRecipe = '';
      let recipeName = '';

      // Function to send messages as chunks
      const sendEvent = async (chunk) => {
        let chunkResponse;
        if (chunk.choices[0].finish_reason === "stop") {
          // Search for videos on YouTube
          const videoIds = await searchYouTube(recipeName);

          // Save the complete recipe and video IDs
          const recipe = {
            name: recipeName || 'Unnamed Recipe', // Use the extracted name or a default
            ingredients: ingredients,
            mealType: mealType,
            cuisine: cuisine,
            cookingTime: cookingTime,
            complexity: complexity,
            instructions: fullRecipe
          };

          await saveRecipe(session.user.id, recipe, videoIds);
          await saveRelatedVideos(session.user.id);

          // Send the final recipe and videoIds as a chunk in the stream
          chunkResponse = {
            action: "complete",
            recipe,
            videoIds
          };
          controller.enqueue(
            `data: ${JSON.stringify(chunkResponse)}\n\n`
          );

          // End the stream after sending recipe and videoIds
          controller.enqueue(
            `data: ${JSON.stringify({ action: "close" })}\n\n`
          );
          controller.close();
        } else {
          if (
            chunk.choices[0].delta.role &&
            chunk.choices[0].delta.role === "assistant"
          ) {
            chunkResponse = {
              action: "start",
            };
          } else {
            chunkResponse = {
              action: "chunk",
              chunk: chunk.choices[0].delta.content,
            };
            fullRecipe += chunk.choices[0].delta.content; // Accumulate the recipe

            // Simple heuristic to extract recipe name from the response
            const nameMatch = fullRecipe.match(/Recipe Name:\s*(.*)/);
            if (nameMatch) {
              recipeName = nameMatch[1].trim();
            }
          }
          // Enqueue each chunk as a part of the response
          controller.enqueue(
            `data: ${JSON.stringify(chunkResponse)}\n\n`
          );
        }
      };

      // Create the prompt to send to OpenAI
      const prompt = [];
      prompt.push("Generate a recipe that incorporates the following details:");
      prompt.push(`[Ingredients: ${ingredients}]`);
      prompt.push(`[Meal Type: ${mealType}]`);
      prompt.push(`[Cuisine Preference: ${cuisine}]`);
      prompt.push(`[Cooking Time: ${cookingTime}]`);
      prompt.push(`[Complexity: ${complexity}]`);
      prompt.push(
        "Please provide a detailed recipe, including steps for preparation and cooking. Only use the ingredients provided."
      );
      prompt.push(
        "The recipe should highlight the fresh and vibrant flavors of the ingredients."
      );
      prompt.push(
        "Also give the recipe a suitable name in its local language based on cuisine preference, and include it as 'Recipe Name: <Name>'."
      );

      const messages = [
        {
          role: "system",
          content: prompt.join(" "),
        },
      ];

      // Fetch the OpenAI completion and stream the result
      await fetchOpenAICompletionsStream(messages, sendEvent);
    },
  });

  // Return the stream using NextResponse
  return new NextResponse(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
    },
  });
}
