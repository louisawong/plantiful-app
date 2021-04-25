import React, {useState, useEffect, useContext, createContext} from 'react';
import nookies from 'nookies';
import firebaseClient from './config';
import firebase from 'firebase/app'
import 'firebase/auth';
import {useDispatch, useSelector} from 'react-redux';
import {fetchUserById} from '../redux/user'

const AuthContext = createContext({});


export const AuthProvider = ({children}) => {
    firebaseClient();
    const dispatch = useDispatch();
    const [user, setUser] = useState(null);
    //const user = useSelector((state)=> state.user.authUser)

    useEffect(()=> {
        return firebase.auth().onIdTokenChanged(async (user) => {
            if (!user) {
                setUser(null);
                nookies.set(undefined, "token", "", {});
                return;
            }
            const token = await user.getIdToken();
            dispatch(fetchUserById(user.uid));
            // fetch('/api/users/'+user.uid)
            //     .then ((res)=>res.json())
            //     .then((data)=> {
            //         dispatch(loadUser(data));
            //     })
            //     .catch((err)=>console.log("Loading error:", err))
            //console.log("USER:", user, "TOKEN: ",token);
            setUser(user); // set user in Redux

            nookies.set(undefined, "token", token, {});
        });
    }, []);

    return (<AuthContext.Provider value={{user}}>{children}</AuthContext.Provider>);
};

export const useAuth = () => useContext(AuthContext);