"use client";

import React from "react";
import IconButton from "@mui/material/IconButton";
import { DarkMode, LightMode } from "@mui/icons-material";
import useColorScheme from "#/useColorScheme";
import { Tooltip } from "@mui/material";
import { useRecoilState } from "recoil";

export function ThemeToggle() {
  const [[theme, mode], setMode] = useColorScheme();

  const handleToggleTheme = () => {
    setMode(mode === "light" ? "dark" : "light");
  };

  return (
    <Tooltip title={mode === "dark" ? "Enable Light Mode" : "Enable Dark Mode"}>
      <IconButton sx={{ marginLeft: 1 }} onClick={handleToggleTheme} color="inherit">
        {mode === "dark" ? <LightMode /> : <DarkMode />}
      </IconButton>
    </Tooltip>
  );
}
