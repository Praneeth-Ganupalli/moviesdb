import React from "react";
import { createPortal } from "react-dom";
import InlineLoader from "./InlineLoader";
import { getImdbRatingClass } from "../../helpers/helpers";
import {AiOutlineCheckCircle} from "react-icons/ai";
import "./Modal.css"
const ModalComp = ({ onClose,movie,isFav,onAddFav,onRemoveFav,onWatchHandler,isSavedWtchList }) => {
  const ratingClass = getImdbRatingClass(movie.imdbRating);
  return (
    <div
      className="modal d-block"
      style={{ backgroundColor: "rgba(0,0,0,.7)" }}
      onClick={() => {
        onClose(false);
      }}
    >
      <div className="modal-dialog modal-xl modal-dialog-centered modal-fullscreen-sm-down">
        <div
          className="modal-content bg-dark text-white movie-modal-content"
          onClick={(e) => e.stopPropagation()}
        >
          ;
          <div className="modal-header border-0">
            <header className="fw-bold text-white h4">
              <span>{movie.Title}:</span>
              <span>{movie.Year}</span>
              <span className="ms-4 genre-info">{movie.Genre}</span>
            </header>
            <button
              className="ms-auto btn btn-outline-light"
              onClick={() => {
                onClose(false);
              }}
            >
              &times;
            </button>
          </div>
          <div className="modal-body p-0">
            <div className="container p-0">
              <div className="row">
                <div className="col-md-8  ms-4 text-secondary text-capitalize fw-bold">
                  <div className="mb-1">Plot:</div>
                  <div className="fw-bold text-white mb-2 text-justify modal-movie-plot">
                    {movie.Plot ? movie.Plot : <InlineLoader />}
                  </div>
                  <div className="mb-2">
                    Language:
                    <span className="fw-bold ms-2 text-white">
                      {" "}
                      {movie.Language ? movie.Language : <InlineLoader />}
                    </span>
                  </div>
                  <div className="mb-2">
                    Actors:
                    <span className="fw-bold ms-2 text-white">
                      {movie.Actors}
                    </span>
                  </div>
                  <div className="mb-2">
                    Creators:
                    <span className="fw-bold ms-2 text-white">
                      {movie.Writer || <InlineLoader />}
                    </span>
                  </div>
                  {movie.Type === "series" && (
                    <>
                      <div className="mb-2">
                        Type:
                        <span className="fw-bold ms-2 text-white">
                          {movie.Type}
                        </span>
                      </div>
                      <div className="mb-2">
                        Seasons:
                        <span className="fw-bold ms-2 text-white">
                          {movie.totalSeasons}
                        </span>
                      </div>
                    </>
                  )}
                  <div className="mb-2">
                    Awards:
                    <span className="fw-bold ms-2 text-white">
                      {movie.Awards || <InlineLoader />}
                    </span>
                  </div>
                  <div className="mb-2">
                    imdbRating:
                    <span className={`"fw-bolder ms-2" ${ratingClass}`}>
                      {movie.imdbRating ? movie.imdbRating : <InlineLoader />}
                    </span>
                  </div>
                </div>
                <div className="col-md-3">
                  <img
                    src={movie.Poster}
                    alt="Poster"
                    className="img img-fluid mx-2 modal-poster"
                  />
                  {movie.Plot && (
                    <section className="btn-action-wrapper">
                     { !isFav && <button className="btn btn-outline-light btn-block mx-2 mb-2 mt-4 w-100" onClick={onAddFav}>
                        Add to Favourites
                      </button>}
                      { isFav && <button className="btn btn-warning btn-block mx-2 mb-2 mt-4 w-100" onClick={onRemoveFav}>
                        Remove Favourite
                      </button>}
                      {!isSavedWtchList && <button className="btn btn-info btn-block mx-2 w-100 mb-3" onClick={onWatchHandler}>
                        Add to Watchlist
                      </button>}
                      {isSavedWtchList && <button className="btn btn-info btn-block disabled mx-2 w-100 mb-3">
                       <span><AiOutlineCheckCircle className='check-icon' /></span> Added to Watchlist
                      </button>}
                    </section>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
function Modal(props) {
  return createPortal(
    <ModalComp {...props} />,
    document.getElementById("modal-wrapper")
  );
}
export default Modal;
