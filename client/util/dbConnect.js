import mongoose from 'mongoose';

const databaseURI = process.env.MONGO_URI || "mongodb+srv://general:oJtmLp85RvK3PbEo@plantiful.xmjku.mongodb.net/PlantifulDB?retryWrites=true&w=majority"

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
    console.log(connection.isConnected)
}

export default dbConnect;