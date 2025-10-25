function generateMessage(riskLevel, probability) {
  switch (riskLevel) {
    case 'critical':
      return `CRITICAL FLOOD RISK (${probability.toFixed(1)}% probability) - Immediate evacuation recommended!`;
    case 'high':
      return `HIGH FLOOD RISK (${probability.toFixed(1)}% probability) - Prepare for potential flooding.`;
    case 'medium':
      return `MODERATE FLOOD RISK (${probability.toFixed(1)}% probability) - Stay alert and monitor conditions.`;
    case 'low':
      return `LOW FLOOD RISK (${probability.toFixed(1)}% probability) - Normal precautions sufficient.`;
    case 'minimal':
      return `MINIMAL FLOOD RISK (${probability.toFixed(1)}% probability) - Conditions are favorable.`;
    default:
      return `Flood risk assessment: ${probability.toFixed(1)}% probability`;
  }
}
export default generateMessage;
