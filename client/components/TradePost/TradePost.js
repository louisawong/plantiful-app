import React from 'react'
import style from './TradePost.module.scss'

export default function TradePost({trade}) {
    return (
        <div className={style.card}>
            <div className={style.tradeType}>{trade.trade ? "Trade" : "Selling"}</div>
            <div className={style.tradePreference}>{trade.trade ? `Looking for ${trade.tradePreference}` : `$${trade.minOffer}`}</div>
            
            <img className={style.postImage} src={trade.images[0]}></img>
            <div className={style.title}>{trade.title}</div>
            <div className={style.location}>{`${trade.city}, ${trade.country}`}</div>
            <div className={style.createdBy}>
                {`Created by `}
                <span className={style.username}>{`@${trade.username}`}</span>
            </div>
        </div>
    )
}
