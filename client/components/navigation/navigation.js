import React from 'react'
import style from './navigation.module.scss'

function Navigation() {
    return (
        <div className={style.navigation}>
                <div className={style.left}>
                    <img className={style.logo} src="/images/Plantiful.png"/>
                    <div className={style.container_nav}>
                        <div className={style.home}>Home</div>
                    </div>
                    <div className={style.container_nav2}>
                        <div className={style.trades}>Trades</div>
                    </div>
                </div>
                THIS IS RIGHT SIDE
        </div>
    )
}

export default Navigation
