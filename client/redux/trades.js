//stores all trades to load on main trades page
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchAllNearbyTrades = createAsyncThunk(
  'users/fetchAllTradesStatus',
  async (user, thunkAPI) => {
    const response = await axios.post('/api/allTrades',{
      location: user.location
    });
    //console.log("THUNK", response.data)
    return {data:response.data,uid:user.uid}
  }
)

export const tradesSlice = createSlice({
    name: "trades",
    initialState:{
      trades: []
    },
    reducers:{
      loadTrades: (state, action) => {
        let allTradesExcludeUsers = action.payload.trades.filter((trade)=> trade.userId !== action.payload.uid);
        console.log("DATE ",new Date(allTradesExludeUsers[0].createdAt))
        let mostRecentTrades = allTradesExcludeUsers.sort((a,b) => new Date(b.createdAt)- new Date(a.createdAt))
        state.trades = mostRecentTrades;
      }
    },
    extraReducers: {
      [fetchAllNearbyTrades.fulfilled]: (state, action) => {
        console.log("action.payload", action.payload)
        let allTradesExcludeUsers = action.payload.data.filter((trade)=>trade.uid !== action.payload.uid);
        let mostRecentTrades = allTradesExcludeUsers.sort((a,b) => new Date(b.createdAt)- new Date(a.createdAt))
        state.trades = mostRecentTrades;
      }
    },
});

export const {loadTrades} = tradesSlice.actions;

export default tradesSlice.reducer;