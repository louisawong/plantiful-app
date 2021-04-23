//store their search query
import {createSlice} from '@reduxjs/toolkit';

export const searchSlice = createSlice({
    name: "search",
    initialState:{
      search: "",
      searchPosts: [],
    },
    reducers:{
      loadSearch: (state, action) => { 
          //filter inspo to incude word and not users own posts
        let filteredInspos = action.payload.inspos.filter((insp) => {
            let searchInspos = (inspo.title.includes(state.search) || inspo.caption.includes(state.search));
            if (searchInspos && inspo.userId !== action.payload.uid) {
                return true;
            }
            return false;
        });
        //filter inspo to incude word and not users own posts
        let filteredTrades = action.payload.trades.filter((trade) => {
            let searchTrades = (trade.title.includes(state.search) || trade.description.includes(state.search));
            if (searchTrades &&  trade.userId !== action.payload.uid) {
                return true;
            }
            return false;
        });
        let allSearchPosts = filteredInspos.concat(filteredTrades);
        let mostRecentPosts = allSearchPosts.sort((a,b) => new Date(a.createdAt)- new Date(b.createdAt))
        state.searchPosts = mostRecentPosts;
      },
      resetSearch: () => initialState,
      addSearch: (state, action) => {
          state.search = action.payload.search
      }
    }
});

export const {} = searchSlice.actions;

export default searchSlice.reducer;