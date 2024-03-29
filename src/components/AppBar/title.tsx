"use client";

import { Typography, useMediaQuery, useTheme } from "@mui/material";
import { useRouter } from "next/navigation";

const Title: React.FC = () => {
  const router = useRouter();
  const theme = useTheme();
  const isLgDown = useMediaQuery(theme.breakpoints.down("lg"));

  const handlePrefetch = () => {
    router.prefetch("/");
  };

  return (
    <div>
      <Typography
        variant="h6"
        component="h1"
        sx={{
          display: "inline",
          ":hover": { textDecoration: "underline" },
        }}
      >
        <a
          href="/"
          onMouseEnter={handlePrefetch}
          style={{
            display: "flex",
            color: "inherit",
            textDecoration: "inherit",
            width: isLgDown ? 53 : 119,
            height: 32,
            transition: theme.transitions.create("width"),
            overflowX: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          {isLgDown ? "TUAA" : "TUAA Emails"}
        </a>
      </Typography>
    </div>
  );
};

export default Title;
