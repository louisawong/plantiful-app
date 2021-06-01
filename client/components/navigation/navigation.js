import React, {useState, useEffect} from 'react'
import style from './navigation.module.scss'
import Link from 'next/link'
import Search from '../Search/Search'
import firebaseClient from '../../firebase/config';
import firebase from "firebase/app"
import {useAuth} from '../../firebase/auth';
import { Router, useRouter } from 'next/router'
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {logoutUser} from '../..//redux/user';

function Navigation() {
    firebaseClient();
    const router = useRouter();
    const dispatch = useDispatch();
    //const {user} = useAuth();
    const [session, setSession] = useState(false);
    const [clicked, setClicked] = useState(false);
    function handleClicked () {setClicked(!clicked); console.log("CLICKED", clicked)}
    const closeMobileMenu = () => setClicked(false);

    useEffect (()=> {
        const session = localStorage.getItem("uid")
        //console.log("Local storage get:", session)
        if (!session) {
            setSession(false);
        }
        else {
          setSession(true);
        }
      },[router])
    
    const logoutHandler = async() => {
        await firebase.auth().signOut();
        dispatch(logoutUser());
        router.push("/");
    }

    function showMobileView() {
        if (clicked) {
            return (
                <div className={style.mobileMenu_popup}>
                    <Link href="/home" onClick={closeMobileMenu}>Home</Link>
                </div>
            )
        } else {
            return <div></div>
        }
    }

    return (
        <div>
        {!session? 
        //Show this nav if no user
        <div className={`${style.navigation} ${style.navigation_signout}`}>
            <div className={style.left}>
                <Link href="/">
                <img className={style.logo} src="/images/Plantiful.png"/>
                </Link>
            </div>
            <div className={style.rightNoUser}>
                <Link href="/login">
                    <div className={style.container_nav3}>
                         <div className={style.buttons}>Log In</div>
                    </div>
                </Link>
                <Link href="/signup">
                    <div className={style.container_nav4}>
                        <div className={style.buttons}>Sign Up</div>
                    </div>
                </Link>
            </div>
        </div>
        :
        //Show this nav if user is logged in
        <>
        <div className={style.navigation}>
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
        <div className={style.mobileMenu}> 
            <div className={style.mobileMenu_wrapper}> 
                <Link href="/home">
                    <img className={style.logoMobile} src="/images/Plantiful_icon.png"/>
                </Link> 
                <Search className={style.searchBar}/>
                <div onClick={handleClicked} className={`material-icons ${style.icon_menu}`}>menu</div>
            </div>
            {clicked ? 
            <div className={style.mobileMenu_popup}>
                <div onClick={closeMobileMenu}>
                    <Link href="/home">Home</Link>
                </div>
                <div onClick={closeMobileMenu}>
                    <Link href="/trades">Trades</Link>
                </div>
                <div onClick={closeMobileMenu}>
                    <Link href="/profile">My Profile</Link>
                </div>
                <div onClick={closeMobileMenu} onClick={logoutHandler}>Logout</div>
            </div>
            :
            <></>
            }
        </div>
        </>
        }
        </div>
    )
}

export default Navigation
