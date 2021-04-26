import React,{useEffect,useState} from 'react';
import style from '../styles/Profile.module.scss';
import Head from 'next/head';
import {useDispatch, useSelector} from 'react-redux';
import {loadUser, logoutUser, fetchUserById} from '../redux/user';
import {useAuth} from '../firebase/auth';
import { Router, useRouter } from 'next/router'
import ProgressBar from '../components/ProgressBar/ProgressBar';


function profile() {
    const dispatch = useDispatch();
    const router = useRouter();
    const userInfo = useSelector((state)=> state.user)
    //const {user} = useAuth(); 

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
    },[])

    const handleChangeProfile = () => {

    }

    return (
        <div>
            <Head>
                <title>Plantiful-Profile</title>
                <link rel="icon" href="/favicon.ico" />
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
                  rel="stylesheet"></link>
                <link rel="preconnect" href="https://fonts.gstatic.com"/>
                <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"/>
            </Head>
            <main>
                <div className={style.header}>
                    {userInfo.profile ? 
                    <img className={style.profilePic} src={userInfo.profile}/>
                    :
                    <img className={style.profilePic} src="https://firebasestorage.googleapis.com/v0/b/plantiful-ec98d.appspot.com/o/addProfile.png?alt=media&token=d07d6e93-bf85-4dc9-8d7b-79ade4dc13cc"></img>
                    }
                    <div className={style.editProfile} onClick={handleChangeProfile}>Change Your Profile Photo</div>
                    <div className={style.username}>{userInfo.username}</div>
                    
                </div>
                <div className={style.tabs}></div>
                <div className={style.posts}></div>
            </main>
        </div>
    )
}

export default profile
