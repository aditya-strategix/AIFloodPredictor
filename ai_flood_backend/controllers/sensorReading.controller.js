
import { sensorDataMap } from '../store/dataStore.js';
const sensorReadingController = (req, res) => {
     try {
    const timeWindow = parseInt(req.query.timeWindow) || 3600000; // 1 hour default
    const recentData = sensorDataMap.getRecentWaterLevels(timeWindow);
    
    res.json({
      data: recentData,
      count: recentData.length,
      timeWindow: timeWindow
    });

  } catch (error) {
    console.error('Recent sensor data error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
export default sensorReadingController;