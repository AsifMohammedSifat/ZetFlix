import React from "react";
import MovieCard from "./MovieCard";
import NoMoviesFound from "./NoMoviesFound";

const PopularMovies = async ({ responsePromise }) => {
  // const apiUrl = `${process.env.API_URL}/api/movie/`;
  const response = await responsePromise;

  if (!response.ok) {
    throw new Error(`Failed to fetch movies: ${response.status}`);
  }

  const data = await response.json();
  const movies = data.results;

  if (!movies) {
    return <NoMoviesFound category="Popular" />;
  }

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Popular on MOVIE DB</h2>
      <div id="popularMovies" className="flex space-x-4 overflow-x-auto pb-4">
        {movies?.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
};

export default PopularMovies;
