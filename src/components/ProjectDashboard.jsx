import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
);

function ProjectDashboard() {
  const { projectId } = useParams();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSystemTest = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      const response = await fetch('https://e69b-2401-4900-7903-cc20-953f-8402-1893-c973.ngrok-free.app/test-status' , {
        headers : {
          accept : "application/json"
        }
      });
      const data = await response.json();
      alert(`Test Status: ${JSON.stringify(data)}`);
    } catch (error) {
      console.error('Error fetching test status:', error);
      alert('Failed to get test status');
    } finally {
      setIsLoading(false);
    }
  };

  // Mock data based on projectId
  const mockProjects = {
    1: {
      name: 'E-commerce Platform',
      status: 'In Progress',
      testsCount: 24,
      passRate: 87,
    },
    2: {
      name: 'Social Media App',
      status: 'Completed',
      testsCount: 36,
      passRate: 95,
    },
    3: {
      name: 'Portfolio Website',
      status: 'Planning',
      testsCount: 12,
      passRate: 75,
    }
  };

  // Get project data or generate fallback data if ID doesn't exist
  const projectData = mockProjects[projectId] || {
    name: `Project ${projectId}`,
    status: ['In Progress', 'Completed', 'Planning'][Math.floor(Math.random() * 3)],
    testsCount: Math.floor(Math.random() * 50) + 10,
    passRate: Math.floor(Math.random() * 30) + 70,
  };

  // Generate mock test suites
  const testSuites = [
    { 
      name: 'UI Tests', 
      total: Math.floor(projectData.testsCount * 0.5), 
      passed: Math.floor(projectData.testsCount * 0.5 * (projectData.passRate/100)),
      failed: Math.floor(projectData.testsCount * 0.5 * (1 - projectData.passRate/100))
    },
    { 
      name: 'API Tests', 
      total: Math.floor(projectData.testsCount * 0.3),
      passed: Math.floor(projectData.testsCount * 0.3 * (projectData.passRate/100)),
      failed: Math.floor(projectData.testsCount * 0.3 * (1 - projectData.passRate/100))
    },
    { 
      name: 'Integration Tests', 
      total: Math.floor(projectData.testsCount * 0.2),
      passed: Math.floor(projectData.testsCount * 0.2 * (projectData.passRate/100)),
      failed: Math.floor(projectData.testsCount * 0.2 * (1 - projectData.passRate/100))
    }
  ];

  // Generate mock recent runs
  const recentRuns = Array.from({ length: 5 }, (_, i) => ({
    id: i + 1,
    timestamp: new Date(Date.now() - i * 3600000).toLocaleString(),
    status: Math.random() > 0.2 ? 'passed' : 'failed'
  }));

  // Generate mock data for test performance over time
  const timeSeriesData = {
    labels: Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return date.toLocaleDateString();
    }),
    datasets: [
      {
        label: 'Pass Rate',
        data: Array.from({ length: 7 }, () => Math.floor(Math.random() * 30) + 70),
        borderColor: theme === 'dark' ? '#10B981' : '#8B5CF6',
        tension: 0.4,
        fill: false,
      },
      {
        label: 'Test Coverage',
        data: Array.from({ length: 7 }, () => Math.floor(Math.random() * 20) + 75),
        borderColor: theme === 'dark' ? '#F59E0B' : '#EC4899',
        tension: 0.4,
        fill: false,
      }
    ]
  };

  // Data for test distribution pie chart
  const testDistributionData = {
    labels: ['UI Tests', 'API Tests', 'Integration Tests'],
    datasets: [{
      data: testSuites.map(suite => suite.total),
      backgroundColor: [
        'rgba(147, 51, 234, 0.7)',
        'rgba(59, 130, 246, 0.7)',
        'rgba(16, 185, 129, 0.7)'
      ],
      borderColor: theme === 'dark' ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.2)',
      borderWidth: 1,
    }]
  };

  // Data for pass/fail bar chart
  const passFailData = {
    labels: testSuites.map(suite => suite.name),
    datasets: [
      {
        label: 'Passed',
        data: testSuites.map(suite => suite.passed),
        backgroundColor: 'rgba(16, 185, 129, 0.7)',
      },
      {
        label: 'Failed',
        data: testSuites.map(suite => suite.failed),
        backgroundColor: 'rgba(239, 68, 68, 0.7)',
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: theme === 'dark' ? '#fff' : '#374151',
        }
      }
    },
    scales: {
      y: {
        ticks: {
          color: theme === 'dark' ? '#fff' : '#374151',
        },
        grid: {
          color: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        }
      },
      x: {
        ticks: {
          color: theme === 'dark' ? '#fff' : '#374151',
        },
        grid: {
          color: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        }
      }
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              {projectData.name}
            </h1>
            <p className={`mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-pink-500 hover:to-purple-500 transform hover:-translate-y-1 transition-all duration-300"
            >
              Back to Projects
            </button>
            <button
              onClick={handleSystemTest}
              disabled={isLoading}
              className={`px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-cyan-500 hover:to-blue-500 transform hover:-translate-y-1 transition-all duration-300 ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? 'Running Test...' : 'System Test'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {['Total Tests', 'Pass Rate', 'Status'].map((metric, index) => (
            <div
              key={metric}
              className={`${
                theme === 'dark'
                  ? 'bg-gray-900/50 border-gray-800'
                  : 'bg-white/50 border-gray-200'
              } backdrop-blur-xl p-6 rounded-xl border`}
            >
              <h3 className="text-lg font-semibold mb-2">{metric}</h3>
              <p className="text-3xl font-bold text-purple-500">
                {index === 0 ? projectData.testsCount
                  : index === 1 ? `${projectData.passRate}%`
                  : projectData.status}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className={`${
            theme === 'dark'
              ? 'bg-gray-900/50 border-gray-800'
              : 'bg-white/50 border-gray-200'
          } backdrop-blur-xl p-6 rounded-xl border`}>
            <h2 className="text-xl font-semibold mb-4">Test Performance Trend</h2>
            <div className="h-[300px]">
              <Line data={timeSeriesData} options={chartOptions} />
            </div>
          </div>

          <div className={`${
            theme === 'dark'
              ? 'bg-gray-900/50 border-gray-800'
              : 'bg-white/50 border-gray-200'
          } backdrop-blur-xl p-6 rounded-xl border`}>
            <h2 className="text-xl font-semibold mb-4">Test Distribution</h2>
            <div className="h-[300px]">
              <Doughnut data={testDistributionData} options={{
                ...chartOptions,
                cutout: '60%'
              }} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 mb-8">
          <div className={`${
            theme === 'dark'
              ? 'bg-gray-900/50 border-gray-800'
              : 'bg-white/50 border-gray-200'
          } backdrop-blur-xl p-6 rounded-xl border`}>
            <h2 className="text-xl font-semibold mb-4">Pass/Fail Distribution by Test Type</h2>
            <div className="h-[300px]">
              <Bar data={passFailData} options={chartOptions} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className={`${
            theme === 'dark'
              ? 'bg-gray-900/50 border-gray-800'
              : 'bg-white/50 border-gray-200'
          } backdrop-blur-xl p-6 rounded-xl border`}>
            <h2 className="text-xl font-semibold mb-4">Test Suites</h2>
            <div className="space-y-4">
              {testSuites.map(suite => (
                <div key={suite.name} className="flex justify-between items-center">
                  <span>{suite.name}</span>
                  <div className="flex items-center space-x-4">
                    <span className="text-green-500">{suite.passed} passed</span>
                    <span className="text-red-500">{suite.failed} failed</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={`${
            theme === 'dark'
              ? 'bg-gray-900/50 border-gray-800'
              : 'bg-white/50 border-gray-200'
          } backdrop-blur-xl p-6 rounded-xl border`}>
            <h2 className="text-xl font-semibold mb-4">Recent Test Runs</h2>
            <div className="space-y-4">
              {recentRuns.map(run => (
                <div key={run.id} className="flex justify-between items-center">
                  <span>{run.timestamp}</span>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    run.status === 'passed'
                      ? 'bg-green-500/20 text-green-500'
                      : 'bg-red-500/20 text-red-500'
                  }`}>
                    {run.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectDashboard;
