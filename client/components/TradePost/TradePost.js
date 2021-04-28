import React,{useState,useEffect} from 'react'
import style from './TradePost.module.scss'
import moment from 'moment';
import {deleteTrade} from '../../redux/user'
import {useDispatch, useSelector} from 'react-redux';
import { Router, useRouter } from 'next/router'
import axios from 'axios'
import trades from '../../redux/trades';


export default function TradePost({trade, belongs}) {

    const [active, setActive] = useState(false);
    const [side,setSide] = useState("right");
    const [x,setX] = useState(window.innerWidth/2);
    const [y,setY] = useState(window.innerHeight/2);

    const [ownerInfo,setOwnerInfo] = useState({})
    const userInfo = useSelector((state)=> state.user)
    const dispatch = useDispatch();

    const clickHandler = (e) => {
        setActive(!active);
        let windowSize = window.innerWidth/2;
        let mouseSide = e.clientX;
        setX(e.clientX);
        setY(e.clientY+window.pageYOffset)
        setSide((mouseSide>windowSize ? "right" : "left"))
        
        setTimeout(()=>setActive(false),9000)
    }
    const deleteHandler = ()=> {
        const res = confirm (`Are you sure you want to delete "${trade.title}"?`)
        if (res) {
            dispatch(deleteTrade({
                uid: trade.uid,
                tradeId:trade.tradeId,
            }))
        } 
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
            {userInfo.username===trade.username &&
            <div className={style.buttonContainer}>
                <button onClick={deleteHandler}className={style.delete} type="button">Delete Trade</button>
            </div>
            }
        </div>
        : 
        <div></div>
        }
     </div>
    )
}
