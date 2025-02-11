import React, { useState } from 'react';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form submitted:', formData);
    };

    const contactInfo = [
        {
            title: "Main Office",
            address: "123 Library Street, Tech City, TC 12345",
            phone: "+1 (555) 123-4567",
            email: "info@librarymanager.com",
            hours: "Monday - Friday: 9:00 AM - 6:00 PM"
        },
        {
            title: "Technical Support",
            phone: "+1 (555) 987-6543",
            email: "support@librarymanager.com",
            hours: "24/7 Support Available"
        }
    ];

    const faqs = [
        {
            question: "How quickly can I get started?",
            answer: "Our setup process is quick and efficient. Most libraries can be up and running within 24-48 hours."
        },
        {
            question: "Do you offer training?",
            answer: "Yes, we provide comprehensive training sessions for staff members and administrators."
        },
        {
            question: "What support options are available?",
            answer: "We offer 24/7 technical support, regular maintenance, and dedicated account managers."
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-white">
                <div className="max-w-7xl mx-auto py-16 px-4">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            Get in Touch
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            We're here to help you transform your library operations. Reach out to us with any questions or concerns.
                        </p>
                    </div>
                </div>
            </div>

            {/* Contact Form and Info Section */}
            <div className="max-w-7xl mx-auto py-16 px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows="4"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        required
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors"
                                >
                                    Send Message
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Contact Information */}
                    <div>
                        {contactInfo.map((info, index) => (
                            <div key={index} className="bg-white p-8 rounded-lg shadow-lg mb-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">{info.title}</h3>
                                {info.address && (
                                    <p className="text-gray-600 mb-2">
                                        📍 {info.address}
                                    </p>
                                )}
                                <p className="text-gray-600 mb-2">
                                    📞 {info.phone}
                                </p>
                                <p className="text-gray-600 mb-2">
                                    ✉️ {info.email}
                                </p>
                                <p className="text-gray-600">
                                    🕒 {info.hours}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* FAQs Section */}
            <div className="bg-gray-100">
                <div className="max-w-7xl mx-auto py-16 px-4">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                        Frequently Asked Questions
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {faqs.map((faq, index) => (
                            <div key={index} className="bg-white p-6 rounded-lg shadow">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    {faq.question}
                                </h3>
                                <p className="text-gray-600">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;