import { Router } from "express";
import predictFloodController from "../controllers/predictFlood.controller.js";
import environmentalDataController from "../controllers/environmentalData.controller.js";
import floodProbabilityController from "../controllers/floodProbability.controller.js";
import sensorReadingController from "../controllers/sensorReading.controller.js";
import statsController from "../controllers/stats.controller.js";

const router = Router();

router.post('/predict-flood', predictFloodController);
router.post('/flood-probability', floodProbabilityController);
router.post('/environmental-data/location/:location', environmentalDataController);
router.get('/sensor-data/recent', sensorReadingController);
router.get('/stats', statsController);
export default router;

