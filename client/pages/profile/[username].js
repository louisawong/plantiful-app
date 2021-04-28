import React, {useEffect,useState} from 'react'
import Head from 'next/head'
import style from '../../styles/UserProfile.module.scss'
import { useRouter } from 'next/router'
import {useDispatch, useSelector} from 'react-redux';
import {loadUser, logoutUser, fetchUserById} from '../../redux/user';
import axios from 'axios';
import Link from 'next/link'
import TradePostList from '../../components/TradePostList/TradePostList'
import InspoPostList from '../../components/InspoPostList/InspoPostList'

function profile() {
    const dispatch = useDispatch();
    const router = useRouter();
    const userInfo = useSelector((state)=> state.user)
    const {username} = router.query;
    const [profileUser, setProfileUser] = useState(null)
    const [selected,setSelected] = useState("trade")
    
    useEffect (()=> {
        const session = localStorage.getItem("uid")
        //console.log("Local storage get:", session)
        if (!session) {
            dispatch(logoutUser());
            router.push("/login")
        }
        else {
            dispatch(fetchUserById(session))
            axios.get('/api/getUser/'+username)
            .then(res => {
                console.log(res.data);
                setProfileUser(res.data)})
            .catch(err => console.error(err))
        }
    },[router])

    const showPosts = () => {
        if (selected === "trade") {
            if (profileUser?.trades?.length == 0) {
                return (
                    <div className={`${style.announcement} ${style.trades}`}>{profileUser?.firstName} has no trade posts.</div>
                )
            }
            let profileTrades = profileUser?.trades?.slice().sort((a,b) => new Date(b.createdAt)- new Date(a.createdAt))
            return <div className={style.wrapper}><TradePostList type="trade"  tradeList={profileTrades}/></div>
        }
        else {
          if (profileUser?.inspos?.length == 0) {
              return (
                  <div className={`${style.announcement} ${style.inspos}`}>{profileUser?.firstName} has no inspiration posts yet.</div>
              )
          }
          let profileInspos = profileUser?.inspos?.slice().sort((a,b) => new Date(b.createdAt)- new Date(a.createdAt))
          return <div className={style.wrapper}><InspoPostList type="inspo" inspoList={profileInspos}/></div>
      }
      }
    
    return (
        <div>
            <Head>
                <title>Plantiful-{username}</title>
                <link rel="icon" href="/favicon.ico" />
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
                  rel="stylesheet"></link>
                <link rel="preconnect" href="https://fonts.gstatic.com"/>
                <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"/>
            </Head>

            <main className={style.mainWrapper}>
                <div className={style.header}>
                    {userInfo.profile ? 
                    <img className={style.profilePic} src={profileUser?.profile}/>
                    :
                    <img className={style.profilePic} src="https://firebasestorage.googleapis.com/v0/b/plantiful-ec98d.appspot.com/o/MVQLddp5dofO4mxECB85KGcPUjj1.1619417879256.Plantiful_icon.png?alt=media&token=c973879c-722d-43b6-a78f-971be61f55f5"></img>
                    }
                    
                    <div className={style.username}>{`@${profileUser?.username}`}</div>
                    <div className={style.basicInfo}>
                        <span>{`${profileUser?.firstName} ${profileUser?.lastName}`}</span>
                        {profileUser?.city ? <span>{` || ${profileUser?.city}, ${profileUser?.country}`}</span> : <div></div>}
                    </div>
                    <div className={style.description}>{profileUser?.description}</div>

                    <div className={style.buttonContainer}>
                        <a className={style.email} href={`mailto:${profileUser?.email}`} target="_blank" rel="noopener noreferrer">{`Email ${profileUser?.firstName}`}</a>
                    </div>
                    
                </div>
                <div className={style.allPosts}>
                    <div className={style.postTabs}>
                        <div className={style.tradeTab} onClick={()=>setSelected("trade")}>Trades</div>
                        <div className={style.inspoTab} onClick={()=>setSelected("inspo")}>Inspo</div>
                    </div>
                    <div className={style.postList}>
                        {showPosts()}
                    </div>

                </div>
            </main>
        </div>
    )
}

export default profile
