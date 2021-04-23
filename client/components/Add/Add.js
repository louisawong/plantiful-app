import React from 'react'
import style from './Add.module.scss'

function Add() {
    return (
        <div className={style.wrapper}>
        <div className={style.container}>
            <span className={`material-icons ${style.icon}`}>sell</span>
        </div>
        <div className={style.container}>
          <span className={`material-icons ${style.icon}`}>auto_awesome</span>
        </div>
        </div>
    )
}

export default Add
