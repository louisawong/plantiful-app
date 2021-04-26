import React, {useEffect,useState} from 'react'
import style from './Add.module.scss'
import Link from 'next/link'
import {useRouter } from 'next/router'
import {logoutUser, fetchUserById} from '../../redux/user';
import {useDispatch, useSelector} from 'react-redux';

function Add() {

  const dispatch = useDispatch();
  const router = useRouter();

  const [active, setActive] = useState(false)

  useEffect (()=> {
    const session = localStorage.getItem("uid")
    console.log("Local storage get:", session)
    if (!session) {
        setActive(false)
        dispatch(logoutUser());
    }
    else {
    setActive(true)
      dispatch(fetchUserById(session))
    }
  },[router])

    return (
        <div>
        {active ?
            <div className={style.wrapper}>
            <Link href="/create-trade">
            <div className={style.container}>
                <div className={`material-icons ${style.icon}`}>sell
                </div>
                <div className={style.appear}>Create Trade</div>
                
            </div>
            </Link>
            <Link href="/create-inspo">
            <div className={style.container}>
            <div className={`material-icons ${style.icon}`}>auto_awesome</div>
            <div className={style.appear2}>Create Inspo</div>
            </div>
            </Link>
            </div>
            :
            <div></div>
        }
        </div>
    )
}

export default Add
