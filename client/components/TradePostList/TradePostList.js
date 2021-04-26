import React from 'react'
import TradePost from '../TradePost/TradePost'
import style from './TradePostList.module.scss'

function TradePostList({tradeList}) {

    const showPosts = (tradeList) => {
        return tradeList.map((trade)=><TradePost trade={trade}/>)
    }

    return (
        <div className={style.container}>
            {showPosts(tradeList)}
        </div>
    )
}

export default TradePostList
