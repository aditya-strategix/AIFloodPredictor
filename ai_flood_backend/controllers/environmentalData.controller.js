import environmentalData from '../data/environmentalData.js'
const environmentalDataController = (req, res) => {
      try {
    const location = req.params.location;
    const cityKey = location.toLowerCase();
    
    const envData = environmentalData[cityKey] || {
      rainfall: Math.random() * 100,
      humidity: Math.random() * 40 + 40,
      temperature: Math.random() * 15 + 20,
      soilMoisture: Math.random() * 50 + 25,
      riverLevel: Math.random() * 6
    };

    // Add some variation to simulate real-time data
    const realTimeData = {
      rainfall: envData.rainfall + (Math.random() - 0.5) * 10,
      humidity: Math.max(0, Math.min(100, envData.humidity + (Math.random() - 0.5) * 5)),
      temperature: envData.temperature + (Math.random() - 0.5) * 3,
      soilMoisture: Math.max(0, Math.min(100, envData.soilMoisture + (Math.random() - 0.5) * 8)),
      riverLevel: Math.max(0, envData.riverLevel + (Math.random() - 0.5) * 0.5)
    };

    res.json({
      location,
      data: realTimeData,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Environmental data error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
export default environmentalDataController;