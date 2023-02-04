import React, { Fragment, useState } from 'react'
import { useSelector} from 'react-redux';
import "./Favourites.css"
import FavouriteItem from './FavouriteItem';
import InfoHeader from '../Layout/InfoHeader';
import JumboTron from '../UI/JumboTron';
function Favourites() {
  const favs = useSelector(state=>state.favs.list);
  const[dropDownVal,setDropDownVal] = useState("All");
  const displayedFavs= dropDownVal==="All"?favs.slice(0):favs.filter(mv=>mv.Type===dropDownVal);
  const titleObj={
    "All":"Your Favourites",
    "movie":"Favourite Movies",
    "series":"Favourite Series"
  }
  const showFilters=[...new Set(favs.map(mv=>mv.Type))].length>1;
  const displayTitle=titleObj[dropDownVal];
  if (favs.length === 0) {
    return (
      <>
        <section className="d-flex mt-5">
          <JumboTron text="Favourites" />
        </section>
      </>
    );
  }
  return (
    <>
      <header className="mb-4 fw-bold text-white ms-lg-3 d-flex align-items-baseline fav-header">
        <InfoHeader title={displayTitle} />
        {showFilters && <section value={dropDownVal} onChange={(e)=>{setDropDownVal(e.target.value)}} className="filter ms-auto me-5">
          <select
            name="filters"
            className="btn btn-light ms-2 dropdown-toggle fav-filter-dropdown"
          >
            <option value="All" className='text-start'>
              All
            </option>
            <option value="movie" className='text-start'>
              Movies
            </option>
            <option value="series" className='text-start'>
              Series
            </option>
          </select>
        </section>}
      </header>

      <div className="d-flex flex-wrap  ms-4">
        {displayedFavs &&
          displayedFavs.length > 0 &&
          displayedFavs.map((mv) => {
            return (
              <Fragment key={mv.imdbID}>
                <FavouriteItem mv={mv} />
              </Fragment>
            );
          })}
      </div>
    </>
  );
}

export default React.memo(Favourites)