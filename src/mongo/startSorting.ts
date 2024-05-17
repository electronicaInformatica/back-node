import mongoClient from "./mongo";
const dbName = 'rocklet_sorter';
const collectionName = 'sort_status';

async function startSorting(amountToBeSorted: number) : Promise<string> {
    try {
        await mongoClient.connect();
        const db = mongoClient.db(dbName);
        const collection = db.collection(collectionName);
        const result = await collection.insertOne({ amountToBeSorted, timestamp: new Date() });
        return result.insertedId.toString();
    } finally {
        await mongoClient.close();
    }
}
export default startSorting;