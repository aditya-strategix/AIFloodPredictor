const express = require('express');
const bodyParser = require('body-parser');
const Graph = require('./graph').default;
const dijkstra = require('./dijkstra').default;
const predictFlood = require('./flood').default;

const app = express();
app.use(bodyParser.json());


// Flood Prediction API
app.post('/predict-flood', (req, res) => {
  const data = req.body;
  const result = predictFlood(data);
  res.json(result);
});

// Shortest Route API
app.post('/shortest-route', (req, res) => {
  const { start, end, startEnv, endEnv } = req.body;

  // Predict flood at start and end points
  const floodStart = predictFlood(startEnv);
  const floodEnd = predictFlood(endEnv);

  // If flood detected, increase edge weights
  if (floodStart.floodRisk) {
    graph.getNeighbors(start).forEach(n => graph.updateEdgeWeight(start, n.neighbor, 1000));
  }
  if (floodEnd.floodRisk) {
    graph.getNeighbors(end).forEach(n => graph.updateEdgeWeight(end, n.neighbor, 1000));
  }

  const distance = dijkstra(graph, start, end);
  if (distance === null) res.json({ message: 'No path found' });
  else res.json({ start, end, distance });
});

app.listen(3000, () => console.log('Server running on port 3000'));
