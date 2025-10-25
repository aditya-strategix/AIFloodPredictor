import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Users, Shield, Zap, CheckCircle } from 'lucide-react';
import { LoadingSpinner } from '../LoadingSpinner';
import { useToast } from '../../hooks/useToast';
import { ToastContainer } from '../Toast';

interface ContactSectionProps {
  isVisible: boolean;
}

export function ContactSection({ isVisible }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    inquiryType: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toasts, removeToast, showSuccess, showError } = useToast();

  const inquiryTypes = [
    'General Inquiry',
    'Partnership Opportunity',
    'Technical Support',
    'Demo Request'
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.inquiryType) {
      newErrors.inquiryType = 'Please select an inquiry type';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      showError('Please fill in all required fields correctly');
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSubmitting(false);
      setIsSubmitted(true);
      showSuccess('Message sent successfully! We\'ll get back to you within 24 hours.');
    } catch (error) {
      setIsSubmitting(false);
      showError('Failed to send message. Please try again.');
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (isSubmitted) {
    return (
      <section id="contact" className={`py-20 bg-white transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Message Sent Successfully!</h1>
            <p className="text-xl text-gray-600 mb-8">
              Thank you for contacting CloudWatch. We'll get back to you within 24 hours.
            </p>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setFormData({
                  fullName: '',
                  email: '',
                  inquiryType: '',
                  subject: '',
                  message: ''
                });
              }}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Send Another Message
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className={`py-20 bg-white transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      <div className="max-w-screen-xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Get in Touch</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Questions about CloudWatch? We'd love to hear from you. Send us a message 
            and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-gray-50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.fullName ? 'border-red-300' : 'border-gray-200'
                    }`}
                    placeholder="Enter your full name"
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.email ? 'border-red-300' : 'border-gray-200'
                    }`}
                    placeholder="Enter your email address"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Inquiry Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Inquiry Type *
                  </label>
                  <select
                    value={formData.inquiryType}
                    onChange={(e) => handleInputChange('inquiryType', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.inquiryType ? 'border-red-300' : 'border-gray-200'
                    }`}
                  >
                    <option value="">Select inquiry type</option>
                    {inquiryTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  {errors.inquiryType && (
                    <p className="text-red-500 text-sm mt-1">{errors.inquiryType}</p>
                  )}
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.subject ? 'border-red-300' : 'border-gray-200'
                    }`}
                    placeholder="Brief description of your inquiry"
                  />
                  {errors.subject && (
                    <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    rows={6}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.message ? 'border-red-300' : 'border-gray-200'
                    }`}
                    placeholder="Tell us more about your inquiry..."
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-green-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {isSubmitting ? (
                    <>
                      <LoadingSpinner size={20} />
                      Sending Message...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            {/* Contact Details */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Contact Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Email</p>
                    <p className="text-gray-600">hello@cloudwatch.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Phone</p>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                    <p className="text-sm text-gray-500">Mon-Fri, 9 AM - 6 PM PST</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Address</p>
                    <p className="text-gray-600">San Francisco, CA</p>
                  </div>
                </div>
              </div>
            </div>

            {/* How We Help */}
            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">How We Can Help</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Users className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Partnerships</p>
                    <p className="text-sm text-gray-600">Collaborate on flood prevention initiatives</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Shield className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Technical Support</p>
                    <p className="text-sm text-gray-600">Get help with implementation and integration</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Zap className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Product Demo</p>
                    <p className="text-sm text-gray-600">See CloudWatch in action for your community</p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Link */}
            <div className="text-center">
              <p className="text-gray-600 mb-4">
                Looking for quick answers? Check out our FAQ section for common questions about CloudWatch.
              </p>
              <button className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
                View FAQ →
              </button>
            </div>
          </div>
        </div>

        {/* Quick Response Note */}
        <div className="mt-16 text-center bg-gray-50 py-8 px-6 rounded-xl">
          <p className="text-lg text-gray-700">
            <strong>Quick Response Guarantee:</strong> We respond to all inquiries within 24 hours during business days. 
            For urgent flood-related emergencies, please contact your local emergency services immediately.
          </p>
        </div>
      </div>
    </section>
  );
}