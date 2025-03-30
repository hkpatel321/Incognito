import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

const Navbar = () => {
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("token") !== null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    navigate('/login');
  };

  return (
    <nav className={`fixed w-full z-20 top-0 left-0 ${
      theme === 'dark' 
        ? 'bg-gray-900 text-white border-gray-800' 
        : 'bg-white text-gray-900 border-gray-200'
    } border-b transition-colors duration-300`}>
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center">
          <span className="self-center text-xl font-semibold whitespace-nowrap">PipeTest</span>
        </a>
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <>
              <Link
                to="/dashboard"
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-pink-500 hover:to-purple-500 transform hover:-translate-y-1 transition-all duration-300"
              >
                Dashboard
              </Link>
              <Link
                to="/chat"
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-pink-500 hover:to-purple-500 transform hover:-translate-y-1 transition-all duration-300"
              >
                Chat
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-pink-500 hover:to-red-500 transform hover:-translate-y-1 transition-all duration-300"
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-pink-500 hover:to-purple-500 transform hover:-translate-y-1 transition-all duration-300"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className={`px-4 py-2 rounded-lg ${
                  theme === 'dark'
                    ? 'bg-gray-900/50 border border-gray-800'
                    : 'bg-white/50 border border-gray-200'
                } hover:scale-105 transition-all duration-300`}
              >
                Sign Up
              </Link>
            </>
          )}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg ${
              theme === 'dark'
                ? 'hover:bg-gray-700 text-yellow-300'
                : 'hover:bg-gray-100 text-gray-700'
            }`}
          >
            {theme === 'dark' ? '🌞' : '🌙'}
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
