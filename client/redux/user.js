import {createSlice} from '@reduxjs/toolkit';
import {useAuth} from '../firebase/auth';
import firebaseClient from '../firebase/config';
import firebase from 'firebase/app';
import "firebase/auth";

export const userSlice = createSlice({
    name: "user",
    initialState:{
        isAuthenticated: false,
        uid: "",
        username: "",
        email: "",
        firstName: "",
        lastName: "",
        profile: "",
        description: "",
        location: [],
        followers: [],
        numFollowers: 0,
        inspos: [],
        numInspos: 0,
        trades: [],
        numTrades: 0,
        chats:[],
    },
    reducers:{
      setNewUser: (state, action) => {
        state.isAuthenticated = true;
        state.uid = action.payload.uid;
        state.email = action.payload.email;
        state.username = action.payload.username;
        state.firstName = action.payload.firstName;
        state.lastName = action.payload.lastName;
        fetch('/api/users/'+action.payload.uid, {
          method: 'POST',
          header:{
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            uid:action.payload.uid,
            username:action.payload.username,
            email:action.payload.email,
            firstName: action.payload.firstName,
            lastName: action.payload.lastName
          })
        }).catch((err) => console.log(error))
      },
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
        // function load () {
        // fetch('/api/users/'+action.payload.uid)
        // .then ((res)=>res.json())
        // .then((data)=> {
        //     console.log("DATA FETCH", data)
        //     state.username = data.username;
        //     state.email = data.email;
        //     state.firstName = data.firstName;
        //     state.lastName = data.lastName;
        //     state.profile = data.profile;
        //     state.description = data.description;
        //     const coords = data.location.coordinates; 
        //     state.location = coords;
        //     state.followers = state.followers.concat(data.followers);
        //     state.numFollowers = data.numFollowers;
        //     state.inspos = state.inspos.concat(data.inspos);
        //     state.numInspos = data.numInspos;
        //     state.trades = state.trades.concat(data.trades);
        //     state.numTrades= data.numTrades;
        //     state.chats = state.chats.concat(data.chats);
        // })
        // .catch((err) => console.log(err))
        // };
        // load();
        // console.log(state)
        state.isAuthenticated = true;
        state.uid = action.payload.uid;
        state.username = action.payload.username;
        state.email = action.payload.email;
        state.firstName = action.payload.firstName;
        state.lastName = action.payload.lastName;
        state.profile = action.payload.profile;
        state.description = action.payload.description;
        const coords = action.payload.location.coordinates;  
        state.location = coords;
        state.followers = state.followers.concat(action.payload.followers);
        state.numFollowers = action.payload.numFollowers;
        state.inspos = state.inspos.concat(action.payload.inspos);
        state.numInspos = action.payload.numInspos;
        state.trades = state.trades.concat(action.payload.trades);
        state.numTrades= action.payload.numTrades;
        state.chats = state.chats.concat(action.payload.chats);
      },
      logoutUser: (state) => {
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
        state.followers = [];
        state.numFollowers = 0;
        state.inspos = [];
        state.numInspos = 0;
        state.trades = [];
        state.numTrades = 0;
        state.chats = [];
      }
    }
});

export const {setNewUser, logoutUser, editProfile, editDescription,
    editLastName, editLocation, addFollower, removeFollower,
    addInspo, removeInspo, addTrade, removeTrade,
    addChat, removeChat, addMessage, loadUser} = userSlice.actions;

export default userSlice.reducer;