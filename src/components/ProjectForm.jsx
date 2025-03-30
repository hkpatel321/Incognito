import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import axios from 'axios';

function ProjectForm() {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    projectTitle: '',
    personalAccessToken: '',
    figmaFileId: '',
    figmaLink: '',
    gitlabLink: '',
    githubLink: '',
    websiteUrl: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.projectTitle.trim()) newErrors.projectTitle = 'Project Title is required';
    if (!formData.personalAccessToken.trim()) newErrors.personalAccessToken = 'Personal Access Token is required';
    if (!formData.figmaFileId.trim()) newErrors.figmaFileId = 'Figma File ID is required';
    if (!formData.figmaLink.startsWith('https://www.figma.com/')) newErrors.figmaLink = 'Please enter a valid Figma URL';
    if (formData.gitlabLink && !formData.gitlabLink.startsWith('https://gitlab.com/')) newErrors.gitlabLink = 'Please enter a valid GitLab URL';
    if (formData.githubLink && !formData.githubLink.startsWith('https://github.com/')) newErrors.githubLink = 'Please enter a valid GitHub URL';
    if (formData.websiteUrl && !formData.websiteUrl.startsWith('http')) newErrors.websiteUrl = 'Please enter a valid URL starting with http:// or https://';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const email = localStorage.getItem('email');
    if (!email) {
      navigate('/login');
      return;
    }
    let arr=["Planning","In Progress","Completed"];
    let randomIndex = Math.floor(Math.random() * arr.length);
    const projectData = {
      email,
      title: formData.projectTitle,
      figmaFileId: formData.figmaFileId,
      figmaLink: formData.figmaLink,
      gitlabLink: formData.gitlabLink,
      githubLink: formData.githubLink,
      websiteUrl: formData.websiteUrl,
      status: arr[randomIndex],
    };

    try {
      setLoading(true);
      const response = await axios.post('https://hack-nu-thon-6-team-incognito.vercel.app/api/project/adduserproject', projectData);
      console.log('✅ Project Created:', response.data);
      navigate('/dashboard');
    } catch (error) {
      console.error('🔥 Error creating project:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center p-2">
      <div className="w-full max-w-lg transform hover:scale-105 transition-all duration-500">
        <div className={`${theme === 'dark' ? 'bg-gray-900/50 border-gray-800' : 'bg-white/50 border-gray-200'} backdrop-blur-xl p-4 rounded-xl shadow-xl border`}>
          <h2 className="text-xl font-bold text-center mb-4 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Create New Project</h2>
          <form onSubmit={handleSubmit} className="space-y-3">
            {[
              { name: 'projectTitle', label: 'Project Title', type: 'text' },
              { name: 'personalAccessToken', label: 'Personal Access Token', type: 'password' },
              { name: 'figmaFileId', label: 'Figma File ID', type: 'text' },
              { name: 'figmaLink', label: 'Figma Full Link', type: 'url' },
              { name: 'gitlabLink', label: 'GitLab Link', type: 'url' },
              { name: 'githubLink', label: 'GitHub Link', type: 'url' },
              { name: 'websiteUrl', label: 'Website URL', type: 'url' }
            ].map((field) => (
              <div key={field.name} className="space-y-1">
                <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{field.label}</label>
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className={`w-full px-2 py-1.5 rounded-lg ${theme === 'dark' ? 'bg-gray-800/50 border-gray-700 text-white' : 'bg-gray-100/50 border-gray-300 text-gray-900'} border focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-200 transition-all duration-300 ${errors[field.name] ? 'border-red-500' : ''}`}
                />
                {errors[field.name] && <p className="text-xs text-red-500 mt-1">{errors[field.name]}</p>}
              </div>
            ))}
            <button type="submit" className="w-full py-2 font-semibold rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-pink-500 hover:to-purple-500 transform hover:-translate-y-1 transition-all duration-300" disabled={loading}>
              {loading ? 'Creating...' : 'Create Project'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProjectForm;
