import { MongoClient } from 'mongodb';
import dotenv from "dotenv";
dotenv.config();
let DB_URL = process.env.DB_URL;
let DB_PORT = process.env.DB_PORT;
const mongoURI = 'mongodb://' + DB_URL + ':' + DB_PORT; // Change to your MongoDB URI

const mongoClient = new MongoClient(mongoURI);

export default mongoClient