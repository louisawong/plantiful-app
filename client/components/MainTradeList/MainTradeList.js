import React from 'react'
import MainTradePost from '../MainTradePost/MainTradePost'
import style from './MainTradeList.module.scss'
import uuid from 'react-uuid'

function TradePostList({tradeList, none, city}) {

    const showPosts = (tradeList) => {
        return tradeList?.map((trade)=><MainTradePost key={uuid()} trade={trade}/>)
    }

    return (
        <div>
            {none? <div className={style.announcement}>No trades within 10kms of {city}.</div>:<div></div>}
            <div className={`${style.mainboard__container}`}>
                {showPosts(tradeList)}
            </div>
        </div>
    )
}

export default TradePostList
