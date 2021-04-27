import mongoose from 'mongoose';

const databaseURI = process.env.MONGO_URI;
// console.log("DATABASE URI:", databaseURI);

const connection = {};

async function dbConnect () {
    if (connection.isConnected) {
        return;
    }

    const db = await mongoose.connect(databaseURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    connection.isConnected = db.connections[0].readyState;
    //console.log(connection.isConnected)
}

export default dbConnect;