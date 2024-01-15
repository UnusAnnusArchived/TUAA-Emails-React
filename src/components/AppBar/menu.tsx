"use client";

import {
  Button,
  Divider,
  IconButton,
  List,
  useMediaQuery,
  useTheme,
  Menu as MuiMenu,
  MenuItem as MuiMenuItem,
  useThemeProps,
} from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "./menuItem";
import { CookieValueTypes, getCookie } from "cookies-next";
import { usePathname } from "next/navigation";

export const Menu: React.FC = () => {
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));
  const [authCookie, setAuthCookie] = useState<CookieValueTypes>(getCookie("auth"));
  const pathname = usePathname();

  useEffect(() => {
    setAuthCookie(getCookie("auth"));
  }, [pathname]);

  if (isMdDown || !authCookie) {
    return <div style={{ flexGrow: 1, height: 72 }} />;
  }
  return (
    <>
      <List
        sx={{
          transition: theme.transitions.create("opacity"),
          width: 0,
          flexGrow: 1,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <MenuElements Divider={VerticalDivider} />
      </List>
    </>
  );
};

export const MobileMenu: React.FC = () => {
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));
  const [menuOpen, setMenuOpen] = useState(false);
  const anchorEl = useRef(null);
  const [authCookie, setAuthCookie] = useState<CookieValueTypes>(getCookie("auth"));
  const pathname = usePathname();

  useEffect(() => {
    setAuthCookie(getCookie("auth"));
  }, [pathname]);

  const handleOpen = () => {
    setMenuOpen(true);
  };

  const handleClose = () => {
    setMenuOpen(false);
  };

  if (!authCookie) {
    return <></>;
  }
  if (isMdDown) {
    return (
      <>
        <IconButton onClick={handleOpen} ref={anchorEl}>
          <MenuIcon />
        </IconButton>
        <MuiMenu open={menuOpen} onClose={handleClose} anchorEl={anchorEl.current}>
          <MenuElements Divider={Divider} isMobile={true} />
        </MuiMenu>
      </>
    );
  }
  return <></>;
};

interface MenuElementsProps {
  Divider: React.FC;
  isMobile?: boolean;
}

const MenuElements: React.FC<MenuElementsProps> = ({ Divider, isMobile }) => {
  return (
    <>
      <MenuItem href="/" isMobile={isMobile}>
        Home
      </MenuItem>
      <MenuItem href="/preview" isMobile={isMobile}>
        Preview
      </MenuItem>
      <MenuItem href="/logout" isMobile={isMobile}>
        Logout
      </MenuItem>
    </>
  );
};

const VerticalDivider: React.FC = () => {
  return <Divider orientation="vertical" sx={{ height: "40px" }} />;
};
