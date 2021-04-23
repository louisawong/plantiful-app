import React from 'react'
import style from './Search.module.scss'

function Search() {
    return (
        <div className={style.searchBarContainer}>
            <span className={`material-icons ${style.icon}`}>search</span>
            <input className={`${style.searchBar} ${style.input}`} type="text" placeholder="Search" required></input>
        </div>
    )
}

export default Search
