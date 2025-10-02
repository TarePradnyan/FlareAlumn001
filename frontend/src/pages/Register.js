import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff, AlertCircle, Calendar, MapPin, Briefcase, GraduationCap } from 'lucide-react';

const Register = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    
    // Academic Information
    graduationYear: '',
    degree: '',
    department: '',
    studentId: '',
    
    // Professional Information
    currentRole: '',
    company: '',
    industry: '',
    location: '',
    experience: '',
    
    // Preferences
    interests: [],
    mentorshipInterest: false,
    volunteerInterest: false,
    donationInterest: false,
    privacyLevel: 'public'
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const departments = [
    'Computer Science', 'Business Administration', 'Engineering', 'Medicine',
    'Law', 'Education', 'Arts & Humanities', 'Social Sciences', 'Mathematics',
    'Physics', 'Chemistry', 'Biology', 'Psychology', 'Communications'
  ];

  const industries = [
    'Technology', 'Healthcare', 'Finance', 'Education', 'Manufacturing',
    'Retail', 'Consulting', 'Media & Entertainment', 'Non-profit',
    'Government', 'Real Estate', 'Transportation', 'Energy', 'Other'
  ];

  const interestOptions = [
    'Networking Events', 'Career Mentorship', 'Professional Development',
    'Volunteer Opportunities', 'Alumni Giving', 'Industry Meetups',
    'Speaking Engagements', 'Student Mentoring', 'Job Referrals'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleInterestChange = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.firstName) newErrors.firstName = 'First name is required';
      if (!formData.lastName) newErrors.lastName = 'Last name is required';
      if (!formData.email) newErrors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
      if (!formData.password) newErrors.password = 'Password is required';
      else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
      if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
      else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    }

    if (step === 2) {
      if (!formData.graduationYear) newErrors.graduationYear = 'Graduation year is required';
      if (!formData.degree) newErrors.degree = 'Degree is required';
      if (!formData.department) newErrors.department = 'Department is required';
    }

    return newErrors;
  };

  const handleNext = () => {
    const newErrors = validateStep(currentStep);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setCurrentStep(currentStep + 1);
    setErrors({});
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateStep(currentStep);

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      console.log('Registration successful:', formData);
    }, 2000);
  };

  const renderStep1 = () => (
    <div className="space-y-6" data-id="step-1-personal">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div data-id="first-name-field">
          <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={`w-full pl-10 pr-3 py-2 border ${errors.firstName ? 'border-red-300' : 'border-gray-300'} rounded-md focus:ring-blue-500 focus:border-blue-500`}
              placeholder="Enter first name"
            />
          </div>
          {errors.firstName && <div className="mt-1 text-sm text-red-600 flex items-center"><AlertCircle className="h-4 w-4 mr-1" />{errors.firstName}</div>}
        </div>

        <div data-id="last-name-field">
          <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={`w-full pl-10 pr-3 py-2 border ${errors.lastName ? 'border-red-300' : 'border-gray-300'} rounded-md focus:ring-blue-500 focus:border-blue-500`}
              placeholder="Enter last name"
            />
          </div>
          {errors.lastName && <div className="mt-1 text-sm text-red-600 flex items-center"><AlertCircle className="h-4 w-4 mr-1" />{errors.lastName}</div>}
        </div>
      </div>

      <div data-id="email-field">
        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full pl-10 pr-3 py-2 border ${errors.email ? 'border-red-300' : 'border-gray-300'} rounded-md focus:ring-blue-500 focus:border-blue-500`}
            placeholder="Enter email address"
          />
        </div>
        {errors.email && <div className="mt-1 text-sm text-red-600 flex items-center"><AlertCircle className="h-4 w-4 mr-1" />{errors.email}</div>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div data-id="password-field">
          <label className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full pl-10 pr-10 py-2 border ${errors.password ? 'border-red-300' : 'border-gray-300'} rounded-md focus:ring-blue-500 focus:border-blue-500`}
              placeholder="Enter password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
            </button>
          </div>
          {errors.password && <div className="mt-1 text-sm text-red-600 flex items-center"><AlertCircle className="h-4 w-4 mr-1" />{errors.password}</div>}
        </div>

        <div data-id="confirm-password-field">
          <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password *</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full pl-10 pr-10 py-2 border ${errors.confirmPassword ? 'border-red-300' : 'border-gray-300'} rounded-md focus:ring-blue-500 focus:border-blue-500`}
              placeholder="Confirm password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              {showConfirmPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
            </button>
          </div>
          {errors.confirmPassword && <div className="mt-1 text-sm text-red-600 flex items-center"><AlertCircle className="h-4 w-4 mr-1" />{errors.confirmPassword}</div>}
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6" data-id="step-2-academic">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div data-id="graduation-year-field">
          <label className="block text-sm font-medium text-gray-700 mb-2">Graduation Year *</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <select
              name="graduationYear"
              value={formData.graduationYear}
              onChange={handleChange}
              className={`w-full pl-10 pr-3 py-2 border ${errors.graduationYear ? 'border-red-300' : 'border-gray-300'} rounded-md focus:ring-blue-500 focus:border-blue-500`}
            >
              <option value="">Select year</option>
              {Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i).map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
          {errors.graduationYear && <div className="mt-1 text-sm text-red-600 flex items-center"><AlertCircle className="h-4 w-4 mr-1" />{errors.graduationYear}</div>}
        </div>

        <div data-id="department-field">
          <label className="block text-sm font-medium text-gray-700 mb-2">Department *</label>
          <div className="relative">
            <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              className={`w-full pl-10 pr-3 py-2 border ${errors.department ? 'border-red-300' : 'border-gray-300'} rounded-md focus:ring-blue-500 focus:border-blue-500`}
            >
              <option value="">Select department</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
          {errors.department && <div className="mt-1 text-sm text-red-600 flex items-center"><AlertCircle className="h-4 w-4 mr-1" />{errors.department}</div>}
        </div>
      </div>

      <div data-id="degree-field">
        <label className="block text-sm font-medium text-gray-700 mb-2">Degree *</label>
        <input
          type="text"
          name="degree"
          value={formData.degree}
          onChange={handleChange}
          className={`w-full px-3 py-2 border ${errors.degree ? 'border-red-300' : 'border-gray-300'} rounded-md focus:ring-blue-500 focus:border-blue-500`}
          placeholder="e.g., Bachelor of Science, Master of Arts, PhD"
        />
        {errors.degree && <div className="mt-1 text-sm text-red-600 flex items-center"><AlertCircle className="h-4 w-4 mr-1" />{errors.degree}</div>}
      </div>

      <div data-id="student-id-field">
        <label className="block text-sm font-medium text-gray-700 mb-2">Student ID (Optional)</label>
        <input
          type="text"
          name="studentId"
          value={formData.studentId}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter your student ID"
        />
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6" data-id="step-3-professional">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div data-id="current-role-field">
          <label className="block text-sm font-medium text-gray-700 mb-2">Current Role</label>
          <div className="relative">
            <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              name="currentRole"
              value={formData.currentRole}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., Software Engineer"
            />
          </div>
        </div>

        <div data-id="company-field">
          <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter company name"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div data-id="industry-field">
          <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
          <select
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select industry</option>
            {industries.map(industry => (
              <option key={industry} value={industry}>{industry}</option>
            ))}
          </select>
        </div>

        <div data-id="location-field">
          <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., San Francisco, CA"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6" data-id="step-4-preferences">
      <div data-id="interests-field">
        <label className="block text-sm font-medium text-gray-700 mb-4">Areas of Interest</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {interestOptions.map(interest => (
            <label key={interest} className="flex items-center">
              <input
                type="checkbox"
                checked={formData.interests.includes(interest)}
                onChange={() => handleInterestChange(interest)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">{interest}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-4" data-id="participation-options">
        <h3 className="text-lg font-medium text-gray-900">Participation Options</h3>
        
        <label className="flex items-center">
          <input
            type="checkbox"
            name="mentorshipInterest"
            checked={formData.mentorshipInterest}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <span className="ml-2 text-sm text-gray-700">I'm interested in mentoring current students</span>
        </label>

        <label className="flex items-center">
          <input
            type="checkbox"
            name="volunteerInterest"
            checked={formData.volunteerInterest}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <span className="ml-2 text-sm text-gray-700">I'd like to volunteer for university events</span>
        </label>

        <label className="flex items-center">
          <input
            type="checkbox"
            name="donationInterest"
            checked={formData.donationInterest}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <span className="ml-2 text-sm text-gray-700">I'm interested in supporting the university financially</span>
        </label>
      </div>

      <div data-id="privacy-field">
        <label className="block text-sm font-medium text-gray-700 mb-2">Profile Privacy</label>
        <select
          name="privacyLevel"
          value={formData.privacyLevel}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="public">Public - Visible to all alumni</option>
          <option value="alumni">Alumni Only - Visible to registered alumni</option>
          <option value="private">Private - Only visible to administrators</option>
        </select>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8" data-id="register-page">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8" data-id="register-header">
          <div className="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
            <User className="h-8 w-8 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900" data-id="register-title">
            Join AlumniConnect
          </h2>
          <p className="mt-2 text-sm text-gray-600" data-id="register-subtitle">
            Connect with your alumni community and build lasting relationships
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8" data-id="progress-bar">
          <div className="flex items-center">
            {[1, 2, 3, 4].map((step) => (
              <React.Fragment key={step}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {step}
                </div>
                {step < 4 && (
                  <div className={`flex-1 h-1 mx-2 ${
                    step < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-600">
            <span>Personal</span>
            <span>Academic</span>
            <span>Professional</span>
            <span>Preferences</span>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white py-8 px-6 shadow rounded-lg" data-id="register-form-container">
          <form onSubmit={currentStep === 4 ? handleSubmit : (e) => e.preventDefault()} data-id="register-form">
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            {currentStep === 4 && renderStep4()}

            {/* Navigation Buttons */}
            <div className="mt-8 flex justify-between" data-id="form-navigation">
              <button
                type="button"
                onClick={handlePrevious}
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  currentStep === 1 
                    ? 'text-gray-400 cursor-not-allowed' 
                    : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                }`}
                disabled={currentStep === 1}
                data-id="previous-button"
              >
                Previous
              </button>

              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  data-id="next-button"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`px-4 py-2 text-sm font-medium rounded-md text-white ${
                    isLoading
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                  }`}
                  data-id="submit-button"
                >
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </button>
              )}
            </div>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center" data-id="login-link">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;