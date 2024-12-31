import { NextResponse } from "next/server";

export async function GET(req,{params}) {
  const { id } = params; 
  const apiUrl = `https://api.themoviedb.org/3/movie/${id}`;
  const apiKey = process.env.TMDB_API_KEY;

  try {
    const response = await fetch(`${apiUrl}?api_key=${apiKey}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch Movie, status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch Movie Details" },
      { status: 500 }
    );
  }
}
