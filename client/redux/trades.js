//stores all trades to load on main trades page
import {createSlice} from '@reduxjs/toolkit';

export const tradesSlice = createSlice({
    name: "trades",
    initialState:{
      trades: []
    },
    reducers:{
      loadTrades: (state, action) => {
        let allTradesExcludeUsers = action.payload.trades.filter((trade)=> trade.userId !== action.payload.uid);
        let mostRecentTrades = allTradesExcludeUsers.sort((a,b) => new Date(a.createdAt)- new Date(b.createdAt))
        state.trades = mostRecentTrades;
      }
    }
});

export const {} = tradesSlice.actions;

export default tradesSlice.reducer;