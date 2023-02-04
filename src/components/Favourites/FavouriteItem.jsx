import React, { useState } from 'react'
import {MdFavorite} from "react-icons/md";
import { useDispatch,useSelector} from 'react-redux';
import { favActions,watchListActions } from '../../store';
import { getImdbRatingClass } from '../../helpers/helpers';
import {AiOutlineCheckCircle} from "react-icons/ai";
function FavouriteItem({mv}) {
  const dispatch=useDispatch();
  const [isRemoved,setRemoved] = useState(false);
  const removeFav=()=>{
    setRemoved(true);
    setTimeout(()=>{
      dispatch(favActions.removeFav(mv.imdbID));
    },500)
  }
  const addWtchList=()=>{
    dispatch(watchListActions.addWatchList(mv))
  }
  const isSavedWatchList=useSelector(state=>state.watchList.list).map(lmv=>lmv.imdbID).includes(mv.imdbID);
  const ratingClass=getImdbRatingClass(mv.imdbRating);
  return (
    <div
      className={`bg-dark  fw-bolder text-white d-flex ms-lg-3 mb-2 favs-container fav-item ${
        isRemoved ? "removed" : ""
      }`}
    >
      <img src={mv.Poster} alt="Poster" className="img img-fluid" />
      <div className={`ms-3 d-flex flex-column flex-b-50`}>
        <div className="mb-1 fs-12 mt-2 break-space">Title: {mv.Title}</div>
        <div className="mb-1 fs-12"> Released: {mv.Year}</div>
        <div className="mb-1 fs-12 text-capitalize">
          Content Type: {mv.Type}
        </div>
        {mv.Genre && <div className="mb-1 fs-12 text-capitalize fav-genre-class">
          Genre: {mv.Genre}
        </div>}
        {
         mv.Language && <div className="mb-1 fs-12 text-capitalize break-space">
         Language: {mv.Language}
       </div>
        }
        {
         Number(mv.imdbRating) && <div className="mb-1 fs-12 text-capitalize rating-class">
          <span className={ratingClass}>{Number(mv.imdbRating)*10}% </span>
       </div>
        }
        <div className="mt-auto mb-2 w-100">
          <button
            className="btn  btn-warning mb-2 d-block btn-sm w-100 fs-12"
            onClick={removeFav}
          >
            <span>Remove Favourite</span>
          </button>
          {!isSavedWatchList && <button className="btn  btn-info d-block btn-sm w-100" onClick={addWtchList}>
            <span>Add to watchlist</span>
          </button>}
          {isSavedWatchList && <button className="btn btn-info disabled d-block btn-sm w-100 fs-12">
            <span><AiOutlineCheckCircle className='check-icon' />Added to watchlist</span>
          </button>}
        </div>
      </div>
      <div className="ms-auto pe-2">
        <MdFavorite className="text-danger" />
      </div>
    </div>
  );
}

export default FavouriteItem