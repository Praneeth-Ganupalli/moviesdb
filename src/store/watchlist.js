import { createSlice } from "@reduxjs/toolkit";
const initialState={
    list:[],
}
const watchListSlice=createSlice({
    name:"watchlist",
    initialState,
    reducers:{
        setWatchLists(state,action)
        {
            state.list=action.payload;
        },
        addWatchList(state,action)
        {
            const newMv=action.payload;
            if(!(state.list.some(lmv=>lmv.imdbID===newMv.imdbID)))
            {
                state.list.push(newMv);
            }
        },
        removeWatchlist(state,action)
        {
            const id=action.payload;
            state.list=state.list.filter(mv=>mv.imdbID!==id)
        },
        addCompletedMovie(state,action)
        {
           const imdbID=action.payload;
           const mvIndex=state.list.findIndex(mv=>mv.imdbID===imdbID);
           if(mvIndex!==-1)
           {
            state.list[mvIndex].isCompleted=true;
           }

        }
    }
})
export const watchListActions=watchListSlice.actions;

export default watchListSlice;