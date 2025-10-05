import { ArrowRight, Shield, Zap, Users } from 'lucide-react';

interface HeroSectionProps {
  onNavigate: (section: string) => void;
}

export function HeroSection({ onNavigate }: HeroSectionProps) {
  const trustedBy = ['UNESCO', 'NASA', 'MIT', 'Stanford'];

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0">
        <div 
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1509551520352-7daa69b6b255?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbG9vZCUyMHdhdGVyJTIwb2NlYW4lMjBzdG9ybSUyMGRyYW1hdGljJTIwc2t5fGVufDF8fHx8MTc1OTE0NDUyMnww&ixlib=rb-4.1.0&q=80&w=1080')`,
            opacity: 0.8 
          }}
        />
        {/* Gradient overlay to ensure text readability */}
        <video 
          className="absolute inset-0 w-full h-full object-cover"
          src="https://videos.pexels.com/video-files/4298606/4298606-hd_1920_1080_25fps.mp4"
          autoPlay
          muted
          loop
          playsInline
          aria-label="Flood destruction background video"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-blue-800/80 to-green-800/80" />
        </video>
      </div>
      
      {/* Subtle Water Wave SVG Illustration */}
      <svg 
        width="200" 
        height="100" 
        className="absolute top-[20%] right-[5%] opacity-10 hidden lg:block"
        viewBox="0 0 200 100"
      >
        <path 
          d="M0 50 Q50 0 100 50 Q150 100 200 50" 
          fill="none" 
          stroke="#E3F2FD" 
          strokeWidth="2"
        />
        <path 
          d="M0 60 Q50 10 100 60 Q150 110 200 60" 
          fill="none" 
          stroke="#E3F2FD" 
          strokeWidth="1.5"
          opacity="0.7"
        />
        <path 
          d="M0 40 Q50 -10 100 40 Q150 90 200 40" 
          fill="none" 
          stroke="#E3F2FD" 
          strokeWidth="1"
          opacity="0.5"
        />
      </svg>

      <div className="relative z-10 max-w-screen-xl mx-auto px-6 py-24">
        <div className="text-center max-w-4xl mx-auto">
          {/* Hero Content */}
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Predict Floods,
            <br />
            <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              Save Lives
            </span>
          </h1>
          
          <p className="text-xl lg:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            AI-powered flood prediction system that helps communities prepare for natural disasters 
            with real-time monitoring and early warning alerts.
          </p>

          <button
            onClick={() => onNavigate('dashboard')}
            className="bg-white text-green-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#1E7E34] hover:text-white transition-all duration-500 inline-flex items-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Check Flood Risk
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Flood Impact Image Section */}
        <div className="mt-16 text-center">
          <img 
            src="https://images.unsplash.com/photo-1723551909082-866e0e48afb4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbG9vZCUyMGRlc3RydWN0aW9uJTIwYWZ0ZXJtYXRoJTIwZGFtYWdlfGVufDF8fHx8MTc1OTE0NDA0Mnww&ixlib=rb-4.1.0&q=80&w=1080" 
            alt="Flood destruction aftermath" 
            className="w-full max-w-4xl mx-auto rounded-lg shadow-lg"
            style={{ margin: '32px auto' }}
          />
          <p className="text-lg text-white/80 mt-4">Impact of Floods</p>
        </div>

      </div>

      {/* How It Works Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Three simple steps to advanced flood prediction and community protection.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="w-8 h-8 text-green-600" />,
                title: "IoT Sensors Capture Data",
                description: "Smart sensors monitor water levels, rainfall, and soil moisture in real-time across your region."
              },
              {
                icon: <Shield className="w-8 h-8 text-blue-600" />,
                title: "AI Models Predict Floods",
                description: "Advanced machine learning algorithms analyze patterns and predict flood probability with high accuracy."
              },
              {
                icon: <Users className="w-8 h-8 text-green-600" />,
                title: "Communities Stay Informed",
                description: "Residents receive timely alerts and actionable insights to prepare for potential flooding."
              }
            ].map((step, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">{step.title}</h3>
                <p className="text-gray-600 text-center leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Live Environmental Data Preview */}
      <div className="bg-blue-50 py-20">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Live Environmental Data</h2>
            <p className="text-xl text-gray-600">
              Real-time monitoring of key flood indicators in your area.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Dam Water Levels",
                value: "78%",
                change: "+13%",
                status: "medium",
                description: "Previous year: 65%"
              },
              {
                title: "Rainfall (24h)",
                value: "45mm",
                change: "+32%",
                status: "high",
                description: "Previous year: 12mm"
              },
              {
                title: "Soil Moisture",
                value: "89%",
                change: "+1%",
                status: "low",
                description: "Previous year: 72%"
              }
            ].map((metric, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-gray-900">{metric.title}</h3>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      metric.status === 'low'
                        ? 'bg-green-100 text-green-800'
                        : metric.status === 'medium'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {metric.status === 'low' ? 'Low Risk' : metric.status === 'medium' ? 'Medium' : 'High Risk'}
                  </span>
                </div>
                <div className="text-3xl font-bold text-blue-600 mb-2">{metric.value}</div>
                <div className="text-sm text-gray-600 mb-2">{metric.description}</div>
                <div className={`text-sm font-medium ${
                  metric.status === 'low' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.change} change
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}