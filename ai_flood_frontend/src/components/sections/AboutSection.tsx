import { Target, Eye, Shield, Users, Globe, CheckCircle, Zap } from 'lucide-react';
interface AboutSectionProps {
  isVisible: boolean;
}

export function AboutSection({ isVisible }: AboutSectionProps) {
  const teamMembers = [
    {
      name: "Dr. Sarah Chen",
      role: "Lead AI Researcher",
      specialization: "PhD in Environmental Engineering from MIT, specializing in flood prediction models.",
      image: "https://images.unsplash.com/photo-1758270705317-3ef6142d306f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHx0ZWFtJTIwcHJvZmVzc2lvbmFscyUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzU5MDU3OTA4fDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      name: "Marcus Rodriguez",
      role: "IoT Systems Engineer",
      specialization: "Expert in sensor networks and real-time data processing for environmental monitoring.",
      image: "https://images.unsplash.com/photo-1758270705317-3ef6142d306f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHx0ZWFtJTIwcHJvZmVzc2lvbmFscyUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzU5MDU3OTA4fDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      name: "Dr. Aisha Patel",
      role: "Climate Data Scientist",
      specialization: "Former NASA researcher with 10+ years in climate modeling and weather prediction.",
      image: "https://images.unsplash.com/photo-1758270705317-3ef6142d306f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHx0ZWFtJTIwcHJvZmVzc2lvbmFscyUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzU5MDU3OTA4fDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      name: "James Liu",
      role: "Software Architect",
      specialization: "Full-stack developer focused on scalable systems for disaster response applications.",
      image: "https://images.unsplash.com/photo-1758270705317-3ef6142d306f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHx0ZWFtJTIwcHJvZmVzc2lvbmFscyUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzU5MDU3OTA4fDA&ixlib=rb-4.1.0&q=80&w=1080"
    }
  ];

  const values = [
    {
      icon: <Target className="w-8 h-8 text-blue-600" />,
      title: "Accuracy",
      description: "We strive for the highest precision in flood predictions through continuous model improvement and validation."
    },
    {
      icon: <Users className="w-8 h-8 text-green-600" />,
      title: "Community Focus",
      description: "Our technology is designed with local communities in mind, ensuring accessibility and practical value."
    },
    {
      icon: <Shield className="w-8 h-8 text-purple-600" />,
      title: "Privacy",
      description: "We use federated learning to improve our models while keeping your personal data secure and private."
    },
    {
      icon: <Globe className="w-8 h-8 text-teal-600" />,
      title: "Global Impact",
      description: "Working towards worldwide flood resilience through open science and collaborative partnerships."
    }
  ];

  const impactStats = [
    {
      icon: <CheckCircle className="w-6 h-6 text-blue-600" />,
      value: "92%",
      label: "Prediction Accuracy",
      description: "Average accuracy across all flood predictions"
    },
    {
      icon: <Users className="w-6 h-6 text-green-600" />,
      value: "1.2M",
      label: "People Protected",
      description: "Lives safeguarded through early warning systems"
    },
    {
      icon: <Globe className="w-6 h-6 text-purple-600" />,
      value: "150+",
      label: "Communities Served",
      description: "Active deployments across the globe"
    },
    {
      icon: <Shield className="w-6 h-6 text-teal-600" />,
      value: "$2.5B",
      label: "Damage Prevented",
      description: "Economic losses avoided through predictions"
    }
  ];

  return (
    <section id="about" className={`py-20 bg-gray-50 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="max-w-screen-xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">About CloudWatch</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're a team of researchers, engineers, and data scientists dedicated to making 
            communities safer through advanced flood prediction technology.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Mission */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
            </div>
            <div className="space-y-4">
              <p className="text-lg text-gray-700 leading-relaxed">
                To democratize access to accurate flood prediction technology, empowering 
                communities worldwide to prepare for, respond to, and recover from flood events 
                more effectively.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Through cutting-edge AI, real-time sensor networks, and privacy-preserving data 
                science, we're building a future where no community is caught off-guard by 
                flooding disasters.
              </p>
            </div>
          </div>

          {/* Vision */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Eye className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Our Vision</h2>
            </div>
            <div className="space-y-4">
              <p className="text-lg text-gray-700 leading-relaxed">
                A world where every person has access to timely, accurate flood warnings, 
                enabling proactive disaster preparedness and significantly reducing the human 
                and economic impact of flooding.
              </p>
              
              {/* Impact Metrics */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-blue-600">50%</div>
                  <div className="text-sm text-gray-600">Reduction in flood damage</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-green-600">1M+</div>
                  <div className="text-sm text-gray-600">Lives protected globally</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="bg-white py-20 -mx-6 px-6 mb-20">
          <div className="max-w-screen-xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
              <p className="text-xl text-gray-600">
                The principles that guide our work and decision-making
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm">
                      {value.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">{value.title}</h3>
                  <p className="text-gray-600 text-center leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team */}


        {/* Impact */}
        <div className="bg-white py-20 -mx-6 px-6 mb-12">
          <div className="max-w-screen-xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Impact</h2>
              <p className="text-xl text-gray-600">
                Real results from communities using CloudWatch technology
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {impactStats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition-all duration-300 text-center"
                >
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                      {stat.icon}
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">{stat.value}</div>
                  <h3 className="font-semibold text-gray-900 mb-2">{stat.label}</h3>
                  <p className="text-sm text-gray-600">{stat.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 to-green-500 rounded-2xl p-12 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
              <Zap className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Join Our Mission</h2>
            <p className="text-xl text-white/90 mb-8">
              Help us build a safer, more resilient world. Whether you're a researcher, 
              developer, or community leader, there's a place for you in our mission.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                Get Involved
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                Try the Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}