//store all inspos to load on homepage
import {createSlice} from '@reduxjs/toolkit';

export const insposSlice = createSlice({
    name: "inspos",
    initialState:{
      inspos: []
    },
    reducers:{
      loadInspos: (state, action) => {
        let allInsposExcludeUsers = action.payload.inspos.filter((inspo)=> inspo.userId !== action.payload.uid);
        let mostRecentInspos = allInsposExcludeUsers.sort((a,b) => new Date(a.createdAt)- new Date(b.createdAt))
        state.inspos = mostRecentInspos;
      }
    }
});

export const {} = insposSlice.actions;

export default insposSlice.reducer;