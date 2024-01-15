import { AppBar as MuiAppBar, Toolbar, Typography } from "@mui/material";
import { ThemeToggle } from "./themeToggle";
import { Menu, MobileMenu } from "./menu";
import Title from "./title";

const AppBar: React.FC = () => {
  return (
    <MuiAppBar>
      <Toolbar sx={{ flexDirection: "row", alignItems: "center" }}>
        <Title />

        <Menu />

        <ThemeToggle />
        <MobileMenu />
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;
