import {useState, useEffect} from 'react';
import firebaseClient from './config';
import firebase from 'firebase/app';
import {useAuth} from './auth'
//import {projectStorage} from './config'

//custom hook to interact with FireBase storage for media upload
//returns information back about the upload
firebaseClient();
const projectStorage = firebase.storage();

const useStorage = (file) => {
    const {user} = useAuth();
    const [progress,setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(null);

    useEffect(()=>{
      //references
      const storageRef = projectStorage.ref();
      const imageRef = storageRef.child(`${user.uid}.${Date.now()}.${file.name}`);
      
      imageRef.put(file).on('state_changed', (snap) => {
          let percentage = (snap.bytesTransferred/snap.totalBytes)*100;
          setProgress(percentage);
      }, (err) => {
          setError(err);
      }, async () => {
          const url = await imageRef.getDownloadURL();
          //console.log(url)
          setUrl(url);
      })
    },[file])

    return {progress,url,error}
}

export default useStorage;