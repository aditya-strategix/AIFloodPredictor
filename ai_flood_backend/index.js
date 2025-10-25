import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { predictFlood } from './flood.js';
import { sensorDataMap, regionDataMap } from './store/dataStore.js';
import SegmentTree from './dsa/segmentTree.js';
import floodRoutes from './routes/flood.route.js';
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));
app.use("/api", floodRoutes);


// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    dataStructures: {
      sensorData: sensorDataMap.size,
      regionData: regionDataMap.size
    }
  });
});


// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// 404 handler - FIXED: Use proper Express syntax
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Endpoint not found',
    availableEndpoints: [
      'POST /api/predict-flood',
      'POST /api/flood-probability',
      'GET /api/environmental-data/:location',
      'GET /api/sensor-data/recent',
      'GET /api/health',
      'GET /api/stats'
    ]
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Flood Prediction Server running on port ${PORT}`);
  console.log(`📊 Available endpoints:`);
  console.log(`   POST /api/predict-flood`);
  console.log(`   POST /api/flood-probability`);
  console.log(`   GET  /api/environmental-data/:location`);
  console.log(`   GET  /api/sensor-data/recent`);
  console.log(`   GET  /api/health`);
  console.log(`   GET  /api/stats`);
});

