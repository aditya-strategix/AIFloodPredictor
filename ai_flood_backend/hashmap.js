class HashMap {
  constructor(initialCapacity = 16) {
    this.capacity = initialCapacity;
    this.size = 0;
    this.buckets = new Array(this.capacity).fill(null).map(() => []);
  }

  hash(key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash + key.charCodeAt(i) * i) % this.capacity;
    }
    return hash;
  }

  set(key, value) {
    const index = this.hash(key.toString());
    const bucket = this.buckets[index];
    
    // Check if key already exists
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket[i][1] = value;
        return;
      }
    }
    
    // Add new key-value pair
    bucket.push([key, value]);
    this.size++;
    
    // Resize if load factor > 0.75
    if (this.size > this.capacity * 0.75) {
      this.resize();
    }
  }

  get(key) {
    const index = this.hash(key.toString());
    const bucket = this.buckets[index];
    
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        return bucket[i][1];
      }
    }
    return null;
  }

  has(key) {
    return this.get(key) !== null;
  }

  delete(key) {
    const index = this.hash(key.toString());
    const bucket = this.buckets[index];
    
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket.splice(i, 1);
        this.size--;
        return true;
      }
    }
    return false;
  }

  resize() {
    const oldBuckets = this.buckets;
    this.capacity *= 2;
    this.size = 0;
    this.buckets = new Array(this.capacity).fill(null).map(() => []);
    
    for (const bucket of oldBuckets) {
      for (const [key, value] of bucket) {
        this.set(key, value);
      }
    }
  }

  keys() {
    const keys = [];
    for (const bucket of this.buckets) {
      for (const [key] of bucket) {
        keys.push(key);
      }
    }
    return keys;
  }

  values() {
    const values = [];
    for (const bucket of this.buckets) {
      for (const [, value] of bucket) {
        values.push(value);
      }
    }
    return values;
  }

  // Quick lookup for water levels by sensor ID
  getWaterLevel(sensorId) {
    return this.get(`water_${sensorId}`);
  }

  setWaterLevel(sensorId, level) {
    this.set(`water_${sensorId}`, level);
  }

  // Quick lookup for node safety status
  getNodeSafety(nodeId) {
    return this.get(`safety_${nodeId}`);
  }

  setNodeSafety(nodeId, status) {
    this.set(`safety_${nodeId}`, status);
  }
}

module.exports = HashMap;