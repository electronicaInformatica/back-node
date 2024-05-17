import { MongoClient } from 'mongodb';

const mongoURI = 'mongodb://localhost:27017'; // Change to your MongoDB URI

const mongoClient = new MongoClient(mongoURI);

export default mongoClient