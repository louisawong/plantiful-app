import React,{useEffect,useState} from 'react'
import style from '../../styles/Search.module.scss'
import Head from 'next/head';
import { Router, useRouter } from 'next/router'
import {useDispatch, useSelector} from 'react-redux';
import {logoutUser, fetchUserById} from '../../redux/user';
import {fetchAllInspos} from '../../redux/inspos'
import {fetchAllTrades} from '../../redux/trades'
import MainTradePost from '../../components/MainTradePost/MainTradePost'
import MainInspoPost from '../../components/MainInspoPost/MainInspoPost'
import axios from 'axios'
import uuid from 'react-uuid'

function search() {

    const dispatch = useDispatch();
    const router = useRouter();
    const userInfo = useSelector((state)=> state.user)
    const inspos = useSelector((state)=>state.inspos.inspos)
    const trades = useSelector((state)=> state.trades.trades)

    const {search} = router.query;

    useEffect (()=> {
        const session = localStorage.getItem("uid")
        console.log("Local storage get:", session)
        if (!session) {
            dispatch(logoutUser());
            router.push("/login")
        }
        else {
          dispatch(fetchUserById(session))
          dispatch(fetchAllInspos({
            uid: session
          }));
          fetch("/api/geolocation")
          .then(res => res.json())
          .then((data)=>{
            dispatch(fetchAllTrades({
                location: data.ll , 
                uid: session
            }));
          })
          .catch ((err) => console.error(err))
        }
      },[router])

    const showPosts = () => {
        let regex = new RegExp(`${search}`, 'i')
        let sortedAllPosts = trades.concat(inspos).sort((a,b) => new Date(b.createdAt)- new Date(a.createdAt));
        if (sortedAllPosts.length===0) {
            confirm("No results found. You will be redirected to homepage.")
            router.push("/home")
            return <div>No results found.</div>
        }
        return  sortedAllPosts.map((post)=>{
            //check if post is trade or inspo
            //then check if contains search word
            //if yes, display it;
            if (post.hasOwnProperty("caption")) {
                if (post.caption.search(regex)!==-1 || post.title.search(regex)!==-1) {
                    return <MainInspoPost key={uuid()} inspo={post}/>
                }
                return <div></div>
            }
            else {
                if (post.description.search(regex)!==-1 || post.title.search(regex)!==-1) {
                    console.log(post)
                    return <MainTradePost key={uuid()} trade={post}/>
                }
                return <div></div>
            }
        })
        

    }

    return (
        <div>
            <Head>
                <title>Plantiful</title>
                <link rel="icon" href="/favicon.ico" />
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
                  rel="stylesheet"></link>
                <link rel="preconnect" href="https://fonts.gstatic.com"/>
                <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"/>
            </Head>
            <main className={style.mainWrapper}>
                {showPosts()}
            </main>
        </div>
    )
}

export default search

