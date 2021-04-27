import React,{useState,useEffect} from 'react'
import style from './MainTradePost.module.scss'
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import { Router, useRouter } from 'next/router'
import axios from 'axios'


export default function TradePost({trade}) {
    const [active, setActive] = useState(false);
    const [side,setSide] = useState("right");
    const [x,setX] = useState(window.innerWidth/2);
    const [y,setY] = useState(window.innerHeight/2);

    const [ownerInfo,setOwnerInfo] = useState(null)
    const dispatch = useDispatch();

    useEffect(()=>{
        return axios.get('api/users/'+trade.uid)
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
        // axios.get('api/users/'+trade.uid)
        // .then((res)=>setOwnerInfo(res.data))
        // .catch((err)=>console.error(err))
    }

    return (
        <div className={style.wrapper} onClick={clickHandler}>
        <div className={style.card}>
            <div className={style.tradeType}>{trade.trade ? "Trade" : "Selling"}</div>
            <div className={style.tradePreference}>{trade.trade ? `Looking for ${trade.tradePreference}` : `$${trade.minOffer}`}</div>
            
            <img className={style.postImage} src={(trade.images ? trade.images[0]: trade.images)}></img>
            <div className={style.title}>{trade.title}</div>
            <div className={style.location}>{`${trade.city}, ${trade.country}`}</div>
            <div className={style.createdBy}>
                {`Created by `}
                <span className={style.username}>{`@${trade.username}`}</span>
                {` on `}
                <span className={style.date}>{`${moment(trade.createdAt).format('ll')}`}</span>
            </div>
        </div>
        {active ? 
        <div className={`${style.moreInfo} ${style[side]}`} style={{left:x, top:y}}>
            <div className={style.title2}>{trade.title}</div>
            <div className={style.description}>{trade.description}</div>
            <div className={style.imagesContainer}>
                {trade.images[1] && <img className={style.detailImage} src={trade.images[1]}/>}
                {trade.images[2] && <img className={style.detailImage} src={trade.images[2]}/>}
                {trade.images[3] && <img className={style.detailImage} src={trade.images[3]}/>}
            </div>
            <div className={style.buttonContainer}>
            <a className={style.email} href={`mailto:${ownerInfo.email}?subject=${trade.title}`} target="_blank" rel="noopener noreferrer">{`Email ${ownerInfo.firstName}`}</a>
                {/* <button onClick={emailHandler}className={style.email} type="button">Email {ownerInfo.firstName}</button> */}
            </div>
        </div>
        : 
        <div></div>
        }
     </div>
    )
}