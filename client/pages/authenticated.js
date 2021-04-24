import React from 'react';
import Head from 'next/head'
import nookies from 'nookies';
import {verifyIdToken} from '../firebase/firebaseAdmin';
import firebaseClient from '../firebase/config';
import firebase from "firebase/app"

function authenticated({session}) {
    firebaseClient();

    async function signoutHandler () {
        await firebase.auth().signOut();
        window.location.href="/";
    }

    if (session) {
        return (
            <div>
                Authenticated
                <p>{session}</p>
                <button onClick={signoutHandler}>Log Out</button>
            </div>
        )
    }
    else {
        return <div>Loading</div>
    }
}

export async function getServerSideProps(context){
    try {
        const cookies = nookies.get(context);
        const token = await verifyIdToken(cookies.token);
        const {uid,email} = token;
        return {
            props: {session: `Your email is ${email} and uid is ${uid}`}
        };
    } catch (err) {
        context.res.writeHead(302, {location: "/login"})
        context.res.end();
        return {props:[]};
    }
}

export default authenticated
