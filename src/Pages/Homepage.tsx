import React, { useState, useEffect, useContext } from "react";
import { motion, useAnimation } from "framer-motion";
import { 
  Sparkles, 
  Users, 
  Target, 
  Brain, 
  MessageCircle, 
  Zap, 
  TrendingUp,
  Rocket,
  GraduationCap,
  Briefcase,
  BookOpen,
  Code,
  Heart,
  ArrowRight,
  Star,
  MapPin,
  Filter,
  CheckCircle,
  Navigation,
  Compass,
  Globe,
  Locate,
  Map,
  Navigation2,
  Users2
} from "lucide-react";
import { AuthContext } from "@/AuthContext";

const Homepage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [userLocation, setUserLocation] = useState(null);
  const controls = useAnimation();

  const {isLoggedIn} = useContext(AuthContext)

  useEffect(() => {
    controls.start({ opacity: 1, y: 0 });
    // Simulate getting user location
    setTimeout(() => {
      setUserLocation({
        city: "San Francisco",
        coordinates: { lat: 37.7749, lng: -122.4194 }
      });
    }, 1000);
  }, [controls]);

  const categories = [
    { id: "all", name: "All Hustlers", icon: <Users size={20} />, color: "from-purple-500 to-pink-500" },
    { id: "students", name: "Students", icon: <GraduationCap size={20} />, color: "from-blue-500 to-cyan-500" },
    { id: "developers", name: "Developers", icon: <Code size={20} />, color: "from-green-500 to-emerald-500" },
    { id: "exam", name: "Exam Aspirants", icon: <BookOpen size={20} />, color: "from-orange-500 to-red-500" },
    { id: "founders", name: "Founders", icon: <Rocket size={20} />, color: "from-indigo-500 to-purple-500" },
  ];

  const testimonials = [
    {
      name: "Alex Chen",
      role: "NEET Aspirant",
      text: "Found study partners within 2km radius! We meet at local library every weekend.",
      avatar: "👨‍⚕️",
      location: "Mumbai, 1.5km away"
    },
    {
      name: "Priya Sharma",
      role: "React Developer",
      text: "Matched with devs in my co-working space. We're now building together IRL!",
      avatar: "👩‍💻",
      location: "Bangalore, same building"
    },
    {
      name: "David Park",
      role: "UPSC Student",
      text: "Location filter helped find serious aspirants in my area. No more long commutes!",
      avatar: "👨‍🎓",
      location: "Delhi, 3km radius"
    }
  ];

  const nearbyHustlers = [
    { name: "Sarah L.", skill: "React Dev", distance: "0.5km", status: "Online", color: "bg-green-500" },
    { name: "Mike T.", skill: "JEE Aspirant", distance: "1.2km", status: "Studying", color: "bg-blue-500" },
    { name: "Emma R.", skill: "Startup Founder", distance: "0.8km", status: "Available", color: "bg-purple-500" },
    { name: "James K.", skill: "UPSC Prep", distance: "2.1km", status: "Online", color: "bg-orange-500" },
  ];

  const locationFeatures = [
    {
      icon: <Navigation className="w-8 h-8" />,
      title: "Real-Time Proximity",
      description: "Find hustlers within your radius - study partners, collaborators, or mentors nearby",
      range: "1-10km radius"
    },
    {
      icon: <Map className="w-8 h-8" />,
      title: "Local Communities",
      description: "Join location-based study groups, coding meetups, or project teams in your area",
      range: "City-specific hubs"
    },
    {
      icon: <Compass className="w-8 h-8" />,
      title: "Meet IRL Ready",
      description: "Perfect for in-person sessions, library study dates, or local coffee shop collabs",
      range: "Walkable distances"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      {/* Animated Background with Location Dots */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-pink-900/20"></div>
        
        {/* Animated Location Dots */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-purple-500 rounded-full"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 1.5,
            }}
          />
        ))}
      </div>

      {/* Navbar with Location */}
      <nav className="relative z-10 flex items-center justify-between px-6 md:px-12 py-6 backdrop-blur-sm bg-black/30 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Navigation2 className="w-8 h-8 text-purple-500" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          </div>
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl md:text-3xl font-bold tracking-wide bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent"
          >
            WeMatch
          </motion.h1>
          <div className="hidden md:flex items-center gap-2 text-sm bg-gray-800/50 px-3 py-1 rounded-full">
            <MapPin className="w-3 h-3" />
            <span>Location-based matching</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {userLocation && (
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30">
              <Locate className="w-4 h-4" />
              <span className="text-sm">{userLocation.city}</span>
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          )}
        {
          isLoggedIn ?   <a href="/matching" className="px-6 cursor-pointer py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all">
            Match
          </a> :   <a href="login" className="px-6 cursor-pointer py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all">
            Login
          </a>
        }
        </div>
      </nav>

      {/* Hero Section with Location Focus */}
      <section className="relative z-10 px-6 md:px-12 pt-20 pb-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 mb-6">
            <Navigation2 className="w-4 h-4 text-purple-400" />
            <span className="text-sm">Location-based matching active</span>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-extrabold leading-tight max-w-6xl mx-auto">
            Find hustle partners{" "}
            <span className="relative">
              <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent">
                near you
              </span>
              <motion.div 
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
            </span>
          </h2>
          
          <p className="mt-8 text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Match with hustlers <span className="text-purple-300 font-semibold">in your area</span> based on skills and goals. 
            Perfect for <span className="text-pink-300 font-semibold">in-person study sessions</span>, local meetups, 
            or <span className="text-blue-300 font-semibold">nearby collaborations</span>.
          </p>

          {/* Location Search Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12 max-w-2xl mx-auto"
          >
            <div className="relative">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                <MapPin className="w-5 h-5" />
              </div>
              <input
                type="text"
                placeholder="Enter your location or use current location"
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-800/50 backdrop-blur-sm border border-gray-700 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-sm font-medium">
                Use My Location
              </button>
            </div>
            <div className="flex flex-wrap justify-center gap-3 mt-4">
              <span className="text-sm text-gray-400">Popular cities:</span>
              {["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai"].map(city => (
                <button key={city} className="text-sm px-3 py-1 rounded-full bg-gray-800/30 hover:bg-gray-700/50 transition">
                  {city}
                </button>
              ))}
            </div>
          </motion.div>

          <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 font-semibold text-lg flex items-center justify-center gap-2 hover:shadow-2xl hover:shadow-purple-500/30 transition-all"
            >
              <Navigation2 className="w-5 h-5" />
              Find Nearby Hustlers
              <ArrowRight className="w-5 h-5" />
            </motion.button>
            
            <button className="px-10 py-4 rounded-2xl bg-gray-800/50 backdrop-blur-sm border border-gray-700 font-semibold text-lg hover:bg-gray-700/50 transition-all flex items-center gap-2">
              <Globe className="w-5 h-5" />
              View Map
            </button>
          </div>
        </motion.div>
      </section>

      {/* Nearby Hustlers Section */}
      <section className="relative z-10 px-6 md:px-12 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Users2 className="w-5 h-5 text-green-400" />
                <h3 className="text-2xl font-bold">Hustlers Nearby</h3>
              </div>
              <p className="text-gray-400">Active hustlers in your 5km radius</p>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-400">Radius:</span>
              <select className="bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-1">
                <option>5km</option>
                <option>10km</option>
                <option>20km</option>
                <option>50km</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {nearbyHustlers.map((hustler, index) => (
              <motion.div
                key={hustler.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-sm border border-gray-700/50 hover:border-purple-500/30 transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center font-bold">
                      {hustler.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold">{hustler.name}</div>
                      <div className="text-sm text-gray-400">{hustler.skill}</div>
                    </div>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${hustler.color}`}></div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-gray-400">
                      <MapPin className="w-3 h-3" />
                      Distance
                    </div>
                    <div className="font-medium">{hustler.distance}</div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="text-gray-400">Status</div>
                    <div className="font-medium">{hustler.status}</div>
                  </div>
                </div>
                
                <button className="w-full mt-4 py-2 rounded-xl bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 text-sm font-medium hover:bg-gradient-to-r hover:from-purple-600/30 hover:to-pink-600/30 transition">
                  Connect
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Features */}
      <section className="relative z-10 px-6 md:px-12 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 mb-4">
              <Navigation2 className="w-4 h-4" />
              <span className="text-sm">Location Intelligence</span>
            </div>
            <h3 className="text-4xl md:text-5xl font-bold mt-4">
              Why <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Location Matters</span>
            </h3>
            <p className="text-xl text-gray-300 mt-6 max-w-3xl mx-auto">
              Real connections happen in real places. Find people you can actually meet and collaborate with.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {locationFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="p-8 rounded-3xl bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-sm border border-gray-700/50 hover:border-blue-500/30 transition-all group"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h4 className="text-2xl font-bold mb-4">{feature.title}</h4>
                <p className="text-gray-300 mb-6 leading-relaxed">{feature.description}</p>
                <div className="flex items-center gap-2 text-sm text-blue-400">
                  <MapPin className="w-4 h-4" />
                  {feature.range}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Map Visualization */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-16 p-8 rounded-3xl bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-sm border border-gray-700/50"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h4 className="text-2xl font-bold">Hustler Density Map</h4>
                <p className="text-gray-400">See where hustlers are concentrated in your city</p>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span>High density</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <span>Medium</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span>Low</span>
                </div>
              </div>
            </div>
            
            {/* Simplified Map Visualization */}
            <div className="relative h-64 rounded-xl bg-gradient-to-br from-gray-900 to-black border border-gray-700 overflow-hidden">
              {/* Simulated map points */}
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-3 h-3 rounded-full bg-gradient-to-r from-green-500 to-blue-500"
                  style={{
                    left: `${Math.random() * 90}%`,
                    top: `${Math.random() * 90}%`,
                  }}
                />
              ))}
              
              {/* Current location marker */}
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center animate-pulse">
                    <Navigation2 className="w-4 h-4 text-white" />
                  </div>
                  <div className="absolute inset-0 w-8 h-8 bg-purple-600 rounded-full animate-ping opacity-20"></div>
                </div>
              </div>
              
              <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-lg">
                <div className="text-sm">Your location</div>
                <div className="text-xs text-gray-400">5km radius shown</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works with Location */}
      <section className="relative z-10 px-6 md:px-12 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 mb-4">
              <Zap className="w-4 h-4" />
              <span className="text-sm">Location-Powered Matching</span>
            </div>
            <h3 className="text-4xl md:text-5xl font-bold mt-4">
              Find partners you can{" "}
              <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                actually meet
              </span>
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Set Your Location",
                description: "Enable location services or enter your area. Choose your preferred meeting radius.",
                icon: <MapPin className="w-8 h-8" />,
                gradient: "from-purple-500 to-pink-500"
              },
              {
                step: "02",
                title: "Discover Local Hustlers",
                description: "See profiles of hustlers in your area. Filter by distance, skills, and availability.",
                icon: <Users className="w-8 h-8" />,
                gradient: "from-blue-500 to-cyan-500"
              },
              {
                step: "03",
                title: "Connect & Meet Up",
                description: "Match with nearby hustlers and plan in-person study sessions or collaborations.",
                icon: <Navigation2 className="w-8 h-8" />,
                gradient: "from-green-500 to-emerald-500"
              }
            ].map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative p-8 rounded-3xl bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-sm border border-gray-700/50"
              >
                <div className="absolute -top-3 -left-3 w-12 h-12 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-xl font-bold">
                  {step.step}
                </div>
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${step.gradient} flex items-center justify-center mb-6`}>
                  {step.icon}
                </div>
                <h4 className="text-2xl font-bold mb-4">{step.title}</h4>
                <p className="text-gray-300">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials with Location */}
      <section className="relative z-10 px-6 md:px-12 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500/20 to-rose-500/20 border border-pink-500/30 mb-4">
              <Navigation2 className="w-4 h-4" />
              <span className="text-sm">Local Success Stories</span>
            </div>
            <h3 className="text-4xl md:text-5xl font-bold mt-4">
              Hustlers connecting{" "}
              <span className="bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
                locally
              </span>
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="p-8 rounded-3xl bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-sm border border-gray-700/50"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="text-4xl">{testimonial.avatar}</div>
                  <div className="flex items-center gap-2 text-sm bg-gray-800/50 px-3 py-1 rounded-full">
                    <MapPin className="w-3 h-3" />
                    <span>{testimonial.location}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 italic mb-6">"{testimonial.text}"</p>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-gray-400">{testimonial.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA with Location Focus */}
      <section className="relative z-10 px-6 md:px-12 py-24">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative rounded-3xl p-12 bg-gradient-to-br from-purple-900/30 via-pink-900/20 to-gray-900/30 backdrop-blur-sm border border-purple-500/20 overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
            
            <Navigation2 className="w-16 h-16 mx-auto mb-6 text-purple-400" />
            
            <h3 className="text-4xl md:text-5xl font-bold mb-6">
              Find Your Local Hustle Crew
            </h3>
            
            <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
              Connect with motivated people in your area. Study together at the library,
              code together at cafes, or build startups with local founders.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 font-semibold text-lg flex items-center justify-center gap-3 hover:shadow-2xl hover:shadow-purple-500/30 transition-all"
              >
                <Navigation2 className="w-5 h-5" />
                Use My Location
              </motion.button>
              
              <button className="px-8 py-4 rounded-2xl bg-gray-800/50 backdrop-blur-sm border border-gray-700 font-semibold text-lg hover:bg-gray-700/50 transition-all">
                Enter Location Manually
              </button>
            </div>
            
            <p className="text-sm text-gray-400 mt-6">
              Your location is only used for matching • Privacy first
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 md:px-12 py-12 border-t border-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Navigation2 className="w-6 h-6 text-purple-500" />
                <span className="text-xl font-bold">WeMatch</span>
              </div>
              <p className="text-gray-400 text-sm">
                Connecting hustlers locally. Find study partners, collaborators, 
                and teammates in your area.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Location Features</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>• Proximity-based matching</li>
                <li>• Local study groups</li>
                <li>• City-specific communities</li>
                <li>• In-person meetups</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Privacy First</h4>
              <p className="text-sm text-gray-400">
                Your location is encrypted and only used for matching. 
                You control what you share and with whom.
              </p>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
            <p>© {new Date().getFullYear()} WeMatch. Location-powered connections for hustlers everywhere.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;