import {useState, useEffect} from 'react';
import {projectStorage} from './config'

//custom hook to interact with FireBase storage for media upload
//returns information back about the upload

const useStorage = (file) => {
    const [progress,setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(null);

    useEffect(()=>{
      //references
      const storageRef = projectStorage.ref();
      const imageRef = storageRef.child(file.name);
      
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