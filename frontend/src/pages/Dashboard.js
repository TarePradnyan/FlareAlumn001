import React, { useState } from 'react';
import { Users, Calendar, TrendingUp, DollarSign, MessageSquare, Award, Activity, Bell, Plus, Download, Filter } from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { title: 'Total Alumni', value: '12,847', change: '+5.2%', icon: Users, color: 'blue' },
    { title: 'Active Members', value: '8,923', change: '+12.3%', icon: Activity, color: 'green' },
    { title: 'Upcoming Events', value: '24', change: '+8.1%', icon: Calendar, color: 'purple' },
    { title: 'Total Donations', value: '$485,230', change: '+15.7%', icon: DollarSign, color: 'orange' },
  ];

  const recentActivities = [
    { name: 'Sarah Johnson', action: 'joined the platform', time: '2 hours ago', avatar: 'SJ' },
    { name: 'Tech Alumni Meetup', action: 'event created', time: '4 hours ago', avatar: 'TA' },
    { name: 'Michael Chen', action: 'made a donation', time: '6 hours ago', avatar: 'MC' },
    { name: 'Career Workshop', action: 'event started', time: '1 day ago', avatar: 'CW' },
    { name: 'Alumni Newsletter', action: 'was published', time: '2 days ago', avatar: 'AN' },
  ];

  const upcomingEvents = [
    { title: 'Annual Homecoming', date: '2024-03-15', attendees: 342, type: 'Social' },
    { title: 'Career Fair 2024', date: '2024-03-22', attendees: 156, type: 'Professional' },
    { title: 'Alumni Golf Tournament', date: '2024-04-05', attendees: 87, type: 'Recreation' },
    { title: 'Mentorship Kickoff', date: '2024-04-12', attendees: 234, type: 'Educational' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8" data-id="dashboard-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8" data-id="dashboard-header">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900" data-id="dashboard-title">Dashboard</h1>
              <p className="mt-1 text-sm text-gray-500" data-id="dashboard-subtitle">
                Welcome back! Here's what's happening in your alumni community.
              </p>
            </div>
            <div className="mt-4 sm:mt-0 flex items-center space-x-4">
              <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 flex items-center" data-id="export-button">
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center" data-id="create-event-button">
                <Plus className="h-4 w-4 mr-2" />
                Create Event
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8" data-id="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-6" data-id={`stat-card-${index}`}>
              <div className="flex items-center">
                <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                  <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <div className="flex items-center">
                    <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                    <span className="ml-2 text-sm text-green-600 font-medium">{stat.change}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activities */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow" data-id="recent-activities">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Recent Activities</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-center" data-id={`activity-${index}`}>
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-medium text-sm">
                        {activity.avatar}
                      </div>
                      <div className="ml-4 flex-1">
                        <p className="text-sm text-gray-900">
                          <span className="font-medium">{activity.name}</span> {activity.action}
                        </p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                      <Bell className="h-4 w-4 text-gray-400" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow mt-8" data-id="quick-actions">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Quick Actions</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <button className="flex flex-col items-center p-4 text-center border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors" data-id="action-send-message">
                    <MessageSquare className="h-8 w-8 text-gray-400 mb-2" />
                    <span className="text-sm font-medium text-gray-900">Send Message</span>
                  </button>
                  <button className="flex flex-col items-center p-4 text-center border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors" data-id="action-create-event">
                    <Calendar className="h-8 w-8 text-gray-400 mb-2" />
                    <span className="text-sm font-medium text-gray-900">Create Event</span>
                  </button>
                  <button className="flex flex-col items-center p-4 text-center border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors" data-id="action-add-alumni">
                    <Users className="h-8 w-8 text-gray-400 mb-2" />
                    <span className="text-sm font-medium text-gray-900">Add Alumni</span>
                  </button>
                  <button className="flex flex-col items-center p-4 text-center border-2 border-dashed border-gray-300 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-colors" data-id="action-view-reports">
                    <TrendingUp className="h-8 w-8 text-gray-400 mb-2" />
                    <span className="text-sm font-medium text-gray-900">View Reports</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Upcoming Events */}
            <div className="bg-white rounded-lg shadow" data-id="upcoming-events">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Upcoming Events</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {upcomingEvents.map((event, index) => (
                    <div key={index} className="border-l-4 border-blue-500 pl-4" data-id={`event-${index}`}>
                      <h3 className="text-sm font-medium text-gray-900">{event.title}</h3>
                      <p className="text-xs text-gray-500">{event.date}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">{event.type}</span>
                        <span className="text-xs text-gray-500">{event.attendees} attending</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="bg-white rounded-lg shadow" data-id="performance-metrics">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">This Month</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">New Registrations</span>
                    <span className="text-sm font-medium text-gray-900">247</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Events Hosted</span>
                    <span className="text-sm font-medium text-gray-900">12</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Messages Sent</span>
                    <span className="text-sm font-medium text-gray-900">1,834</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Profile Updates</span>
                    <span className="text-sm font-medium text-gray-900">456</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;