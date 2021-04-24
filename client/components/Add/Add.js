import React from 'react'
import style from './Add.module.scss'
import Link from 'next/link'

function Add() {
    return (
        <div className={style.wrapper}>
        <Link href="/create-trade">
        <div className={style.container}>
            <span className={`material-icons ${style.icon}`}>sell</span>
        </div>
        </Link>
        <Link href="/create-inspo">
        <div className={style.container}>
          <span className={`material-icons ${style.icon}`}>auto_awesome</span>
        </div>
        </Link>
        </div>
    )
}

export default Add
