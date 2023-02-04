import React, { useState } from "react";
import classes from "./MoviesList.module.css";
import MovieCard from "./MovieCard";
import InfoHeader from "../Layout/InfoHeader";
function MoviesList({ moviesList, title,showFallBack,fallBackContent }) {
  const [showMore, setShowMore] = useState(true);
  let expandText = "Show More";
  let displayedResults = moviesList.slice(0, 5);
  if (showMore) {
    displayedResults = moviesList.slice(0);
    expandText = "Show Less";
  }
  return (
    <section className="container-fluid mt-2 ms-3 mb-2">
      <header>
        <div className="category-info fw-bold text-white">
         <InfoHeader title={title} />
        </div>
      </header>
      {showFallBack && fallBackContent }
      {!showFallBack && <div className="container-fluid mt-4">
        <div className="d-flex flex-wrap">
          {displayedResults.map((movie) => {
            return (
             <MovieCard movie={movie} key={movie.imdbID} />
            );
          })}
          {false && displayedResults.length >=5 && (
            <div
              onClick={() => setShowMore((prevState) => !prevState)}
              className={`"d-flex align-items-center justify-content-center" ${classes["expand-info"]}`}
            >
              <h3 className="fw-bold text-white">{expandText}</h3>
            </div>
          )}
          
        </div>
      </div>}
    </section>
  );
}

export default MoviesList;
