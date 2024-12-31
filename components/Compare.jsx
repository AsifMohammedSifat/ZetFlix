"use client";

import Headers from "@/components/Headers";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const Compare = ({ response }) => {
  const [slots, setSlots] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSlot, setCurrentSlot] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const movieData = response || [];

  const handleAddSlot = () => {
    setSlots([...slots, { id: Date.now(), movie: null }]);
  };

  const handleOpenModal = (slotId) => {
    setCurrentSlot(slotId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSearchTerm("");
  };

  const handleSelectMovie = async (movie) => {
    // console.log(movie);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/movie/${movie.id}`
      );
      // console.log(`${process.env.NEXT_PUBLIC_API_URL}/api/movie/${movie.id}`);
      // console.log(res.json());
      if (!res.ok) {
        throw new Error(`API call failed: ${res.status}`);
      }
      const movieDetails = await res.json();
      console.log(movieDetails);

      setSlots((prevSlots) =>
        prevSlots.map((slot) =>
          slot.id === currentSlot ? { ...slot, movie: movieDetails } : slot
        )
      );

      handleCloseModal();
    } catch (error) {
      console.error("Error fetching movie data:", error);
    }
  };

  const handleRemoveSlot = (slotId) => {
    setSlots(slots.filter((slot) => slot.id !== slotId));
  };

  const filteredMovies = movieData.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Navigation */}
      <Headers bg="black" />

      {/* Main Content */}
      <div className="container mx-auto px-4 pt-5 pb-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Compare Movies</h1>
          <button
            className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition-colors"
            onClick={handleAddSlot}
          >
            Add Movie +
          </button>
        </div>

        {/* Movie Comparison Container */}
        <div className="grid gap-6 md:grid-cols-2">
          {slots.length>0?slots.map((slot) => (
            <div
              key={slot.id}
              className="bg-zinc-900 rounded-lg p-4 flex flex-col min-h-[400px]"
            >
              <div className="flex justify-end mb-4">
                <button
                  className="text-gray-400 hover:text-white"
                  onClick={() => handleRemoveSlot(slot.id)}
                >
                  ✕
                </button>
              </div>
              {slot.movie ? (
                <div className="grid grid-cols-5 gap-8">
                  <div className="col-span-2 h-full">
                    <Image
                      width={300}
                      height={450}
                      src={`https://image.tmdb.org/t/p/original/${slot.movie.poster_path}`}
                      alt={slot.movie.title}
                      className="rounded-lg mb-4 object-contain max-h-full"
                    />
                    <h2 className="text-xl font-bold mb-2 text-center">
                      {slot.movie.title}
                    </h2>
                  </div>
                  <div className="w-full space-y-4 col-span-3">
                    <div className="bg-zinc-800 p-3 rounded">
                      <span className="text-gray-400">Rating:</span>
                      <span className="float-right">
                        {slot.movie.vote_average}
                      </span>
                    </div>
                    <div className="bg-zinc-800 p-3 rounded">
                      <span className="text-gray-400">Release Year:</span>
                      <span className="float-right">
                        {slot.movie.release_date?.split("-")[0]}
                      </span>
                    </div>
                    <div className="bg-zinc-800 p-3 rounded">
                      <span className="text-gray-400">Runtime:</span>
                      <span className="float-right">
                        {slot.movie.runtime} mins
                      </span>
                    </div>
                    <div className="bg-zinc-800 p-3 rounded">
                      <span className="text-gray-400">Budget:</span>
                      <span className="float-right">
                        ${ (slot.movie.budget / 1_000_000).toFixed(1)}M
                      </span>
                    </div>
                    <div className="bg-zinc-800 p-3 rounded">
                      <span className="text-gray-400">Revenue:</span>
                      <span className="float-right">
                      ${ (slot.movie.revenue / 1_000_000).toFixed(1)}M
                      </span>
                    </div>
                    <div className="bg-zinc-800 p-3 rounded">
                      <span className="text-gray-400">Genres:</span>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {slot.movie.genres?.map((genre) => (
                          <span
                            key={genre.id}
                            className="bg-zinc-700 px-2 py-1 rounded-full text-sm"
                          >
                            {genre.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex-grow flex flex-col items-center justify-center">
                  <button
                    className="bg-zinc-800 text-white px-6 py-3 rounded hover:bg-zinc-700 transition-colors cursor-pointer"
                    onClick={() => handleOpenModal(slot.id)}
                  >
                    Select Movie
                  </button>
                </div>
              )}
            </div>
          )):(<div id="emptyState" className="flex-grow flex flex-col items-center justify-center w-[1120px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-24 w-24 mx-auto text-moviedb-gray mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
            />
          </svg>
          <h2 className="text-2xl font-bold text-light mb-2">
            Compare your favourite movie
          </h2>
          <p className="text-light/70 mb-6">
            Explore movies and add them to your compare list.
          </p>
          <button
            href="/"
            className="bg-primary text-dark px-6 py-2 rounded-full hover:bg-primary/80 transition"
            onClick={handleAddSlot}
          >
            Compare Movies
          </button>
        </div>)}
        </div>
      </div>

      {/* Movie Search Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-zinc-900 p-6 rounded-lg w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Search Movie</h2>
              <button
                className="text-gray-400 hover:text-white"
                onClick={handleCloseModal}
              >
                ✕
              </button>
            </div>
            <input
              type="text"
              placeholder="Type movie name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-zinc-800 text-white px-4 py-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            <div className="max-h-96 overflow-y-auto space-y-2">
              {filteredMovies.map((movie) => (
                <div
                  key={movie.id}
                  onClick={() => handleSelectMovie(movie)}
                  className="flex items-center gap-4 p-2 hover:bg-zinc-800 cursor-pointer rounded"
                >
                  <Image
                    width={100}
                    height={100}
                    src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                    alt="The Social Network"
                    class="w-16 h-24 object-cover rounded"
                  />
                  <div>
                    <h3 class="font-bold">{movie.title}</h3>
                    <p class="text-sm text-gray-400">{movie.release_date?.split("-")[0]}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Compare;
