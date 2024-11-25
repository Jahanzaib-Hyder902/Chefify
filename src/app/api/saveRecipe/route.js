import { NextResponse } from "next/server";
import { getAuthSession } from "@/app/utils/auth";
import { prisma } from "../../utils/db";

export async function POST(req) {
  try {
    const session = await getAuthSession();

    if (!session) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized request",
        },
        { status: 401 } // 401 for unauthorized requests
      );
    }

    const { recipe, videoIds } = await req.json(); // Parse JSON body from the request

    if (!recipe || !videoIds) {
      return NextResponse.json(
        {
          success: false,
          error: "Required data not found",
        },
        { status: 400 } // 400 for bad requests
      );
    }

    // Create the recipe in the database
    await prisma.recipe.create({
      data: {
        userId: session.user.id,
        ...recipe, // Spread recipe fields into the database object
        videoIds, // Add video IDs array
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Recipe created successfully",
      },
      { status: 201 } // 201 for resource creation
    );
  } catch (error) {
    console.error("Error creating recipe:", error);
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred.",
      },
      { status: 500 } // 500 for server errors
    );
  }
}
