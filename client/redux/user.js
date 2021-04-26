import {useAuth} from '../firebase/auth';
import firebaseClient from '../firebase/config';
import firebase from 'firebase/app';
import "firebase/auth";
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

// First, create the thunk
//fetch session user info from database
export const fetchUserById = createAsyncThunk(
  'users/fetchByIdStatus',
  async (userId, thunkAPI) => {
    const response = await axios.get('/api/users/'+userId);
    //console.log("THUNK", response.data)
    return response.data
  }
)

//post a new user
export const createNewUser = createAsyncThunk(
  'users/createNewUserStatus',
  async (user, thunkAPI) => {
    console.log("THUNK USER: ", user)
    const response = await axios.post(`/api/users/${user.uid}`,{
      uid:user.uid,
      username:user.username,
      email:user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      location: {type:"Point", coordinates: user.location},
      country: user.country,
      city: user.city,
    })
    //console.log("THUNKRESULT",response)
    return response.data
  }
)

export const updateUser = createAsyncThunk(
  'users/updateUserStatus',
  async (user, thunkAPI) => {
    //console.log("THUNK Update: ", user)
    const response = await axios.put(`/api/users/${user.uid}`,user.update)
    //console.log("THUNKUPDATERESULT",response)
    return response.data
  }
)

export const userSlice = createSlice({
    name: "user",
    initialState:{
        isAuthenticated: true,
        uid: "",
        username: "",
        email: "",
        firstName: "",
        lastName: "",
        profile: "",
        description: "",
        location: [],
        city:"",
        country: "",
        followers: [],
        numFollowers: 0,
        inspos: [],
        numInspos: 0,
        trades: [],
        numTrades: 0,
        chats:[],
    },
    reducers:{ 
      editProfile: (state, action) => {
        state.profile = action.payload.profile;
      },
      editDescription: (state, action) => {
        state.description = action.payload.description;
      },
      editLastName: (state, action) => {
        state.lastName = action.payload.lastName;
      },
      editLocation: (state, action) => {
        const coords = action.payload.coords;  
        state.location = coords;
      },
      addFollower: (state, action) => {
        state.numFollowers += 1;
        state.followers = state.followers.concat(action.payload.follower);
      },
      removeFollower: (state, action) => {
        state.numFollowers -= 1;
        state.followers = state.followers.filter((follower) => {follower.uid !== action.payload.uid});
      },
      addInspo: (state, action) => {
        state.numInspos +=1;
        state.inspos = state.inspos.concat(action.payload.inspo);
      },
      removeInspo: (state, action) => {
        state.numInspos -=1;
        state.inspos = state.inspos.filter((inspo) => inspo.id !== action.payload.id);
      },
      addTrade: (state, action) => {
        state.numTrades +=1;
        state.trades = state.trades.concat(action.payload.trade);
      },
      removeTrade: (state, action) => {
        state.numTrades -=1;
        state.trades = state.trades.filter((trade) => trade.id !== action.payload.id);
      },
      addChat: (state, action) => {
        state.chats = state.chats.concat(action.payload.chat);
      },
      removeChat: (state, action) => {
        state.chats = state.chats.filter((chat)=> chat.id !== action.payload.id);
      },
      addMessage: (state, action) => {
        state.chats = state.chats.map((chat) => {
          if (chat.id === action.payload.id) {
            let newMessages = chat.messages.concat(action.payload.message);
            return {
                ...chat,
                messages: newMessages,
            };
          } else {
            return chat;
          }
        })
      },
      loadUser: (state,action) => {
        state.isAuthenticated = true;
        state.uid = action.payload.uid;
        state.username = action.payload.username;
        state.email = action.payload.email;
        state.firstName = action.payload.firstName;
        state.lastName = action.payload.lastName;
        state.profile = action.payload.profile;
        state.description = action.payload.description;
        const coords = action.payload.location?.coordinates;  
        state.location = coords;
        state.city = action.payload.city;
        state.country = action.payload.country;
        state.followers = state.followers.concat(action.payload.followers);
        state.numFollowers = action.payload.numFollowers;
        state.inspos = state.inspos.concat(action.payload.inspos);
        state.numInspos = action.payload.numInspos;
        state.trades = state.trades.concat(action.payload.trades);
        state.numTrades= action.payload.numTrades;
        state.chats = state.chats.concat(action.payload.chats);
      },
      logoutUser: (state) => {
        localStorage.removeItem("uid");
        state.authUser = {};
        state.isAuthenticated = false;
        state.uid = "";
        state.username = "";
        state.email = "";
        state.firstName = "";
        state.lastName = "";
        state.profile = "";
        state.description = "";
        state.location = [];
        state.city = "";
        state.countru = "";
        state.followers = [];
        state.numFollowers = 0;
        state.inspos = [];
        state.numInspos = 0;
        state.trades = [];
        state.numTrades = 0;
        state.chats = [];
      }
    },
    extraReducers: {
        [fetchUserById.fulfilled]: (state, action) => {
          // Add user to the state array
          state.isAuthenticated = true;
          state.uid = action.payload.uid;
          state.username = action.payload.username;
          state.email = action.payload.email;
          state.firstName = action.payload.firstName;
          state.lastName = action.payload.lastName;
          state.profile = action.payload.profile;
          state.description = action.payload.description;
          const coords = action.payload.location?.coordinates;  
          state.location = coords;
          state.city = action.payload.city;
          state.country = action.payload.country;
          state.followers = action.payload.followers;
          state.numFollowers = action.payload.numFollowers;
          state.inspos = action.payload.inspos;
          state.numInspos = action.payload.numInspos;
          state.trades = action.payload.trades;
          state.numTrades= action.payload.numTrades;
          state.chats = action.payload.chats;
        },
        [createNewUser.fulfilled]: (state,action) => {
          state.isAuthenticated = true;
          state.uid = action.payload.uid;
          state.email = action.payload.email;
          state.username = action.payload.username;
          state.firstName = action.payload.firstName;
          state.lastName = action.payload.lastName;
          state.city = action.payload.city;
          state.country = action.payload.country;
          state.location = action.payload.location;
        },
        [updateUser.fulfilled]: (state,action) => {
          state.isAuthenticated = true;
          state.uid = action.payload.uid;
          state.username = action.payload.username;
          state.email = action.payload.email;
          state.firstName = action.payload.firstName;
          state.lastName = action.payload.lastName;
          state.profile = action.payload.profile;
          state.description = action.payload.description;
          const coords = action.payload.location?.coordinates;  
          state.location = coords;
          state.followers = action.payload.followers;
          state.numFollowers = action.payload.numFollowers;
          state.inspos = action.payload.inspos;
          state.numInspos = action.payload.numInspos;
          state.trades = action.payload.trades;
          state.numTrades= action.payload.numTrades;
          state.chats = action.payload.chats;
        }
    }
});

export const {setNewUser, logoutUser, editProfile, editDescription,
    editLastName, editLocation, addFollower, removeFollower,
    addInspo, removeInspo, addTrade, removeTrade,
    addChat, removeChat, addMessage, loadUser} = userSlice.actions;

export default userSlice.reducer;