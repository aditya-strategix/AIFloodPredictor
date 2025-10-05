import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { MapPin, Clock, Shield, Navigation, AlertTriangle, CheckCircle } from 'lucide-react';

interface EscapeRouteVisualizationProps {
  floodRegion: FloodRegion;
  userAddress: string;
}

export function EscapeRouteVisualization({ floodRegion, userAddress }: EscapeRouteVisualizationProps) {
  const [selectedRoute, setSelectedRoute] = useState<EscapeRoute>(floodRegion.escapeRoutes[0]);
  const [animationProgress, setAnimationProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Auto-start animation when component mounts
    startRouteAnimation();
  }, [selectedRoute]);

  const startRouteAnimation = () => {
    setIsAnimating(true);
    setAnimationProgress(0);
    
    const duration = 3000; // 3 seconds for full animation
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      setAnimationProgress(progress);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
      }
    };
    
    requestAnimationFrame(animate);
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high': return 'text-red-600 bg-red-100 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-100 border-green-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getSafetyColor = (level: string) => {
    switch (level) {
      case 'high': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-lg border-2 border-red-200 p-6"
    >
      {/* Alert Header */}
      <div className="flex items-center gap-3 mb-6">
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <AlertTriangle className="w-8 h-8 text-red-600" />
        </motion.div>
        <div>
          <h2 className="text-2xl font-bold text-red-800">Flood Zone Detected!</h2>
          <p className="text-red-600">Your address "{userAddress}" is in a flood risk area</p>
        </div>
      </div>

      {/* Region Info */}
      <div className={`p-4 rounded-lg border mb-6 ${getRiskColor(floodRegion.riskLevel)}`}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold">{floodRegion.name}</h3>
            <p className="text-sm opacity-75">Risk Level: {floodRegion.riskLevel.toUpperCase()}</p>
          </div>
          <div className="text-right">
            <MapPin className="w-5 h-5 inline mr-1" />
            <span className="text-sm">
              {floodRegion.coordinates[0].toFixed(4)}, {floodRegion.coordinates[1].toFixed(4)}
            </span>
          </div>
        </div>
      </div>

      {/* Route Selection */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Available Escape Routes</h3>
        <div className="grid gap-3">
          {floodRegion.escapeRoutes.map((route) => (
            <motion.button
              key={route.id}
              onClick={() => setSelectedRoute(route)}
              className={`p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                selectedRoute.id === route.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Navigation className="w-4 h-4" />
                    <span className="font-semibold">{route.name}</span>
                    {route.type === 'main' && (
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        RECOMMENDED
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {route.estimatedTime} min
                    </span>
                    <span className={`flex items-center gap-1 ${getSafetyColor(route.safetyLevel)}`}>
                      <Shield className="w-3 h-3" />
                      {route.safetyLevel} safety
                    </span>
                  </div>
                </div>
                {selectedRoute.id === route.id && (
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                )}
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Route Visualization */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900">Route Visualization</h3>
          <button
            onClick={startRouteAnimation}
            className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors"
          >
            Replay Animation
          </button>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-6 relative overflow-hidden">
          {/* Mock Area Map */}
          <svg width="100%" height="300" className="absolute inset-0">
            <defs>
              <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
              <pattern id="waterPattern" patternUnits="userSpaceOnUse" width="4" height="4">
                <rect width="4" height="4" fill="#bfdbfe" />
                <path d="M 0,4 l 4,-4 M -1,1 l 2,-2 M 3,5 l 2,-2" stroke="#3b82f6" strokeWidth="0.5" />
              </pattern>
            </defs>
            
            {/* Map Background */}
            <rect width="100%" height="100%" fill="#f3f4f6" />
            
            {/* Water Bodies */}
            <ellipse cx="150" cy="220" rx="80" ry="40" fill="url(#waterPattern)" />
            <rect x="400" y="180" width="120" height="60" rx="10" fill="url(#waterPattern)" />
            
            {/* Flood Risk Zones */}
            <motion.polygon
              points="50,180 200,160 220,240 80,260"
              fill="#fee2e2"
              stroke="#ef4444"
              strokeWidth="2"
              strokeDasharray="5,5"
              initial={{ opacity: 0.3 }}
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            
            {/* Medium Risk Zone */}
            <polygon
              points="220,160 350,140 380,200 250,220"
              fill="#fef3c7"
              stroke="#f59e0b"
              strokeWidth="1"
              strokeDasharray="3,3"
              opacity="0.6"
            />
            
            {/* Safe Zone */}
            <polygon
              points="520,80 650,60 680,140 550,160"
              fill="#dcfce7"
              stroke="#16a34a"
              strokeWidth="2"
              opacity="0.8"
            />
            
            {/* Streets/Roads */}
            <path d="M 0,200 L 700,200" stroke="#9ca3af" strokeWidth="3" opacity="0.5" />
            <path d="M 0,120 L 700,120" stroke="#9ca3af" strokeWidth="2" opacity="0.5" />
            <path d="M 200,0 L 200,300" stroke="#9ca3af" strokeWidth="2" opacity="0.5" />
            <path d="M 400,0 L 400,300" stroke="#9ca3af" strokeWidth="3" opacity="0.5" />
            <path d="M 550,0 L 550,300" stroke="#9ca3af" strokeWidth="2" opacity="0.5" />
            
            {/* Buildings/Landmarks */}
            <rect x="120" y="100" width="40" height="30" fill="#6b7280" opacity="0.7" />
            <rect x="280" y="80" width="35" height="45" fill="#6b7280" opacity="0.7" />
            <rect x="420" y="90" width="50" height="35" fill="#6b7280" opacity="0.7" />
            <rect x="580" y="110" width="45" height="40" fill="#4ade80" opacity="0.8" />
            
            {/* Evacuation Route */}
            <motion.path
              d="M 120,220 L 200,200 L 300,180 L 420,140 L 550,120 L 600,100"
              stroke="#3b82f6"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="10,5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: animationProgress }}
              transition={{ duration: 0.1 }}
            />
            
            {/* Animated evacuation vehicle */}
            {isAnimating && (
              <motion.g
                initial={{ x: 120, y: 220 }}
                animate={{ 
                  x: 120 + (480 * animationProgress), // Move from 120 to 600
                  y: 220 - (120 * animationProgress)  // Move from 220 to 100
                }}
                transition={{ duration: 0.1, ease: "linear" }}
              >
                <rect x="-8" y="-4" width="16" height="8" fill="#3b82f6" rx="2" />
                <circle cx="0" cy="0" r="3" fill="#ffffff" />
              </motion.g>
            )}
            
            {/* Location Markers */}
            <circle cx="120" cy="220" r="8" fill="#ef4444" />
            <circle cx="600" cy="100" r="8" fill="#10b981" />
            
            {/* Zone Labels */}
            <text x="120" y="280" textAnchor="middle" className="fill-red-600 text-xs font-semibold">
              HIGH RISK ZONE
            </text>
            <text x="300" y="250" textAnchor="middle" className="fill-yellow-600 text-xs font-semibold">
              MEDIUM RISK
            </text>
            <text x="600" y="180" textAnchor="middle" className="fill-green-600 text-xs font-semibold">
              SAFE ZONE
            </text>
            
            {/* Landmark Labels */}
            <text x="140" y="95" className="fill-gray-600 text-xs">City Hall</text>
            <text x="300" y="75" className="fill-gray-600 text-xs">Hospital</text>
            <text x="440" y="85" className="fill-gray-600 text-xs">School</text>
            <text x="600" y="105" className="fill-green-700 text-xs font-medium">Emergency Center</text>
            
            {/* Direction Arrows */}
            <motion.polygon
              points="500,130 510,135 500,140"
              fill="#3b82f6"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1, repeat: Infinity, delay: 1 }}
            />
            <motion.polygon
              points="560,110 570,115 560,120"
              fill="#3b82f6"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1, repeat: Infinity, delay: 1.5 }}
            />
          </svg>
          
          {/* Map Legend */}
          <div className="absolute bottom-4 right-4 bg-white rounded-lg p-3 shadow-lg border text-xs">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-200 border border-red-400 rounded"></div>
                <span>High Risk Zone</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-200 border border-yellow-400 rounded"></div>
                <span>Medium Risk Zone</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-200 border border-green-400 rounded"></div>
                <span>Safe Zone</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-2 bg-blue-600 rounded"></div>
                <span>Evacuation Route</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Route Details */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Landmarks */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">Key Landmarks</h4>
          <div className="space-y-2">
            {selectedRoute.landmarks.map((landmark, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-2 text-sm text-gray-600"
              >
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                {landmark}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Route Stats */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">Route Information</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Estimated Time:</span>
              <span className="font-semibold">{selectedRoute.estimatedTime} minutes</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Safety Level:</span>
              <span className={`font-semibold ${getSafetyColor(selectedRoute.safetyLevel)}`}>
                {selectedRoute.safetyLevel.toUpperCase()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Route Type:</span>
              <span className="font-semibold">{selectedRoute.type.toUpperCase()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Waypoints:</span>
              <span className="font-semibold">{selectedRoute.path.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <motion.button
        className="w-full mt-6 bg-gradient-to-r from-red-600 to-red-700 text-white py-3 px-6 rounded-lg font-semibold hover:from-red-700 hover:to-red-800 transition-all duration-200 flex items-center justify-center gap-2"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => {
          // In a real app, this would open navigation app or provide detailed directions
          alert(`Starting navigation via ${selectedRoute.name}. Estimated time: ${selectedRoute.estimatedTime} minutes.`);
        }}
      >
        <Navigation className="w-5 h-5" />
        Start Navigation Now
      </motion.button>
    </motion.div>
  );
}