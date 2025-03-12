"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FiSend,
  FiMail,
  FiMapPin,
  FiPhone,
  FiGithub,
  FiTwitter,
  FiLinkedin,
  FiInstagram,
} from "react-icons/fi";

const Contact = React.forwardRef((props, ref) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Reset form after showing success message
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: "", email: "", message: "" });
      }, 3000);
    }, 1500);
  };

  return (
    <section ref={ref} className="relative overflow-hidden z-20" id="contact">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="mb-8 font-mono text-sm md:text-base text-blue-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center text-white">
            Get In Touch
          </h2>
          <p className="text-center text-gray-400 mb-10 max-w-2xl mx-auto">
            Have a question or want to work together? I'd love to hear from you!
          </p>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {/* Contact Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="lg:col-span-1 space-y-6"
          >
            {/* Contact cards */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transform transition-all hover:scale-105">
              <div className="flex items-start">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-full">
                  <FiMail className="text-blue-500 text-xl" />
                </div>
                <div className="ml-4">
                  <h3 className="font-medium text-lg mb-1 dark:text-white">
                    Email
                  </h3>
                  <a
                    href="mailto:hello@example.com"
                    className="text-gray-500 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition"
                  >
                    hello@example.com
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transform transition-all hover:scale-105">
              <div className="flex items-start">
                <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-full">
                  <FiMapPin className="text-purple-500 text-xl" />
                </div>
                <div className="ml-4">
                  <h3 className="font-medium text-lg mb-1 dark:text-white">
                    Location
                  </h3>
                  <p className="text-gray-500 dark:text-gray-300">
                    San Francisco, CA
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transform transition-all hover:scale-105">
              <div className="flex items-start">
                <div className="p-3 bg-pink-50 dark:bg-pink-900/20 rounded-full">
                  <FiPhone className="text-pink-500 text-xl" />
                </div>
                <div className="ml-4">
                  <h3 className="font-medium text-lg mb-1 dark:text-white">
                    Phone
                  </h3>
                  <p className="text-gray-500 dark:text-gray-300">
                    +1 (555) 123-4567
                  </p>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h3 className="font-medium text-lg mb-4 dark:text-white">
                Connect
              </h3>
              <div className="flex space-x-4">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-600 dark:text-gray-300 hover:bg-blue-500 hover:text-white dark:hover:bg-blue-500 transition-all"
                >
                  <FiGithub className="text-xl" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-600 dark:text-gray-300 hover:bg-blue-500 hover:text-white dark:hover:bg-blue-500 transition-all"
                >
                  <FiTwitter className="text-xl" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-600 dark:text-gray-300 hover:bg-blue-500 hover:text-white dark:hover:bg-blue-500 transition-all"
                >
                  <FiLinkedin className="text-xl" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-600 dark:text-gray-300 hover:bg-blue-500 hover:text-white dark:hover:bg-blue-500 transition-all"
                >
                  <FiInstagram className="text-xl" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold mb-6 dark:text-white">
                Send a Message
              </h3>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center"
                >
                  <div className="mb-4 inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/20 text-green-500 rounded-full">
                    <svg
                      className="w-8 h-8"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold mb-2 dark:text-white">
                    Message Sent!
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Thank you for reaching out. I'll get back to you soon.
                  </p>
                </motion.div>
              ) : (
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium mb-2 dark:text-white"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 dark:text-white"
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium mb-2 dark:text-white"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 dark:text-white"
                        placeholder="Your email"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium mb-2 dark:text-white"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 dark:text-white"
                      placeholder="Your message"
                      required
                    ></textarea>
                  </div>

                  <div className="text-right">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`px-8 py-3 ${
                        isSubmitting
                          ? "bg-blue-400"
                          : "bg-blue-600 hover:bg-blue-700"
                      } text-white font-medium rounded-lg transition duration-300 flex items-center space-x-2 ml-auto`}
                    >
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <FiSend className="ml-2" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

Contact.displayName = "Contact";

export default Contact;
