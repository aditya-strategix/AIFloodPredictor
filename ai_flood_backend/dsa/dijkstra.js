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

function findSafeNode(graph,floodStatus,start) {
 const pq=new PriorityQueue();
  pq.enqueue({node:start,dist:0});
const distances = Array(graph.size).fill(Infinity);
distances[start]=0;
  while(!pq.isEmpty()){
    const {node,dist}=pq.dequeue();
    if(floodStatus[node]) continue;
      if(floodStatus[node]==0 && start!=node){
        return {safeNode:node,distance:distances[node]}
      }
    for (let i in graph.getNeighbour(node)){
      let newDist = (floodStatus[graph.getNeighbour(node)[i]]==0) ? dist+1 : Infinity;
      pq.push({node:graph.getNeighbour(node)[i],dist:newDist});
      distances[graph.getNeighbour(node)[i]]=Math.min(distances[graph.getNeighbour(node)[i]], newDist);

    }
  }
}
export {PriorityQueue,findSafeNode};
