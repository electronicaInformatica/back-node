import mongoClient from "./mongo";
import ColorSorted from "../types/ColorSorted";

const dbName = 'rocklet_sorter';
const collectionName = 'sorted_colors';

async function getColorsBySortingId(sortingId: string): Promise<ColorSorted[]> {
    try {
        await mongoClient.connect();
        const db = mongoClient.db(dbName);
        const collection = db.collection(collectionName);
        const result = await collection.find({ sortingId: sortingId }).toArray();

        // Map over the result array and extract the sortingId and color fields
        return result.map((item: any) => {
            return {
                sortingId: item.sortingId,
                color: item.color
            };
        });

    } finally {
        await mongoClient.close();
    }
}

export default getColorsBySortingId;
