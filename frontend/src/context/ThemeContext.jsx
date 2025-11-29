// src/context/ThemeContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext(null); // Default value can be null or an initial object

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  // Initialize theme from localStorage or default to 'light'
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('app-theme');
    return savedTheme || 'light';
  });

  // Save theme to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('app-theme', theme);
  }, [theme]);

  // Apply theme class to the body element
useEffect(() => {
    document.body.className = ''; // Clear existing classes
    if (theme === 'dark') {
      document.body.classList.add('dark');
      // 💡 CHANGE THIS: Using 'bg-gray-900' for dark navy background
      document.body.classList.add('bg-gray-900'); 
      document.body.classList.add('text-gray-100'); 
    } else {
      document.body.classList.add('light');
      // 💡 CHANGE THIS: Using 'bg-gray-50' for a very light gray background
      document.body.classList.add('bg-gray-50'); 
      document.body.classList.add('text-gray-900'); 
    }
  }, [theme]);


  const contextValue = {
    theme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};