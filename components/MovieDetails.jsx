import Image from "next/image";
import React from "react";
import NoMoviesFound from "./NoMoviesFound";
import WatchList from "./WatchList";
import Head from "next/head";
import ShareLinks from "./ShareLinks";
import { notFound } from "next/navigation";

// export async function generateMetadata(movie) {
//   return {
//     title: `MovieDB - ${movie?.title}`,
//     description: movie?.overview,
//     openGraph: {
//       images: [movie?.poster_path],
//     },
//   };
// }

const MovieDetails = async ({ response }) => {
  // const apiUrl = `${process.env.API_URL}/api/movie/${id}`;
  // const response = await fetch(apiUrl);

  if (!response.ok) {
    notFound();
  }

  const data = await response.json();
  const movie = data;
  if (!movie) {
    return <NoMoviesFound cat />;
  }

  const posterUrl = `https://image.tmdb.org/t/p/original/${movie.poster_path}`;
  const backdropUrl = `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`;

  return (
    <>
      <Head>
        <title>{movie.title} - Movie Details</title>
        <meta name="description" content={movie.overview} />
        <meta property="og:title" content={movie.title} />
        <meta property="og:description" content={movie.overview} />
        <meta property="og:image" content={movie.poster_path} />
        <meta
          property="og:url"
          content={`https://movie-db-ams.vercel.app/movie/${movie.id}`}
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <div id="movieDetails" className="min-h-screen">
        <div className="relative">
          <div className="absolute inset-0">
            <Image
              fill
              src={backdropUrl}
              alt={movie.title}
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70"></div>
          </div>

          <div className="relative container mx-auto px-4 pt-5 p-10">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3">
                <Image
                  width={300}
                  height={100}
                  src={posterUrl}
                  alt={movie.title}
                  className="rounded-lg shadow-lg"
                />
              </div>

              <div className="md:w-2/3">
                <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>

                <div className="flex items-center mb-2 space-x-4">
                  <span className="text-green-500">
                    {new Date(movie.release_date).toLocaleDateString()}
                  </span>
                  <span>|</span>
                  <span>{movie.runtime} min</span>
                </div>

                <p className="text-lg mb-4">{movie.overview.slice(0, 500)}</p>

                <div className="mb-4">
                  <h3 className="text-gray-400 mb-2">Genres</h3>
                  <div className="flex flex-wrap gap-2">
                    {movie.genres.map((genre) => (
                      <span
                        key={genre.id}
                        className="px-3 py-1 bg-gray-800 rounded-full text-sm"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Production Companies section */}
                <div className="mb-2">
                  <h3 className="text-gray-400 mb-2">Production Companies</h3>
                  <div className="flex flex-wrap gap-4">
                    {movie.production_companies.length > 0 ? (
                      movie.production_companies.slice(0, 4).map((company) => (
                        <div key={company.id} className="text-center">
                          {company.logo_path && (
                            <Image
                              width={100}
                              height={100}
                              src={`https://image.tmdb.org/t/p/original${company.logo_path}`}
                              alt={company.name}
                              className="w-8 h-8 rounded-full object-cover mb-2 mx-auto border"
                            />
                          )}
                          {company.logo_path && (
                            <p className="text-sm">{company.name}</p>
                          )}
                        </div>
                      ))
                    ) : (
                      <div>No Companies Found!</div>
                    )}
                  </div>
                </div>

                <WatchList movieId={movie.id} movie={movie} />

                <ShareLinks movie={movie} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieDetails;
