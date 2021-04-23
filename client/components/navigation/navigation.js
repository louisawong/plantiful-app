import React from 'react'
import style from './navigation.module.scss'
import Link from 'next/link'
import Search from '../Search/Search'

function Navigation() {

    const chatHandler = () => {

    }

    const profileHandler = () => {

    }
    
    const logoutHandler = () => {

    }

    return (
        <div className={style.navigation}>
            <div className={style.left}>
                <img className={style.logo} src="/images/Plantiful.png"/>
                <div className={style.container_nav}>
                    <div className={style.home}>Home</div>
                </div>
                <div className={style.container_nav}>
                    <div className={style.trades}>Trades</div>
                </div>
            </div>
            <Search/>
            <div className={style.right}>
                <div className={style.container_nav2} onClick={chatHandler}>
                    <span className={`material-icons ${style.icon}`}>question_answer</span>
                </div>
                <div className={style.container_nav2} onClick={profileHandler}>
                    <span className={`material-icons ${style.icon}`}>account_circle</span>
                </div>
                <div className={style.container_nav2} onClick={logoutHandler}>
                    <span className={`material-icons ${style.icon}`}>logout</span>
                </div>
            </div>
        </div>
    )
}

export default Navigation
