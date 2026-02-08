// src/components/ThemeToggle.tsx
"use client";

import React, { useState } from "react";
import {
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Box,
} from "@mui/material";
import {
  BrightnessAuto,
  LightMode,
  DarkMode,
  Check,
} from "@mui/icons-material";
// import { useThemeContext } from '@/providers/ThemeContext';
import { useThemeContext } from "@/context/ThemeContext";

export const ThemeToggle: React.FC = () => {
  const { mode, isSystemTheme, setTheme, setSystemTheme } = useThemeContext();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSetLight = () => {
    setTheme("light");
    handleClose();
  };

  const handleSetDark = () => {
    setTheme("dark");
    handleClose();
  };

  const handleSetSystem = () => {
    setSystemTheme();
    handleClose();
  };

  const getCurrentIcon = () => {
    if (isSystemTheme) {
      return <BrightnessAuto />;
    }
    return mode === "light" ? <LightMode /> : <DarkMode />;
  };

  const getTooltipText = () => {
    if (isSystemTheme) {
      return `System theme (${mode})`;
    }
    return `${mode === "light" ? "Light" : "Dark"} mode`;
  };

  return (
    <>
      <Tooltip title={getTooltipText()}>
        <IconButton
          onClick={handleClick}
          color="inherit"
          aria-label="theme settings"
          sx={{
            position: "relative",
            "&:hover": {
              backgroundColor: "action.hover",
            },
          }}
        >
          {getCurrentIcon()}
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          sx: {
            minWidth: 200,
            mt: 1,
          },
        }}
      >
        <Box sx={{ px: 2, py: 1 }}>
          <Typography variant="caption" color="text.secondary">
            Theme Preference
          </Typography>
        </Box>

        <Divider />

        <MenuItem
          onClick={handleSetLight}
          selected={mode === "light" && !isSystemTheme}
        >
          <ListItemIcon>
            <LightMode fontSize="small" />
          </ListItemIcon>
          <ListItemText>Light</ListItemText>
          {mode === "light" && !isSystemTheme && (
            <Check fontSize="small" color="primary" />
          )}
        </MenuItem>

        <MenuItem
          onClick={handleSetDark}
          selected={mode === "dark" && !isSystemTheme}
        >
          <ListItemIcon>
            <DarkMode fontSize="small" />
          </ListItemIcon>
          <ListItemText>Dark</ListItemText>
          {mode === "dark" && !isSystemTheme && (
            <Check fontSize="small" color="primary" />
          )}
        </MenuItem>

        <Divider />

        <MenuItem onClick={handleSetSystem} selected={isSystemTheme}>
          <ListItemIcon>
            <BrightnessAuto fontSize="small" />
          </ListItemIcon>
          <ListItemText>
            <Typography variant="body2">System</Typography>
            <Typography variant="caption" color="text.secondary">
              Follow device theme
            </Typography>
          </ListItemText>
          {isSystemTheme && <Check fontSize="small" color="primary" />}
        </MenuItem>
      </Menu>
    </>
  );
};
