import React,{useEffect,useState} from 'react';
import style from '../styles/Profile.module.scss';
import Head from 'next/head';
import {useDispatch, useSelector} from 'react-redux';
import {loadUser, logoutUser} from '../redux/user';
import {useAuth} from '../firebase/auth';


function profile() {
    const dispatch = useDispatch();
    const userInfo = useSelector((state)=> state.user)
    const {user} = useAuth(); // replace with line ten
    const [currentUser, setCurrentUser] = useState(null);


    const load = async (uid) => {
      fetch('/api/users/'+uid)
      .then ((res)=>res.json())
      .then((data)=> {
        console.log(data)
        setCurrentUser(data);
      })
      .catch ((err) => console.log(err))
    };

    useEffect (()=> {
      //console.log("UID: ",user?.uid)
      if (!user) {
          dispatch(logoutUser());
          window.location.href="/login";
      } else if (!userInfo.uid || user.uid !== userInfo.uid) {
          dispatch(logoutUser());
          //load(user.uid)
          dispatch(loadUser({uid:user.uid}));
          //dispatch(loadUser({uid:user.uid}));
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
                    <img className={style.profilePic} src="https://firebasestorage.googleapis.com/v0/b/plantiful-ec98d.appspot.com/o/addProfile.png?alt=media&token=4f421773-3a38-484f-8811-c545e2a45f05"></img>
                    {/* <div className={style.profileOverlay}>
                        <h2>+</h2>
                        <h1>Add a profile photo</h1>
                    </div> */}
                </div>
            }
            <h1>{userInfo.username}</h1>
            <h1>{userInfo.uid}</h1>
            <h1>{userInfo.firsName}</h1>
        </div>
    )
}

export default profile
