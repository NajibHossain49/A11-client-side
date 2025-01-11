import React from 'react';
import { Book, Bookmark, Star, Coffee, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const LandingSection = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
            {/* Floating Books Animation */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {['top-20 left-10', 'top-40 right-20', 'bottom-20 left-1/4', 'top-1/3 right-1/4'].map((position, i) => (
                    <div key={i} className={`absolute ${position} animate-bounce`} style={{ animationDelay: `${i * 0.5}s` }}>
                        <BookOpen className="w-8 h-8 text-indigo-400 opacity-30" />
                    </div>
                ))}
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 relative">
                {/* Hero Section */}
                <div className="pt-20 pb-12 text-center">
                    <div className="inline-block animate-spin-slow">
                        <div className="w-32 h-32 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
                            <Book className="w-16 h-16 text-white" />
                        </div>
                    </div>
                    <h1 className="text-6xl font-bold mt-8 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        LibraryLink
                    </h1>
                    <p className="text-2xl mt-4 text-gray-600">Where stories come alive</p>
                </div>

                {/* Feature Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto py-12">
                    {[
                        {
                            icon: <Star className="w-8 h-8" />,
                            title: "Discover",
                            description: "Explore our vast collection of books, journals, and digital resources",
                            color: "from-yellow-400 to-orange-500"
                        },
                        {
                            icon: <Bookmark className="w-8 h-8" />,
                            title: "Connect",
                            description: "Join reading clubs and participate in literary events",
                            color: "from-green-400 to-emerald-500"
                        },
                        {
                            icon: <Coffee className="w-8 h-8" />,
                            title: "Experience",
                            description: "Enjoy our modern facilities and quiet study spaces",
                            color: "from-blue-400 to-indigo-500"
                        }
                    ].map((card, index) => (
                        <div
                            key={index}
                            className="group relative overflow-hidden rounded-2xl p-8 transition-all hover:-translate-y-2 hover:shadow-xl"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br opacity-90 transition-opacity group-hover:opacity-100"
                                style={{ backgroundColor: '#fff' }}></div>
                            <div className="relative">
                                <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${card.color} p-4 text-white mb-6`}>
                                    {card.icon}
                                </div>
                                <h3 className="text-2xl font-bold mb-2">{card.title}</h3>
                                <p className="text-gray-600">{card.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto py-16 text-center">
                    {[
                        { number: "50K+", label: "Books Available" },
                        { number: "10K+", label: "Active Members" },
                        { number: "1000+", label: "Monthly Events" },
                        { number: "24/7", label: "Digital Access" }
                    ].map((stat, index) => (
                        <div key={index} className="group cursor-pointer hover:scale-105 transition-transform">
                            <div className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                {stat.number}
                            </div>
                            <div className="text-gray-600 mt-2">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* CTA Section */}
                <div className="text-center pb-16">
                    <Link to="/All-Books">
                        <button className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-8 py-3 rounded-full hover:shadow-lg transition-all hover:-translate-y-1">
                            Get Started
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LandingSection;