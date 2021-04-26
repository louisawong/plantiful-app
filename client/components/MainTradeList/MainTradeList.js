import React from 'react'
import TradePost from '../TradePost/TradePost'
import style from './MainTradeList.module.scss'
import uuid from 'react-uuid'

function TradePostList({tradeList}) {

    const showPosts = (tradeList) => {
        return tradeList.map((trade)=><TradePost key={uuid()} trade={trade}/>)
    }

    return (
            <div className={`${style.mainboard__container}`}>
                {showPosts(tradeList)}
            </div>
    )
}

export default TradePostList
