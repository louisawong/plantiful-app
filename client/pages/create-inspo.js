import React, {useEffect,useState} from 'react'
import Head from 'next/head'
import style from '../styles/CreateInspo.module.scss'
import {useDispatch, useSelector} from 'react-redux';
import {useAuth} from '../firebase/auth';
import {addInspo, fetchUserById, logoutUser} from '../redux/user';
import { Router, useRouter } from 'next/router'
import ProgressBar from '../components/ProgressBar/ProgressBar'
import uuid from 'react-uuid'

function createInspo() {
    const dispatch = useDispatch();
    const router = useRouter();
    const userInfo = useSelector((state)=> state.user)
    const {user} = useAuth();

    //state for images

    const [file1, setFile1] = useState("");
    const [file2, setFile2] = useState("");
    const [file3, setFile3] = useState("");
    const [file4, setFile4] = useState("");
    const [url1, setUrl1] = useState("");
    const [url2, setUrl2] = useState("");
    const [url3, setUrl3] = useState("");
    const [url4, setUrl4] = useState("");
    const [imageArray, setImageArray] = useState([]);
    const [title, setTitle] = useState("");
    const [caption, setCaption] = useState("");
    //const [location, setLocation] = useState([]);
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("")
    const [currentLocation, setCurrentLocation] = useState([]);

    //state for form
    useEffect (()=> {
        const session = localStorage.getItem("uid")
        console.log("Local storage get:", session)
        if (!session) {
            dispatch(logoutUser());
            router.push("/login")
        }
        else {
          dispatch(fetchUserById(session))
        }
      },[])

    //handle currentLocation
    const handleCurrentLocation = (e) => {
      fetch("/api/geolocation")
      .then(res => res.json())
      .then((data)=>{
        setCurrentLocation(data.ll);
        setCity(data.city);
        setCountry(data.country)
      })
      .catch((err)=>{
          console.log(err)
      })
    }
    //handle submit button
    const handleSubmit = (e) => {
        let inspoId = uuid();
        let imagesArr = [url1];
        if(url2) imagesArr.push(url2);
        if(url3) imagesArr.push(url3);
        if(url4) imagesArr.push(url4);
        dispatch(addInspo({
                inspoId:inspoId,
                uid: userInfo.uid,
                username:userInfo.username,
                title,
                caption,
                images: imagesArr,
                location:currentLocation,
                city,
                country,
        }));
        router.push("/profile")
    }

    // types allowed for upload;
    const types = ['image/png', 'image/jpeg'];

    const handleChange1 = (e) => {
        let selected = e.target.files[0];
        if (selected && types.includes(selected.type)) {
          setFile1(selected);
        } else {
            setFile1(null);
            alert('Please select an image file (png or jpg)');
        }
    }
    const handleChange2 = (e) => {
        let selected = e.target.files[0];
        if (!url1) {
            alert("Please upload a main image first.")
        }
        else if (selected && types.includes(selected.type)) {
          setFile2(selected);
        } else {
            setFile2(null);
            alert('Please select an image file (png or jpg)');
        }
    }
    const handleChange3 = (e) => {
        let selected = e.target.files[0];
        if (!url1) {
            alert("Please upload a main image first.")
        }
        else if (selected && types.includes(selected.type)) {
          setFile3(selected);
        } else {
            setFile3(null);
            alert('Please select an image file (png or jpg)');
        }
    }
    const handleChange4 = (e) => {
        let selected = e.target.files[0];
        if (!url1) {
            alert("Please upload a main image first.")
        }
        else if (selected && types.includes(selected.type)) {
          setFile4(selected);
        } else {
            setFile4(null);
            alert('Please select an image file (png or jpg)');
        }
    }

    return (
        <div>
            <Head>
                <title>Plantiful-Create Inspo</title>
                <link rel="icon" href="/favicon.ico" />
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
                  rel="stylesheet"></link>
                <link rel="preconnect" href="https://fonts.gstatic.com"/>
                <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"/>
            </Head>
            <main className={style.container}>
             <div className={style.wrapper}>
                <div className={style.left}>
                    <div className={style.image1}>
                        {!url1 ? 
                        <label className={style.label1}>
                            <img className={style.label1} src="https://firebasestorage.googleapis.com/v0/b/plantiful-ec98d.appspot.com/o/inspoaddimage.png?alt=media&token=c40278ff-41ea-46b9-898c-99251d5040cc"/>
                            <input className={style.input} type="file" onChange={handleChange1}/>             
                        </label>
                        : 
                        <div>
                            {url1 && <img className={style.label1} src={url1}></img>}
                        </div>
                        }   
                        {!url1 && file1 && <ProgressBar file={file1} setUrl={setUrl1} />}
                    </div>
                    <div className={style.bottomImages}>
                        <div className={style.image2}>
                            {!url2 ? 
                            <label className={style.label2}>
                                <img className={style.labelImage} src="https://firebasestorage.googleapis.com/v0/b/plantiful-ec98d.appspot.com/o/inspoadd.png?alt=media&token=e08eee4f-f0ff-4b7c-a0e3-9e0773a952cf"/>
                                <input className={style.input} type="file" onChange={handleChange2}/>       
                            </label>
                            : 
                            <div>
                                {url2 && <img className={style.labelImage} src={url2}></img>}
                            </div> }
                            {!url2 && url1 && file2 && <ProgressBar file={file2} setUrl={setUrl2} />}
                        </div>
                        <div className={style.image2}>
                            {!url3 ? 
                            <label className={style.label2}>
                                <img className={style.labelImage} src="https://firebasestorage.googleapis.com/v0/b/plantiful-ec98d.appspot.com/o/inspoadd.png?alt=media&token=e08eee4f-f0ff-4b7c-a0e3-9e0773a952cf"/>
                                <input className={style.input} type="file" onChange={handleChange3}/>            
                            </label>
                            : 
                            <div>
                                {url3 && <img className={style.labelImage} src={url3}></img>}
                            </div> }
                            {!url3 && url1 && file3 && <ProgressBar file={file3} setUrl={setUrl3} />}
                        </div>
                        <div className={style.image2}>
                            {!url4 ? 
                            <label className={style.label2}>
                                <img className={style.labelImage} src="https://firebasestorage.googleapis.com/v0/b/plantiful-ec98d.appspot.com/o/inspoadd.png?alt=media&token=e08eee4f-f0ff-4b7c-a0e3-9e0773a952cf"/>
                                <input className={style.input} type="file" onChange={handleChange4}/>             
                            </label>
                            : 
                            <div>
                                {url4 && <img className={style.labelImage} src={url4}></img>}
                            </div> }
                            {!url4 && url1 && file4 && <ProgressBar file={file4} setUrl={setUrl4} />}
                        </div>
                    </div>
                </div>
                <div className={style.right}>
                    <h1 className={style.header}>Create Your Inspo</h1>
                    <form className={style.createForm} autoComplete="off">
                        <input className={style.formInput} 
                            type="text" 
                            placeholder="Title" 
                            onChange={(e)=>setTitle(e.target.value)}
                            value={title}
                            required/>
                        <textarea className={style.formInput} 
                            placeholder="Caption your plants"
                            onChange={(e)=>setCaption(e.target.value)}
                            value={caption}
                        ></textarea>
                        <div className={style.locationField}>
                            <input className={style.formLocation} 
                                type="text" 
                                placeholder="Location (city)" 
                                value = {city? `${city}, ${country}`: ''}
                                required
                                disabled={true}/>
                            <div className={style.currentLocation} 
                                onClick={handleCurrentLocation}>
                                    Use Current Location
                            </div>
                        </div>
                        <button 
                            className={style.buttonSubmit}
                            disabled={title===""||city===""|| url1===""}
                            onClick={handleSubmit}
                            type="button">Create Inspiration</button>
                    </form>
                </div>
             </div>
            </main>
        </div>
    )
}

export default createInspo
