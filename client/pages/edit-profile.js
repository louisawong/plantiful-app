import React, {useEffect,useState} from 'react'
import Head from 'next/head'
import style from '../styles/EditProfile.module.scss'
import {useDispatch, useSelector} from 'react-redux';
import user, {fetchUserById, logoutUser, updateUser} from '../redux/user';
import {useRouter } from 'next/router'
import ProgressBar from '../components/ProgressBar/ProgressBar'
import moment from 'moment'

function editProfile() {
    const dispatch = useDispatch();
    const router = useRouter();
    const userInfo = useSelector((state)=> state.user)
    //const {user} = useAuth();

    //state 
    const [file, setFile] = useState("");
    const [url, setUrl] = useState("");
    const [location, setLocation] = useState([]);
    const [firstName, setFirstName] = useState("");
    const [editFirst, setEditFirst] = useState(false)
    const [lastName, setLastName] = useState("");
    const [editLast, setEditLast] = useState(false)
    const [description, setDescription] = useState("");
    const [editDescription, setEditDescription] = useState(false);
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [locationCheck, setLocationCheck] = useState(false)

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

    //handle Location
    const handleLocation = (e) => {
        if (e.target.checked) {
            setLocationCheck(e.target.checked)
            fetch("/api/geolocation")
            .then(res => res.json())
            .then((data)=>{
                console.log(data)
              setLocation(data.location);
              setCity(data.city);
              setCountry(data.country)
            })
            .catch((err)=>{
                console.log(err)
            })
        } else {
            setLocationCheck(e.target.checked)
            setLocation([]);
            setCity("");
            setCountry("")
        }
    }

    //handle submit button
    const handleSubmit = (e) => {
        let update={};
        update.firstName=(firstName.length>=2 ? firstName : userInfo.firstName)
        update.lastName= (editLast ? lastName : userInfo.lastName)
        if (!userInfo.description && !editDescription) { 
            update.description =  `Welcome to ${userInfo.firstName}'s greenhouse! 🪴 `
        }
        if (editDescription && description!=="") {
            update.description =  description;
        }
        if (userInfo.description && !editDescription) {
            update.description =  userInfo.description;
        }
        if (locationCheck) {
            update.location = location;
            update.city = city;
            update.country = country;
        }
        if(url) update.profile = url;
        dispatch(updateUser({
            uid: userInfo.uid,
            update: update
        }))

        router.push("/profile")
    }

    // types allowed for upload;
    const types = ['image/png', 'image/jpeg'];

    const handleEditProfile = (e) => {
        let selected = e.target.files[0];
        if (selected && types.includes(selected.type)) {
          setFile(selected);
        } else {
            setFile(null);
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
              <div className={style.left}>
                {!url ? 
                    <label className={style.profileWrapper}>
                        {userInfo.profile ? 
                        <img className={style.profilePic} src={userInfo.profile}/>
                        :
                        <img className={style.profilePic} src="https://firebasestorage.googleapis.com/v0/b/plantiful-ec98d.appspot.com/o/addProfileImage.png?alt=media&token=3c067200-cfee-4ccc-8986-28888a41b31e"/>
                        }
                        <input className={style.input} type="file" onChange={handleEditProfile}/>             
                        <span className={style.addImage}>Edit Your Profile Image</span>
                    </label>
                    : 
                    <div className={style.profileWrapper}>
                        {url && <img className={style.profilePic} src={url}></img>}
                        <span className={style.addImage}>New Profile Image</span>
                    </div>
                }
                {!url && file && <ProgressBar file={file} setUrl={setUrl} />}   
              </div>
              <div className={style.right}>
                <h1 className={style.header}>Edit Your Profile</h1>
                <div className={style.setInfo}>
                    <span className={style.bolded} >Username: {' '}</span>  
                    {userInfo.username}{' | | '}
                    <span className={style.bolded} >Email: {' '}</span>{userInfo.email}
                </div>
                <div className={style.name}>
                    <label> First Name: {' '}
                        <input className={style.firstName} 
                        value={firstName} 
                        onChange={(e)=>{setEditFirst(true); setFirstName(e.target.value)}} 
                        placeholder={userInfo.firstName}
                        />
                    </label>
                    <label>Last Name: {' '}
                        <input className={style.lastName} 
                        value={lastName} 
                        onChange={(e)=>{setEditLast(true); setLastName(e.target.value)}} 
                        placeholder={userInfo.lastName? userInfo.lastName : "Add last name"}
                        />
                    </label>
                </div>
                <div className={style.description}>
                    <label> Your Profile's Description: {' '}
                        <textarea className={style.descriptionText} 
                        value={description} 
                        onChange={(e)=>{setEditDescription(true); setDescription(e.target.value)}}
                        placeholder={userInfo.description? userInfo.description : `Welcome to ${userInfo.firstName}'s greenhouse! 🪴 `}>
                        </textarea>
                    </label>
                </div>
                <div className={style.location}>
                    <div className={style.locationData}>
                        {userInfo.city? userInfo.city : "No Previous Location Information"}
                    </div>
                    <label> Do you want to use current location as your home city? {' '}
                        <input className={style.locationCheck} 
                        type="checkbox"
                        onClick={handleLocation}></input>
                    </label>
                    {locationCheck? <div className={style.currentLocation}>{`${city}, ${country}`}</div> : <div></div>}
                </div>
                <button className={style.buttonSubmit}
                onClick={handleSubmit}
                type="button">Update Profile</button>
              </div>
            </main>
        </div>
    )
}

export default editProfile