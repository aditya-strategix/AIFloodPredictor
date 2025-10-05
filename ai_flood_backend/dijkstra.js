class PriorityQueue {
  constructor() {
    this.queue = [];
  }

  enqueue(node, priority) {
    this.queue.push({ node, priority });
    this.queue.sort((a, b) => a.priority - b.priority); // min-heap behavior
  }

  dequeue() {
    return this.queue.shift();
  }

  isEmpty() {
    return this.queue.length === 0;
  }
}

function dijkstraPQ(nodes, edges, start, end) {
  const distances = {}; // shortest distance from start to node
  const previous = {};  // to reconstruct path

  for (let node in nodes) distances[node] = Infinity;
  distances[start] = 0;

  const pq = new PriorityQueue();
  pq.enqueue(start, 0);

  while (!pq.isEmpty()) {
    const { node: current } = pq.dequeue();

    if (current === end) break; // reached destination

    for (let neighbor in edges[current]) {
      const alt = distances[current] + edges[current][neighbor];
      if (alt < distances[neighbor]) {
        distances[neighbor] = alt;
        previous[neighbor] = current;
        pq.enqueue(neighbor, alt);
      }
    }
  }

  // Reconstruct path
  const path = [];
  let cur = end;
  while (cur) {
    path.unshift(cur);
    cur = previous[cur];
  }

  return { path, distance: distances[end] };
}
