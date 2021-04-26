const requestIp = require('request-ip');
const geoip = require('geoip-lite');

export default (req, res) => {
    try {
    const clientIp = requestIp.getClientIp(req)
        .replace('::1', '')
        .replace('127.0.0.1', '') || '72.1.69.153' // <-- default location `KY`
    //console.log("Geo,", clientIp)
    const geo = geoip.lookup(clientIp)
    //console.log(geo);
    res.status(200).send(geo)
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }

}