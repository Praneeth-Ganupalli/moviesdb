import { createSlice } from "@reduxjs/toolkit";
const initialState={
    list:[]
}
const favSlice = createSlice({
    name:"favs",
    initialState,
    reducers:{
        setFavs(state,action)
        {
            state.list=action.payload;
        },
        addFav(state,action)
        {
            const {imdbID}=action.payload;
            if((state.list.findIndex(mv=>mv.imdbID===imdbID))===-1)
            {
                state.list.push(action.payload)
            }
            
        },
        removeFav(state,action)
        {
            state.list=state.list.filter(mv=>mv.imdbID!==action.payload);
        }
    },
    extraReducers(builder){
        builder.addCase("search/updateViewedItems",(state,action)=>{
          const detailedView=action.payload;
          if(detailedView.imdbID)
          {
            const existingIndex=state.list.findIndex(mv=>mv.imdbID===detailedView.imdbID);
            state.list[existingIndex]=detailedView;
          }
        })
    }
})
export const favActions= favSlice.actions;
export default favSlice;