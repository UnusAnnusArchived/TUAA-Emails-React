import { Layout } from "@/types";
import fs from "fs/promises";
import { IconButton, List, ListItemButton, ListItemSecondaryAction, ListItemText } from "@mui/material";
import { OpenInNew } from "@mui/icons-material";
import ListItem from "./listItem";

const Layout: Layout = async ({ children }) => {
  const templates = await fs.readdir("templates");

  return (
    <div style={{ display: "flex", width: "100%", height: "calc(100vh - 72px - 8rem)", padding: "1rem" }}>
      <div style={{ height: "100%", overflowY: "scroll" }}>
        <List>
          {templates.map((template, i) => (
            <ListItem key={i} {...{ template }} />
          ))}
        </List>
      </div>
      <div
        style={{
          flexGrow: 1,
          height: "100%",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Layout;
