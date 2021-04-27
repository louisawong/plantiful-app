import React from 'react'
import InspoPost from '../InspoPost/InspoPost'
import style from './InspoPostList.module.scss'
import uuid from 'react-uuid'

function InspoPostList({inspoList, type}) {

    const showPosts = (inspoList) => {
        return inspoList?.map((inspo)=><InspoPost key={uuid()} inspo={inspo}/>)
    }

    return (
        <div className={`${style.container} ${style[type]}`}>
            {showPosts(inspoList)}
        </div>
    )
}

export default InspoPostList
