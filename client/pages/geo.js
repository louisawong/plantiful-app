import React,{useEffect,useState} from 'react'


function geo() {

    const[location,setLocation] = useState([])
    const[city,setCity] = useState("")

    useEffect(()=>{
      fetch("/api/geolocation")
      .then(res => res.json())
      .then((data)=>{
        setLocation(data.ll);
        setCity(data.city)
      })
      .catch((err)=>{
          console.log(err)
      })
    },[])

    return (
        <div>
            {location[0]},{location[1]}
            {city}
        </div>
    )
}

export default geo
