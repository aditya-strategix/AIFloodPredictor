function predictFlood(data) {
  const { rainfall, riverLevel, soilSaturation } = data;

  if (rainfall > 100 || riverLevel > 5 || soilSaturation > 80) {
    return { floodRisk: true, message: 'High flood risk!' };
  }
  return { floodRisk: false, message: 'Low flood risk' };
}

export default predictFlood;
