import React from 'react'
import style from './navigation.module.scss'
import Link from 'next/link'
import Search from '../Search/Search'
import firebaseClient from '../../firebase/config';
import firebase from "firebase/app"
import {useAuth} from '../../firebase/auth';

function Navigation() {
    firebaseClient();
    const {user} = useAuth();
    
    const logoutHandler = async() => {
        await firebase.auth().signOut();
        window.location.href="/";
    }
    
    const chatHandler = () => {
      console.log("HANDLING")
    }

    return (
        <div className={style.navigation}>
            {user ? 
            <div>
            <div className={style.left}>
                <Link href="/home">
                <img className={style.logo} src="/images/Plantiful.png"/>
                </Link> 
                <Link href="/home">
                <div className={style.container_nav}>
                    <div className={style.home}>Home</div>
                </div>
                </Link>
                <Link href="/trades">
                <div className={style.container_nav}>
                    <div className={style.trades}>Trades</div>
                </div>
                </Link>
            </div>
            <Search/>
            <div className={style.right}>
                <div className={style.container_nav2} onClick={chatHandler}>
                    <span className={`material-icons ${style.icon}`}>question_answer</span>
                </div>
                <Link href="/profile">
                <div className={style.container_nav2}>
                    <span className={`material-icons ${style.icon}`}>account_circle</span>
                </div>
                </Link>
                <div className={style.container_nav2} onClick={logoutHandler}>
                    <span className={`material-icons ${style.icon}`}>logout</span>
                </div>
            </div>
            </div>
             : 
             <img className={style.logo} src="/images/Plantiful.png"/>
             }
        </div>
    )
}

export default Navigation
