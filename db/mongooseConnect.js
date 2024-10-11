import mongoose from "mongoose";

import dotenv from "dotenv";

dotenv.config();

let dbUser = process.env.DB_USER;
let dbPassword = process.env.DB_PASSWORD;
let dbCluster = process.env.DB_CLUSTER;
let dbName = process.env.DB_NAME;

const dbCloudUri = `mongodb+srv://${dbUser}:${dbPassword}@${dbCluster}/${dbName}?retryWrites=true&w=majority&appName=GuviTask`;

async function mongoDBconnect() {
    try {
        await mongoose.connect(dbCloudUri);
        console.log("DB connected successfully");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

export default mongoDBconnect