import React, { useState } from 'react';
import { Search, Filter, MapPin, Calendar, Briefcase, Mail, Linkedin, Download, Users, Star } from 'lucide-react';

const Alumni = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    graduationYear: '',
    department: '',
    location: '',
    industry: ''
  });

  const alumniData = [
    {
      id: 1,
      name: 'Sarah Johnson',
      graduationYear: '2015',
      degree: 'Computer Science',
      currentRole: 'Senior Software Engineer',
      company: 'Google',
      location: 'San Francisco, CA',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612c27a?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      isVerified: true,
      industry: 'Technology'
    },
    {
      id: 2,
      name: 'Michael Chen',
      graduationYear: '2012',
      degree: 'Business Administration',
      currentRole: 'Marketing Director',
      company: 'Apple',
      location: 'Cupertino, CA',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      isVerified: true,
      industry: 'Technology'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      graduationYear: '2018',
      degree: 'Medical Science',
      currentRole: 'Resident Physician',
      company: 'Johns Hopkins Hospital',
      location: 'Baltimore, MD',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      isVerified: true,
      industry: 'Healthcare'
    },
    {
      id: 4,
      name: 'David Park',
      graduationYear: '2010',
      degree: 'Engineering',
      currentRole: 'VP of Engineering',
      company: 'Tesla',
      location: 'Austin, TX',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      isVerified: true,
      industry: 'Automotive'
    },
    {
      id: 5,
      name: 'Lisa Thompson',
      graduationYear: '2016',
      degree: 'Finance',
      currentRole: 'Investment Banker',
      company: 'Goldman Sachs',
      location: 'New York, NY',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      isVerified: true,
      industry: 'Finance'
    },
    {
      id: 6,
      name: 'James Wilson',
      graduationYear: '2014',
      degree: 'Marketing',
      currentRole: 'Creative Director',
      company: 'Nike',
      location: 'Portland, OR',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      isVerified: false,
      industry: 'Sports & Recreation'
    }
  ];

  const graduationYears = ['2010', '2012', '2014', '2015', '2016', '2018'];
  const departments = ['Computer Science', 'Business Administration', 'Medical Science', 'Engineering', 'Finance', 'Marketing'];
  const locations = ['San Francisco, CA', 'Cupertino, CA', 'Baltimore, MD', 'Austin, TX', 'New York, NY', 'Portland, OR'];
  const industries = ['Technology', 'Healthcare', 'Automotive', 'Finance', 'Sports & Recreation'];

  const filteredAlumni = alumniData.filter(alumni => {
    const matchesSearch = alumni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alumni.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alumni.currentRole.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesYear = !selectedFilters.graduationYear || alumni.graduationYear === selectedFilters.graduationYear;
    const matchesDepartment = !selectedFilters.department || alumni.degree === selectedFilters.department;
    const matchesLocation = !selectedFilters.location || alumni.location === selectedFilters.location;
    const matchesIndustry = !selectedFilters.industry || alumni.industry === selectedFilters.industry;

    return matchesSearch && matchesYear && matchesDepartment && matchesLocation && matchesIndustry;
  });

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setSelectedFilters({
      graduationYear: '',
      department: '',
      location: '',
      industry: ''
    });
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8" data-id="alumni-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8" data-id="alumni-header">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900" data-id="alumni-title">Alumni Directory</h1>
              <p className="mt-1 text-sm text-gray-500" data-id="alumni-subtitle">
                Connect with {alumniData.length} alumni from our community
              </p>
            </div>
            <div className="mt-4 sm:mt-0 flex items-center space-x-4">
              <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 flex items-center" data-id="export-alumni-button">
                <Download className="h-4 w-4 mr-2" />
                Export List
              </button>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow mb-8" data-id="search-filters">
          <div className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-6">
              {/* Search Bar */}
              <div className="flex-1 max-w-lg">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search alumni by name, company, or role..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    data-id="alumni-search-input"
                  />
                </div>
              </div>

              {/* Filter Controls */}
              <div className="flex flex-wrap items-center gap-4">
                <select
                  value={selectedFilters.graduationYear}
                  onChange={(e) => handleFilterChange('graduationYear', e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  data-id="graduation-year-filter"
                >
                  <option value="">All Years</option>
                  {graduationYears.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>

                <select
                  value={selectedFilters.department}
                  onChange={(e) => handleFilterChange('department', e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  data-id="department-filter"
                >
                  <option value="">All Departments</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>

                <select
                  value={selectedFilters.industry}
                  onChange={(e) => handleFilterChange('industry', e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  data-id="industry-filter"
                >
                  <option value="">All Industries</option>
                  {industries.map(industry => (
                    <option key={industry} value={industry}>{industry}</option>
                  ))}
                </select>

                {(selectedFilters.graduationYear || selectedFilters.department || selectedFilters.location || selectedFilters.industry || searchTerm) && (
                  <button
                    onClick={clearFilters}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    data-id="clear-filters-button"
                  >
                    Clear All
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6" data-id="results-count">
          <p className="text-sm text-gray-600">
            Showing {filteredAlumni.length} of {alumniData.length} alumni
          </p>
        </div>

        {/* Alumni Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-id="alumni-grid">
          {filteredAlumni.map((alumni) => (
            <div key={alumni.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden" data-id={`alumni-card-${alumni.id}`}>
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center">
                    <img
                      src={alumni.avatar}
                      alt={alumni.name}
                      className="w-16 h-16 rounded-full object-cover"
                      data-id={`alumni-avatar-${alumni.id}`}
                    />
                    <div className="ml-4">
                      <div className="flex items-center">
                        <h3 className="text-lg font-semibold text-gray-900" data-id={`alumni-name-${alumni.id}`}>
                          {alumni.name}
                        </h3>
                        {alumni.isVerified && (
                          <Star className="ml-1 h-4 w-4 text-yellow-400 fill-current" data-id={`alumni-verified-${alumni.id}`} />
                        )}
                      </div>
                      <p className="text-sm text-gray-500" data-id={`alumni-degree-${alumni.id}`}>
                        {alumni.degree} • Class of {alumni.graduationYear}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <Briefcase className="h-4 w-4 mr-2 text-gray-400" />
                    <span data-id={`alumni-role-${alumni.id}`}>{alumni.currentRole}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="h-4 w-4 mr-2 text-gray-400" />
                    <span data-id={`alumni-company-${alumni.id}`}>{alumni.company}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                    <span data-id={`alumni-location-${alumni.id}`}>{alumni.location}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800" data-id={`alumni-industry-${alumni.id}`}>
                      {alumni.industry}
                    </span>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors" data-id={`contact-${alumni.id}`}>
                        <Mail className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors" data-id={`linkedin-${alumni.id}`}>
                        <Linkedin className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredAlumni.length === 0 && (
          <div className="text-center py-12" data-id="empty-state">
            <Users className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-4 text-lg font-medium text-gray-900">No alumni found</h3>
            <p className="mt-2 text-sm text-gray-500">
              Try adjusting your search criteria or clearing your filters.
            </p>
            <button
              onClick={clearFilters}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              data-id="clear-filters-empty"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Pagination */}
        {filteredAlumni.length > 0 && (
          <div className="mt-8 flex items-center justify-center" data-id="pagination">
            <div className="flex items-center space-x-2">
              <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                Previous
              </button>
              <button className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium">
                1
              </button>
              <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                2
              </button>
              <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                3
              </button>
              <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Alumni;