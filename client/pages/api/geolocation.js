const requestIp = require('request-ip');
const geoip = require('geoip-lite');
const axios = require('axios')


export default async (req, res) => {
    try {
    const clientIp = requestIp.getClientIp(req)
        .replace('::1', '')
        .replace('127.0.0.1', '') || '70.54.50.203' // <-- default location `Mississauga`
    //console.log("Geo,", clientIp)
    //const geo = geoip.lookup(clientIp)
    //let result = await axios.get(`https://api.hackertarget.com/geoip/?q=${clientIp}`)
    let result = await axios.get(`http://ip-api.com/json/${clientIp}`)
    //let rawArray = result.data.replace(/(\r\n|\n|\r|IP|Address:|Country:|City:|Latitude:|Longitude|State:)/gm,"").split(' ')
    //let city = rawArray[5];
    //let country = rawArray[3];
    //let location = [Number(rawArray[7]),Number(rawArray[6])]
    //console.log(result.data)
    let newResult = {city:result.data.city, country: result.data.countryCode, location:[result.data.lon, result.data.lat]}
    res.status(200).send(newResult)
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }

}