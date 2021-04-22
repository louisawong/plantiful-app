import React, {useState, useEffect, useContext, createContext} from 'react';
import nookies from 'nookies';
import firebaseClient from './config';
import firebase from 'firebase/app'
import 'firebase/auth';

const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    firebaseClient();
}