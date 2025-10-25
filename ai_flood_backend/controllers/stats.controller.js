
import environmentalData  from '../data/environmentalData.js';
import { sensorDataMap } from '../store/dataStore.js';

const statsController = (req, res) => {
  try {
    const sensorStats = sensorDataMap.getStats();
    
    res.json({
      sensorDataStats: sensorStats,
      availableRegions: Object.keys(environmentalData),
      serverUptime: process.uptime(),
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
export default statsController;
