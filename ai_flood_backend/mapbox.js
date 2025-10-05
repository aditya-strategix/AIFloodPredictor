mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';
navigator.geolocation.getCurrentPosition(async position => {
  const userLat = position.coords.latitude;
  const userLon = position.coords.longitude;

  const nodes = generateNearbyNodes(userLat, userLon);
  const graph = buildGraphFromNodes(nodes);

  // Pick a safe node as destination (last generated node)
  const dest = Object.keys(nodes)[Object.keys(nodes).length-1];
  const result = dijkstra(graph, "User", dest);
  console.log("Shortest Path:", result.path, "Distance:", result.distance.toFixed(2));

  // Initialize Mapbox
  const map = new mapboxgl.Map({
    container: 'map', // HTML element id
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [userLon, userLat],
    zoom: 15
  });

  map.on('load', () => {
    // Add nodes as markers
    for (let key in nodes) {
      new mapboxgl.Marker({ color: key==="User"?"blue":"red" })
        .setLngLat([nodes[key].lon, nodes[key].lat])
        .addTo(map);
    }

    // Draw shortest path as a line
    const pathCoords = result.path.map(n => [nodes[n].lon, nodes[n].lat]);
    map.addSource('route', { type:'geojson', data:{ type:'Feature', geometry:{ type:'LineString', coordinates:pathCoords } } });
    map.addLayer({ id:'route', type:'line', source:'route', layout:{ 'line-join':'round','line-cap':'round'}, paint:{ 'line-color':'green','line-width':4 } });
  });

});
