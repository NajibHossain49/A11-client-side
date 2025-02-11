import React from 'react';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  const features = [
    {
      title: "Digital Catalog Management",
      description: "Efficiently organize and manage your entire library collection with our advanced digital cataloging system.",
      icon: "📚"
    },
    {
      title: "Member Management",
      description: "Keep track of member records, borrowing history, and preferences with our intuitive management system.",
      icon: "👥"
    },
    {
      title: "Real-time Availability",
      description: "Check book availability instantly and manage reservations with our real-time tracking system.",
      icon: "🔍"
    },
    {
      title: "Analytics Dashboard",
      description: "Make data-driven decisions with comprehensive analytics on library usage and popular titles.",
      icon: "📊"
    }
  ];

  const stats = [
    { number: "50,000+", label: "Books in Collection" },
    { number: "10,000+", label: "Active Members" },
    { number: "24/7", label: "Digital Access" },
    { number: "99%", label: "User Satisfaction" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Transforming Library Management
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Welcome to the future of library management. Our system combines cutting-edge technology with user-friendly design to create the perfect solution for modern libraries.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-indigo-700">
        <div className="max-w-7xl mx-auto py-12 px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-white">{stat.number}</div>
                <div className="text-indigo-100 mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto py-16 px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">
            Powerful Features for Modern Libraries
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mission Section */}
      <div className="bg-gray-100">
        <div className="max-w-7xl mx-auto py-16 px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-gray-600 mb-4">
                We believe in making knowledge accessible to everyone. Our mission is to empower libraries with digital tools that streamline operations and enhance the user experience.
              </p>
              <p className="text-gray-600">
                By combining traditional library values with modern technology, we're creating an ecosystem where libraries can thrive in the digital age while maintaining their essential role in communities.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Innovation</h3>
                <p className="text-gray-600">Constantly evolving to meet modern library needs</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Efficiency</h3>
                <p className="text-gray-600">Streamlined operations for better service</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Accessibility</h3>
                <p className="text-gray-600">Making knowledge available to everyone</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Community</h3>
                <p className="text-gray-600">Building stronger library communities</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="max-w-7xl mx-auto py-16 px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Get in Touch
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Have questions about our library management system? We're here to help!
          </p>
          <Link to="/ContactUs">
            <button className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors">
              Contact Us
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;