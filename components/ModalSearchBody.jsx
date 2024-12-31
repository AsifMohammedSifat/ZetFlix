import React from 'react';
import Image from 'next/image';
import NoMoviesFound from './NoMoviesFound';

const ModalSearchBody = ({movie}) => {
    // console.log(movie);
    if(!movie) return <NoMoviesFound/>
    return (
        <div class="flex items-center gap-4 p-2 hover:bg-zinc-800 cursor-pointer rounded">
      <Image
        width={100}
        height={100}
        src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`}
        alt={movie.title}
        class="w-16 h-24 object-cover rounded"
      />
      <div>
        <h3 class="font-bold">{movie?.title}</h3>
        <p class="text-sm text-gray-400">{movie?.release_date}</p>
      </div>
    </div>
    );
};

export default ModalSearchBody;