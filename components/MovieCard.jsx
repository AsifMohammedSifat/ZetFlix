import Image from "next/image";
import Link from "next/link";
import React from "react";

const MovieCard = ({ movie }) => {
  return (
    <div
      key={movie.id}
      className="flex-shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform"
    >
      <Link href={`/movie/${movie.id}`}>
        <Image
          width={192}
          height={288}
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title || "Movie Poster"}
          className="w-full rounded-lg"
        />
        <h3 className="text-center text-primary text-sm mt-2 font-semibold">
          {movie.title}
        </h3>
      </Link>
    </div>
  );
};

export default MovieCard;
