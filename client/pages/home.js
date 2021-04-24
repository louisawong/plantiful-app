import React, {useEffect} from 'react'
import Head from 'next/head'
import {useDispatch, useSelector} from 'react-redux';
import {useAuth} from '../firebase/auth';
import {loadUser, logoutUser} from '../redux/user';
import { Router, useRouter } from 'next/router'

function home() {
    const dispatch = useDispatch();
    const router = useRouter();
    const userInfo = useSelector((state)=> state.user)
    const {user} = useAuth(); // replace with line ten

    useEffect (()=> {
        console.log("UID: ",user?.uid)
        if (!user) {
            dispatch(logoutUser());
            router.push("/login")
        }
        else {
          fetch('/api/users/'+user.uid)
          .then ((res)=>res.json())
          .then((data)=> {
              dispatch(loadUser(data));
              console.log(data)
          })
          .catch((err)=>console.log("Loading home:", err))
        }
      },[])

    return (
        <div>
            <Head>
                <title>Plantiful-Home</title>
                <link rel="icon" href="/favicon.ico" />
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
                  rel="stylesheet"></link>
                <link rel="preconnect" href="https://fonts.gstatic.com"/>
                <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"/>
            </Head>
            <main>
                WELCOME HOME {userInfo.username}!
            </main>
        </div>
    )
}

export default home
