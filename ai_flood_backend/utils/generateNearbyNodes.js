function generateNearbyNodes(userLat, userLon, radiusMeters = 500, stepMeters = 150) {
  const nodes = {};
  let id = 1;

  const latStep = stepMeters / 111000; // ~1 degree latitude = 111 km
  const lonStep = stepMeters / (111000 * Math.cos(userLat * Math.PI / 180));

  for (let lat = userLat - radiusMeters / 111000; lat <= userLat + radiusMeters / 111000; lat += latStep) {
    for (let lon = userLon - radiusMeters / (111000 * Math.cos(userLat * Math.PI / 180)); lon <= userLon + radiusMeters / (111000 * Math.cos(userLat * Math.PI / 180)); lon += lonStep) {
      const nodeName = `N${id++}`;
      nodes[nodeName] = { lat, lon };
    }
  }

  nodes["User"] = { lat: userLat, lon: userLon }; // Add user as starting node
  return nodes;
}
