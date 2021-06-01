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
                location: data.location , 
                uid: session
            }));
          })
          .catch ((err) => console.error(err))
        }
      },[router])

    const showPosts = () => {
        let regex = new RegExp(`${search}`, 'i')
        //filters inspo post for keyword in caption or title
        let filteredInspo = inspos.filter((post) => {
            return post.caption.search(regex)!==-1 || post.title.search(regex)!==-1;
        });
        //filters trade post for keyword in description or title
        let filteredTrade = trades.filter((post) => {
            return post.description.search(regex)!==-1 || post.title.search(regex)!==-1;
        })
        //combine and sort all filtered posts by most recent
        let sortedAllPosts = filteredInspo.concat(filteredTrade).sort((a,b)=> new Date(b.createdAt)- new Date(a.createdAt))
        if (sortedAllPosts.length===0) {
            return <div className={style.noResults}>No results found. Please try another search word.</div>
        }
        return  sortedAllPosts.map((post)=>{
            if (post.hasOwnProperty("caption")) {
                return <MainInspoPost key={uuid()} inspo={post}/>
            }
            else {
                //if (post.description.search(regex)!==-1 || post.title.search(regex)!==-1) {
                    return <MainTradePost key={uuid()} trade={post}/>
                //}
                //return <div></div>
            }
        })
        

    }

    return (
        <div>
            <Head>
                <title>Plantiful-Search</title>
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

