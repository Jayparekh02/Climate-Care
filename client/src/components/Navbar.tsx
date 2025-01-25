import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Container } from "@mui/material";
import { navItems } from "../utils/constants";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/auth/loginSlice";
import { authBtnStyles } from "../utils/commonStyles";
import LanguageSwitcher from "../LanguageSwitcher";

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  containerWindow?: () => Window;
}

const drawerWidth = 240;

export default function DrawerAppBar(props: Props) {
  const { user, token } = useAppSelector((state) => state.login);
  const { containerWindow } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHash, setActiveHash] = useState(window.location.hash);
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const handleHashChange = () => {
      setActiveHash(window.location.hash);
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/"); // Or wherever you want to redirect after logout
  };

  const appBarStyles = {
    background: "transparent",
    boxShadow: "none",
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Climate Care
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton
              sx={{
                textAlign: "center",
                color:
                  activeHash === `/${item.toLowerCase().replace(/\s+/g, "-")}`
                    ? "#99cccc"
                    : "transparent",
              }}
            >
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    containerWindow !== undefined
      ? () => containerWindow().document.body
      : undefined;

  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <CssBaseline />
      <AppBar component="nav" sx={appBarStyles}>
        <Container maxWidth="lg" disableGutters>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { lg: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              <LanguageSwitcher />
            </Typography>
            <Box sx={{ display: { xs: "none", lg: "block" } }}>
              {navItems.map((item) => (
                <Button
                  key={item}
                  sx={{
                    fontSize: 16,
                    fontWeight: 600,
                    color:
                      activeHash === `#${item.toLowerCase()}`
                        ? "#99cccc"
                        : "#fff",
                  }}
                  href={`#${item.toLowerCase()}`}
                >
                  {item}
                </Button>
              ))}

              {token ? (
                <Button
                  variant="outlined"
                  size="medium"
                  sx={authBtnStyles}
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  size="medium"
                  sx={authBtnStyles}
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
              )}
            </Box>
            {/* <FormModal /> */}
          </Toolbar>
        </Container>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { md: "block", lg: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}
