import React, { useContext, useEffect, useState } from 'react'; 
import { motion } from 'framer-motion';
import { 
Zap,  User, Calendar, Briefcase, Phone, MapPin, Globe, Clock, 
  Sparkles, FileText, Linkedin, Github, Code, BookOpen, 
  Target, X, ArrowLeft, Mail, Lock, Eye, EyeOff, Users 
} from 'lucide-react';
import {backendUrl} from '../../helper'
import { AuthContext } from '@/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
const [signupStep, setSignupStep] = useState(6);
const [signupFormData, setSignupFormData] = useState({
  email: 'dilippurohit958@gmail.com',
  password: '123456789@Dilip',
  fullName: 'Dilip Purohit',
  
  age: '22',
  gender: 'Male',
  profession: 'Software Engineer',  
  city: 'bhiwandi',
  country: 'India',
  Landmark: 'oswal park',

  oneLiner: 'Looking for coding partner',
  bio: 'ok ok ok okoko kok oek oeebefbejfbefbe efbeufbeuf ebeubfeufbeu feufeu febfbefne e',
  portfolio: 'https://dilip-purohit.vercel.app/',  
  skills: "react backend nodejs",
  subjects: "b-tech",

  lookingFor: "looking for coding partner",
  meetupPreference: 'both',
  maxDistance: 10,
  minAge: 18,
  maxAge: 40,
});
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

const navigate = useNavigate()
const {refreshUser} = useContext(AuthContext)
useEffect(() => {
  if (Object.keys(validationErrors).length === 0) return;
  const timer = setTimeout(() => {
    setValidationErrors({});
  }, 3000);

  return () => clearTimeout(timer);
}, [validationErrors]);



  const skills = [
    'Fullstack Developer', 'Upsc Aspirant', 'Gate Preparation',
    'Python', '12th Boards', 'Jee',
    'Data Science', 'Science', 'Entreprenuer','Founder','Startup'
  ];


const validateStep = (step: number): boolean => {
  const errors: Record<string, string> = {};
  switch(step) {
    case 0: // Basic Info
      if (!signupFormData.fullName.trim()) {
        errors.fullName = "Full name is required";
      } else if (signupFormData.fullName.trim().length < 3) {
        errors.fullName = "Full name must be at least 3 characters";
      }
      
      if (!signupFormData.email.trim()) {
        errors.email = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signupFormData.email)) {
        errors.email = "Please enter a valid email address";
      }
      
      if (!signupFormData.password) {
        errors.password = "Password is required";
      } else if (signupFormData.password.length < 8) {
        errors.password = "Password must be at least 8 characters";
      } else if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(signupFormData.password)) {
        errors.password = "Password must contain letters and numbers";
      }
      break;
    
    case 1: // Personal Details
      if (!signupFormData.age) {
        errors.age = "Age is required";
      } else {
        const age = parseInt(signupFormData.age);
        if (age < 16) {
          errors.age = "You must be at least 16 years old";
        } else if (age > 100) {
          errors.age = "Please enter a valid age";
        }
      }
      
      if (!signupFormData.profession) {
        errors.profession = "Please select your profession";
      }
      break;
    
    case 2: // Location
      if (!signupFormData.city.trim()) {
        errors.city = "City is required";
      } else if (signupFormData.city.trim().length < 2) {
        errors.city = "Please enter a valid city name";
      }
      
      if (!signupFormData.country) {
        errors.country = "Please select your country";
      }
      
      if (!signupFormData.Landmark) {
        errors.landmark = "Please select your timezone";
      }
      break;
    
    case 3: // Profile & Bio
      if (!signupFormData.oneLiner.trim()) {
        errors.oneLiner = "One-liner is required";
      } else if (signupFormData.oneLiner.trim().length < 10) {
        errors.oneLiner = "One-liner should be at least 10 characters";
      } else if (signupFormData.oneLiner.trim().length > 100) {
        errors.oneLiner = "One-liner should be less than 100 characters";
      }
      if (signupFormData.bio.trim().length > 250) {
        errors.bio = "Bio should be less than 250 characters";
      }
      break;
    
    case 4: // Skills
      if (signupFormData.skills?.split(" ").length === 0) {
        errors.skills = "Please add at least one skill";
      } else if (signupFormData.skills?.split(" ").length > 10) {
        errors.skills = "You can add up to 10 skills maximum";
      }
      break;
    
    case 5: // Match Preferences
      if (signupFormData.lookingFor.length === 0) {
        errors.lookingFor = "Please select what you're looking for";
      }
      break;
  }
  
  setValidationErrors(errors);
  return Object.keys(errors).length === 0;
};





  const handleSubmit = async(e: React.FormEvent) => {
try {
    e.preventDefault();
  const response = await fetch(`${backendUrl}/api/v1/auth/sign-up`,{
    method:"POST",
    body:JSON.stringify(signupFormData),
    headers:{
      "Content-Type":"application/json"
    },
    credentials:'include'
  })
  const data = await response.json()
  console.log(data)
} catch (error) {
  console.log(error)
}
  };



  const getFirstErrorMessage = () => {
  if (!validationErrors || Object.keys(validationErrors).length === 0) {
    return null;
  }
  const firstKey = Object.keys(validationErrors)[0];
  return validationErrors[firstKey];
};

  const login =async() =>{
  try {
    const response = await fetch(`${backendUrl}/api/v1/auth/sign-in`,{
      method:"POST",
      credentials:"include",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(signupFormData)
    })

    if(!response.ok){
      console.log("err",response)
      throw new Error()
    }
  await refreshUser()
  } catch (error) {
    console.log(error)
  }
}

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="flex items-center justify-between mb-8 md:mb-12">
          <div className="flex items-center gap-2">
            <Sparkles className="w-8 h-8 text-purple-600" />
            <a href='/' className=" cursor-pointer text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              WeMatch
            </a>
            <span className="hidden md:inline text-sm bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-3 py-1 rounded-full font-medium">
              Beta
            </span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Code className="w-4 h-4" />
            <span className="hidden md:inline">Find devs nearby</span>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Side - Branding */}
          <div className="lg:w-1/2">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-xl border border-white/20">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Swipe Right<br />On Skills
              </h2>
              
              <p className="text-gray-600 mb-8 text-lg">
                Connect with people sharing your Journey. 
                Match based on skills, vibe, and proximity. 
                No more lonely preparations! 🚀
              </p>

              {/* Features */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl">
                  <MapPin className="w-5 h-5 text-purple-600" />
                  <div>
                    <h3 className="font-semibold">Location-Based</h3>
                    <p className="text-sm text-gray-600">Find people's nearby</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl">
                  <Code className="w-5 h-5 text-pink-600" />
                  <div>
                    <h3 className="font-semibold">Skill Matching</h3>
                    <p className="text-sm text-gray-600">Same Journey</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl">
                  <Users className="w-5 h-5 text-indigo-600" />
                  <div>
                    <h3 className="font-semibold">Real Connections</h3>
                    <p className="text-sm text-gray-600">Meet & collaborate</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl">
                  <Zap className="w-5 h-5 text-yellow-600" />
                  <div>
                    <h3 className="font-semibold">Instant Matches</h3>
                    <p className="text-sm text-gray-600">Quick connections</p>
                  </div>
                </div>
              </div>

              {/* Trending Skills */}
              <div className="mb-8">
                <h3 className="font-semibold text-gray-700 mb-3">🔥 Trending Skills This Week</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.slice(0, 10).map((skill, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm font-medium hover:scale-105 transition-transform cursor-pointer"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Testimonial */}
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 text-white">
                <p className="italic mb-3">"Matched with a React dev in my area. We're now building a startup together!"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full"></div>
                  <div>
                    <p className="font-semibold">Alex Chen</p>
                    <p className="text-sm text-white/80">React Developer • San Francisco</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="lg:w-1/2">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-2xl border border-white/20"
            >
              {/* Toggle Login/Register */}
              <div className="flex mb-8">
                <button
                  onClick={() => setIsLogin(true)}
                  className={`flex-1 cursor-pointer py-3 font-semibold rounded-2xl transition-all ${isLogin 
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg' 
                    : 'text-gray-500 hover:text-gray-700'}`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setIsLogin(false)}
                  className={`flex-1 cursor-pointer  py-3 font-semibold rounded-2xl transition-all ${!isLogin 
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg' 
                    : 'text-gray-500 hover:text-gray-700'}`}
                >
                  Create Account
                </button>
              </div>

  {
    isLogin ? <form>
      
        <div className="space-y-4">
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
          <User className="w-4 h-4" />
          Full Name
        </label>
        <input
          type="text"
          name="fullName"
          value={signupFormData.fullName}
          onChange={(e) => setSignupFormData({...signupFormData, fullName: e.target.value})}
          placeholder="John Doe"
          className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
          required
        />
      </div>

      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
          <Mail className="w-4 h-4" />
          Email
        </label>
        <input
          type="email"
          name="email"
          value={signupFormData.email}
          onChange={(e) => setSignupFormData({...signupFormData, email: e.target.value})}
          placeholder="you@example.com"
          className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
          required
        />
      </div>

      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
          <Lock className="w-4 h-4" />
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={signupFormData.password}
            onChange={(e) => setSignupFormData({...signupFormData, password: e.target.value})}
            placeholder="••••••••"
            className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-1">Minimum 8 characters with letters and numbers</p>
      </div>

  <button
          type="button"
          onClick={() => login()}
          className={`flex-1 w-full cursor-pointer py-3.5 rounded-2xl font-semibold transition-all ${'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-xl hover:scale-[1.02]'
          }`}
        >
          Sign In
        </button>

    </div>

      </form> :          <form className="space-y-6">
            {
              validationErrors && <div className='text-red-500 leading-0'>
                {getFirstErrorMessage()}
              </div>
            }
  <div className='flex gap-1.5 leading-0 items-center'>
    {signupStep > 0 && (
      <div 
        className='cursor-pointer' 
        onClick={() => setSignupStep(prev => prev - 1)}
      >
        <ArrowLeft/>
      </div>
    )}
    <div className='leading-0 capitalize'>
      Step {signupStep + 1} of 6
    </div>
  </div>

  {/* STEP 0: Basic Info */}
  {signupStep === 0 && (
    <div className="space-y-4">
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
          <User className="w-4 h-4" />
          Full Name
        </label>
        <input
          type="text"
          name="fullName"
          value={signupFormData.fullName}
          onChange={(e) => setSignupFormData({...signupFormData, fullName: e.target.value})}
          placeholder="John Doe"
          className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
          required
        />
      </div>

      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
          <Mail className="w-4 h-4" />
          Email
        </label>
        <input
          type="email"
          name="email"
          value={signupFormData.email}
          onChange={(e) => setSignupFormData({...signupFormData, email: e.target.value})}
          placeholder="you@example.com"
          className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
          required
        />
      </div>

      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
          <Lock className="w-4 h-4" />
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={signupFormData.password}
            onChange={(e) => setSignupFormData({...signupFormData, password: e.target.value})}
            placeholder="••••••••"
            className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-1">Minimum 8 characters with letters and numbers</p>
      </div>
    </div>
  )}

  {/* STEP 1: Personal Details */}
  {signupStep === 1 && (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <Calendar className="w-4 h-4" />
            Age
          </label>
          <input
            type="number"
            name="age"
            min="16"
            max="100"
            value={signupFormData.age}
            onChange={(e) => setSignupFormData({...signupFormData, age: e.target.value})}
            placeholder="24"
            className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <Users className="w-4 h-4" />
            Gender
          </label>
          <select
            name="gender"
            value={signupFormData.gender}
            onChange={(e) => setSignupFormData({...signupFormData, gender: e.target.value})}
            className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="non-binary">Non-binary</option>
            <option value="prefer-not-to-say">Prefer not to say</option>
          </select>
        </div>
      </div>

      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
          <Briefcase className="w-4 h-4" />
          Profession
        </label>
        <select
          name="profession"
          value={signupFormData.profession}
          onChange={(e) => setSignupFormData({...signupFormData, profession: e.target.value})}
          className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
          required
        >
          <option value="">Select your profession</option>
          <option value="student">Student</option>
          <option value="developer">Developer</option>
          <option value="designer">Designer</option>
          <option value="founder">Founder</option>
          <option value="freelancer">Freelancer</option>
          <option value="job-seeker">Job Seeker</option>
          <option value="professional">Working Professional</option>
          <option value="other">Other</option>
        </select>
      </div>
    </div>
  )}

  {/* STEP 2: Location */}
  {signupStep === 2 && (
    <div className="space-y-4">
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
          <MapPin className="w-4 h-4" />
          City
        </label>
        <input
          type="text"
          name="city"
          value={signupFormData.city}
          onChange={(e) => setSignupFormData({...signupFormData, city: e.target.value})}
          placeholder="Enter your city"
          className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
          required
        />
      </div>

      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
          <Globe className="w-4 h-4" />
          Country
        </label>
        <select
          name="country"
          value={signupFormData.country}
          onChange={(e) => setSignupFormData({...signupFormData, country: e.target.value})}
          className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
        >
          <option value="">Select Country</option>
          <option value="India">India</option>
          <option value="USA">United States</option>
          <option value="UK">United Kingdom</option>
          <option value="Canada">Canada</option>
          <option value="Australia">Australia</option>
          <option value="Germany">Germany</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
          <Clock className="w-4 h-4" />
          Landmark
        </label>
        <input
          type="text"
          name="landmark"
          value={signupFormData.Landmark}
          onChange={(e) => setSignupFormData({...signupFormData, Landmark: e.target.value})}
          placeholder="Enter you area name "
          className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
          required
        />
      </div>

      <div className="p-4 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100">
        <div className="flex items-center gap-2 text-sm text-purple-700 mb-2">
          <MapPin className="w-4 h-4" />
          <span className="font-medium">Location Matching</span>
        </div>
        <p className="text-xs text-purple-600">
          We'll use your location to find hustlers nearby. You can adjust your visibility in settings.
        </p>
      </div>
    </div>
  )}

  {/* STEP 3: Profile & Bio */}
  {signupStep === 3 && (
    <div className="space-y-4">
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
          <Sparkles className="w-4 h-4" />
          One-liner
        </label>
        <input
          type="text"
          name="oneLiner"
          value={signupFormData.oneLiner}
          onChange={(e) => setSignupFormData({...signupFormData, oneLiner: e.target.value})}
          placeholder="e.g., Looking for project partner | GATE aspirant | React developer"
          className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
          required
        />
        <p className="text-xs text-gray-500 mt-1">Short tagline that appears on your card</p>
      </div>

      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
          <FileText className="w-4 h-4" />
          Bio
        </label>
        <textarea
          name="bio"
          value={signupFormData.bio}
          onChange={(e) => setSignupFormData({...signupFormData, bio: e.target.value})}
          placeholder="Tell us about yourself, your goals, what you're looking for..."
          rows={3}
          className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all resize-none"
        />
        <p className="text-xs text-gray-500 mt-1">Maximum 250 characters</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div className=''>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <Linkedin className="w-4 h-4" />
            Portfolio / Social (Optional)
          </label>
          <input
            type="url"
            name="portfolio/social"
            value={signupFormData.portfolio}
            onChange={(e) => setSignupFormData({...signupFormData, portfolio: e.target.value})}
            placeholder="Any type of social media or portfolio link where people can see your skills"
            className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
          />
        </div>

    
      </div>
    </div>
  )}

  {/* STEP 4: Skills & Subjects */}
  {signupStep === 4 && (
    <div className="space-y-6">
      {/* Skills Section */}
      <div>
        <div className="flex flex-col space-y-2 justify-between mb-4">
          <label className="flex   items-center gap-2 text-sm font-medium text-gray-700">
            <Code className="w-4 h-4" />
            Add Your Skills
          </label>
            <input
          type="text"
          name="oneLiner"
          value={signupFormData.skills}
          onChange={(e) => setSignupFormData({...signupFormData, skills: e.target.value})}
          placeholder="Fashion designer | GATE aspirant | React developer"
          className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
          required
        />
          {/* <span className="text-xs text-gray-500">{signupFormData.skills.length}/10</span> */}
        </div>
        
        <div className="grid grid-cols-2 gap-2 mb-4">
          {['React', 'Node.js', 'Python', 'UI/UX', 'AWS', 'Docker', 'TypeScript', 'MongoDB'].map(skill => (
            <button
              key={skill}
              type="button"
              onClick={() => {
                if (signupFormData.skills.length >= 10) return;
                const newSkill = skill
                setSignupFormData({
                  ...signupFormData, 
                  skills:`${signupFormData.skills} + ${newSkill}`
                });
              }}
              disabled={signupFormData.skills.length >= 10}
              className="py-2 px-3 rounded-xl text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              + {skill}
            </button>
          ))}
        </div>
      </div>

      {/* Subjects Section */}
      <div className='space-y-3'>
        <div className="flex items-center justify-between mb-4 ">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <BookOpen className="w-4 h-4" />
            What is your degree or preparing for? 
          </label>
        </div>
                  <input
          type="text"
          name="oneLiner"
          value={signupFormData.subjects}
          onChange={(e) => setSignupFormData({...signupFormData, subjects: e.target.value})}
          placeholder="B-tech | 12th board | Mbbs"
          className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
          required
        />
        
        
        <div className="grid grid-cols-2 gap-2 mb-4">
          {['12th','GATE', 'UPSC', 'JEE', 'NEET', 'GRE', 'GMAT', 'CAT', 'Board Exams'].map(exam => (
            <button
              key={exam}
              type="button"
              onClick={() => {
                setSignupFormData({
                  ...signupFormData, 
                  subjects: `${signupFormData.subjects} ${exam}  `
                });
              }}
              className="py-2 px-3 rounded-xl text-sm font-medium bg-blue-50 text-blue-700 hover:bg-blue-100 transition-all"
            >
              + {exam}
            </button>
          ))}
        </div>
      </div>
    </div>
  )}

  {/* STEP 5: Match Preferences */}
  {signupStep === 5 && (
    <div className="space-y-6">
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
          <Target className="w-4 h-4" />
          What are you actually  looking for?
        </label>

          <input
          type="text"
          name="oneLiner"
          value={signupFormData.oneLiner}
          onChange={(e) => setSignupFormData({...signupFormData, oneLiner: e.target.value})}
          placeholder="project partner | GATE aspirant | React developer | Co-founder"
          className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
          required
        />
        
        {/* <div className="grid grid-cols-2 gap-2">
          {['Study Partner', 'Project Collaborator', 'Mentor', 'Mentee', 'Accountability Buddy', 'Coding Partner', 'Exam Study Group', 'Startup Co-founder'].map(option => (
            <button
              key={option}
              type="button"
              onClick={() => {
                const current = signupFormData.lookingFor;
                if (current.includes(option)) {
                  setSignupFormData({
                    ...signupFormData,
                    lookingFor: current.filter(item => item !== option)
                  });
                } else {
                  setSignupFormData({
                    ...signupFormData,
                    lookingFor: [...current, option]
                  });
                }
              }}
              className={`py-3 rounded-xl text-sm font-medium transition-all ${
                signupFormData.lookingFor.includes(option)
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {option}
            </button>
          ))}
        </div> */}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <MapPin className="w-4 h-4" />
            Max Distance
          </label>
          <select
            value={signupFormData.maxDistance}
            onChange={(e) => setSignupFormData({...signupFormData, maxDistance: parseInt(e.target.value)})}
            className="w-full px-4  cursor-pointer  py-3 bg-gray-50/50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
          >
            <option value="5">Within 5km</option>
            <option value="10">Within 10km</option>
            <option value="20">Within 20km</option>
            <option value="50">Within 50km</option>
            <option value="100">Any distance</option>
          </select>
        </div>

        <div>
          <label className="flex items-center  gap-2 text-sm font-medium text-gray-700 mb-2">
            <Users className="w-4 h-4" />
            Meetup Preference
          </label>
          <select
            value={signupFormData.meetupPreference}
            onChange={(e) => setSignupFormData({...signupFormData, meetupPreference: e.target.value})}
            className="w-full px-4 py-3 cursor-pointer bg-gray-50/50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
          > 
            <option value="virtual">Far from me</option>
            <option value="in-person">Near me</option>
            <option value="both">Both</option>
          </select>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100">
        <div className="flex items-center gap-2 text-sm text-blue-700 mb-2">
          <Sparkles className="w-4 h-4" />
          <span className="font-medium">Almost there! 🎉</span>
        </div>
        <p className="text-xs text-blue-600">
          Your preferences help us find the perfect matches for you. You can always update these later.
        </p>
      </div>
    </div>
  )}

  {/* Navigation Buttons */}
  <div className="space-y-4">
    {/* Progress Bar */}
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div 
        className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all duration-300"
        style={{ width: `${((signupStep + 1) / 6) * 100}%` }}
      ></div>
    </div>

    <div className="flex gap-3">
      {signupStep > 0 && (
        <button
          type="button"
          onClick={() => setSignupStep(prev => prev - 1)}
          className="flex-1 py-3.5 rounded-2xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-all"
        >
          ← Back
        </button>
      )}

      {signupStep < 5 ? (
        <button
          type="button"
          onClick={() => {
            // if (validateStep(signupStep)) {
              setSignupStep(prev => prev + 1);
            // }
          }}
          className={`flex-1 cursor-pointer py-3.5 rounded-2xl font-semibold transition-all ${
            signupStep === 0 
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-xl hover:scale-[1.02]'
              : 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:shadow-xl hover:scale-[1.02]'
          }`}
        >
          Next Step →
        </button>
      ) : (
        <button
          type="button"
          onClick={handleSubmit}
          className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold hover:shadow-xl hover:scale-[1.02] transition-all"
        >
          Complete Signup 🚀
        </button>
      )}
    </div>
  </div>
</form>


  }
              {/* Terms */}
              <p className="text-xs text-gray-500 text-center mt-8">
                By continuing, you agree to our Terms and Privacy Policy.<br />
                Made with 💜 for developers worldwide
              </p>
            </motion.div>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">10K+</div>
            <div className="text-sm text-gray-600">Active Devs</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 text-center">
            <div className="text-2xl font-bold text-pink-600">500+</div>
            <div className="text-sm text-gray-600">Daily Matches</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 text-center">
            <div className="text-2xl font-bold text-indigo-600">50+</div>
            <div className="text-sm text-gray-600">Cities</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">15+</div>
            <div className="text-sm text-gray-600">Tech Skills</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;