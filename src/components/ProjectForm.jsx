import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

function ProjectForm() {
  const { theme } = useTheme()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    personalAccessToken: '',
    figmaFileId: '',
    figmaLink: '',
    gitlabLink: '',
    githubLink: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
    // Add your project creation logic here
    navigate('/dashboard')
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center p-4">
      <div className="w-full max-w-xl transform hover:scale-105 transition-all duration-500">
        <div className={`${
          theme === 'dark' 
            ? 'bg-gray-900/50 border-gray-800 shadow-[0_0_15px_rgba(168,_85,_247,_0.4)]' 
            : 'bg-white/50 border-gray-200 shadow-[0_0_15px_rgba(168,_85,_247,_0.2)]'
        } backdrop-blur-xl p-6 rounded-2xl shadow-2xl border`}>
          <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Create New Project
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { name: 'personalAccessToken', label: 'Personal Access Token', type: 'password' },
              { name: 'figmaFileId', label: 'Figma File ID', type: 'text' },
              { name: 'figmaLink', label: 'Figma Full Link', type: 'url' },
              { name: 'gitlabLink', label: 'GitLab Link', type: 'url' },
              { name: 'githubLink', label: 'GitHub Link', type: 'url' }
            ].map((field) => (
              <div key={field.name} className="space-y-1">
                <label className={`block text-sm font-medium ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 rounded-lg ${
                    theme === 'dark'
                      ? 'bg-gray-800/50 border-gray-700 text-white placeholder-gray-400'
                      : 'bg-gray-100/50 border-gray-300 text-gray-900 placeholder-gray-500'
                  } border focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-200 transition-all duration-300`}
                />
              </div>
            ))}
            <button
              type="submit"
              className="w-full py-2.5 mt-2 font-semibold rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-pink-500 hover:to-purple-500 transform hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_10px_20px_rgba(168,_85,_247,_0.4)]"
            >
              Create Project
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ProjectForm
