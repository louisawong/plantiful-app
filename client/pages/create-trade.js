import React, {useEffect,useState} from 'react'
import Head from 'next/head'
import style from '../styles/CreateTrade.module.scss'
import {useDispatch, useSelector} from 'react-redux';
import {useAuth} from '../firebase/auth';
import {fetchUserById, logoutUser} from '../redux/user';
import { Router, useRouter } from 'next/router'
import ProgressBar from '../components/ProgressBar/ProgressBar'

function createtrade() {
    const dispatch = useDispatch();
    const router = useRouter();
    const userInfo = useSelector((state)=> state.user)
    const {user} = useAuth();

    //state for images
    const [file1, setFile1] = useState(null);
    const [file2, setFile2] = useState(null);
    const [file3, setFile3] = useState(null);
    const [file4, setFile4] = useState(null);
    const [url1, setUrl1] = useState("");
    const [url2, setUrl2] = useState("");
    const [url3, setUrl3] = useState("");
    const [url4, setUrl4] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState([]);
    const [tradeType, setTradeType] = useState("") //sell or trade
    const [price, setPrice] = useState(0);
    const [tradePreference,setTradePreference] = useState("")

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
                    <div className={style.image1}>
                        {!url1 ? 
                        <label className={style.label1}>
                            <img className={style.label1} src="https://firebasestorage.googleapis.com/v0/b/plantiful-ec98d.appspot.com/o/addImage.png?alt=media&token=c20e10da-e530-4edd-be72-ff2e3998cc99"/>
                            <input className={style.input} type="file" onChange={handleChange1}/>             
                        </label>
                        : 
                        <div>
                            {url1 && <img className={style.label1} src={url1}></img>}
                        </div>
                        }          
                        {!url1 && file1 && <ProgressBar file={file1} setUrl={setUrl1}/>}
                    </div>
                    <div className={style.bottomImages}>
                        <div className={style.image2}>
                            {!url2 ? 
                            <label className={style.label2}>
                                <img className={style.label2} src="https://firebasestorage.googleapis.com/v0/b/plantiful-ec98d.appspot.com/o/addProfile.png?alt=media&token=d07d6e93-bf85-4dc9-8d7b-79ade4dc13cc"/>
                                <input className={style.input} type="file" onChange={handleChange2}/>       
                            </label>
                            : 
                            <div>
                                {url2 && <img className={style.label2} src={url2}></img>}
                            </div> }
                            {!url2 && url1 && file2 && <ProgressBar file={file2} setUrl={setUrl2}/>}
                        </div>
                        <div className={style.image2}>
                            {!url3 ? 
                            <label className={style.label2}>
                                <img className={style.label2} src="https://firebasestorage.googleapis.com/v0/b/plantiful-ec98d.appspot.com/o/addProfile.png?alt=media&token=d07d6e93-bf85-4dc9-8d7b-79ade4dc13cc"/>
                                <input className={style.input} type="file" onChange={handleChange3}/>            
                            </label>
                            : 
                            <div>
                                {url3 && <img className={style.label2} src={url3}></img>}
                            </div> }
                            {!url3 && url1 && file3 && <ProgressBar file={file3} setUrl={setUrl3}/>}
                        </div>
                        <div className={style.image2}>
                            {!url4 ? 
                            <label className={style.label2}>
                                <img className={style.label2} src="https://firebasestorage.googleapis.com/v0/b/plantiful-ec98d.appspot.com/o/addProfile.png?alt=media&token=d07d6e93-bf85-4dc9-8d7b-79ade4dc13cc"/>
                                
                                <input className={style.input} type="file" onChange={handleChange4}/>             
                            </label>
                            : 
                            <div>
                                {url4 && <img className={style.label2} src={url4}></img>}
                            </div> }
                            {!url4 && url1 && file4 && <ProgressBar file={file4} setUrl={setUrl4}/>}
                        </div>
                    </div>
                </div>
                <div className={style.right}>
                    <h2>URI: {process.env.MONGO_URI}</h2>
                    <h1 className={style.header}>Create Your Trade</h1>
                    <form className={style.createForm}>
                        <input className={style.formInput} type="text" placeholder="Title" required/>
                        <textarea className={style.formInput} placeholder="Describe your plant trade"></textarea>
                        <div className={style.sell}>
                            {/* <label className={style.formInput}>$</label> */}
                            <input className={style.formInput} min="0" step="0.01" type="number" placeholder="$ 0" required/>
                        </div>
                        <input className={style.formInput} type="text" placeholder="Location (city)" required/>
                    </form>
                </div>
             </div>
            </main>
        </div>
    )
}

export default createtrade
