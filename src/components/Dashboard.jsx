import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

function Dashboard() {
  const { theme } = useTheme()
  const navigate = useNavigate()

  // Mock projects data with more details
  const projects = [
    { 
      id: 1, 
      name: 'E-commerce Platform', 
      status: 'In Progress', 
      lastUpdated: '2024-02-10',
      testsCount: 24,
      passRate: 87
    },
    { 
      id: 2, 
      name: 'Social Media App', 
      status: 'Completed', 
      lastUpdated: '2024-02-08',
      testsCount: 36,
      passRate: 95
    },
    { 
      id: 3, 
      name: 'Portfolio Website', 
      status: 'Planning', 
      lastUpdated: '2024-02-05',
      testsCount: 12,
      passRate: 75
    }
  ]

  return (
    <div className="min-h-[calc(100vh-64px)] p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            My Projects
          </h1>
          <button
            onClick={() => navigate('/new-project')}
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-pink-500 hover:to-purple-500 transform hover:-translate-y-1 transition-all duration-300"
          >
            Create New Project
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(project => (
            <div
              key={project.id}
              onClick={() => navigate(`/project/${project.id}`)}
              className={`${
                theme === 'dark' 
                  ? 'bg-gray-900/50 border-gray-800 hover:shadow-[0_0_15px_rgba(168,_85,_247,_0.4)]' 
                  : 'bg-white/50 border-gray-200 hover:shadow-[0_0_15px_rgba(168,_85,_247,_0.2)]'
              } backdrop-blur-xl p-6 rounded-xl border transition-all duration-300 hover:scale-105 cursor-pointer`}
            >
              <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
              <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                <p>Status: <span className="text-purple-500">{project.status}</span></p>
                <p>Last Updated: {project.lastUpdated}</p>
              </div>
              <div className="mt-4 flex space-x-3">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/project/${project.id}`);
                  }} 
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm hover:from-pink-500 hover:to-purple-500 transition-all duration-300"
                >
                  View Details
                </button>
                <button className={`px-4 py-2 rounded-lg text-sm ${
                  theme === 'dark'
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                } transition-all duration-300`}>
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
