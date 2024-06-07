import mongoClient from "./mongo";

const dbName = 'rocklet_sorter';
const collectionName = 'sort_status';

async function getAllSortStatuses() {
    try {
        await mongoClient.connect();
        const db = mongoClient.db(dbName);
        const collection = db.collection(collectionName);
        return await collection.find({}).toArray();
    } finally {
        await mongoClient.close();
    }
}
export default getAllSortStatuses;