import Headers from "@/components/Headers";
import NoMoviesFound from "@/components/NoMoviesFound";
import Image from "next/image";
import Link from "next/link";

const SearchPage = async ({ searchParams }) => {
  const query = searchParams?.query || "";
  let movies = [];

  if (query) {
    try {
      const response = await fetch(
        `${process.env.API_URL}/api/search?query=${encodeURIComponent(query)}`
      );
      if (!response.ok) throw new Error("Failed to fetch data");

      const data = await response.json();
      movies = data.results || [];
    } catch (error) {
      console.error("Error fetching movies:", error.message);
    }
  }

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Header */}
      <Headers bg="black" />

      {/* Main Content */}
      <div className="container mx-auto px-4 pt-5 pb-8">
        {/* Search Stats */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold">
            Search Results for &quot;{query || "Nothing"}&quot;
          </h1>
          <p className="text-gray-400">{movies.length} results found</p>
        </div>

        {/* Movies or No Movies Found */}
        {movies.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {movies
              .filter((movie) => movie.poster_path)
              .map((movie) => (
                <Link
                  key={movie.id}
                  href={`/movie/${movie.id}`}
                  className="bg-zinc-900 rounded-lg overflow-hidden hover:scale-105 transition-transform"
                >
                  <Image
                    width={400}
                    height={100}
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : "/default.jpg"
                    }
                    alt={movie.title || "Movie Poster"}
                    className="aspect-[2/3] object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-bold mb-2">
                      {movie.title || "Untitled"}
                    </h3>
                    <div className="flex justify-between text-sm text-gray-400">
                      <span>{movie.release_date || "Unknown"}</span>
                      <span>
                        ⭐ {movie.rating || movie.vote_average || "N/A"}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-[50vh]">
            <NoMoviesFound />
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
