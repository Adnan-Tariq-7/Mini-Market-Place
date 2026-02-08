// src/context/ThemeContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import { CssBaseline, PaletteMode } from '@mui/material';
import { createAppTheme } from '@/theme/theme';

interface ThemeContextType {
  mode: PaletteMode;
  toggleTheme: () => void;
  setTheme: (mode: PaletteMode) => void;
  isSystemTheme: boolean;
  setSystemTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<PaletteMode>('light');
  const [mounted, setMounted] = useState(false);
  const [isSystemTheme, setIsSystemTheme] = useState(true);

  useEffect(() => {
    setMounted(true);
    
    const savedTheme = localStorage.getItem('theme') as PaletteMode | null;
    const useSystemTheme = localStorage.getItem('useSystemTheme') === 'true';
    
    if (savedTheme && !useSystemTheme) {
      setMode(savedTheme);
      setIsSystemTheme(false);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const detectedMode = prefersDark ? 'dark' : 'light';
      setMode(detectedMode);
      setIsSystemTheme(true);
      localStorage.setItem('theme', detectedMode);
      localStorage.setItem('useSystemTheme', 'true');
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      const useSystemTheme = localStorage.getItem('useSystemTheme') === 'true';
      
      if (useSystemTheme) {
        const newMode = e.matches ? 'dark' : 'light';
        setMode(newMode);
        localStorage.setItem('theme', newMode);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    setIsSystemTheme(false);
    localStorage.setItem('theme', newMode);
    localStorage.setItem('useSystemTheme', 'false');
  };

  const setTheme = (newMode: PaletteMode) => {
    setMode(newMode);
    setIsSystemTheme(false);
    localStorage.setItem('theme', newMode);
    localStorage.setItem('useSystemTheme', 'false');
  };

  const handleSetSystemTheme = () => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const detectedMode = prefersDark ? 'dark' : 'light';
    setMode(detectedMode);
    setIsSystemTheme(true);
    localStorage.setItem('theme', detectedMode);
    localStorage.setItem('useSystemTheme', 'true');
  };

  const theme = useMemo(() => createAppTheme(mode), [mode]);

  if (!mounted) {
    return null;
  }

  return (
    <ThemeContext.Provider 
      value={{ 
        mode, 
        toggleTheme, 
        setTheme, 
        isSystemTheme, 
        setSystemTheme: handleSetSystemTheme 
      }}
    >
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
};