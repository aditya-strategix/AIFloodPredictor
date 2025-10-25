import React, { useState } from 'react';
import { Search, TrendingUp, TrendingDown, AlertTriangle, MapPin, Zap, Clock, Navigation, Shield } from 'lucide-react';
import { LoadingSpinner } from '../LoadingSpinner';
import { useToast } from '../../hooks/useToast';
import { ToastContainer } from '../Toast';
import { findFloodRegionByAddress } from '../../data/floodRegions';
import { EscapeRouteVisualization } from '../EscapeRouteVisualization';

interface DashboardSectionProps {
  isVisible: boolean;
}

interface EnvironmentalData {
  rainfall: number;
  humidity: number;
  temperature: number;
  soilMoisture: number;
  riverLevel?: number;
}

interface FloodHistoryData {
  city: string;
  floodsLastDecade: number;
  majorFloodYears: number[];
  lastFloodSeverity: string;
}

export function DashboardSection({ isVisible }: DashboardSectionProps) {
  const [location, setLocation] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);
  const [matchedFloodRegion, setMatchedFloodRegion] = useState<FloodRegion | null>(null);
  const [environmentalData, setEnvironmentalData] = useState<EnvironmentalData>({
    rainfall: 0,
    humidity: 0,
    temperature: 0,
    soilMoisture: 0,
    riverLevel: undefined
  });
  const [showEscapeRoute, setShowEscapeRoute] = useState(false);
  const { toasts, removeToast, showSuccess, showError, showWarning } = useToast();

  // Historical flood data for Indian cities
  const getFloodHistory = (city: string): FloodHistoryData => {
    const histories: { [key: string]: FloodHistoryData } = {
      'mumbai': {
        city: 'Mumbai',
        floodsLastDecade: 8,
        majorFloodYears: [2017, 2019, 2020, 2021],
        lastFloodSeverity: 'Severe'
      },
      'chennai': {
        city: 'Chennai',
        floodsLastDecade: 6,
        majorFloodYears: [2015, 2017, 2021],
        lastFloodSeverity: 'Extreme'
      },
      'kolkata': {
        city: 'Kolkata',
        floodsLastDecade: 5,
        majorFloodYears: [2017, 2020, 2021],
        lastFloodSeverity: 'Moderate'
      },
      'kerala': {
        city: 'Kerala',
        floodsLastDecade: 7,
        majorFloodYears: [2018, 2019, 2020, 2021],
        lastFloodSeverity: 'Catastrophic'
      },
      'hyderabad': {
        city: 'Hyderabad',
        floodsLastDecade: 4,
        majorFloodYears: [2020, 2021, 2022],
        lastFloodSeverity: 'Moderate'
      },
      'guwahati': {
        city: 'Guwahati',
        floodsLastDecade: 9,
        majorFloodYears: [2017, 2018, 2019, 2020, 2022],
        lastFloodSeverity: 'Severe'
      }
    };

    const cityKey = city.toLowerCase().split(',')[0].trim();
    return histories[cityKey] || {
      city: city,
      floodsLastDecade: 2,
      majorFloodYears: [2021],
      lastFloodSeverity: 'Moderate'
    };
  };

  const calculateRiskScore = (data: EnvironmentalData): number => {
    let score = 0;
    
    // Rainfall risk (0-40 points)
    if (data.rainfall > 50) score += 40;
    else if (data.rainfall > 30) score += 30;
    else if (data.rainfall > 15) score += 20;
    else if (data.rainfall > 5) score += 10;
    
    // Humidity risk (0-20 points)
    if (data.humidity > 90) score += 20;
    else if (data.humidity > 80) score += 15;
    else if (data.humidity > 70) score += 10;
    
    // Soil moisture risk (0-30 points)
    if (data.soilMoisture > 90) score += 30;
    else if (data.soilMoisture > 80) score += 20;
    else if (data.soilMoisture > 70) score += 15;
    
    // River level risk (0-10 points)
    if (data.riverLevel && data.riverLevel > 5) score += 10;
    else if (data.riverLevel && data.riverLevel > 3) score += 5;
    
    return Math.min(score, 100);
  };

  const handleAnalyze = async () => {
    if (!location.trim()) {
      showError('Please enter a location to analyze');
      return;
    }
    
    setIsAnalyzing(true);
    setMatchedFloodRegion(null);
    setShowEscapeRoute(false);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Calculate risk score based on environmental data
      const riskScore = calculateRiskScore(environmentalData);
      
      // Check if address matches any flood region
      const floodRegion = findFloodRegionByAddress(location);
      
      if (floodRegion || riskScore > 60) {
        const region = floodRegion || {
          name: location,
          riskLevel: riskScore > 80 ? 'high' as const : 'medium' as const,
          waterBodies: ['Local drainage system'],
          escapeRoutes: [
            {
              name: 'Emergency Route 1',
              description: 'Primary evacuation route to nearest shelter',
              estimatedTime: '15 minutes',
              safetyLevel: 'high' as const,
              landmarks: ['Main Road', 'Community Center', 'Emergency Shelter']
            }
          ]
        };
        
        setMatchedFloodRegion(region);
        setShowEscapeRoute(true);
        
        if (riskScore > 80) {
          showError(`🚨 CRITICAL FLOOD RISK! Immediate evacuation recommended. Risk Score: ${riskScore}/100`);
        } else {
          showWarning(`⚠️ FLOOD RISK DETECTED! Your area shows elevated risk. Risk Score: ${riskScore}/100`);
        }
      } else {
        showSuccess(`✅ Low flood risk detected. Risk Score: ${riskScore}/100 - Monitor conditions.`);
      }
      
      setIsAnalyzing(false);
      setHasAnalyzed(true);
    } catch (error) {
      setIsAnalyzing(false);
      showError('Failed to analyze flood risk. Please try again.');
    }
  };

  const getMetricsForLocation = () => {
    if (!hasAnalyzed) return [];
    
    const riskScore = calculateRiskScore(environmentalData);
    const isHighRisk = riskScore > 60;
    
    return [
      {
        title: "Current Rainfall",
        value: `${environmentalData.rainfall}mm/hr`,
        change: environmentalData.rainfall > 15 ? "Heavy" : environmentalData.rainfall > 5 ? "Moderate" : "Light",
        trend: "up",
        risk: environmentalData.rainfall > 25 ? "high" : environmentalData.rainfall > 10 ? "medium" : "low",
        description: environmentalData.rainfall > 25 ? "Extreme precipitation" : environmentalData.rainfall > 10 ? "Heavy precipitation" : "Normal precipitation",
        icon: <TrendingUp className="w-5 h-5" />
      },
      {
        title: "Humidity Level",
        value: `${environmentalData.humidity}%`,
        change: environmentalData.humidity > 80 ? "High" : environmentalData.humidity > 60 ? "Moderate" : "Low",
        trend: "up",
        risk: environmentalData.humidity > 85 ? "high" : environmentalData.humidity > 70 ? "medium" : "low",
        description: environmentalData.humidity > 85 ? "Saturated atmosphere" : environmentalData.humidity > 70 ? "High moisture" : "Normal humidity",
        icon: <TrendingUp className="w-5 h-5" />
      },
      {
        title: "Soil Saturation",
        value: `${environmentalData.soilMoisture}%`,
        change: environmentalData.soilMoisture > 80 ? "Critical" : environmentalData.soilMoisture > 60 ? "Elevated" : "Normal",
        trend: "up",
        risk: environmentalData.soilMoisture > 85 ? "high" : environmentalData.soilMoisture > 70 ? "medium" : "low",
        description: environmentalData.soilMoisture > 85 ? "Near saturation point" : environmentalData.soilMoisture > 70 ? "High soil moisture" : "Optimal moisture levels",
        icon: <TrendingUp className="w-5 h-5" />
      },
      ...(environmentalData.riverLevel ? [{
        title: "River Water Level",
        value: `${environmentalData.riverLevel}m`,
        change: environmentalData.riverLevel > 4 ? "Critical" : environmentalData.riverLevel > 2 ? "Elevated" : "Normal",
        trend: "up",
        risk: environmentalData.riverLevel > 5 ? "high" : environmentalData.riverLevel > 3 ? "medium" : "low",
        description: environmentalData.riverLevel > 5 ? "Flood stage reached" : environmentalData.riverLevel > 3 ? "Above normal levels" : "Within normal range",
        icon: <TrendingUp className="w-5 h-5" />
      }] : [])
    ];
  };

  const mockMetrics = getMetricsForLocation();

  const getAlertsForLocation = () => {
    if (!hasAnalyzed) return [];
    
    const riskScore = calculateRiskScore(environmentalData);
    
    if (riskScore > 80) {
      return [
        {
          level: "high",
          title: "🚨 CRITICAL FLOOD WARNING",
          message: `Extreme flood risk detected (${riskScore}/100). Immediate evacuation recommended. Multiple risk factors present.`,
          time: "Now"
        },
        {
          level: "high",
          title: "Emergency Route Activated",
          message: showEscapeRoute ? "Escape route map is now active below. Follow animated path to safety." : "Preparing evacuation routes...",
          time: "30 seconds ago"
        },
        {
          level: "high",
          title: "Weather Alert",
          message: `Rainfall: ${environmentalData.rainfall}mm/hr, Humidity: ${environmentalData.humidity}%, Soil: ${environmentalData.soilMoisture}% saturated`,
          time: "1 minute ago"
        }
      ];
    } else if (riskScore > 60) {
      return [
        {
          level: "medium",
          title: "⚠️ ELEVATED FLOOD RISK",
          message: `Moderate flood risk detected (${riskScore}/100). Monitor conditions closely and prepare for potential evacuation.`,
          time: "Now"
        },
        {
          level: "medium",
          title: "Environmental Alert",
          message: `Current conditions: ${environmentalData.rainfall}mm/hr rainfall, ${environmentalData.humidity}% humidity`,
          time: "2 minutes ago"
        }
      ];
    } else if (riskScore > 30) {
      return [
        {
          level: "medium",
          title: "Weather Advisory",
          message: `Low to moderate risk detected (${riskScore}/100). Continue monitoring environmental conditions.`,
          time: "Just now"
        },
        {
          level: "low",
          title: "System Status",
          message: "All monitoring systems operational. Real-time data being processed.",
          time: "5 minutes ago"
        }
      ];
    } else {
      return [
        {
          level: "low",
          title: "✅ All Clear",
          message: `Low flood risk detected (${riskScore}/100). Current environmental conditions are within safe parameters.`,
          time: "Just now"
        },
        {
          level: "low",
          title: "Monitoring Active",
          message: "Continuous monitoring of environmental parameters. No immediate concerns.",
          time: "3 minutes ago"
        }
      ];
    }
  };

  const mockAlerts = getAlertsForLocation();

  return (
    <section id="dashboard" className={`py-20 bg-white transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      <div className="max-w-screen-xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Flood Risk Dashboard</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Enter your location to get real-time predictions, environmental monitoring, and flood vulnerability assessments.
          </p>
        </div>

        {/* Flood Probability Generator */}
        <div className="bg-gray-50 rounded-2xl p-8 mb-12 max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Search className="w-7 h-7 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">Flood Risk Checker</h2>
          </div>
          
          <div className="space-y-6">
            {/* Address Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter Your Address (City, State, PIN Code)
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g., Mumbai, Maharashtra or 400001 or Chennai, Tamil Nadu"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onKeyPress={(e) => e.key === 'Enter' && handleAnalyze()}
              />
              
              {/* Quick Test Suggestions */}
              <div className="mt-3">
                <p className="text-sm text-gray-600 mb-2">Try these sample locations:</p>
                <div className="flex flex-wrap gap-2">
                  {['Mumbai, Maharashtra', 'Chennai, Tamil Nadu', 'Kolkata, West Bengal', 'Kerala, Kochi', 'Hyderabad, Telangana', 'Guwahati, Assam'].map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => setLocation(suggestion)}
                      className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-200 transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Environmental Parameters */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Rainfall (mm/hr)
                </label>
                <input
                  type="number"
                  value={environmentalData.rainfall || ''}
                  onChange={(e) => setEnvironmentalData(prev => ({ ...prev, rainfall: parseFloat(e.target.value) || 0 }))}
                  placeholder="e.g., 15.5"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Humidity (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={environmentalData.humidity || ''}
                  onChange={(e) => setEnvironmentalData(prev => ({ ...prev, humidity: parseFloat(e.target.value) || 0 }))}
                  placeholder="e.g., 85"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Temperature (°C)
                </label>
                <input
                  type="number"
                  value={environmentalData.temperature || ''}
                  onChange={(e) => setEnvironmentalData(prev => ({ ...prev, temperature: parseFloat(e.target.value) || 0 }))}
                  placeholder="e.g., 28"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Soil Moisture (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={environmentalData.soilMoisture || ''}
                  onChange={(e) => setEnvironmentalData(prev => ({ ...prev, soilMoisture: parseFloat(e.target.value) || 0 }))}
                  placeholder="e.g., 75"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-500 mb-2">
                  River Water Level (meters) - Optional
                </label>
                <input
                  type="number"
                  value={environmentalData.riverLevel || ''}
                  onChange={(e) => setEnvironmentalData(prev => ({ ...prev, riverLevel: e.target.value ? parseFloat(e.target.value) : undefined }))}
                  placeholder="e.g., 4.2 (leave blank if not applicable)"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">Only fill if your area is near a major river or water body</p>
              </div>
            </div>

            {/* Analysis Button */}
            <div className="flex justify-center">
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing || !location.trim()}
                className="bg-gradient-to-r from-blue-600 to-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-green-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isAnalyzing ? (
                  <>
                    <LoadingSpinner size={20} />
                    Analyzing Environmental Data...
                  </>
                ) : (
                  <>
                    Analyze Flood Risk
                    <Search className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Flood History Information */}
        {hasAnalyzed && (
          <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-8 mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Clock className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Historical Flood Data</h2>
            </div>
            
            {(() => {
              const history = getFloodHistory(location);
              return (
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-xl p-6 shadow-md">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                        <AlertTriangle className="w-5 h-5 text-red-600" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-red-600">{history.floodsLastDecade}</div>
                        <div className="text-sm text-gray-600">Floods in Last 10 Years</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl p-6 shadow-md">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-orange-600">{history.lastFloodSeverity}</div>
                        <div className="text-sm text-gray-600">Last Flood Severity</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl p-6 shadow-md">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-lg font-bold text-blue-600">{history.majorFloodYears.join(', ')}</div>
                        <div className="text-sm text-gray-600">Major Flood Years</div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* Emergency Escape Route with Interactive Map */}
        {showEscapeRoute && matchedFloodRegion && (
          <div className="mb-12">
            <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center animate-pulse">
                  <Navigation className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-red-800">🚨 EVACUATION ROUTES ACTIVATED</h2>
                  <p className="text-red-700">Your location requires immediate attention. Follow the animated route to safety.</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2 text-red-700">
                  <Shield className="w-4 h-4" />
                  <span>Estimated Travel Time: 15-25 minutes</span>
                </div>
                <div className="flex items-center gap-2 text-red-700">
                  <MapPin className="w-4 h-4" />
                  <span>Distance to Safety: 2.8 km</span>
                </div>
                <div className="flex items-center gap-2 text-red-700">
                  <Clock className="w-4 h-4" />
                  <span>Updated: Real-time</span>
                </div>
              </div>
            </div>
            
            <EscapeRouteVisualization 
              floodRegion={matchedFloodRegion} 
              userAddress={location}
            />
          </div>
        )}



        {/* Metrics Cards */}
        {hasAnalyzed && mockMetrics.length > 0 && (
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {mockMetrics.map((metric, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      metric.risk === 'low' ? 'bg-green-100' : 
                      metric.risk === 'medium' ? 'bg-yellow-100' : 'bg-red-100'
                    }`}>
                      {metric.icon && React.cloneElement(metric.icon, {
                        className: `w-5 h-5 ${
                          metric.risk === 'low' ? 'text-green-600' : 
                          metric.risk === 'medium' ? 'text-yellow-600' : 'text-red-600'
                        }`
                      })}
                    </div>
                    <h3 className="font-semibold text-gray-900">{metric.title}</h3>
                  </div>
                  <TrendingUp className={`w-5 h-5 ${
                    metric.risk === 'high' ? 'text-red-500' : 'text-orange-500'
                  }`} />
                </div>

                <div className="space-y-2">
                  <div className="text-3xl font-bold text-blue-600">{metric.value}</div>
                  <div className="text-sm text-gray-600">{metric.description}</div>
                  <div className={`text-sm font-medium flex items-center gap-1 ${
                    metric.risk === 'high' ? 'text-red-600' : 'text-orange-600'
                  }`}>
                    <TrendingUp className="w-4 h-4" />
                    {metric.change} change
                  </div>
                </div>

                {/* Simple Bar Graph Placeholder */}
                <div className="mt-4">
                  <div className="flex gap-1 h-12 items-end">
                    {Array.from({ length: 7 }, (_, i) => (
                      <div
                        key={i}
                        className={`flex-1 rounded-t ${
                          metric.risk === 'low' ? 'bg-green-200' :
                          metric.risk === 'medium' ? 'bg-yellow-200' : 'bg-red-200'
                        }`}
                        style={{ height: `${Math.random() * 80 + 20}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Alerts Panel */}
        {hasAnalyzed && mockAlerts.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className={`w-6 h-6 ${matchedFloodRegion ? 'text-red-500' : 'text-green-500'}`} />
              <h2 className="text-xl font-bold text-gray-900">
                {matchedFloodRegion ? 'Emergency Alerts' : 'Status Updates'}
              </h2>
            </div>
            
            <div className="space-y-4">
              {mockAlerts.map((alert, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-l-4 ${
                    alert.level === 'high'
                      ? 'bg-red-50 border-red-500'
                      : alert.level === 'medium'
                      ? 'bg-yellow-50 border-yellow-500'
                      : 'bg-green-50 border-green-500'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className={`font-semibold ${
                        alert.level === 'high' 
                          ? 'text-red-800' 
                          : alert.level === 'medium'
                          ? 'text-yellow-800'
                          : 'text-green-800'
                      }`}>
                        {alert.title}
                      </h3>
                      <p className={`text-sm mt-1 ${
                        alert.level === 'high' 
                          ? 'text-red-700' 
                          : alert.level === 'medium'
                          ? 'text-yellow-700'
                          : 'text-green-700'
                      }`}>
                        {alert.message}
                      </p>
                    </div>
                    <div className="text-xs text-gray-500">{alert.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}