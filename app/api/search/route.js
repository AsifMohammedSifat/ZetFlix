export const dynamic = 'force-dynamic'; 
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query");

    if (!query || typeof query !== "string") {
      return new Response(
        JSON.stringify({
          message: "Query parameter is required and must be a string",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const API_KEY = process.env.TMDB_API_KEY;
    if (!API_KEY) {
      return new Response(
        JSON.stringify({ message: "TMDB API Key is not configured" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const TMDB_API_URL = `https://api.themoviedb.org/3/search/movie`;

    const response = await fetch(
      `${TMDB_API_URL}?api_key=${API_KEY}&query=${encodeURIComponent(
        query
      )}&language=en-US`
    );

    if (!response.ok) {
      console.error(
        `TMDB API Error: ${response.status} - ${response.statusText}`
      );
      return new Response(
        JSON.stringify({ message: "Failed to fetch data from TMDB API" }),
        {
          status: response.status,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching TMDB API data:", error.message);
    return new Response(
      JSON.stringify({ message: "Something went wrong", error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
