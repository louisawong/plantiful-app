import React from 'react'
import MainTradePost from '../MainTradePost/MainTradePost'
import style from './MainTradeList.module.scss'
import uuid from 'react-uuid'

function TradePostList({tradeList}) {

    const showPosts = (tradeList) => {
        return tradeList.map((trade)=><MainTradePost key={uuid()} trade={trade}/>)
    }

    return (
            <div className={`${style.mainboard__container}`}>
                {showPosts(tradeList)}
            </div>
    )
}

export default TradePostList
