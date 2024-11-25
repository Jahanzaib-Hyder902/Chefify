import { NextResponse } from "next/server";
import { getAuthSession } from "@/app/utils/auth";
import { prisma } from "../../utils/db";

// Example function to fetch video title based on video ID
const fetchVideoTitle = async (id) => {
  // Simulate fetching from an external source
  // In a real scenario, replace this with an actual API call
  return `Video Title for ID ${id}`; // Replace with actual fetching logic
};

export async function POST(req) {
  try {
    const session = await getAuthSession();

    if (!session) {
      return NextResponse.json({
        success: false,
        error: "Unauthorized request"
      }, { status: 500 });
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
      }, { status: 500 });
    }

    // Fetch video details for each video ID
    const videoDetailsPromises = suggestion.suggestedVideoIds.map(async (id) => {
      const title = await fetchVideoTitle(id); // Replace with your actual fetching logic
      return { id, title };
    });

    const videoDetails = await Promise.all(videoDetailsPromises);

    return NextResponse.json({
      success: true,
      videoDetails, // Return the array of video details (ID and title)
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({
      success: false,
      error: error.message,
    }, { status: 500 });
  }
}
