import React from 'react'
import JumboTron from '../UI/JumboTron'
import { useSelector } from 'react-redux';
import WatchListItem from './WatchListItem';
import InfoHeader from '../Layout/InfoHeader';
function WatchList() {
  const watchListContent=useSelector(state=>state.watchList.list);
  if(watchListContent.length===0)
  {
    return (
      <section className='d-flex mt-5'>
          { <JumboTron text="WatchList" /> }
         
      </section>
    
    )
  }
  return(
    <>
    <header className='mt-3 ms-4 fw-bolder text-white'>
      <InfoHeader title="Your Watch List" />
    </header>
    <section className='watchlist__wrapper d-flex flex-wrap  p-4'>
    {
            watchListContent && watchListContent.length && watchListContent.map(mv=>{
              return  <WatchListItem key={mv.imdbID} mv={mv} />
            })
          }
    </section>
    </>
    
  )
  
}

export default WatchList