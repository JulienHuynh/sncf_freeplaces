import express from "express"
import cors from "cors";
import getFreeplaces from "./requests/getFreeplaces.js";
import {getFormattedDate, getFullFormattedDateFr, getMidnightFullFormattedDateFr} from "./utils/getFormattedDate.js";
import getTrains from "./requests/getTrains.js";
import selectTrain from "./utils/selectTrain.js";

const app = express();
const port = 8245;

app.use(cors())

app.get('/api/freeplaces', async (req, res) => {
  try {
      const date = new Date();
      const formattedDate = getFullFormattedDateFr(date);
      const midnightFormattedDate = getMidnightFullFormattedDateFr(date);
      const trains = await getTrains(midnightFormattedDate);
      const train = selectTrain(new Date(formattedDate+"Z"), trains, "87387001", "87384008");

      const trainParams = {
        date: getFormattedDate(date),
        iucFrom: train.departureStation.getUicStationCode(),
        iucTo: train.arrivalStation.getUicStationCode(),
        trainNumber: train.getName()
     }

     const responseData = await getFreeplaces(JSON.stringify(trainParams));
     responseData.train = train;

      res.json(responseData);
  } catch (error) {
      console.error(`Erreur lors de la récupération des données : ${error.message}`);
      res.status(500).json({ error: 'Erreur lors de la récupération des données' });
  }
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur Node.js écoutant sur le port ${port}`);
});
