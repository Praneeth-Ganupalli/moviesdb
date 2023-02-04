import React from "react";
// import { SlLike } from "react-icons/sl";
import {FiExternalLink} from "react-icons/fi"
import "./WatchListItem.css";
import { useDispatch } from "react-redux";
import { watchListActions } from "../../store";
import {BsFillPlayCircleFill,BsFillStarFill} from "react-icons/bs"
import {AiOutlineCheckCircle} from "react-icons/ai";
function WatchListItem({ mv }) {
    const dispatch=useDispatch();
    const removeItem=()=>{
        dispatch(watchListActions.removeWatchlist(mv.imdbID));
    }
    const completeWatchHandler=()=>{
        dispatch(watchListActions.addCompletedMovie(mv.imdbID));
    }
  return (
    <div className="card bg-green__grad w-lg-50 mb-2  watchlist-card ms-3">
      <div className="card-body fw-bolder text-white">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <h3 className="fw-bolder text-white">{mv.Title}</h3>
              <section className="mv-info d-flex   mt-2 ">
                <div >{mv.Rated}</div>
                <div>{mv.Year}</div>
                <div>{mv.Genre.split(",").join(" | ")}</div>
                <div>{mv.Runtime}</div>
              </section>
              <section className="summary mt-2">
                <div>Summary:</div>
                <div className="mt-2">{mv.Plot.slice(0, 200)}...</div>
                <div className="mt-2">
                  <a
                    href={`https://www.imdb.com/title/${mv.imdbID}`}
                    className="text-white text-decoration-none"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Read More <FiExternalLink  className="link-icon"/>
                  </a>
                </div>
              </section>
              <section className="misc-btn-info d-flex ">
                <button className="btn btn-block btn-light"><BsFillStarFill className="like-icon"/>{mv.imdbRating}</button>
                <button className="btn btn-block disabled  btn-light"><BsFillPlayCircleFill className="like-icon" />Watch</button>
                {!mv.isCompleted && <button className="btn btn-block  btn-light" onClick={completeWatchHandler}>Complete</button>}
                {mv.isCompleted && <button className="btn btn-block  btn-outline-success">
                <AiOutlineCheckCircle className='check-icon' />
                    Completed</button>}
                <button className="btn btn-block  btn-danger" onClick={removeItem}>Remove</button>
              </section>
            </div>
            <div className="col-md-4 poster-wtch">
              <img
                src={mv.Poster}
                alt="Poster"
                className="img img-fluid watchlist-poster"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WatchListItem;
