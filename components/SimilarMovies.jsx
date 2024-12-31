import Image from "next/image";
import Link from "next/link";
import React from "react";
import NoMoviesFound from "./NoMoviesFound";

const SimilarMovies = async ({ responsePromise }) => {
  // const apiUrl = `${process.env.API_URL}/api/movie/${id}/related`;
  const response = await responsePromise;

  if (!response.ok) {
    throw new Error(`Failed to fetch movies: ${response.status}`);
  }

  const data = await response.json();
  const movies = data?.results;

  if(movies.length==0 || !movies){
    return <NoMoviesFound category="Similar Movies"/>
  }
  return (
    <div className="container mx-auto px-4 py-2 mt-5">
      <h2 className="text-2xl font-bold mb-4">More Like This</h2>

      <div className="flex space-x-4 overflow-x-auto pb-4">
        {/* Loop through the movie results */}
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="flex-shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform"
          >
            <Link href={`/movie/${movie.id}`}>
              <Image
                width={100}
                height={100}
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                alt={movie.title}
                className="w-full rounded-lg"
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimilarMovies;

// loader
{
  /* <div
class="flex w-48 h-[288px] rounded-lg cursor-pointer hover:scale-105 transition-transform"
>
<div class="w-48 h-[288px] rounded-lg bg-zinc-800 relative">
  <div
    class="absolute inset-0 w-full h-full rounded-lg overflow-hidden"
  >
    <div
      class="animate-pulse w-full h-full bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-900 bg-[length:200%_100%] animate-[shimmer_.5s_infinite]"
    ></div>
  </div>
</div>
</div> */
}
