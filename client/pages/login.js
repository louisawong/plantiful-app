import React, {useState} from 'react';
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
            //window.location.href = "/"
        })
        .catch((err) => {
            const message = err.message;
            alert(message)
        })
    }

    const loginHandler = async (e) => {
        e.preventDefault();
        await firebase.auth().signin(email,password)
        .then(() => {
            window.location.href = "/"
        })
        .catch((err) => {
            const message = err.message;
            alert(message)
        })
    }

    return (
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
    )
}

export default login
