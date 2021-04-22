const admin = require('firebase-admin');
const serviceAccount = require('../authSecrets.json');

export const verifyIdToken = (token) => {
    if (!admin.apps.length) {
        admin.initializeApp({
            credential:admin.credential.cert(serviceAccount),
            databaseURL: "https://plantiful-ec98d-default-rtdb.firebaseio.com"
        })
    }

    return admin
        .auth()
        .verifyIdToken(token)
        .catch((err)=> {
            throw error;
        })
};