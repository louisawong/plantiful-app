import React, {useEffect,useState} from 'react'
import Head from 'next/head'
import style from '../styles/EditProfile.module.scss'
import {useDispatch, useSelector} from 'react-redux';
import {fetchUserById, logoutUser} from '../redux/user';
import {useRouter } from 'next/router'
import ProgressBar from '../components/ProgressBar/ProgressBar'
import moment from 'moment'

function editProfile() {
    const dispatch = useDispatch();
    const router = useRouter();
    const userInfo = useSelector((state)=> state.user)
    //const {user} = useAuth();

    //state for images
    const [file, setFile] = useState(null);
    const [url, setUrl] = useState("");
    const [location, setLocation] = useState([]);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [description, setDescription] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");

    //check auth session
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

        router.push("/profile")
    }

    // types allowed for upload;
    const types = ['image/png', 'image/jpeg'];

    const handleEditProfile = (e) => {
        let selected = e.target.files[0];
        if (selected && types.includes(selected.type)) {
          setFile1(selected);
        } else {
            setFile1(null);
            alert('Please select an image file (png or jpg)');
        }
    }

    return (
        <div>
            <Head>
                <title>Plantiful-Edit Your Profile</title>
                <link rel="icon" href="/favicon.ico" />
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
                  rel="stylesheet"></link>
                <link rel="preconnect" href="https://fonts.gstatic.com"/>
                <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"/>
            </Head>
            <main className={style.container}>
              <div className={style.profilePic}>
                {!userInfo.profile ? 
                    <label>
                        <img className={style.profile} src="https://firebasestorage.googleapis.com/v0/b/plantiful-ec98d.appspot.com/o/addImage.png?alt=media&token=c20e10da-e530-4edd-be72-ff2e3998cc99"/>
                        <input className={style.input} type="file" onChange={handleEditProfile}/>             
                    </label>
                    : 
                    <div>
                        {url1 && <img className={style.label1} src={url1}></img>}
                    </div>
                }
                {!url && file && <ProgressBar file={file} setUrl={setUrl} />}   
              </div>
                




            </main>
                {/* <div className={style.left}>
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
                        {!url1 && file1 && <ProgressBar file={file1} setUrl={setUrl1} />}
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
                            {!url2 && url1 && file2 && <ProgressBar file={file2} setUrl={setUrl2} />}
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
                            {!url3 && url1 && file3 && <ProgressBar file={file3} setUrl={setUrl3} />}
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
                            {!url4 && url1 && file4 && <ProgressBar file={file4} setUrl={setUrl4} />}
                        </div>
                    </div>
                </div>
                <div className={style.right}>
                    <h1 className={style.header}>Create Your Trade</h1>
                    <form className={style.createForm} autoComplete="off">
                        <input className={style.formInput} 
                            type="text" 
                            placeholder="Title" 
                            onChange={(e)=>setTitle(e.target.value)}
                            value={title}
                            required/>
                        <textarea className={style.formInput} 
                            placeholder="Describe your plant trade"
                            onChange={(e)=>setDescription(e.target.value)}
                            value={description}
                        ></textarea>
                        {tradeType ? <label>Selling</label>:<label>Trade</label>}
                        <label className={style.switch}>
                            <input className={style.input} 
                                type="checkbox" 
                                onClick={(e)=>setTradeType(e.currentTarget.checked)}/>
                            <span className={`${style.slider} ${style.round}`}></span>
                        </label>
                        <div className={style.sell}>
                            {tradeType ?
                            <div>
                            <label className={style.formTradeType}>Price ($):</label>
                            <input className={style.formInput} 
                                onChange={handlePrice} 
                                value={price} 
                                min="0" 
                                step="0.01" 
                                type="number" 
                            />
                            </div>
                            :
                            <div>
                            <label className={style.formTradeType}>Interested In: </label>
                            <input className={style.formInput} 
                                type="text" 
                                value={tradePreference} 
                                onChange={(e)=>setTradePreference(e.target.value)} 
                                placeholder="Your plant wishlist" 
                                required
                            />
                            </div>
                            }   
                        </div>
                        <div className={style.locationField}>
                            <input className={style.formInput} 
                                type="text" 
                                placeholder="Location (city)" 
                                value = {city? `${city}, ${country}`: null}
                                onChange={handleLocation}
                                required/>
                            <div className={style.currentLocation} 
                                onClick={handleCurrentLocation}>
                                    Use Current Location
                            </div>
                        </div>
                        <button 
                            className={style.buttonSubmit}
                            disabled={title===""||city===""|| url1==="" || (tradePreference===""&&price===null)}
                            onClick={handleSubmit}
                            type="button">Create Trade</button>
                    </form>
                </div>
             </div>
            </main> */}
        </div>
    )
}

export default editProfile