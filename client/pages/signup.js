import React, {useState} from 'react';
import Head from 'next/head'
import firebaseClient from '../firebase/config';
import firebase from 'firebase/app';
import "firebase/auth"
import style from '../styles/Login.module.scss'
import Link from 'next/link'

function signUp() {

    firebaseClient();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName]=useState("")

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
            if (message ==="The email address is already in use by another account."){
                alert(message)
            } else {
                alert(message)
            }
        })
    }

    return (
        <div>
            <Head>
                <title>Plantiful-SignUp</title>
                <link rel="icon" href="/favicon.ico" />
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
                rel="stylesheet"></link>
                <link rel="preconnect" href="https://fonts.gstatic.com"/>
                <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"/>
            </Head>
        <main className={style.container}>
            <div className={style.wrapper}>
                <div className={style.header}>
                    <h1 className={style.h2}>Sign Up</h1>
                    <p className={style.slogan}>To Get Inspired By Plants</p>
                </div>
                <form className={style.signForm}>
                    <div className={style.fields}>
                        <label>Email:</label>
                        <input className={style.input}  required type='email' value={email} onChange={(e)=>setEmail(e.target.value)}></input>
                    </div>
                    <div className={style.fields}>
                        <label>Password:</label>
                        <input className={style.input}  required type='password' value={password} onChange={(e)=>setPassword(e.target.value)}></input>
                    </div>
                    <div className={style.fields}>
                        <label>First Name:</label>
                        <input className={style.input}  required type='text' value={password} onChange={(e)=>setFirstName(e.target.value)}></input>
                    </div>
                    <div className={style.fields}>
                        <label>Last Name:</label>
                        <input className={style.input} type='text' value={password} onChange={(e)=>setLastName(e.target.value)}></input>
                    </div>
                    <button className={style.button}  type="button" disabled={email===""||password===""}onClick={createHandler}>
                        Create Account
                    </button>
                </form>
                <p className={style.redirect}>Already have an account? <Link href="/login"><span className={style.redirectLink}>Login.</span></Link></p>
            </div>
        </main>
        </div>
    )
}

export default signUp
