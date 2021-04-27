import React from 'react'
import MainInspoPost from '../MainInspoPost/MainInspoPost'
import style from './MainInspoList.module.scss'
import uuid from 'react-uuid'

function MainInspoList({inspoList}) {

    const showPosts = (inspoList) => {
        return inspoList.map((inspo)=><MainInspoPost key={uuid()} inspo={inspo}/>)
    }

    return (
            <div className={`${style.mainboard__container}`}>
                {showPosts(inspoList)}
            </div>
    )
}

export default MainInspoList
