function calculateConfidence(data) {
  let confidence = 100;
  
  // Check for missing or invalid data
  const requiredFields = ['rainfall', 'riverLevel', 'soilMoisture', 'humidity', 'temperature'];
  for (const field of requiredFields) {
    if (data[field] === undefined || data[field] === null || isNaN(data[field])) {
      confidence -= 15;
    }
  }

  // Check for unrealistic values
  if (data.rainfall < 0 || data.rainfall > 500) confidence -= 10;
  if (data.riverLevel < 0 || data.riverLevel > 20) confidence -= 10;
  if (data.soilMoisture < 0 || data.soilMoisture > 100) confidence -= 10;
  if (data.humidity < 0 || data.humidity > 100) confidence -= 10;
  if (data.temperature < -10 || data.temperature > 50) confidence -= 10;

  return Math.max(50, confidence); // Minimum 50% confidence
}

export default calculateConfidence;