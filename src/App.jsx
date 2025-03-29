import { useCallback } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Particles } from '@tsparticles/react'
import { loadFull } from 'tsparticles'
import { useSpring, animated } from 'react-spring'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Signup from './components/Signup'
import CustomCursor from './components/CustomCursor'
import { ThemeProvider, useTheme } from './context/ThemeContext'
import NeuralBackground from './components/NeuralBackground'
import Chat from './components/Chat'
import Dashboard from './components/Dashboard'
import ProjectForm from './components/ProjectForm'
import ProjectDashboard from './components/ProjectDashboard'

function AppContent() {
  const { theme } = useTheme();

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine)
  }, [])

  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 200
  })

  return (
    <animated.div style={fadeIn}>
      <div className={`min-h-screen transition-colors duration-300 ${
        theme === 'dark' 
          ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white' 
          : 'bg-gradient-to-br from-rose-100 via-teal-100 to-violet-100 text-gray-900'
      }`}>
        <CustomCursor />
        <NeuralBackground/>
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={{
            particles: {
              number: {
                value: 80,
                density: {
                  enable: true,
                  value_area: 800
                }
              },
              color: {
                value: theme === 'dark' ? '#ffffff' : '#000000'
              },
              shape: {
                type: 'circle'
              },
              opacity: {
                value: 0.5
              },
              size: {
                value: 3
              },
              move: {
                enable: true,
                speed: 6
              }
            }
          }}
        />
        <Navbar />
        <div className="pt-16 relative z-10">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/new-project" element={<ProjectForm />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/project/:projectId" element={<ProjectDashboard />} />
          </Routes>
        </div>
      </div>
    </animated.div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  )
}

export default App
