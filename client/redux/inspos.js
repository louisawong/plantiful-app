//store all inspos to load on homepage
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchAllInspos = createAsyncThunk(
  'users/fetchAllInsposStatus',
  async (user, thunkAPI) => {
    const response = await axios.get('/api/allInspos');
    //console.log("THUNK", response.data)
  return {data:response.data,uid:user.uid}
  }
)

export const insposSlice = createSlice({
    name: "inspos",
    initialState:{
      inspos: []
    },
    reducers:{
    },
    extraReducers: {
      [fetchAllInspos.fulfilled]: (state, action) => {
        //console.log("action.payload", action.payload)
        let allInsposExcludeUsers = action.payload.data.filter((inspo)=>inspo.uid !== action.payload.uid);
        let mostRecentInspos = allInsposExcludeUsers.sort((a,b) => new Date(b.createdAt)- new Date(a.createdAt))
        state.inspos = mostRecentInspos;
      },
    }
});

export const {} = insposSlice.actions;

export default insposSlice.reducer;