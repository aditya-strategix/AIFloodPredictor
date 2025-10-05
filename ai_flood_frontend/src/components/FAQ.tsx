import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "How accurate are the flood predictions?",
    answer: "Our AI models achieve 92% accuracy on average across all flood predictions. We continuously improve our models using real-time data and federated learning to ensure the highest precision possible."
  },
  {
    question: "What data sources does CloudWatch use?",
    answer: "CloudWatch integrates multiple data sources including IoT sensors for water levels and rainfall, satellite imagery, historical weather patterns, soil moisture sensors, and real-time weather data from meteorological services."
  },
  {
    question: "How do I set up sensors in my area?",
    answer: "Contact our technical team for sensor deployment consultation. We provide end-to-end setup including hardware installation, network configuration, and integration with our monitoring platform."
  },
  {
    question: "Is my location data kept private?",
    answer: "Yes, we use federated learning and privacy-preserving techniques to improve our models while keeping your personal data secure. Location data is anonymized and encrypted, and we never share individual user information."
  },
  {
    question: "Can I access historical flood data?",
    answer: "Premium users have access to historical flood data, trend analysis, and detailed reports. This includes past flood events, seasonal patterns, and long-term climate projections for your area."
  }
];

export function FAQ() {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <div className="bg-gray-50 py-20">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about CloudWatch flood prediction technology
          </p>
        </div>

        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-4 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-xl"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">
                    {item.question}
                  </h3>
                  <div className="flex-shrink-0">
                    {openItems.has(index) ? (
                      <ChevronUp className="w-5 h-5 text-blue-600" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </div>
              </button>
              
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openItems.has(index) ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-4">
                  <p className="text-gray-600 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Still have questions? We're here to help!
          </p>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}