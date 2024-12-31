import React from "react";
import NoMoviesFound from "./NoMoviesFound";
import MovieCard from "./MovieCard";

const TrendingMovies = async ({ response }) => {
  // const apiUrl = `${process.env.API_URL}/api/movie/trending/`;
  // const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error(`Failed to fetch movies: ${response.status}`);
  }

  const data = await response.json();
  const movies = data.results;

  if (!movies) {
    return <NoMoviesFound category="Top Rated" />;
  }

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Top Rated</h2>
      <div id="popularMovies" className="flex space-x-4 overflow-x-auto pb-4">
        {movies?.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
};

export default TrendingMovies;
