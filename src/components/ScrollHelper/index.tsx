"use client";

import React from "react";

const ScrollHelper: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflowY: "scroll",
        overflowX: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {children}
    </div>
  );
};

export default ScrollHelper;
