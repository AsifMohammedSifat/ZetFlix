"use client"; // Ensure hooks work properly
import Headers from "@/components/Headers";
import Loader from "@/components/ui-SVG/Loader";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
const Page = () => {
  const { auth } = useAuth();

  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = auth?.id;

  useEffect(() => {
    async function fetchWatchlist() {
      try {
        const response = await fetch(`/api/watchlist?userId=${userId}`);
        const data = await response.json();
        setWatchlist(data);
      } catch (error) {
        console.error("Error fetching watchlist:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchWatchlist();
  }, [userId]);

  const handleRemove = async (movieId) => {
    if (!confirm("Are you sure you want to remove this movie?")) return;

    try {
      const response = await fetch(
        `/api/watchlist?userId=${userId}&movieId=${movieId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to remove movie");
      }

      // Remove the movie from the local state
      setWatchlist((prev) => prev.filter((movie) => movie._id !== movieId));
    } catch (error) {
      console.error("Error removing movie:", error);
      alert("Failed to remove the movie. Please try again.");
    }
  };

  return (
    <div className="bg-body text-light min-h-screen">
      {/* Navigation */}
      <Headers />

      <div className="container mx-auto pt-5 pb-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-white">Watch Later</h1>
          <p className="text-light/70 mt-2">
            Movies you have saved to watch in the future
          </p>
        </header>

        {loading ? (
          <div className="text-center text-light/70">
            <Loader />
          </div>
        ) : watchlist.length > 0 ? (
          <div
            id="watchLaterList"
            className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {watchlist.map((movie) => (
              <Link
                href={`/movie/${movie.movieId}`}
                key={movie._id}
                className="bg-moviedb-black rounded-lg overflow-hidden shadow-lg group relative"
              >
                <Image
                  width={300}
                  height={100}
                  src={`https://image.tmdb.org/t/p/original${movie.image}`}
                  alt={movie.title}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <h2 className="text-xl font-bold text-light mb-2">
                    {movie.title}
                  </h2>
                  <div className="flex justify-between items-center">
                    <span className="text-primary">
                      {new Date(movie.releaseDate).getFullYear()}
                    </span>
                    <button
                      className="bg-moviedb-red text-light px-3 py-1 rounded-full hover:bg-moviedb-red/80 transition"
                      onClick={() => handleRemove(movie._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div id="emptyState" className="text-center py-16">
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
              Your Watch Later list is empty
            </h2>
            <p className="text-light/70 mb-6">
              Explore movies and add them to your list to watch later
            </p>
            <Link
              href="/"
              className="bg-primary text-dark px-6 py-2 rounded-full hover:bg-primary/80 transition"
            >
              Explore Movies
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
