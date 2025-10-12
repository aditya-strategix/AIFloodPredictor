import AiModel from "../models/aiFlood.model.js";

class HashMap {
  constructor(initialCapacity = 16) {
    this.capacity = initialCapacity;
    this.size = 0;
    this.buckets = new Array(this.capacity).fill(null).map(() => []);
    this.loadFactor = 0.75;
  }

  hash(key) {
    const keyStr = key.toString();
    let hash = 0;
    const prime = 31;
    for (let i = 0; i < keyStr.length; i++) {
      hash = (hash * prime + keyStr.charCodeAt(i)) % this.capacity;
    }
    return Math.abs(hash);
  }

  set(key, value) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket[i][1] = value;
        return;
      }
    }

    bucket.push([key, value]);
    this.size++;

    if (this.size > this.capacity * this.loadFactor) {
      this.resize();
    }
  }

  get(key) {
    const index = this.hash(key);
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
    const index = this.hash(key);
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
    const oldCapacity = this.capacity;
    this.capacity *= 2;
    this.size = 0;
    this.buckets = new Array(this.capacity).fill(null).map(() => []);
    for (const bucket of oldBuckets) {
      for (const [key, value] of bucket) {
        this.set(key, value);
      }
    }
    console.log(`HashMap resized from ${oldCapacity} to ${this.capacity} buckets`);
  }

  // Flood-specific methods
  setWaterLevel(sensorId, level, timestamp = Date.now()) {
    const key = `water_${sensorId}`;
    const data = { level: parseFloat(level), timestamp, sensorId: sensorId.toString() };
    this.set(key, data);
  }

  getWaterLevel(sensorId) {
    const data = this.get(`water_${sensorId}`);
    return data ? data.level : null;
  }

  setNodeSafety(nodeId, status, timestamp = Date.now()) {
    const key = `safety_${nodeId}`;
    const validStatuses = ['safe', 'warning', 'danger', 'critical'];
    if (!validStatuses.includes(status)) {
      throw new Error(`Invalid safety status: ${status}`);
    }
    const data = { status, timestamp, nodeId: nodeId.toString() };
    this.set(key, data);
  }

  getNodeSafety(nodeId) {
    const data = this.get(`safety_${nodeId}`);
    return data ? data.status : null;
  }

  setEnvironmentalData(sensorId, data) {
    const key = `env_${sensorId}`;
    const envData = { ...data, timestamp: data.timestamp || Date.now(), sensorId: sensorId.toString() };
    this.set(key, envData);
  }

  getEnvironmentalData(sensorId) {
    return this.get(`env_${sensorId}`);
  }

  async setFloodRisk(regionId, riskData = {}) {
    if (!regionId) throw new Error('regionId is required for setFloodRisk');

    const key = `risk_${regionId}`;
    const risk = { ...riskData, timestamp: riskData.timestamp || Date.now(), regionId: regionId.toString() };

    // Determine flood-affected status
    const isFloodFlag = Boolean(risk.floodRisk);
    const highRiskLevels = new Set(['medium', 'high', 'critical', 'danger']);
    const hasHighRiskLevel = typeof risk.riskLevel === 'string' && highRiskLevels.has(risk.riskLevel.toLowerCase());
    const isFlood = isFloodFlag || hasHighRiskLevel;

    if (isFlood) {
      // Keep in-memory for fast access
      this.set(key, risk);
    } else {
      // Non-flood -> persist to MongoDB
      try {
        const doc = {
          regionId: regionId.toString(),
          location: risk.location || regionId,
          sensorId: risk.sensorId || null,
          data: risk.environmentalData || risk.data || null,
          floodRisk: false,
          probability: risk.probability ?? null,
          riskLevel: risk.riskLevel ?? null,
          alertLevel: risk.alertLevel ?? null,
          confidence: risk.confidence ?? null,
          factors: risk.factors ?? null,
          recommendations: risk.recommendations ?? null,
          environmentalSummary: risk.environmentalSummary ?? null,
          createdAt: new Date()
        };
        await AiModel.create(doc);
      } catch (err) {
        console.error('AiModel.create error in setFloodRisk:', err);
      }
      // remove any stale in-memory record for this region
      this.delete(key);
    }
  }

  async getFloodRisk(regionId) {
    if (!regionId) return null;

    const inMem = this.get(`risk_${regionId}`);
    if (inMem) return inMem;

    try {
      const dbEntry = await AiModel.findOne({ regionId: regionId.toString() }).sort({ createdAt: -1 }).lean().exec();
      return dbEntry || null;
    } catch (err) {
      console.error('AiModel.findOne error in getFloodRisk:', err);
      return null;
    }
  }

  getRecentWaterLevels(timeWindow = 3600000) {
    const now = Date.now();
    const recentData = [];
    for (const bucket of this.buckets) {
      for (const [key, value] of bucket) {
        if (key.startsWith('water_') && value.timestamp && (now - value.timestamp) <= timeWindow) {
          recentData.push(value);
        }
      }
    }
    return recentData.sort((a, b) => b.timestamp - a.timestamp);
  }

  getStats() {
    return {
      size: this.size,
      capacity: this.capacity,
      loadFactor: this.size / this.capacity,
      emptyBuckets: this.buckets.filter(bucket => bucket.length === 0).length
    };
  }
}

export default HashMap;