import React,{useState,useEffect} from 'react'
import style from './InspoPost.module.scss'
import moment from 'moment';
import {deleteInspo} from '../../redux/user'
import {useDispatch, useSelector} from 'react-redux';
import { Router, useRouter } from 'next/router'
import Link from 'next/link'
import axios from 'axios'
import trades from '../../redux/trades';


export default function InspoPost({inspo, belongs}) {

    const [active, setActive] = useState(false);
    const [side,setSide] = useState("right");
    const [x,setX] = useState(window.innerWidth/2);
    const [y,setY] = useState(window.innerHeight/2);

    const userInfo = useSelector((state)=> state.user)

    const [ownerInfo,setOwnerInfo] = useState({})
    const dispatch = useDispatch();

    const clickHandler = (e) => {
        setActive(!active);
        let windowSize = window.innerWidth/2;
        let mouseSide = e.clientX;
        setX(e.clientX);
        setY(e.clientY+window.pageYOffset)
        setSide((mouseSide>windowSize ? "right" : "left"))
        
        setTimeout(()=>setActive(false),9000)
        console.log(inspo)
    }
    const deleteHandler = ()=> {
        const res = confirm (`Are you sure you want to delete "${inspo.title}"?`)
        if (res) {
            console.log(inspo)
            dispatch(deleteInspo({
                uid: inspo.uid,
                inspoId:inspo.inspoId,
            }));
        } 
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
            {userInfo.username===inspo.username &&
            <div className={style.buttonContainer}>
                <button onClick={deleteHandler}className={style.delete} type="button">Delete Inspo</button>
            </div>
            }
        </div>
        : 
        <div></div>
        }
     </div>
    )
}
