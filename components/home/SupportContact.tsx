'use client';
import React, { useState, FormEvent } from 'react';
import { Mail, Phone, MapPin, Send, AlertTriangle } from 'lucide-react';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const SupportContact: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [formErrors, setFormErrors] = useState<Partial<ContactFormData>>({});
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateForm = (): boolean => {
    const errors: Partial<ContactFormData> = {};
    
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    if (!formData.message.trim()) errors.message = 'Message is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Simulate form submission
      try {
        // Replace with actual form submission logic
        console.log('Form submitted', formData);
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } catch (error) {
        setSubmitStatus('error');
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <section className="hero-gradient py-16 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
        {/* Contact Information */}
        <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact Information</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Mail className="text-blue-600" />
              <span>support@wemace.com</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="text-green-600" />
              <span>+91 123 456 7890</span>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="text-red-600" />
              <span>Bangalore, Karnataka, India</span>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Send Us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full p-3 border rounded-md transition ${formErrors.name ? 'border-red-500' : 'border-gray-300'}`}
              />
              {formErrors.name && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertTriangle className="mr-2 h-4 w-4" /> {formErrors.name}
                </p>
              )}
            </div>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full p-3 border rounded-md transition ${formErrors.email ? 'border-red-500' : 'border-gray-300 '}`}
              />
              {formErrors.email && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertTriangle className="mr-2 h-4 w-4" /> {formErrors.email}
                </p>
              )}
            </div>
            <div>
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number (Optional)"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md transition"
              />
            </div>
            <div>
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className={`w-full p-3 border rounded-md transition ${formErrors.message ? 'border-red-500' : 'border-gray-300'}`}
              />
              {formErrors.message && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertTriangle className="mr-2 h-4 w-4" /> {formErrors.message}
                </p>
              )}
            </div>
            <button 
              type="submit" 
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition flex items-center justify-center"
            >
              <Send className="mr-2" /> Send Message
            </button>
            
            {submitStatus === 'success' && (
              <div className="bg-green-100 text-green-700 p-3 rounded-md mt-4 text-center">
                Message sent successfully! We&apos;ll get back to you soon.
              </div>
            )}
            {submitStatus === 'error' && (
              <div className="bg-red-100 text-red-700 p-3 rounded-md mt-4 text-center">
                Failed to send message. Please try again.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default SupportContact;