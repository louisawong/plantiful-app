import React,{useEffect,useState} from 'react';
import style from '../styles/Profile.module.scss';
import Head from 'next/head';
import {useDispatch, useSelector} from 'react-redux';
import {loadUser, logoutUser} from '../redux/user';
import {useAuth} from '../firebase/auth';
import { Router, useRouter } from 'next/router'


function profile() {
    const dispatch = useDispatch();
    const router = useRouter();
    const userInfo = useSelector((state)=> state.user)
    const {user} = useAuth(); 

    const addProfileHandler = () => {

    };

    useEffect (()=> {
      console.log("UID: ",user?.uid)
      if (!user) {
          dispatch(logoutUser());
          router.push("/login")
          //window.location.href="/login";
      //} else if (!userInfo.uid || user.uid !== userInfo.uid) {
         // dispatch(logoutUser());
          //load(user.uid)
          //dispatch(loadUser({uid:user.uid}));
          //dispatch(loadUser({uid:user.uid}));
      }
      else {
        fetch('/api/users/'+user.uid)
        .then ((res)=>res.json())
        .then((data)=> {
            dispatch(loadUser(data));
        })
        .catch((err)=>console.log("Loading profile:", err))
      }
    },[])


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
            {userInfo.profile ? 
                <div></div>
            :
                <div className={style.imageContainer}>
                    <img className={style.profilePic} src="https://firebasestorage.googleapis.com/v0/b/plantiful-ec98d.appspot.com/o/addProfile.png?alt=media&token=d07d6e93-bf85-4dc9-8d7b-79ade4dc13cc"></img>
                    <div onClick={addProfileHandler} className={style.addProfile}>Add A Profile Photo</div>
                </div>
            }
            <h1>{userInfo.username}</h1>
            <h1>{userInfo.uid}</h1>
            <h1>{userInfo.firsName}</h1>
        </div>
    )
}

// export async function getServerSideProps(context){
//     try {
//         const cookies = nookies.get(context);
//         const token = await verifyIdToken(cookies.token);
//         const {uid,email} = token;
//         return {
//             props: {session: uid}
//         };
//     } catch (err) {
//         context.res.writeHead(302, {location: "/login"})
//         context.res.end();
//         return {props:[]};
//     }
// }

export default profile
