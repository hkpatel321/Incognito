import React, { createContext, useContext, useState } from 'react';

const ProjectContext = createContext();

export function ProjectProvider({ children }) {
  const [projectConfig, setProjectConfig] = useState({});

  return (
    <ProjectContext.Provider value={{ projectConfig, setProjectConfig }}>
      {children}
    </ProjectContext.Provider>
  );
}

export const useProject = () => useContext(ProjectContext);
