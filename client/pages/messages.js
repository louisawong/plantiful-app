import React,{useEffect,useState} from 'react';
import style from '../styles/Messages.module.scss';
import Head from 'next/head';
import {useDispatch, useSelector} from 'react-redux';
import {loadUser, logoutUser, fetchUserById} from '../redux/user';
import {useAuth} from '../firebase/auth';
import { Router, useRouter } from 'next/router'
import Link from 'next/link'

function messages() {
    const dispatch = useDispatch();
    const router = useRouter();
    const userInfo = useSelector((state)=> state.user)

    useEffect (()=> {
      const session = localStorage.getItem("uid")
      console.log("Local storage get:", session)
      if (!session) {
          dispatch(logoutUser());
          router.push("/login")
      }
      else {
        dispatch(fetchUserById(session))
      }
    },[router])

    return (
        <div>
            <Head>
                <title>Plantiful-Your Messages</title>
                <link rel="icon" href="/favicon.ico" />
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
                  rel="stylesheet"></link>
                <link rel="preconnect" href="https://fonts.gstatic.com"/>
                <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"/>
            </Head>
            <main className={style.mainWrapper}>
               Messages
            </main>
        </div>
    )
}

export default messages