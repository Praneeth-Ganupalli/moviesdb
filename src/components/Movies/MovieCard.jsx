import React from "react";
import classes from "./MoviesList.module.css";
// import { RiHeart3Line } from "react-icons/ri";
// import { HiHeart } from "react-icons/hi";
import { BsInfoCircle } from "react-icons/bs";
import Modal from "../UI/Modal";
import { useDispatch,useSelector } from "react-redux";
import { triggerFullDetails,favActions,watchListActions } from "../../store";
function MovieCard({ movie }) {
 const [showInfo,setShowInfo]= React.useState(false);
 const dispatch=useDispatch();
 const movieFullDetails=useSelector(state=>state.search.viewedItems).find(item=>item.imdbID===movie.imdbID)||null;
 const showModalHandler=(val)=>{
    //val can be true or false
    if(val && movieFullDetails===null)
    {
        dispatch(triggerFullDetails(movie.imdbID));
    }
   
    setShowInfo(val);
 }
 const isFav=useSelector(state=>state.favs.list).some(mv=>mv.imdbID===movie.imdbID);
 const atFavHandler = () => {
   if (movieFullDetails === null) {
     dispatch(triggerFullDetails(movie.imdbID));
     dispatch(favActions.addFav(movie));
   } else {
     dispatch(favActions.addFav(movieFullDetails));
   }
 };
 const atWtchHandler=()=>{
  dispatch(watchListActions.addWatchList(movieFullDetails));
 };
const removeFavHandler=()=>{
  dispatch(favActions.removeFav(movie.imdbID));
 }
 const isSavedWtchList=useSelector(state=>state.watchList.list).map(mv=>mv.imdbID).includes(movie.imdbID)
  return (
    <>
      <div className={`mb-2 me-xs-0 ${classes["movies-container"]}`}>
        <img
          src={movie.Poster}
          alt={movie.Title}
          className={`img ${classes["img-poster"]}`}
          height={275}
          width={215}
        />
        <div className={classes["movie-info-container"]}>
          <button
            className={`btn btn-secondary d-flex align-items-center justify-content-center ${classes['btn-sm-small']}`}
            onClick={() => showModalHandler(true)}
          >
            <span>More Info</span>
            <span className={`${classes["btn-icon"]} ms-2`}>
              <BsInfoCircle />
            </span>
          </button>
          {!isFav && (
            <button
              className={`btn d-flex align-items-center btn-outline-light ${classes['btn-sm-small']}`}
              onClick={atFavHandler}
            >
              <span>Add to Favourites</span>
            </button>
          )}
          {isFav && (
            <button
              className={`btn d-flex align-items-center btn-outline-warning ${classes['btn-sm-small']}`}
              onClick={removeFavHandler}
            >
              <span>Remove Favourite</span>
            </button>
          )}
        </div>
      </div>
      {showInfo && (
        <Modal
          onClose={showModalHandler}
          movie={movieFullDetails === null ? movie : movieFullDetails}
          isFav={isFav}
          onAddFav={atFavHandler}
          onRemoveFav={removeFavHandler}
          onWatchHandler={atWtchHandler}
          isSavedWtchList={isSavedWtchList}
        />
      )}
    </>
  );
}

export default MovieCard;
