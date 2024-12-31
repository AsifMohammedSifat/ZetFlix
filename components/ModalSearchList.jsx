"use client";

import React, { useState, useEffect } from "react";
import ModalSearchBody from "./ModalSearchBody";

const ModalSearchList = ({ movie, onSelectMovie }) => {
  const [movieData, setMovieData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/movie/${movie.id}`);
        if (!response.ok) {
          throw new Error(`API call failed: ${response.status}`);
        }
        const data = await response.json();
        setMovieData(data);
      } catch (error) {
        console.error("Error fetching movie data:", error);
        setMovieData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchMovieData();
  }, [movie.id]);

  if (loading) {
    return <div>Loading...</div>; // Optional: Show a loading indicator
  }

  if (!movieData) {
    return <div>No data available</div>; // Show an error if movie data is not found
  }

  return <ModalSearchBody movie={movieData} onSelectMovie={onSelectMovie} />;
};

export default ModalSearchList;
