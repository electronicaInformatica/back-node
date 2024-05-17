import express from 'express';
import bodyParser from 'body-parser';
import mqttClient from './mqttClient';
import startSorting from "./mongo/startSorting";
import getColorsBySortingId from "./mongo/getColorsBySortingId";
import ColorSorted from "./types/ColorSorted";

const app = express();
const port = 3000;

app.use(bodyParser.json());

interface StartMessage {
    id: string
    amountToBeSorted: number
}

interface StopMessage {
    id: String
}

app.post('/action/start', async (req, res) => {
    const actionRequest = req.body;
    let amountToBeSorted = actionRequest.amountToBeSorted;
    const id = await startSorting(amountToBeSorted);
    const startMessage : StartMessage = {
        id,
        amountToBeSorted
    };
    mqttClient.publish('rocklet_sorter/start', JSON.stringify(startMessage), (err) => {
        if (err) {
            console.error('Failed to publish start message', err);
            return res.status(500).send('Failed to start sorting');
        }
        return res.status(200).send({ id });
    });
});

app.post('/action/stop', async (req, res) => {
    const actionRequest = req.body;
    let id = actionRequest.id;
    const stopMessage : StopMessage = {
        id
    };
    mqttClient.publish('rocklet_sorter/stop', JSON.stringify(stopMessage), (err) => {
        if (err) {
            console.error('Failed to publish stop message', err);
            return res.status(500).send('Failed to stop sorting');
        }
        return res.status(200).send('Stopped sorting');
    });
});

app.get('/colors/:sortingId', async (req, res) => {
    try {
        const sortingId = req.params.sortingId;
        const colors: ColorSorted[] = await getColorsBySortingId(sortingId);
        const groupedColors: { [color: string]: number } = colors.reduce((acc: { [color: string]: number }, curr: ColorSorted) => {
            acc[curr.color] = (acc[curr.color] || 0) + 1; // Increment count or set to 1 if not present
            return acc;
        }, {});
        res.json(groupedColors);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
