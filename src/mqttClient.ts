import mqtt from 'mqtt';
import saveColorToDB from './mongo/saveColorToDb'
import ColorSorted from "./types/ColorSorted";
import dotenv from "dotenv";
dotenv.config();

let brokerUrl = process.env.MQTT_LINK;
let mqttPort = process.env.MQTT_PORT;
const mqttClient : mqtt.MqttClient = mqtt.connect('mqtt://' + brokerUrl + ':' + mqttPort); // Change to your MQTT broker URL

mqttClient.on('error', (error) => {
    console.error('MQTT connection error:', error);
});

mqttClient.on('connect', () => {
    console.log('Connected to MQTT broker');

    mqttClient.subscribe('rocket_sorter/sorted', (err) => {
        if (err) {
            console.error('Failed to subscribe to MQTT topic:', err);
        }
    });
});

mqttClient.on('message', async (topic, message : Buffer) => {
    if (topic === 'rocket_sorter/sorted') {
        const messageString = message.toString(); // Convert buffer to string
        const parsedMessage = JSON.parse(messageString); // Parse JSON string to object

        // Extract sortingId and color from the parsed message
        const { sortingId, color } = parsedMessage;

        // Create an instance of ColorSorted
        const colorSorted: ColorSorted = {
            sortingId: sortingId,
            color: color
        };
        console.log(colorSorted)
        try {
            await saveColorToDB(colorSorted);
        } catch (error) {
            console.error('Failed to save color to MongoDB:', error);
        }
    }
});

export default mqttClient;
