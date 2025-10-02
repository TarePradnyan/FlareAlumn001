import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Calendar, TrendingUp, MessageCircle, Award, Shield, ArrowRight, CheckCircle } from 'lucide-react';

const Home = () => {
  return (
    <div className="bg-white" data-id="home-page">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-20 lg:py-28" data-id="hero-section">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6" data-id="hero-title">
                Connect, Grow, and Give Back
              </h1>
              <p className="text-xl lg:text-2xl text-blue-100 mb-8 leading-relaxed" data-id="hero-subtitle">
                The comprehensive alumni management platform that strengthens your community, fosters meaningful connections, and drives institutional growth.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/register" 
                  className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-colors flex items-center justify-center"
                  data-id="hero-cta-primary"
                >
                  Join Our Community
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link 
                  to="/alumni" 
                  className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg transition-colors text-center"
                  data-id="hero-cta-secondary"
                >
                  Explore Alumni
                </Link>
              </div>
            </div>
            <div className="mt-12 lg:mt-0">
              <img 
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Alumni networking" 
                className="rounded-lg shadow-2xl"
                data-id="hero-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50" data-id="features-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4" data-id="features-title">
              Powerful Features for Every User
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto" data-id="features-subtitle">
              From alumni networking to institutional management, our platform provides comprehensive tools for building stronger communities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow" data-id="feature-networking">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Alumni Networking</h3>
              <p className="text-gray-600 mb-4">
                Connect with fellow alumni, build professional relationships, and expand your network through our comprehensive directory.
              </p>
              <Link to="/alumni" className="text-blue-600 hover:text-blue-700 font-medium flex items-center">
                Explore Directory <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow" data-id="feature-events">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Event Management</h3>
              <p className="text-gray-600 mb-4">
                Organize reunions, professional workshops, and networking events with integrated RSVP and communication tools.
              </p>
              <a href="#" className="text-green-600 hover:text-green-700 font-medium flex items-center">
                View Events <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow" data-id="feature-mentorship">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <Award className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Mentorship Programs</h3>
              <p className="text-gray-600 mb-4">
                Connect experienced alumni with current students and recent graduates for career guidance and professional development.
              </p>
              <a href="#" className="text-purple-600 hover:text-purple-700 font-medium flex items-center">
                Join Program <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow" data-id="feature-analytics">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
                <TrendingUp className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Analytics & Insights</h3>
              <p className="text-gray-600 mb-4">
                Track engagement, monitor career progress, and gain valuable insights into your alumni community's growth and success.
              </p>
              <Link to="/dashboard" className="text-orange-600 hover:text-orange-700 font-medium flex items-center">
                View Dashboard <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow" data-id="feature-communication">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                <MessageCircle className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Communication Hub</h3>
              <p className="text-gray-600 mb-4">
                Facilitate seamless communication through messaging, announcements, and targeted outreach to specific alumni groups.
              </p>
              <a href="#" className="text-red-600 hover:text-red-700 font-medium flex items-center">
                Start Messaging <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow" data-id="feature-security">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                <Shield className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Secure & Compliant</h3>
              <p className="text-gray-600 mb-4">
                Enterprise-grade security with privacy controls, data encryption, and compliance with educational data protection standards.
              </p>
              <a href="#" className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center">
                Learn More <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Target Audiences Section */}
      <section className="py-20 bg-white" data-id="audiences-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4" data-id="audiences-title">
              Built for Every Member of Your Community
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto" data-id="audiences-subtitle">
              Our platform serves diverse stakeholders, creating value for alumni, students, faculty, and institutional leaders.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <div className="space-y-6" data-id="audience-left">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mt-1">
                  <CheckCircle className="h-5 w-5 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Alumni</h3>
                  <p className="text-gray-600">
                    Stay connected with your alma mater, network with peers, find mentorship opportunities, and give back to current students.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mt-1">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Current Students</h3>
                  <p className="text-gray-600">
                    Access mentorship programs, internship opportunities, career guidance, and build connections for your professional future.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mt-1">
                  <CheckCircle className="h-5 w-5 text-purple-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Faculty & Administrators</h3>
                  <p className="text-gray-600">
                    Manage alumni relationships, track engagement, organize events, and leverage alumni expertise for institutional growth.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6" data-id="audience-right">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mt-1">
                  <CheckCircle className="h-5 w-5 text-orange-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">University Management</h3>
                  <p className="text-gray-600">
                    Gain strategic insights, track institutional impact, manage donor relationships, and drive fundraising initiatives.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mt-1">
                  <CheckCircle className="h-5 w-5 text-red-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Employers & Recruiters</h3>
                  <p className="text-gray-600">
                    Access a qualified talent pipeline, post job opportunities, and connect with skilled professionals from your target institutions.
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 mt-8">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Ready to Transform Your Alumni Network?</h4>
                <p className="text-gray-600 mb-4">
                  Join thousands of institutions already using AlumniConnect to build stronger, more engaged communities.
                </p>
                <Link 
                  to="/register" 
                  className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center"
                >
                  Get Started Today
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;