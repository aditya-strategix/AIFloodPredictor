class Graph {
  constructor() {
    this.adjList = new Map();
  }

  addNode(node) {
    if (!this.adjList.has(node)) this.adjList.set(node, []);
  }

  addEdge(node1, node2, weight) {
    this.addNode(node1);
    this.addNode(node2);
    this.adjList.get(node1).push({ neighbor: node2, weight });
    this.adjList.get(node2).push({ neighbor: node1, weight });
  }

  removeEdge(node1, node2) {
    if (this.adjList.has(node1)) {
      this.adjList.set(
        node1,
        this.adjList.get(node1).filter(e => e.neighbor !== node2)
      );
    }
    if (this.adjList.has(node2)) {
      this.adjList.set(
        node2,
        this.adjList.get(node2).filter(e => e.neighbor !== node1)
      );
    }
  }

  getNeighbors(node) {
    return this.adjList.get(node) || [];
  }

  updateEdgeWeight(node1, node2, newWeight) {
    this._updateEdge(node1, node2, newWeight);
    this._updateEdge(node2, node1, newWeight);
  }

  _updateEdge(node, neighbor, newWeight) {
    const edges = this.adjList.get(node);
    if (edges) {
      for (let edge of edges) if (edge.neighbor === neighbor) edge.weight = newWeight;
    }
  }
}
