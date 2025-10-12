import mongoose from "mongoose";
const aiFloodSchema = new mongoose.Schema({
    regionId: {type: String, required: true, unique: true},
    sensorId: {type: String},
    floodRisk: {type: Boolean, required: true},
    probability: {type: Number, required: true},
    riskLevel: {type: String, required: true},
    environmentalSummary:{
        rainfall: String,
        riverLevel: String,
        soilMoisture: String,
        humidity: String,
        temperature: String
    },
    confidence: {type: Number, required: true},
    factors: [String],
    recommendations: [String],
    lastUpdated: {type: Date, default: Date.now}
});

const AiFlood = mongoose.model("AiFlood", aiFloodSchema);
export default AiFlood;