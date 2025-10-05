import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { FAQ } from '../components/FAQ';
import { Database, BarChart3, Globe, Shield, Bell, Mail, CheckCircle, Play, Pause } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
// import image_b468b10119b6ff7ef2537627f523b0b71ffdc24b from 'figma:asset/b468b10119b6ff7ef2537627f523b0b71ffdc24b.png';

export function HomePage() {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleCheckRisk = () => {
    navigate('/dashboard');
  };

  return (
    <motion.div 
      className="min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Full Viewport Video Section */}
      <section className="relative w-full" style={{ height: 'calc(100vh - 4rem)' }}>
        <video 
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src="https://videos.pexels.com/video-files/6182356/6182356-hd_1280_720_30fps.mp4"
          autoPlay
          muted
          loop
          playsInline
          style={{ objectFit: 'cover', opacity: 0.8 }}
          aria-label="Flood footage video"
        />
        
        {/* Video overlay for better text readability */}
        <div className="absolute inset-0 bg-black/20" />
        
        {/* Video Controls */}
        <button
          onClick={toggleVideo}
          className="absolute bottom-6 right-6 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent"
          aria-label="Toggle flood video"
        >
          {isPlaying ? (
            <Pause className="w-6 h-6 text-white" />
          ) : (
            <Play className="w-6 h-6 text-white ml-0.5" />
          )}
        </button>
      </section>

      {/* Full-Width Card Section */}
      <section className="w-full bg-gray-50 py-12">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24">
          <motion.div
            className="bg-white rounded-2xl shadow-lg p-12 md:p-16 lg:p-24 text-center"
            style={{ 
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
              padding: window.innerWidth < 768 ? '24px' : '48px'
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
          >
            <h1 
              className="mb-6"
              style={{ 
                fontSize: window.innerWidth < 768 ? '36px' : '48px',
                fontWeight: 'bold',
                color: '#343A40',
                lineHeight: '1.2'
              }}
            >
              Flood Risk Assessment
            </h1>
            
            <p 
              className="mb-8 max-w-3xl mx-auto"
              style={{ 
                fontSize: '20px',
                color: '#6C757D',
                lineHeight: '1.6'
              }}
            >
              Use AI to predict and prepare for floods with real-time data.
            </p>
            
            <button
              onClick={handleCheckRisk}
              className="px-8 py-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
              style={{ 
                backgroundColor: '#28A745',
                color: '#FFFFFF',
                padding: '20px 32px',
                fontSize: '18px',
                fontWeight: '500',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#1E7E34';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#28A745';
              }}
              onFocus={(e) => {
                e.currentTarget.style.outline = '2px solid #007BFF';
                e.currentTarget.style.outlineOffset = '2px';
              }}
              onBlur={(e) => {
                e.currentTarget.style.outline = 'none';
              }}
            >
              Check Risk Now
            </button>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <motion.section 
        className="py-20 bg-gradient-to-br from-blue-50 to-green-50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-screen-xl mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">How CloudWatch Works</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Using AI to predict floods by fetching location data from APIs and matching it against user-provided data.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Database className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Data Fetching</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                We fetch real-time environmental data (water levels, rainfall, soil moisture) from public APIs based on your location. 
                Our system continuously monitors multiple data sources including meteorological stations, satellite imagery, and IoT sensors 
                to provide the most accurate and up-to-date information.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">Real-time APIs</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">IoT Sensors</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">Satellite Data</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-green-100"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center">
                  <BarChart3 className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Matching and Prediction</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                If the fetched data matches patterns from historical flood-prone regions (e.g., high rainfall thresholds), our AI model 
                predicts risks and alerts you. Machine learning algorithms analyze historical patterns, current conditions, and 
                geographical factors to provide accurate flood predictions with confidence levels.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">AI Prediction</span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">Pattern Matching</span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">Risk Assessment</span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Coverage Section */}
      <motion.section 
        className="py-16 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-screen-xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-4">CloudWatch Coverage</h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our AI covers flood forecasts for over 100 regions worldwide, providing alerts to millions. 
              We use APIs for expanded data in scarce areas.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-full h-[300px] bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg shadow-lg overflow-hidden relative">

                
                Background World Map Image
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1584931423298-c576fda54bd2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx8fDE3NTkxNTkyMDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="World map showing global connectivity"
                  className="absolute inset-0 w-full h-full object-cover opacity-90"
                />
                
                {/* Connectivity Overlay */}
                <svg 
                  viewBox="0 0 800 300" 
                  className="absolute inset-0 w-full h-full z-10"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Connectivity Points */}
                  <g>
                    {/* North America - USA */}
                    <circle cx="160" cy="120" r="4" fill="#8B5CF6" opacity="0.9">
                      <animate attributeName="r" values="4;7;4" dur="2s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" />
                    </circle>
                    
                    {/* Canada */}
                    <circle cx="140" cy="100" r="3" fill="#A855F7" opacity="0.9" style={{animationDelay: '0.3s'}}>
                      <animate attributeName="r" values="3;5;3" dur="2.2s" repeatCount="indefinite" />
                    </circle>
                    
                    {/* Brazil */}
                    <circle cx="190" cy="200" r="4" fill="#8B5CF6" opacity="0.9" style={{animationDelay: '0.6s'}}>
                      <animate attributeName="r" values="3;6;3" dur="2.5s" repeatCount="indefinite" />
                    </circle>
                    
                    {/* UK */}
                    <circle cx="360" cy="100" r="3" fill="#A855F7" opacity="0.9" style={{animationDelay: '0.9s'}}>
                      <animate attributeName="r" values="3;5;3" dur="2.1s" repeatCount="indefinite" />
                    </circle>
                    
                    {/* Germany */}
                    <circle cx="380" cy="110" r="3" fill="#8B5CF6" opacity="0.9" style={{animationDelay: '1.2s'}}>
                      <animate attributeName="r" values="3;5;3" dur="2.3s" repeatCount="indefinite" />
                    </circle>
                    
                    {/* India */}
                    <circle cx="520" cy="140" r="4" fill="#8B5CF6" opacity="0.9" style={{animationDelay: '1.5s'}}>
                      <animate attributeName="r" values="3;6;3" dur="2s" repeatCount="indefinite" />
                    </circle>
                    
                    {/* China */}
                    <circle cx="560" cy="120" r="4" fill="#8B5CF6" opacity="0.9" style={{animationDelay: '1.8s'}}>
                      <animate attributeName="r" values="4;7;4" dur="2.3s" repeatCount="indefinite" />
                    </circle>
                    
                    {/* Japan */}
                    <circle cx="600" cy="125" r="3" fill="#A855F7" opacity="0.9" style={{animationDelay: '2.1s'}}>
                      <animate attributeName="r" values="3;5;3" dur="2.4s" repeatCount="indefinite" />
                    </circle>
                    
                    {/* Australia */}
                    <circle cx="580" cy="230" r="3" fill="#8B5CF6" opacity="0.9" style={{animationDelay: '2.4s'}}>
                      <animate attributeName="r" values="3;5;3" dur="2.6s" repeatCount="indefinite" />
                    </circle>
                    
                    {/* South Africa */}
                    <circle cx="390" cy="220" r="3" fill="#A855F7" opacity="0.9" style={{animationDelay: '2.7s'}}>
                      <animate attributeName="r" values="3;5;3" dur="2.7s" repeatCount="indefinite" />
                    </circle>
                    
                    {/* Nigeria */}
                    <circle cx="370" cy="160" r="3" fill="#8B5CF6" opacity="0.9" style={{animationDelay: '3s'}}>
                      <animate attributeName="r" values="3;5;3" dur="2.8s" repeatCount="indefinite" />
                    </circle>
                    
                    {/* Russia */}
                    <circle cx="500" cy="90" r="3" fill="#A855F7" opacity="0.9" style={{animationDelay: '0.2s'}}>
                      <animate attributeName="r" values="3;5;3" dur="2.9s" repeatCount="indefinite" />
                    </circle>
                  </g>
                  
                  {/* Connection Lines with Glow Effect */}
                  <defs>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                      <feMerge> 
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  
                  <g stroke="#8B5CF6" strokeWidth="2" opacity="0.6" fill="none" filter="url(#glow)">
                    <line x1="160" y1="120" x2="360" y2="100">
                      <animate attributeName="opacity" values="0.3;0.8;0.3" dur="3s" repeatCount="indefinite" />
                    </line>
                    <line x1="360" y1="100" x2="520" y2="140">
                      <animate attributeName="opacity" values="0.3;0.8;0.3" dur="3.5s" repeatCount="indefinite" />
                    </line>
                    <line x1="520" y1="140" x2="560" y2="120">
                      <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2.8s" repeatCount="indefinite" />
                    </line>
                    <line x1="560" y1="120" x2="600" y2="125">
                      <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2.2s" repeatCount="indefinite" />
                    </line>
                    <line x1="160" y1="120" x2="190" y2="200">
                      <animate attributeName="opacity" values="0.3;0.8;0.3" dur="4s" repeatCount="indefinite" />
                    </line>
                    <line x1="560" y1="120" x2="580" y2="230">
                      <animate attributeName="opacity" values="0.3;0.8;0.3" dur="3.2s" repeatCount="indefinite" />
                    </line>
                  </g>
                  
                  {/* Data Flow Particles */}
                  <g>
                    <circle r="3" fill="#C084FC" opacity="0.9" filter="url(#glow)">
                      <animateMotion dur="4s" repeatCount="indefinite" rotate="auto">
                        <path d="M 160 120 Q 260 110 360 100" />
                      </animateMotion>
                      <animate attributeName="opacity" values="0;1;0" dur="4s" repeatCount="indefinite" />
                    </circle>
                    
                    <circle r="3" fill="#C084FC" opacity="0.9" filter="url(#glow)">
                      <animateMotion dur="5s" repeatCount="indefinite" rotate="auto" begin="1s">
                        <path d="M 360 100 Q 440 120 520 140" />
                      </animateMotion>
                      <animate attributeName="opacity" values="0;1;0" dur="5s" repeatCount="indefinite" begin="1s" />
                    </circle>
                    
                    <circle r="3" fill="#C084FC" opacity="0.9" filter="url(#glow)">
                      <animateMotion dur="3.5s" repeatCount="indefinite" rotate="auto" begin="2s">
                        <path d="M 560 120 Q 570 175 580 230" />
                      </animateMotion>
                      <animate attributeName="opacity" values="0;1;0" dur="3.5s" repeatCount="indefinite" begin="2s" />
                    </circle>
                  </g>
                </svg>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Globe className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">100+</div>
                  <div className="text-gray-600">Countries</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">700M</div>
                  <div className="text-gray-600">People Protected</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">24/7</div>
                  <div className="text-gray-600">Real-time Monitoring</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-600">95%</div>
                  <div className="text-gray-600">Accuracy Rate</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Alerts and Notifications Section */}
      <motion.section 
        className="py-20 bg-gradient-to-br from-red-50 to-orange-50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-screen-xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Alerts and Notifications</h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We integrate with APIs to send alerts via email or app notifications when data matches flood risks.
            </p>
          </motion.div>

          <div className="mb-12">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 h-[400px] flex flex-col px-[36px] py-[32px]">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">API Data Sources</h3>
                <Database className="w-6 h-6 text-blue-600" />
              </div>
              
              <div className="space-y-3 flex-1">
                <div className="flex justify-between items-center py-3 px-4 bg-gray-50/50 rounded-lg border border-gray-100">
                  <div className="space-y-1">
                    <p className="font-medium text-gray-900">Weather API</p>
                    <p className="text-sm text-gray-600">Real-time meteorological data</p>
                  </div>
                  <div className="text-right">
                    <div className="text-green-600 font-semibold text-lg">94.2%</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide">Accuracy</div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center py-3 px-4 bg-gray-50/50 rounded-lg border border-gray-100">
                  <div className="space-y-1">
                    <p className="font-medium text-gray-900">IoT Sensors</p>
                    <p className="text-sm text-gray-600">Water level monitoring</p>
                  </div>
                  <div className="text-right">
                    <div className="text-green-600 font-semibold text-lg">97.8%</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide">Accuracy</div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center py-3 px-4 bg-gray-50/50 rounded-lg border border-gray-100">
                  <div className="space-y-1">
                    <p className="font-medium text-gray-900">Satellite Data</p>
                    <p className="text-sm text-gray-600">Geographic imagery analysis</p>
                  </div>
                  <div className="text-right">
                    <div className="text-blue-600 font-semibold text-lg">91.5%</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide">Accuracy</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-2 md:order-1"
            >
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <Bell className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900">Instant Alerts</h4>
                    <p className="text-gray-600">Real-time notifications sent within seconds of risk detection</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900">Multi-Channel</h4>
                    <p className="text-gray-600">Email, SMS, push notifications, and emergency broadcasts</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Shield className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900">Smart Routing</h4>
                    <p className="text-gray-600">Personalized evacuation routes based on current conditions</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-1 md:order-2"
            >
              {/* <ImageWithFallback
                src={image_b468b10119b6ff7ef2537627f523b0b71ffdc24b}
                alt="Person checking flood alert message on their phone"
                className="w-full rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              /> */}
            </motion.div>
          </div>
        </div>
      </motion.section>

      <FAQ />
    </motion.div>
  );
}