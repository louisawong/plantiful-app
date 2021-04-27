import React from 'react'
import TradePost from '../TradePost/TradePost'
import style from './TradePostList.module.scss'
import uuid from 'react-uuid'

function TradePostList({tradeList, type}) {

    const showPosts = (tradeList) => {
        return tradeList?.map((trade)=><TradePost key={uuid()} trade={trade}/>)
    }

    return (
        <div className={`${style.container} ${style[type]}`}>
            {showPosts(tradeList)}
        </div>
    )
}

export default TradePostList
