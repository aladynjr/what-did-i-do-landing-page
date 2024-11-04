import { useState, useEffect } from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css'
import './App.css'
import { Clock, BarChart2, Camera, ArrowRight, Lock } from "lucide-react"
import { Button } from "./components/ui/button"
import { Card } from "./components/ui/card"
import html2canvas from 'html2canvas'; 

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDBzUQnvGpU5UDe85HENmkjAR2jEQ3mFjM",
  authDomain: "what-did-i-do-f931c.firebaseapp.com",
  projectId: "what-did-i-do-f931c",
  storageBucket: "what-did-i-do-f931c.firebasestorage.app",
  messagingSenderId: "138354713845",
  appId: "1:138354713845:web:b662b584e8ca5d69ccd1bc",
  measurementId: "G-TY186136YV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const Logo = ({ size = "h-10 w-10" }) => (
  <div className={`relative flex ${size} items-center justify-center rounded-2xl bg-gradient-to-br from-teal-400 via-emerald-400 to-cyan-400 shadow-lg transition-transform hover:scale-105 duration-300 overflow-hidden`}>
    {/* Base layers */}
    <div className="absolute inset-0 rounded-2xl bg-white opacity-10 mix-blend-overlay" />
    
    {/* Decorative band */}
    <div className="absolute inset-0 overflow-hidden">
      {/* Main thick band */}
      <div className="absolute top-1/2 left-1/2 w-[200%] h-[25%] -translate-x-1/2 -translate-y-1/2 -rotate-[30deg] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      
      {/* Category colors band */}
      <div className="absolute top-1/2 left-1/2 w-[200%] h-[30%] -translate-x-1/2 -translate-y-1/2 -rotate-[30deg]">
        <div className="w-full h-full flex flex-col">
          <div className="w-full h-full bg-[#F43F5E]/60" /> {/* Changed to a red/pink */}
          <div className="w-full h-full bg-[#3B82F6]/60" /> {/* Changed to a blue */}
          <div className="w-full h-full bg-[#10B981]/60" />
          <div className="w-full h-full bg-[#EC4899]/60" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      </div>
    </div>
    
    {/* Clock icon with updated blur approach */}
    <div className="relative z-10 flex items-center justify-center w-[70%] h-[70%]">
      {/* Replace backdrop-blur with a semi-transparent background */}
      <div className="absolute inset-0 bg-white/20 rounded-full" />
      <Clock 
        className="relative w-full h-full text-white" 
        strokeWidth={2}
        style={{ 
          filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.2)) blur(0.5px)', // Added slight blur to the icon itself
        }}
      />
    </div>
    
    {/* Overlay layers */}
    <div className="absolute inset-0 rounded-2xl ring-1 ring-white/30" />
    <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/5 to-transparent" />
  </div>
);

function App() {
  const [isTracking, setIsTracking] = useState(true)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [showLogo, setShowLogo] = useState(false)
  
  // Updated sampleData with full screenshots
  const sampleData = {
    stats: {
      WORK: 45.5,      // ~3.6 hours
      LEARN: 25.0,     // ~2.0 hours
      SOCIAL: 15.5,    // ~1.2 hours
      ENTERTAINMENT: 14.0  // ~1.1 hours
    },
    timeInHours: {
      WORK: 3.6,
      LEARN: 2.0,
      SOCIAL: 1.2,
      ENTERTAINMENT: 1.1
    },
    screenshots: [
      // WORK examples
      {
        id: 1,
        timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
        category: 'WORK',
        activity: 'Software Development in VS Code',
        thumbnail: 'https://code.visualstudio.com/assets/docs/getstarted/userinterface/hero.png'
      },
      {
        id: 2,
        timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        category: 'WORK',
        activity: 'Writing Documentation in Notion',
        thumbnail: 'https://images.ctfassets.net/spoqsaf9291f/1vn8gmuocnrgYDGUp1DigM/f540872edc53495f36a5152843345c16/product_docs.png'
      },
      {
        id: 3,
        timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
        category: 'WORK',
        activity: 'Reviewing Pull Requests on GitHub',
        thumbnail: 'https://dcv19h61vib2d.cloudfront.net/thumbs/egghead-re-request-a-pr-review-SJHc1Hh8L/egghead-re-request-a-pr-review-SJHc1Hh8L.jpg'
      },
      
      // LEARN examples
      {
        id: 4,
        timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
        category: 'LEARN',
        activity: 'Watching Programming Tutorial on YouTube',
        thumbnail: 'https://i.ytimg.com/vi/kUMe1FH4CHE/maxresdefault.jpg'
      },
      {
        id: 5,
        timestamp: new Date(Date.now() - 1000 * 60 * 75).toISOString(),
        category: 'LEARN',
        activity: 'Reading Technical Documentation',
        thumbnail: 'https://byui-cse.github.io/cse450-course/shared/img/ref-parameters.png'
      },
      
      // SOCIAL examples
      {
        id: 6,
        timestamp: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
        category: 'SOCIAL',
        activity: 'Team Meeting on Zoom',
        thumbnail: 'https://thejoshua-group.com/sites/default/files/Screen%20Shot%202020-05-26%20at%2012.35.42%20PM_0.png'
      },
      {
        id: 7,
        timestamp: new Date(Date.now() - 1000 * 60 * 105).toISOString(),
        category: 'SOCIAL',
        activity: 'Slack Discussion with Team',
        thumbnail: 'https://media.sproutsocial.com/uploads/2021/01/Slack-general-3.png'
      },
      
      // ENTERTAINMENT examples
      {
        id: 8,
        timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
        category: 'ENTERTAINMENT',
        activity: 'Scrolling TikTok',
        thumbnail: 'https://placehold.co/200x150/000000/FFFFFF?text=TikTok'
      },
      {
        id: 9,
        timestamp: new Date(Date.now() - 1000 * 60 * 135).toISOString(),
        category: 'ENTERTAINMENT',
        activity: 'Browsing Instagram Reels',
        thumbnail: 'https://blog.hootsuite.com/wp-content/uploads/2023/09/Instagram-Reels-History-.png'
      },
      {
        id: 10,
        timestamp: new Date(Date.now() - 1000 * 60 * 150).toISOString(),
        category: 'ENTERTAINMENT',
        activity: 'Watching Netflix',
        thumbnail: 'https://placehold.co/200x150/E50914/FFFFFF?text=Netflix'
      },
      {
        id: 11,
        timestamp: new Date(Date.now() - 1000 * 60 * 165).toISOString(),
        category: 'ENTERTAINMENT',
        activity: 'Playing Minecraft',
        thumbnail: 'https://i.ytimg.com/vi/cGJoCE99gLs/maxresdefault.jpg'
      }
    ]
  }

  const formatCategoryName = (category) => {
    return category
      .toLowerCase()
      .replace(/_/g, ' ')
      .replace(/\b\w/g, c => c.toUpperCase())
  }

  const formatDate = (date) => {
    const options = { weekday: 'long', month: 'long', day: 'numeric' }
    return date.toLocaleDateString('en-US', options)
  }

  const isToday = (date) => {
    const today = new Date()
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear()
  }

  const changeDate = (direction) => {
    const newDate = new Date(currentDate)
    newDate.setDate(newDate.getDate() + direction)
    setCurrentDate(newDate)
  }

  const downloadLogo = () => {
    const logoElement = document.getElementById('large-logo');
    html2canvas(logoElement, {
      backgroundColor: null,
      scale: 2, // For higher quality
      logging: true,
    }).then(canvas => {
      const link = document.createElement('a');
      link.download = 'what-did-i-do-logo.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="px-4 lg:px-6 h-14 flex items-center bg-white">
        <div className="container mx-auto flex w-full items-center">
          <a className="flex items-center justify-center" href="#">
            <Logo />
            <span className="ml-2 text-lg font-semibold">What Did I Do</span>
          </a>
        </div>
      </header>

      {showLogo && (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col items-center gap-4 bg-transparent p-4">
          <div id="large-logo">
            <Logo size="h-96 w-96" />
          </div>
          
          <Button 
            onClick={downloadLogo}
            className="bg-[#00D1B2] text-white hover:bg-[#00B4D8] shadow-lg transition-all duration-300"
          >
            Download Logo
          </Button>
        </div>
      )}

      <main className="flex-1">
        {/* Hero Section - Updated layout and spacing */}
        <section className="w-full py-16 md:py-24 lg:py-32 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-6 text-center">
              <div className="space-y-4">
                <div className="flex gap-2 justify-center">
                
                  <div className="inline-flex items-center gap-1 rounded-lg bg-emerald-100 px-3 py-1 text-sm text-emerald-700">
                    <i className="fas fa-code-branch text-xs"></i>
                    Open Source
                  </div>
                </div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                  What Did You Do Today?
                </h1>
                <p className="mx-auto max-w-[600px] text-lg text-gray-500 md:text-xl">
                  AI-powered time tracking with screenshots. See exactly what you did, when you did it, and how long it took.
                  Uses AI to automatically detect and categorize your activities. All screenshots are stored locally for your privacy.
                </p>
              </div>
              <div className="pt-4">
                <Button 
                  className="inline-flex h-12 items-center justify-center rounded-md bg-teal-500 px-8 text-base font-medium text-white shadow-lg transition-colors hover:bg-teal-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
                  onClick={() => window.open('https://github.com/aladynjr/what-did-i-do', '_blank')}
                >
                  Download for FREE
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* How it Works Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container mx-auto px-4 md:px-6">
            <div className="space-y-10">
              <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How it works</h2>
                <p className="mt-4 text-gray-500 dark:text-gray-400 md:text-xl">
                  Effortless Time Tracking at Your Fingertips
                </p>
              </div>
              
              <div className="flex justify-center">
                <Card className="w-full max-w-[1200px] h-[800px] bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden font-inter">
                  <div className="flex flex-col w-full h-full">
                    {/* Window Header */}
                    <div className="flex items-center justify-between h-[42px] px-4 bg-white border-b border-gray-200 flex-shrink-0">
                      <div className="text-gray-600 text-sm font-medium ml-2">What Did I Do</div>
                      <div className="flex -webkit-app-region-no-drag">
                        <button className="w-[46px] h-[42px] flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors">
                          <i className="fas fa-window-minimize"></i>
                        </button>
                        <button className="w-[46px] h-[42px] flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors">
                          <i className="fas fa-window-maximize"></i>
                        </button>
                        <button className="w-[46px] h-[42px] flex items-center justify-center text-gray-600 hover:bg-red-500 hover:text-white transition-colors">
                          <i className="fas fa-times"></i>
                        </button>
                      </div>
                    </div>

                    {/* Main Layout */}
                    <div className="flex flex-col lg:flex-row flex-1 min-h-0">
                      {/* Sidebar */}
                      <div className="w-full lg:w-[260px] bg-white border-b lg:border-r border-gray-200 overflow-y-auto flex-shrink-0">
                        <div className="flex flex-col gap-3 p-4 lg:p-6">
                          <div className="flex flex-row lg:flex-col gap-2">
                            <button 
                              className={`w-full flex items-center justify-center lg:justify-start gap-2 h-10 px-4 rounded-lg font-semibold text-sm transition-all ${
                                isTracking 
                                  ? 'bg-red-500 hover:bg-red-600 text-white' 
                                  : 'bg-emerald-500 hover:bg-emerald-600 text-white'
                              }`}
                              onClick={() => setIsTracking(!isTracking)}
                            >
                              <i className={`fas fa-${isTracking ? 'pause' : 'play'}`}></i>
                              <span>{isTracking ? 'Pause' : 'Start'}</span>
                            </button>

                            <div className="w-full relative">
                              <select className="w-full h-10 pl-9 pr-3 appearance-none bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-900 transition-all hover:border-gray-300 hover:-translate-y-[1px] hover:shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-none">
                                <option value="1">Every 1 minute</option>
                                <option value="2">Every 2 minutes</option>
                                <option value="3">Every 3 minutes</option>
                                <option value="5">Every 5 minutes</option>
                                <option value="10">Every 10 minutes</option>
                              </select>
                              <i className="fas fa-clock absolute left-3 top-1/2 -translate-y-1/2 text-gray-600"></i>
                            </div>
                          </div>

                          <button className="flex items-center gap-2 h-9 px-3 text-sm bg-white border border-gray-200 rounded-md hover:bg-gray-50 hover:border-gray-300 hover:-translate-y-[1px] hover:shadow-sm transition-all">
                            <i className="fas fa-camera"></i>
                            <span>Test Screenshot</span>
                          </button>

                          <div className="mt-auto pt-6 border-t border-gray-200">
                            <div className="text-xs text-gray-500 mb-2 px-3">Questions or feedback?</div>
                            <a 
                              href="https://x.com/aladdinnjr" 
                              target="_blank" 
                              className="flex items-center gap-3 text-sm text-gray-600 px-3 py-2 rounded-md hover:bg-gray-50 hover:text-gray-900 transition-all"
                            >
                              <i className="fab fa-twitter"></i>
                              <span>@aladdinnjr</span>
                            </a>
                          </div>
                        </div>
                      </div>

                      {/* Main Content */}
                      <div className="flex-1 p-4 lg:p-6 overflow-y-auto bg-gray-50">
                        <div className="space-y-4 lg:space-y-6 pb-8">
                          {/* Stats Section */}
                          <div className="bg-white border border-gray-200 rounded-2xl p-4 lg:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
                            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 mb-6 lg:mb-8">
                              <div className="space-y-1">
                                <h2 className="text-xl lg:text-2xl font-semibold tracking-[-0.02em] text-gray-900">What did you do?</h2>
                                <p className="text-gray-500 text-sm">Track your daily activities and productivity</p>
                              </div>
                              <div className="flex items-center gap-2 lg:gap-3">
                                <button 
                                  className="w-10 h-10 flex items-center justify-center border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:-translate-y-[1px] hover:shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                  onClick={() => changeDate(-1)}
                                >
                                  <i className="fas fa-chevron-left"></i>
                                </button>
                                <div className="text-sm font-medium bg-gray-50 py-2 px-4 rounded-lg border border-gray-100">
                                  {formatDate(currentDate)}
                                </div>
                                <button 
                                  className="w-10 h-10 flex items-center justify-center border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:-translate-y-[1px] hover:shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                  onClick={() => changeDate(1)}
                                  disabled={isToday(currentDate)}
                                >
                                  <i className="fas fa-chevron-right"></i>
                                </button>
                              </div>
                            </div>

                            {/* Category Stats - make cards stack on mobile */}
                            <div className="space-y-4 lg:space-y-6">
                              {Object.entries(sampleData.stats)
                                .sort(([, a], [, b]) => b - a)
                                .map(([category, percentage]) => (
                                  <div key={category} className="space-y-3 p-4 rounded-xl border border-gray-100 hover:border-gray-200 transition-all">
                                    <div className="flex justify-between items-center">
                                      <div className="space-y-1">
                                        <span className={`text-base font-semibold ${
                                          category === 'WORK' ? 'text-[#6366F1]' :
                                          category === 'LEARN' ? 'text-[#8B5CF6]' :
                                          category === 'SOCIAL' ? 'text-[#10B981]' :
                                          'text-[#EC4899]'
                                        }`}>
                                          {formatCategoryName(category)}
                                        </span>
                                        <div className="text-sm text-gray-500">
                                          {sampleData.timeInHours[category].toFixed(1)} hours
                                        </div>
                                      </div>
                                      <span className={`text-2xl font-bold ${
                                        category === 'WORK' ? 'text-[#6366F1]' :
                                        category === 'LEARN' ? 'text-[#8B5CF6]' :
                                        category === 'SOCIAL' ? 'text-[#10B981]' :
                                        'text-[#EC4899]'
                                      }`}>
                                        {percentage.toFixed(1)}%
                                      </span>
                                    </div>
                                    <div className="h-3 bg-gray-100 rounded-lg overflow-hidden">
                                      <div 
                                        className={`h-full rounded-lg transition-all duration-500 ${
                                          category === 'WORK' ? 'bg-[#6366F1]' :
                                          category === 'LEARN' ? 'bg-[#8B5CF6]' :
                                          category === 'SOCIAL' ? 'bg-[#10B981]' :
                                          'bg-[#EC4899]'
                                        }`}
                                        style={{ 
                                          width: `${percentage}%`,
                                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                                        }}
                                      />
                                    </div>
                                  </div>
                                ))}
                            </div>

                            {/* Total Time Summary */}
                            <div className="mt-8 pt-6 border-t border-gray-100">
                              <div className="flex justify-between items-center text-sm text-gray-500">
                                <span>Total Tracked Time</span>
                                <span className="font-medium text-gray-900">
                                  {Object.values(sampleData.timeInHours).reduce((a, b) => a + b, 0).toFixed(1)} hours
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Screenshots Section */}
                          <div className="product-screenshot-history">
                            <h2 className="text-xl font-semibold tracking-tight text-gray-900 mb-4">Screenshot History</h2>
                            <div className="flex flex-col gap-4">
                              {sampleData.screenshots.map(screenshot => (
                                <div 
                                  key={screenshot.id} 
                                  className="flex flex-col sm:flex-row gap-4 p-4 bg-white border border-gray-200 rounded-xl hover:-translate-y-[1px] hover:shadow-sm transition-all"
                                >
                                  <img 
                                    src={screenshot.thumbnail} 
                                    className="w-full sm:w-[180px] h-[160px] sm:h-[100px] object-cover rounded-lg border border-gray-200"
                                    alt={screenshot.activity} 
                                  />
                                  <div className="flex flex-col gap-2">
                                    <div className="text-sm">
                                      <span className="font-medium text-gray-500">Activity: </span>
                                      <span className="font-medium text-gray-900">{screenshot.activity}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <span className="text-sm font-medium text-gray-500">Category: </span>
                                      <div className={`inline-block px-2 py-1 rounded text-xs font-medium w-fit ${
                                        screenshot.category === 'WORK' ? 'bg-indigo-50 text-indigo-700' :
                                        screenshot.category === 'LEARN' ? 'bg-purple-50 text-purple-700' :
                                        screenshot.category === 'SOCIAL' ? 'bg-emerald-50 text-emerald-700' :
                                        'bg-pink-50 text-pink-700'
                                      }`}>
                                        {formatCategoryName(screenshot.category)}
                                      </div>
                                    </div>
                                    <div className="text-xs">
                                      <span className="text-gray-500">Timestamp: </span>
                                      <span className="text-gray-700">{new Date(screenshot.timestamp).toLocaleString()}</span>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                <Card className="group relative p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100 hover:border-teal-100">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-teal-50 to-transparent rounded-bl-full opacity-50" />
                  <div className="relative space-y-4">
                    <div className="inline-flex p-3 rounded-xl bg-teal-50 group-hover:bg-teal-100 transition-colors duration-300">
                      <Clock className="h-6 w-6 text-teal-600" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold tracking-tight">Set Your Interval</h3>
                      <p className="text-sm leading-relaxed text-gray-600">
                        Choose how often you want to capture your work. From every minute to every 10 minutes.
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="group relative p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100 hover:border-teal-100">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-teal-50 to-transparent rounded-bl-full opacity-50" />
                  <div className="relative space-y-4">
                    <div className="inline-flex p-3 rounded-xl bg-teal-50 group-hover:bg-teal-100 transition-colors duration-300">
                      <Camera className="h-6 w-6 text-teal-600" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold tracking-tight">Automatic Screenshots</h3>
                      <p className="text-sm leading-relaxed text-gray-600">
                        We capture screenshots at your set intervals, giving you a visual record of your work.
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="group relative p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100 hover:border-teal-100">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-teal-50 to-transparent rounded-bl-full opacity-50" />
                  <div className="relative space-y-4">
                    <div className="inline-flex p-3 rounded-xl bg-teal-50 group-hover:bg-teal-100 transition-colors duration-300">
                      <BarChart2 className="h-6 w-6 text-teal-600" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold tracking-tight">AI Categorization</h3>
                      <p className="text-sm leading-relaxed text-gray-600">
                        Powered by Gemini AI, your activities are automatically detected and categorized. Just provide your free Google API key to get started.
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="group relative p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100 hover:border-teal-100">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-teal-50 to-transparent rounded-bl-full opacity-50" />
                  <div className="relative space-y-4">
                    <div className="inline-flex p-3 rounded-xl bg-teal-50 group-hover:bg-teal-100 transition-colors duration-300">
                      <Lock className="h-6 w-6 text-teal-600" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold tracking-tight">Local Storage</h3>
                      <p className="text-sm leading-relaxed text-gray-600">
                        All screenshots are stored locally on your device, ensuring your privacy and data control.
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Contact Developer Section - Add this before the footer */}
      <section className="w-full py-12 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Contact the Developer</h2>
            <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl">
              Have questions, feedback, or just want to say hi? Reach out on X (Twitter)!
            </p>
            <div className="pt-6">
              <a 
                href="https://x.com/aladdinnjr" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#1DA1F2] text-white hover:bg-[#1a8cd8] transition-colors"
              >
                <i className="fab fa-twitter text-lg"></i>
                <span className="font-medium">@aladdinnjr</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-white">
        <div className="container mx-auto flex flex-col sm:flex-row gap-2 items-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            © 2024 What Did You Do. All rights reserved.
          </p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <a className="text-xs hover:underline underline-offset-4" href="/privacy-policy.html">Privacy</a>
          </nav>
        </div>
      </footer>
    </div>
  )
}

export default App
