import React, {useState} from 'react'
import style from './Search.module.scss'
import { Router, useRouter } from 'next/router'

function Search() {
    
    const [search, setSearch] = useState("")
    const router = useRouter();

    const submitHandler = (e) => {
        e.preventDefault();
        router.push(`/search/${search}`)
        setSearch("")
    }

    return (
        <div className={style.searchBarContainer}>
            <span className={`material-icons ${style.icon}`}>search</span>
            <form onSubmit={submitHandler} className={style.form}>
            <input 
                className={`${style.searchBar} ${style.input}`} 
                type="text" 
                placeholder="Search" 
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
                required></input>
            </form>
        </div>
    )
}

export default Search
