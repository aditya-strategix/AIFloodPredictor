

import {predictFlood} from "../flood.js";
import environmentalData from "../data/environmentalData.js";
import {sensorDataMap,regionDataMap} from "../store/dataStore.js";

// Initialize data structures
const predictFloodController = (req, res) => {

  console.log("hello");
  try {
    const { location, environmentalData: clientData } = req.body;
    if (!location) {
      return res.status(400).json({ 
        error: 'Location is required',
        floodRisk: false,
        riskLevel: 'unknown'
      });
    }

    // Get environmental data (use client data if provided, otherwise use defaults)
    const cityKey = location.toLowerCase().split(',')[0].trim();
    const envData = clientData || environmentalData[cityKey] || {
      rainfall: Math.random() * 100,
      humidity: Math.random() * 40 + 40,
      temperature: Math.random() * 15 + 20,
      soilMoisture: Math.random() * 50 + 25,
      riverLevel: Math.random() * 6
    };

    // Store sensor data in HashMap
    sensorDataMap.setEnvironmentalData(location, envData);

    // Predict flood risk
    const floodPrediction = predictFlood(envData, location);
    // Store region risk assessment
    regionDataMap.setFloodRisk(location, {
      ...floodPrediction,
      environmentalData: envData,
      timestamp: Date.now()
    });

    res.json({
      location,
      environmentalData: envData,
      ...floodPrediction,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Flood prediction error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      floodRisk: false,
      riskLevel: 'unknown'
    });
  }
}

export default predictFloodController;