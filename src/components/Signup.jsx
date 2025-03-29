import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

function Signup() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  
  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center p-6">
      <div className="w-full max-w-md transform hover:scale-105 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)]">
        <div className={`${
          theme === 'dark' 
            ? 'bg-gray-900/50 border-gray-800 shadow-[0_0_15px_rgba(168,_85,_247,_0.4)]' 
            : 'bg-white/50 border-gray-200 shadow-[0_0_15px_rgba(168,_85,_247,_0.2)]'
        } backdrop-blur-xl p-8 rounded-2xl shadow-2xl border`}>
          <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Create Account</h2>
          <form className="space-y-6">
            <div className="space-y-2">
              <input 
                type="text" 
                placeholder="Full Name" 
                className={`w-full px-4 py-3 rounded-lg ${
                  theme === 'dark'
                    ? 'bg-gray-800/50 border-gray-700 text-white placeholder-gray-400'
                    : 'bg-gray-100/50 border-gray-300 text-gray-900 placeholder-gray-500'
                } border focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transform transition-all duration-300`} 
              />
            </div>
            <div className="space-y-2">
              <input 
                type="email" 
                placeholder="Email" 
                className={`w-full px-4 py-3 rounded-lg ${
                  theme === 'dark'
                    ? 'bg-gray-800/50 border-gray-700 text-white placeholder-gray-400'
                    : 'bg-gray-100/50 border-gray-300 text-gray-900 placeholder-gray-500'
                } border focus:outline-none focus:border-purple-500 transform transition-all duration-300`} 
              />
            </div>
            <div className="space-y-2">
              <input 
                type="password" 
                placeholder="Password" 
                className={`w-full px-4 py-3 rounded-lg ${
                  theme === 'dark'
                    ? 'bg-gray-800/50 border-gray-700 text-white placeholder-gray-400'
                    : 'bg-gray-100/50 border-gray-300 text-gray-900 placeholder-gray-500'
                } border focus:outline-none focus:border-purple-500 transform transition-all duration-300`} 
              />
            </div>
            <button className="w-full py-3 font-semibold rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-pink-500 hover:to-purple-500 transform hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_10px_20px_rgba(168,_85,_247,_0.4)]">
              Sign Up
            </button>
          </form>
          <p className={`mt-4 text-center ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Already have an account?{' '}
            <button 
              onClick={() => navigate('/login')}
              className="text-purple-500 hover:text-pink-500 transition-colors duration-300"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signup
