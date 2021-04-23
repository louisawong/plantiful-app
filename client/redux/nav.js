//store what user clicked....NOT FUNCTIONING YET
import {createSlice} from '@reduxjs/toolkit';

export const navSlice = createSlice({
    name: "nav",
    initialState:{
      location: "root",
      root: true,
      home: false,
      trades: false,
      chat: false,
      profile: false,
      search: false,
    },
    reducers:{
      navRoot: (state) => {
          state.location = "root";
      },
    }
});

export const {} = navSlice.actions;

export default navSlice.reducer;