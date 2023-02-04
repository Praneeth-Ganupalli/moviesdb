import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL , API_KEY } from "../helpers/constants";
const initialState={
    isLoading:false,
    searchTerm:"",
    isError:false,
    results:[],
    viewedItems:[]
}
const searchSlice=createSlice({
    name:"search",
    initialState,
    reducers:{
        setLoading(state,action)
        {
            state.isLoading=action.payload; //payload will be true or false
        },
        setResults(state,action)
        {
            state.results=action.payload //payload will be array of results
        },
        setSearchTerm(state,action)
        {
            state.searchTerm = action.payload; //payload will be searchTerm;
        },
        setError(state,action)
        {
            state.isError = action.payload //payload will be true or false
        },
        updateViewedItems(state,action)
        {
            state.viewedItems.push(action.payload) //action.payload will be our fulldetails object
        }
    }
})
export const searchActions = searchSlice.actions;
export const triggerSearch=(searchTerm)=>{
    return async(dispatch)=>{
        dispatch(searchActions.setSearchTerm(searchTerm));
        dispatch(searchActions.setLoading(true));
        try{
            const response= await axios.get(`${BASE_URL}/?s=${searchTerm}&apikey=${API_KEY}`);
            if(response.data && response.data.Response==="False")
            {
                dispatch(searchActions.setResults([]));
                throw new Error(response.data.Error);
            }
            if(response.data && response.data.Search)
            {
               const filteredData= response.data.Search.filter(movie=>movie.Poster.startsWith("https"))
               dispatch(searchActions.setResults(filteredData));
            }
            
        }
        catch(err)
        {
            dispatch(searchActions.setError(true));
        }
        finally{
            await pause(1000);
            dispatch(searchActions.setLoading(false));
        }
   
    }
}
const triggredIds = {};
export const triggerFullDetails = (id) => {
    return async (dispatch) => {
        try {
            if (!triggredIds[id]) {
                const response = await axios.get(`${BASE_URL}/?i=${id}&plot=full&apikey=${API_KEY}`);
                dispatch(searchActions.updateViewedItems(response.data));
                triggredIds[id] = "true";
            }
        }
        catch (er) {
            console.error(er);
        }

    }
}
function pause(duration)
{
    return new Promise((resolve,_)=>{
        setTimeout(resolve,duration);
    })
}
export default searchSlice;