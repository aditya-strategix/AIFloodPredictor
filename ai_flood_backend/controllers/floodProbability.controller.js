
import { predictFlood } from '../flood.js';
import environmentalData from '../data/environmentalData.js';

const floodProbabilityController = (req, res) => {
      try {
    const { location } = req.body;
    
    if (!location) {
      return res.status(400).json({ error: 'Location is required' });
    }

    const cityKey = location.toLowerCase().split(',')[0].trim();
    const envData = environmentalData[cityKey] || {
      rainfall: Math.random() * 100,
      humidity: Math.random() * 40 + 40,
      temperature: Math.random() * 15 + 20,
      soilMoisture: Math.random() * 50 + 25,
      riverLevel: Math.random() * 6
    };

    const floodPrediction = predictFlood(envData, location);
    
    res.json({
      location,
      probability: floodPrediction.probability,
      riskLevel: floodPrediction.riskLevel,
      factors: floodPrediction.factors,
      recommendations: floodPrediction.recommendations
    });

  } catch (error) {
    console.error('Flood probability error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
export default floodProbabilityController;