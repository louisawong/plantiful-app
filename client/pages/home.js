import React, {useEffect, useState} from 'react'
import Head from 'next/head'
import style from '../styles/Trades.module.scss'
import {useDispatch, useSelector} from 'react-redux';
import {logoutUser, fetchUserById} from '../redux/user';
import {fetchAllInspos} from '../redux/inspos';
import {useRouter } from 'next/router'
import MainInspoList from '../components/MainInspoList/MainInspoList'

function home() {
    const dispatch = useDispatch();
    const router = useRouter();
    const userInfo = useSelector((state)=> state.user);
    const inspos = useSelector((state)=>state.inspos.inspos)

    useEffect (()=> {
        const session = localStorage.getItem("uid")
        console.log("Local storage get:", session)
        if (!session) {
            dispatch(logoutUser());
            router.push("/login")
        }
        else {
          dispatch(fetchUserById(session));
          dispatch(fetchAllInspos({
             uid: session
          }));
        }
    },[router]);

    const showAllPosts = () => {
      console.log("SHOWING ALL")
      return <MainInspoList inspoList={inspos}/>
    }

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
            <main className={style.mainWrapper}>
                {showAllPosts()}
            </main>
        </div>
    )
}

export default home;
