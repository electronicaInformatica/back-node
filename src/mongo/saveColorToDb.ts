import mongoClient from "./mongo";
import ColorSorted from "../types/ColorSorted";
const dbName = 'rocklet_sorter';
const collectionName = 'sorted_colors';

async function saveColorToDB({sortingId, color}: ColorSorted) {
    try {
        await mongoClient.connect();
        const db = mongoClient.db(dbName);
        const collection = db.collection(collectionName);
        await collection.insertOne({ sortingId, color , timestamp: new Date() });
    } finally {
        await mongoClient.close();
    }
}

export default saveColorToDB;