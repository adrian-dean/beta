'use client';

import { motion } from 'framer-motion';
import { useToast } from '@/components/Toast';
import { useState } from 'react';
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline';

const formVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function ContactPage() {
  const { addToast } = useToast();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you'd send this data to a backend (e.g., Formspree, Netlify Forms, custom API)
    console.log('Form data submitted:', formData);

    // Simulate success
    addToast('Message sent successfully!', 'success');
    setFormData({ name: '', email: '', message: '' }); // Clear form

    // Simulate error
    // addToast('Failed to send message.', 'error');
  };

  const contactInfo = [
    { icon: EnvelopeIcon, label: 'Email', value: 'your.email@example.com', link: 'mailto:your.email@example.com' },
    { icon: PhoneIcon, label: 'Phone', value: '+1 (123) 456-7890', link: 'tel:+11234567890' },
    { icon: MapPinIcon, label: 'Location', value: 'Myrtle Grove, FL, USA' },
  ];

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <motion.h1
        className="text-5xl font-bold text-center text-primary dark:text-secondary mb-12"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Get In Touch
      </motion.h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <motion.div
          className="bg-card dark:bg-card-dark p-8 rounded-xl shadow-lg"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={formVariants}
        >
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Send Me a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:focus:border-secondary sm:text-sm"
                  aria-label="Your Name"
                  placeholder="John Doe"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:focus:border-secondary sm:text-sm"
                  aria-label="Your Email"
                  placeholder="john.doe@example.com"
                />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Message
              </label>
              <div className="mt-1">
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:focus:border-secondary sm:text-sm"
                  aria-label="Your Message"
                  placeholder="Tell me about your project or inquiry..."
                ></textarea>
              </div>
            </div>
            <motion.button
              type="submit"
              className="inline-flex justify-center rounded-md border border-transparent bg-primary dark:bg-secondary py-3 px-6 text-base font-medium text-white shadow-sm hover:bg-secondary dark:hover:bg-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Send Message
            </motion.button>
          </form>
        </motion.div>

        <motion.div
          className="bg-card dark:bg-card-dark p-8 rounded-xl shadow-lg flex flex-col justify-between"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={formVariants}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Contact Information</h2>
          <div className="space-y-6">
            {contactInfo.map((item) => (
              <div key={item.label} className="flex items-start gap-4">
                <item.icon className="h-7 w-7 text-primary dark:text-secondary flex-shrink-0 mt-1" />
                <div>
                  <p className="text-lg font-medium text-gray-900 dark:text-gray-100">{item.label}</p>
                  {item.link ? (
                    <a
                      href={item.link}
                      className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-secondary transition-colors text-base"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-gray-700 dark:text-gray-300 text-base">{item.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center text-gray-600 dark:text-gray-400">
            <p>I look forward to hearing from you!</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
