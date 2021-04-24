import React, {useEffect,useState} from 'react'
import Head from 'next/head'
import style from '../styles/CreateTrade.module.scss'
import {useDispatch, useSelector} from 'react-redux';
import {useAuth} from '../firebase/auth';
import {loadUser, logoutUser} from '../redux/user';
import { Router, useRouter } from 'next/router'
import ProgressBar from '../components/ProgressBar/ProgressBar'

function createtrade() {
    const dispatch = useDispatch();
    const router = useRouter();
    const userInfo = useSelector((state)=> state.user)
    const {user} = useAuth();

    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const [url1, setUrl1] = useState("");
    const [url2, setUrl2] = useState("");
    const [url3, setUrl3] = useState("");
    const [url4, setUrl4] = useState("");
    const [image1, setImage1] = useState("");
    const [image2, setImage2] = useState("");
    const [image3, setImage3] = useState("");
    const [image4, setImage4] = useState("");

    useEffect (()=> {
        console.log("UID: ",user?.uid)
        if (!user) {
            dispatch(logoutUser());
            router.push("/login")
        }
        else {
          fetch('/api/users/'+user.uid)
          .then ((res)=>res.json())
          .then((data)=> {
              dispatch(loadUser(data));
              console.log(data)
          })
          .catch((err)=>console.log("Loading home:", err))
        }
      },[])


    // types allowed for upload;
    const types = ['image/png', 'image/jpeg'];

    const handleChange = (e) => {
        let selected = e.target.files[0];
        if (selected && types.includes(selected.type)) {
          setFile(selected);
          setError(null);
        } else {
            setFile(null);
            setError('Please select an image file(png or jpg)');
        }
    }

    return (
        <div>
            <Head>
                <title>Plantiful-Create A Trade</title>
                <link rel="icon" href="/favicon.ico" />
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
                  rel="stylesheet"></link>
                <link rel="preconnect" href="https://fonts.gstatic.com"/>
                <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"/>
            </Head>
            <main className={style.container}>
             <div className={style.wrapper}>
                <div className={style.left}>
                  <label className={style.label}>
                    <input className={style.input} type="file" onChange={handleChange}/>
                    <span className={style.span}>+</span>                
                  </label>
                  <div className={style.output}>
                    { error && <div className={style.error}>{ error }</div>}
                    { file && <div>{ file.name}</div> }
                    {file && <ProgressBar file={file} setUrl={setUrl1}/>}
                    {url1 && <img className={style.upload1}src={url1}></img>}
                 </div>
                </div>
             </div>
            </main>
        </div>
    )
}

export default createtrade
