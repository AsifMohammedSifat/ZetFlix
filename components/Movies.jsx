import Image from "next/image";
import React, { Suspense } from "react";
import TrendingMovies from "./TrendingMovies";
import PopularMovies from "./PopularMovies";
import TopRatedMovies from "./TopRatedMovies";
import Loader from "./ui-SVG/Loader";

const Movies = async () => {
  // Progressive rendering
  let responseTrend;
  let popularMoviesPromise;
  let topMoviesPromise;

  // Fetch trending movies
  try {
    const trendMoviesUrl = `${process.env.API_URL}/api/movie/trending`;
    responseTrend = await fetch(trendMoviesUrl);
    if (!responseTrend.ok) throw new Error("Failed to fetch trending movies");
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    responseTrend = null; // Handle as per your app's requirements
  }

  // Fetch popular movies
  try {
    const popularMoviesUrl = `${process.env.API_URL}/api/movie`;
    popularMoviesPromise = fetch(popularMoviesUrl);
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    popularMoviesPromise = Promise.resolve(null);
  }

  // Fetch top-rated movies
  try {
    const topMoviesUrl = `${process.env.API_URL}/api/movie/top`;
    topMoviesPromise = fetch(topMoviesUrl);
  } catch (error) {
    console.error("Error fetching top-rated movies:", error);
    topMoviesPromise = Promise.resolve(null);
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* <!-- Trending Movies --> */}
      {responseTrend ? (
        <TrendingMovies response={responseTrend} />
      ) : (
        <p className="text-red-500">Failed to load trending movies.</p>
      )}

      {/* <!-- Popular Movies --> */}
      <Suspense fallback={<Loader />}>
        <PopularMovies responsePromise={popularMoviesPromise} />
      </Suspense>

      {/* <!-- Top Rated Movies --> */}
      <Suspense fallback={<Loader />}>
        <TopRatedMovies responsePromise={topMoviesPromise} />
      </Suspense>
    </div>
  );
};

export default Movies;
