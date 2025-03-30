import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

function Dashboard() {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const email = localStorage.getItem("email");
        if (!email) {
          setError("User not logged in.");
          setLoading(false);
          return;
        }

        const response = await fetch(
          "https://hack-nu-thon-6-team-incognito.vercel.app/api/project/getprojects",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        setProjects(data);
      } catch (err) {
        setError("Failed to fetch projects.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="min-h-[calc(100vh-64px)] p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            My Projects
          </h1>
          <button
            onClick={() => navigate("/new-project")}
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-pink-500 hover:to-purple-500 transform hover:-translate-y-1 transition-all duration-300"
          >
            Create New Project
          </button>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading projects...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : projects.length === 0 ? (
          <p className="text-center text-gray-500">No projects found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project._id}
                onClick={() => navigate(`/project/${project._id}`)}
                className={`${
                  theme === "dark"
                    ? "bg-gray-900/50 border-gray-800 hover:shadow-[0_0_15px_rgba(168,_85,_247,_0.4)]"
                    : "bg-white/50 border-gray-200 hover:shadow-[0_0_15px_rgba(168,_85,_247,_0.2)]"
                } backdrop-blur-xl p-6 rounded-xl border transition-all duration-300 hover:scale-105 cursor-pointer`}
              >
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <div
                  className={`text-sm ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  <p>
                    Status:{" "}
                    <span className="text-purple-500">{project.status}</span>
                  </p>
                  <p>Last Updated: {new Date(project.updatedAt).toLocaleDateString()}</p>
                </div>
                <div className="mt-4 flex space-x-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/project/${project._id}`);
                    }}
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm hover:from-pink-500 hover:to-purple-500 transition-all duration-300"
                  >
                    View Details
                  </button>
                  <button
                    className={`px-4 py-2 rounded-lg text-sm ${
                      theme === "dark"
                        ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    } transition-all duration-300`}
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
