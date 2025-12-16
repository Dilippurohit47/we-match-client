import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Code, 
  MapPin, 
  Eye, 
  EyeOff,
  Smartphone,
  Mail,
  Lock,
  Users,
  Zap
} from 'lucide-react';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    skill: '',
  });

  const skills = [
    'Fullstack Developer', 'Upsc Aspirant', 'Gate Preparation',
    'Python', '12th Boards', 'Jee',
    'Data Science', 'Science', 'Entreprenuer','Founder','Startup'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login/register logic here
    console.log('Form submitted:', formData);
  };

  const socialLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
  };

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

              <form onSubmit={handleSubmit} className="space-y-6">
                {!isLogin && (
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <Smartphone className="w-4 h-4" />
                      Username
                    </label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      placeholder="cool_dev_99"
                      className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                )}

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Mail className="w-4 h-4" />
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@awesome.dev"
                    className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
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
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                {!isLogin && (
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <Code className="w-4 h-4" />
                      Primary Skill
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {skills.slice(0, 6).map((skill) => (
                        <button
                          key={skill}
                          type="button"
                          onClick={() => setFormData({...formData, skill})}
                          className={`py-2 px-3 rounded-xl text-sm font-medium transition-all ${formData.skill === skill 
                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md' 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                        >
                          {skill}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                >
                  {isLogin ? 'Sign In →' : 'Create Account 🚀'}
                </button>

                <div className="text-center">
                  <a href="#" className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                    {isLogin ? 'Forgot password?' : 'Already have an account? Sign in'}
                  </a>
                </div>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">or continue with</span>
                  </div>
                </div>

                {/* Social Login */}
                <div className="grid grid-cols-1 gap-3  justify-center items-center" >         
                  <button
                    type="button"
                    onClick={() => socialLogin('google')}
                    className="flex cursor-pointer items-center justify-center gap-2 py-3 bg-white border border-gray-300 font-medium rounded-2xl hover:bg-gray-50 transition-all"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Google
                  </button>
                </div>
              </form>

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