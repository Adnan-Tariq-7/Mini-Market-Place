// src/theme/theme.ts
"use client";

import { createTheme, PaletteMode } from "@mui/material/styles";

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // Light mode colors
          primary: {
            main: "#ff7020",
            light: "#818cf8",
            dark: "#4f46e5",
          },
          secondary: {
            main: "#ec4899",
            light: "#f472b6",
            dark: "#db2777",
          },
          background: {
            default: "#f8fafc",
            paper: "#ffffff",
            gray: "#f6f6f6",
          },
          text: {
            primary: "#1e293b",
            secondary: "#64748b",
          },
        }
      : {
          // Dark mode colors
          primary: {
            main: "#FFFF00",
            light: "#a5b4fc",
            dark: "#6366f1",
          },
          secondary: {
            main: "#f472b6",
            light: "#f9a8d4",
            dark: "#ec4899",
          },
          background: {
            default: "#0f172a",
            paper: "#1e293b",
          },
          text: {
            primary: "#f1f5f9",
            secondary: "#cbd5e1",
          },
        }),
  },
  typography: {
    fontFamily:
      'var(--font-poppins), "Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    button: {
      textTransform: "none" as const,
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "10px 24px",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
        },
      },
    },
  },
});

export const createAppTheme = (mode: PaletteMode) => {
  return createTheme(getDesignTokens(mode));
};
