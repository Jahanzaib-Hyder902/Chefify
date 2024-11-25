import { NextResponse } from "next/server";
import { getAuthSession } from "@/app/utils/auth";
import {prisma} from "../../utils/db"

export async function POST(req, res) {
  try {
    const session = await getAuthSession()

    if (!session) {
      return NextResponse.json({
        success: false,
        error: "Unauthorized request"
      },{ status: 500 })
    }

    const suggestion = await prisma.suggestion.findUnique({
      where: {
        userId: session.user.id,
      },
      select: {
        suggestedVideoIds: true // Return the video IDs
      },
    });

    if (!suggestion) {
        return NextResponse.json({
          success: false,
          error: "No suggestion found"
        },{ status: 500 })
    }

    // Fetch video details for each video ID
    const videoDetailsPromises = suggestion.suggestedVideoIds.map(async (id) => {
      const title = await fetchVideoTitle(id); // Replace with your actual fetching logic
      return { id, title };
    });

    const videoDetails = await Promise.all(videoDetailsPromises);

    return NextResponse.json({
    success: true,
    videoIds: suggestion.videoIds,
    });
  } catch (error) {
    return NextResponse.json(
      console.log(error),
      {
        success: false,
        error: error,
      },
      { status: 500 }
    );
  }
}