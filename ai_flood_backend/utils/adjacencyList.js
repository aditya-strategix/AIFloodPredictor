function buildAdjacencyList(nodes, connectDistance = 200) { // connect nodes within 200m
  const edges = {};

  for (let node1 in nodes) {
    edges[node1] = {};
    for (let node2 in nodes) {
      if (node1 !== node2) {
        const d = haversineDistance(nodes[node1], nodes[node2]);
        if (d <= connectDistance) {
          edges[node1][node2] = d;
        }
      }
    }
  }

  return edges;
}
