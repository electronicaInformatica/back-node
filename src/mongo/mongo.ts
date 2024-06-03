import { MongoClient } from 'mongodb';

let DB_URL = process.env.DB_URL || 'localhost';
let DB_PORT = process.env.DB_PORT || '27017';
const mongoURI = 'mongodb://' + DB_URL + ':' + DB_PORT; // Change to your MongoDB URI

const mongoClient = new MongoClient(mongoURI);

export default mongoClient