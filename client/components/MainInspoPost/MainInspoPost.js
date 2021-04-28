import React,{useState,useEffect} from 'react'
import style from './MainInspoPost.module.scss'
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import { Router, useRouter } from 'next/router'
import axios from 'axios'
import Link from 'next/link'


export default function InspoPost({inspo}) {
    const [active, setActive] = useState(false);
    const [side,setSide] = useState("right");
    const [x,setX] = useState(window.innerWidth/2);
    const [y,setY] = useState(window.innerHeight/2);

    const [ownerInfo,setOwnerInfo] = useState({})
    const dispatch = useDispatch();

    useEffect(()=>{
        return axios.get('/api/users/'+inspo.uid)
        .then((res)=>setOwnerInfo(res.data))
        .catch((err)=>console.error(err))
    },[])

    const clickHandler = (e) => {
        setActive(!active);
        let windowSize = window.innerWidth/2;
        let mouseSide = e.clientX;
        setX(e.clientX);
        setY(e.clientY+window.pageYOffset)
        setSide((mouseSide>windowSize ? "right" : "left"))
        setTimeout(()=>setActive(false),10000)
    }

    return (
        <div className={style.wrapper} onClick={clickHandler}>
        <div className={style.card}>
            <img className={style.postImage} src={(inspo.images ? inspo.images[0]: inspo.images)}></img>
            <div className={style.title}>{inspo.title}</div>
            <div className={style.location}>{`${inspo.city}, ${inspo.country}`}</div>
            <div className={style.createdBy}>
                {`Created by `}
                <Link href={`/profile/${inspo.username}`}>
                <span className={style.username}>{`@${inspo.username}`}</span>
                </Link>
                {` on `}
                <span className={style.date}>{`${moment(inspo.createdAt).format('ll')}`}</span>
            </div>
        </div>
        {active ? 
        <div className={`${style.moreInfo} ${style[side]}`} style={{left:x, top:y}}>
            <div className={style.title2}>{inspo.title}</div>
            <div className={style.description}>{inspo.caption}</div>
            <div className={style.imagesContainer}>
                {inspo.images[1] && <img className={style.detailImage} src={inspo.images[1]}/>}
                {inspo.images[2] && <img className={style.detailImage} src={inspo.images[2]}/>}
                {inspo.images[3] && <img className={style.detailImage} src={inspo.images[3]}/>}
            </div>
            <Link href={`/profile/${ownerInfo.username}`} >
            <div className={style.buttonContainer}>
            <a className={style.button}>Visit Profile</a>
            </div>
            </Link>
        </div>
        : 
        <div></div>
        }
     </div>
    )
}