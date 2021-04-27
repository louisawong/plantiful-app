//stores all trades to load on main trades page
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchAllNearbyTrades = createAsyncThunk(
  'users/fetchAllNearbyTradesStatus',
  async (user, thunkAPI) => {
    const response = await axios.post('/api/allNearbyTrades',{
      location: user.location
    });
    //console.log("THUNK", response.data)
    return {data:response.data,uid:user.uid}
  }
)

export const fetchAllTrades = createAsyncThunk(
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
      trades: [],
      neearbyTrades: [],
    },
    reducers:{
    },
    extraReducers: {
      [fetchAllNearbyTrades.fulfilled]: (state, action) => {
        //console.log("action.payload", action.payload)
        let allTradesExcludeUsers = action.payload.data.filter((trade)=>trade.uid !== action.payload.uid);
        let mostRecentTrades = allTradesExcludeUsers.sort((a,b) => new Date(b.createdAt)- new Date(a.createdAt))
        state.nearbyTrades = mostRecentTrades;
      },
      [fetchAllTrades.fulfilled]: (state, action) => {
        //console.log("action.payload", action.payload)
        let allTradesExcludeUsers = action.payload.data.filter((trade)=>trade.uid !== action.payload.uid);
        let mostRecentTrades = allTradesExcludeUsers.sort((a,b) => new Date(b.createdAt)- new Date(a.createdAt))
        state.trades = mostRecentTrades;
      },
    },
});

export const {loadTrades} = tradesSlice.actions;

export default tradesSlice.reducer;