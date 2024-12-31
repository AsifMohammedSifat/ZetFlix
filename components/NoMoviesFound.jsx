import React from "react";

const NoMoviesFound = ({ category }) => {
  return (
    <div className="container">
      {category && (
        <h2 className="text-2xl font-bold p-5 mb-4">{category} on MOVIE DB</h2>
      )}
      <div className="no-movies-container">
        <div className="no-movies-message">
          <h2>No Movies Found</h2>
          <p>Sorry, we could not find any movies.</p>
        </div>
      </div>
    </div>
  );
};

export default NoMoviesFound;
