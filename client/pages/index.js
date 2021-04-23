import Head from 'next/head'
import UploadForm from '../components/UploadForm/UploadForm'
import style from '../styles/Home.module.scss'
//import Image from 'next/image'
import {useAuth} from '../firebase/auth';
import Link from 'next/link'
import React, {useEffect,useState} from 'react'
import Navigation from '../components/navigation/navigation';

export default function Home() {

  const {user} = useAuth();

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
        {/* <img className={style.logo} src="/images/Plantiful.png"/> */}
        {/* <Image src="/images/Plantiful.png" width={200} height={200} /> */}
        <UploadForm/>
        <h2>{`User ID: ${user ? user.uid : "No user signed in"}`}</h2>
        <div>
          <button disabled={!user}>
            <Link href="/authenticated">
              <a>Authorized Page</a>
            </Link>
          </button>
          <button disabled={user}>
            <Link href="/login">
              <a>Log In</a>
            </Link>
          </button>
        </div>
      </main>
    </div>
  )
}
