import './App.css';
import Movies from './components/Movies/Movies';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { favActions,watchListActions } from './store';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Favourites from './components/Favourites/Favourites';
import PageLayout from './components/Layout/PageLayout';
import WatchList from './components/WatchList/WatchList';
function App() {
  const dispatch = useDispatch();
  const favs = useSelector(state => state.favs.list);
  const watchList=useSelector(state=>state.watchList.list);
  useEffect(() => {
    if (localStorage.getItem("favs") !== null) {
      const savedFavs = JSON.parse(localStorage.getItem("favs"))
      dispatch(favActions.setFavs(savedFavs));
    }
    if(localStorage.getItem("watchlist")!==null)
    {
      const savedContent=JSON.parse(localStorage.getItem("watchlist"));
      dispatch(watchListActions.setWatchLists(savedContent));
    }
  }, [dispatch])
  useEffect(() => {
    if (favs.length) {
      localStorage.setItem("favs", JSON.stringify(favs))
    }
    else {
      localStorage.removeItem("favs");
    }
  }, [favs]);
  useEffect(() => {
    if (watchList.length) {
      localStorage.setItem("watchlist", JSON.stringify(watchList))
    }
    else {
      localStorage.removeItem("watchlist");
    }
  }, [watchList]);
  return (
    <>
      <main>
        <BrowserRouter>
        <PageLayout>
          <Routes>
            <Route path="/" element={<Navigate to="/browse" />} />
            <Route path="/browse" element={<Movies />} />
            <Route path="/favs" element={<Favourites />} />
            <Route path="/watchlist" element={<WatchList />} />
          </Routes>
        </PageLayout>
        </BrowserRouter>
      </main>
    </>
  );
}

export default App;
