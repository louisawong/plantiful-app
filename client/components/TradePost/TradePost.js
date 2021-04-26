import React from 'react'
import style from './TradePost.module.scss'

export default function TradePost({trade, uid}) {
    return (
        <div className={style.card}>
            <img className={style.postImage} src={trade.images[0]}></img>
            <div className={style.title}>{trade.title}</div>
            <div className={style.location}>{`${trade.city}, ${trade.country}`}}</div>
        </div>
    )
}
