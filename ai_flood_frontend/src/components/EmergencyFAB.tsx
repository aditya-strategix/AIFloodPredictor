import { useState } from 'react';
import { Phone, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function EmergencyFAB() {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Emergency numbers for different regions (you can customize these)
  const emergencyNumbers = [
    { label: 'Disaster Management', number: '108', description: 'Emergency Response' },
    { label: 'Fire & Rescue', number: '101', description: 'Fire Emergency' },
    { label: 'Police', number: '100', description: 'Police Emergency' },
    { label: 'Medical Emergency', number: '102', description: 'Ambulance' }
  ];

  const handleCall = (phoneNumber: string) => {
    window.location.href = `tel:${phoneNumber}`;
    setIsExpanded(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.2 }}
            className="mb-4 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden min-w-64"
          >
            <div className="p-4 bg-red-500 text-white">
              <h3 className="font-semibold">Emergency Contacts</h3>
              <p className="text-sm opacity-90">Tap to call immediately</p>
            </div>
            <div className="p-2">
              {emergencyNumbers.map((contact, index) => (
                <button
                  key={index}
                  onClick={() => handleCall(contact.number)}
                  className="w-full p-3 text-left hover:bg-gray-50 transition-colors duration-200 rounded-md flex items-center gap-3 group"
                >
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center group-hover:bg-red-200 transition-colors">
                    <Phone className="w-5 h-5 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">{contact.label}</div>
                    <div className="text-sm text-gray-600">{contact.description}</div>
                  </div>
                  <div className="font-bold text-red-600">{contact.number}</div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
          isExpanded
            ? 'bg-gray-600 hover:bg-gray-700'
            : 'bg-red-500 hover:bg-red-600 animate-pulse-soft'
        }`}
        aria-label={isExpanded ? 'Close emergency contacts' : 'Open emergency contacts'}
      >
        <AnimatePresence mode="wait">
          {isExpanded ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="phone"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Phone className="w-6 h-6 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Pulse ring animation */}
      {!isExpanded && (
        <div className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-25 pointer-events-none" />
      )}
    </div>
  );
}