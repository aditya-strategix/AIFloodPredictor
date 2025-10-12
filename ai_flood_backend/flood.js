import calculateConfidence from "./utils/calculateConfidence.js";
import generateMessage from "./utils/generateMessage.js";
import AiModel from "./models/aiFlood.model.js";
function predictFlood(data, location = '') {
  const { rainfall, riverLevel, soilMoisture, humidity, temperature } = data;

  // Initialize risk factors
  let riskScore = 0;
  let factors = [];
  let recommendations = [];

  // Rainfall risk assessment (35% weight)
  if (rainfall > 100) {
    riskScore += 35;
    factors.push(`Heavy rainfall: ${rainfall.toFixed(1)}mm (Critical)`);
    recommendations.push('Avoid low-lying areas and underpasses');
  } else if (rainfall > 75) {
    riskScore += 25;
    factors.push(`High rainfall: ${rainfall.toFixed(1)}mm (High)`);
    recommendations.push('Monitor weather updates closely');
  } else if (rainfall > 50) {
    riskScore += 15;
    factors.push(`Moderate rainfall: ${rainfall.toFixed(1)}mm (Medium)`);
    recommendations.push('Stay alert for weather changes');
  } else if (rainfall > 25) {
    riskScore += 5;
    factors.push(`Light rainfall: ${rainfall.toFixed(1)}mm (Low)`);
  }

  // River level risk assessment (25% weight)
  if (riverLevel > 5) {
    riskScore += 25;
    factors.push(`River level: ${riverLevel.toFixed(1)}m (Critical)`);
    recommendations.push('Evacuate riverside areas immediately');
  } else if (riverLevel > 4) {
    riskScore += 18;
    factors.push(`River level: ${riverLevel.toFixed(1)}m (High)`);
    recommendations.push('Prepare for potential evacuation');
  } else if (riverLevel > 3) {
    riskScore += 10;
    factors.push(`River level: ${riverLevel.toFixed(1)}m (Medium)`);
    recommendations.push('Monitor river levels closely');
  } else if (riverLevel > 2) {
    riskScore += 3;
    factors.push(`River level: ${riverLevel.toFixed(1)}m (Low)`);
  }

  // Soil moisture risk assessment (20% weight)
  if (soilMoisture > 85) {
    riskScore += 20;
    factors.push(`Soil saturation: ${soilMoisture.toFixed(1)}% (Critical)`);
    recommendations.push('Risk of landslides and surface flooding');
  } else if (soilMoisture > 70) {
    riskScore += 12;
    factors.push(`Soil saturation: ${soilMoisture.toFixed(1)}% (High)`);
    recommendations.push('Ground absorption capacity reduced');
  } else if (soilMoisture > 50) {
    riskScore += 6;
    factors.push(`Soil saturation: ${soilMoisture.toFixed(1)}% (Medium)`);
  } else if (soilMoisture > 30) {
    riskScore += 2;
    factors.push(`Soil saturation: ${soilMoisture.toFixed(1)}% (Low)`);
  }

  // Humidity factor (10% weight)
  if (humidity > 85) {
    riskScore += 10;
    factors.push(`High humidity: ${humidity.toFixed(1)}% (Persistent rain likely)`);
  } else if (humidity > 70) {
    riskScore += 5;
    factors.push(`Moderate humidity: ${humidity.toFixed(1)}%`);
  }

  // Temperature factor (10% weight) - affects evaporation and storm intensity
  if (temperature > 30 && humidity > 80) {
    riskScore += 10;
    factors.push(`Hot & humid: ${temperature.toFixed(1)}°C (Storm potential)`);
    recommendations.push('Conditions favor intense rainfall');
  } else if (temperature < 15) {
    riskScore += 5;
    factors.push(`Cold weather: ${temperature.toFixed(1)}°C (Reduced evaporation)`);
  }

  // Location-specific adjustments
  const locationLower = location.toLowerCase();
  if (locationLower.includes('mumbai') || locationLower.includes('chennai')) {
    riskScore += 5; // Coastal cities have higher flood risk
    factors.push('Coastal city: Increased flood susceptibility');
  } else if (locationLower.includes('kerala')) {
    riskScore += 8; // Kerala has historically high flood risk
    factors.push('High-risk region: Historical flood patterns');
  } else if (locationLower.includes('delhi') && rainfall > 50) {
    riskScore += 3; // Delhi drainage issues during heavy rainfall
    factors.push('Urban drainage limitations');
  }

  // Calculate probability (0-100%)
  const probability = Math.min(100, Math.max(0, riskScore));

  // Determine risk level
  let riskLevel, alertLevel, floodRisk;
  if (probability >= 75) {
    riskLevel = 'critical';
    alertLevel = 'emergency';
    floodRisk = true;
    recommendations.unshift('IMMEDIATE ACTION REQUIRED: Evacuate to higher ground');
  } else if (probability >= 60) {
    riskLevel = 'high';
    alertLevel = 'warning';
    floodRisk = true;
    recommendations.unshift('HIGH RISK: Prepare for evacuation');
  } else if (probability >= 40) {
    riskLevel = 'medium';
    alertLevel = 'watch';
    floodRisk = true;
    recommendations.unshift('MODERATE RISK: Stay alert and monitor conditions');
  } else if (probability >= 20) {
    riskLevel = 'low';
    alertLevel = 'advisory';
    floodRisk = false;
    recommendations.unshift('LOW RISK: Maintain awareness of weather conditions');
  } else {
    riskLevel = 'minimal';
    alertLevel = 'none';
    floodRisk = false;
    recommendations.unshift('MINIMAL RISK: Normal precautions sufficient');
  }

  // Add general safety recommendations
  if (floodRisk) {
    recommendations.push('Keep emergency kit ready');
    recommendations.push('Stay informed through official channels');
    recommendations.push('Avoid walking or driving through flooded areas');
  }

  const environmentalSummary ={
    rainfall: `Rainfall: ${rainfall.toFixed(1)}mm`,
    riverLevel: `River Level: ${riverLevel.toFixed(1)}m`,
    soilMoisture: `Soil Moisture: ${soilMoisture.toFixed(1)}%`,
    humidity: `Humidity: ${humidity.toFixed(1)}%`,
    temperature: `Temperature: ${temperature.toFixed(1)}°C`
  }
  // Confidence level based on data quality
  const confidence = calculateConfidence(data);

  if(floodRisk==false){
const aiModelEntry = new AiModel({
    regionId,
    location,
    data,
    floodRisk,
    probability,
    riskLevel,
    alertLevel,
    confidence,
    factors,
    recommendations,
    environmentalSummary
  });

  aiModelEntry.save().catch(err => console.error('AI Model save error:', err));

  }
  

  return {
    regionId,
    floodRisk,
    probability: Math.round(probability * 10) / 10, // Round to 1 decimal place
    riskLevel,
    alertLevel,
    confidence,
    factors,
    recommendations,
    message: generateMessage(riskLevel, probability),
    environmentalSummary
  };
}


function predictMultipleLocations(locations) {
  return locations.map(locationData => ({
    location: locationData.location,
    ...predictFlood(locationData.data, locationData.location)
  }));
}


export { predictMultipleLocations, generateMessage, calculateConfidence, predictFlood };
