import Head from 'next/head'
import UploadForm from '../components/UploadForm/UploadForm'
import style from '../styles/Root.module.scss'
//import Image from 'next/image'
import {useAuth} from '../firebase/auth';
import Link from 'next/link'
import {useDispatch, useSelector} from 'react-redux';
import {loadUser, logoutUser, fetchUserById} from '../redux/user';
import React, {useEffect,useState} from 'react'
import { Router, useRouter } from 'next/router'
import Navigation from '../components/navigation/navigation';

export default function Home() {

  //const {user} = useAuth();
  const dispatch = useDispatch();
    const router = useRouter();

  useEffect (()=> {
    const session = localStorage.getItem("uid")
    console.log("Local storage get:", session)
    if (!session) {
        dispatch(logoutUser());
    }
    else {
      dispatch(fetchUserById(session))
      router.push("/home")
    }
  },[])

  return (
    <div className={style.container}>
      <Head>
        <title>Plantiful</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"></link>
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"/>
      </Head>
      <main>
        <div className={style.hero}>
          <img className={style.heroImage} src="https://firebasestorage.googleapis.com/v0/b/plantiful-ec98d.appspot.com/o/websiteSources%2Fhero-background.jpg?alt=media&token=03720e4d-8341-40eb-aa36-8b3ee74ae980"></img>
          <div className={style.overlay}></div>
          <div className={style.header}>Plant Trading Made Easy
          <p className={`${style.tagline} ${style.firstTagline}`}>
            An app designed for plant enthusiasts.
          </p>
          <p className={style.tagline}>
            To inspire you & to discover the plants around you.
          </p>
          <p className={`${style.tagline} ${style.lastTagline}`}>
            Created for the love of plants!
          </p>
          </div>
        </div>
      </main>
    </div>
  )
}
