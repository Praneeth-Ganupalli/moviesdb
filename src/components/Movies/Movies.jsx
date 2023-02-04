import React from "react";
import movies from "../../staticMovies.json";
import MoviesList from "./MoviesList";
import { useSelector } from "react-redux";
import SkeletonLoader from "../UI/SkeletonLoader";
function Movies() {
  const contentList = movies.Search.slice(0);
  const moviesList = contentList.filter((content) => content.Type === "movie");
  const seriesList = contentList.filter((content) => content.Type === "series");
  const searchState = useSelector((state) => state.search);
  const { isLoading, isError, results = [], searchTerm } = searchState;
  const searchTitle = (
    <p className="mb-0 text-secondary search-header">
       Search Results for <q className="text-white text-capitalize">{searchTerm}</q>
    </p>
  );
  return (
    <>
      {searchTerm && (
        <MoviesList
          title={searchTitle}
          showFallBack={isLoading || isError}
          fallBackContent={
            isLoading ? <SkeletonLoader cards={4} /> : <h3 className="text-center text-white mt-4">We are soryy.Unable to fetch results for your Search.Please try again</h3>
          }
          moviesList={results}
        ></MoviesList>
      )}
      <MoviesList title="Popular Movies" moviesList={moviesList} />
      <MoviesList title="Popular Series" moviesList={seriesList.slice(0, 12)} />
    </>
  );
}

export default Movies;
