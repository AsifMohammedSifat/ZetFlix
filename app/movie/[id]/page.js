import Headers from "@/components/Headers";
import MovieDetails from "@/components/MovieDetails";
import SimilarMovies from "@/components/SimilarMovies";
import Loader from "@/components/ui-SVG/Loader";
import React, { Suspense } from "react";

const page = async ({ params }) => {
  const { id } = params;

  //progressinve rendering
  const movieDetailsApiUrl = `${process.env.API_URL}/api/movie/${id}`;
  const movieDetailsApiUrlResponse = await fetch(movieDetailsApiUrl);

  const similarMoviesUrl = `${process.env.API_URL}/api/movie/${id}/related`;
  const similarMoviesUrlPromise = fetch(similarMoviesUrl);

  return (
    <div className="text-white bg-black">
      <Headers bg="black" />
      {/* <!-- Movie Details Section --> */}
      <MovieDetails id={id} response={movieDetailsApiUrlResponse} />
      {/* <!-- Similar Movies Section --> */}
      <Suspense fallback={<Loader />}>
        <SimilarMovies id={id} responsePromise={similarMoviesUrlPromise} />
      </Suspense>
    </div>
  );
};

export default page;
