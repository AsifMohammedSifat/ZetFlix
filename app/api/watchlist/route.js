import watchListModel from "@/models/watchList-model";
import { dbConnect } from "@/services/mongo";
import { NextResponse } from "next/server";

dbConnect();

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const watchlist = await watchListModel.find({ userId }).lean();

    return NextResponse.json(watchlist, { status: 200 });
  } catch (error) {
    console.error("Error fetching watchlist:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
    try {
      const { searchParams } = new URL(request.url);
      const movieId = searchParams.get("movieId");
      const userId = searchParams.get("userId");
  
      if (!movieId || !userId) {
        return NextResponse.json(
          { error: "Movie ID and User ID are required" },
          { status: 400 }
        );
      }
  
      const result = await watchListModel.findOneAndDelete({
        _id: movieId,
        userId,
      });
  
      if (!result) {
        return NextResponse.json({ error: "Movie not found" }, { status: 404 });
      }
  
      return NextResponse.json(
        { message: "Movie removed successfully" },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error removing movie:", error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  }