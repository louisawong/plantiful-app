import React, {useEffect, useState} from 'react'
import Head from 'next/head'
import style from '../styles/Trades.module.scss'
import {useDispatch, useSelector} from 'react-redux';
import {loadUser, logoutUser, fetchUserById} from '../redux/user';
import {fetchAllNearbyTrades, fetchAllTrades} from '../redux/trades';
import { Router, useRouter } from 'next/router'
import MainTradeList from '../components/MainTradeList/MainTradeList'
import axios from 'axios'

function trades() {
    const dispatch = useDispatch();
    const router = useRouter();
    const userInfo = useSelector((state)=> state.user);
    const {nearbyTrades, trades} = useSelector((state)=> state.trades);
    const [city, setCity] = useState("");

    useEffect (()=> {
        const session = localStorage.getItem("uid")
        console.log("Local storage get:", session)
        if (!session) {
            dispatch(logoutUser());
            router.push("/login")
        }
        else {
          dispatch(fetchUserById(session))
          fetch("/api/geolocation")
          .then(res => res.json())
          .then((data)=>{
            setCity(data.city)
            dispatch(fetchAllNearbyTrades({
                location: data.location , 
            uid: session
            }));
            dispatch(fetchAllTrades({
              location: data.location, 
              uid: session
            }));
          })
          .catch((err)=>{
            console.log(err);
          });
        }
    },[router]);

    const showNearbyPosts = () => {
      return <MainTradeList tradeList={nearbyTrades} none={false} city=""/>
    }

    const showAllPosts = () => {
      return  <MainTradeList tradeList={trades} none={true} city={city}/>
    }

    return (
        <div>
            <Head>
                <title>Plantiful-Trade</title>
                <link rel="icon" href="/favicon.ico" />
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
                  rel="stylesheet"></link>
                <link rel="preconnect" href="https://fonts.gstatic.com"/>
                <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"/>
            </Head>
            <main className={style.mainWrapper}>
      
                {(nearbyTrades?.length >= 1) ? showNearbyPosts() : showAllPosts()}
            </main>
        </div>
    )
}

export default trades;
