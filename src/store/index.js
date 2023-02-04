import { configureStore } from "@reduxjs/toolkit";
import searchSlice,{searchActions,triggerSearch,triggerFullDetails} from "./search";
import favSlice,{favActions} from "./favourites";
import watchListSlice,{watchListActions} from "./watchlist";
const store= configureStore({
    reducer:{
        search:searchSlice.reducer,
        favs:favSlice.reducer,
        watchList:watchListSlice.reducer
    }
})
export default store;
export {searchActions,triggerSearch,triggerFullDetails,favActions,watchListActions};