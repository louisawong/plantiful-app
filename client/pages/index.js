import Head from 'next/head'
import UploadForm from '../components/UploadForm/UploadForm'
import style from '../styles/Home.module.scss'
//import Image from 'next/image'
import {useAuth} from '../firebase/auth';
import Link from 'next/link'
import React, {useEffect,useState} from 'react'

export default function Home() {

  const {user} = useAuth();

  return (
    <div className={style.container}>
      <Head>
        <title>Plantiful</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <img className={style.logo} src="/images/Plantiful.png"/>
        {/* <Image src="/images/Plantiful.png" width={200} height={200} /> */}
        Welcome To Home Page
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
