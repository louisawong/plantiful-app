import React, {useState} from 'react';
import Head from 'next/head'
import firebaseClient from '../firebase/config';
import firebase from 'firebase/app';
import "firebase/auth"
import style from '../styles/Login.module.scss'

function login() {
    firebaseClient();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")

    const createHandler = async () => {
        //e.preventDefault();
        console.log("HANDLING CREATE")
        await firebase.auth().createUserWithEmailAndPassword(email,password)
        .then(() => {
            console.log("REDIRECTING")
            window.location.href = "/"
        })
        .catch((err) => {
            const message = err.message;
            alert(message)
        })
    }

    const loginHandler = async (e) => {
        e.preventDefault();
        await firebase.auth().signInWithEmailAndPassword(email,password)
        .then(() => {
            window.location.href = "/"
        })
        .catch((err) => {
            const message = err.message;
            alert(message)
        })
    }

    return (
        <div>
            <Head>
                <title>Plantiful-Login</title>
                <link rel="icon" href="/favicon.ico" />
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
                  rel="stylesheet"></link>
                <link rel="preconnect" href="https://fonts.gstatic.com"/>
                <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"/>
            </Head>
        <div className={style.container}>
            <h1>Login</h1>
            <form>
                <div className={style.email}>
                    <label>Email:</label>
                    <input required type='email' value={email} onChange={(e)=>setEmail(e.target.value)}></input>
                </div>
                <div className={style.password}>
                    <label>Password:</label>
                    <input required type='password' value={password} onChange={(e)=>setPassword(e.target.value)}></input>
                </div>
                <button type="button" disabled={email===""||password===""}onClick={createHandler}>
                    Create Account
                </button>
                <button disabled={email===""||password===""}onClick={loginHandler}>
                    Login
                </button>
            </form>
        </div>
        </div>
    )
}

export default login
