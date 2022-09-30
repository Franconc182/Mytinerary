import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import logo from "../images/mytinerary-logo.png";
import "../style/navbar.css";
import { Link as LinkRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import userActions from "../redux/actions/userActions";
import { useNavigate } from "react-router-dom";

// imprimo arrays para menu y user menu
const settings = [
  { to: "/login", name: "Log In" },
  { to: "/signup", name: "Sign Up" },
];
const navBarOptions = [
  { to: "/home", name: "Home" },
  { to: "/cities", name: "Cities" },
];

//const estaLoggeado = !!user;

//declaro componente inicial
//seteo de hooks para ambos menues
const NavBar = () => {
  const user = useSelector((state) => state.userReducer.user);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  //aplico escuchadores de eventos
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  //inicializo hooks en false
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOut = async () => {
    await dispatch(userActions.signOut(user.mail));
    navigate("/login");
  };


  return (
    <AppBar position="static" className="colorNav">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}>
            <img alt="imagen-logo" src={logo} width="110px" />
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            MyTinerary
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {navBarOptions.map((navBarOptions, Index) => (
                <LinkRouter
                  onClick={handleCloseNavMenu}
                  key={Index}
                  to={navBarOptions.to}
                >
                  <MenuItem>
                    <Typography textAlign="center" className="generalFont">
                      {navBarOptions.name}
                    </Typography>
                  </MenuItem>
                </LinkRouter>
              ))}
            </Menu>
          </Box>

          <Box sx={{ display: { xs: "none", md: "none" }, mr: 1 }}>
            <img alt="imagen-logo" src={logo} width="120px" />
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            MyTinerary
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {navBarOptions.map((navBarOptions, Index) => (
              <LinkRouter
                key={Index}
                onClick={handleCloseNavMenu}
                to={navBarOptions.to}
              >
                <Button
                  component="span"
                  className="generalFont"
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {navBarOptions.name}
                </Button>
              </LinkRouter>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  {user && <Avatar alt={user.nameUser} src={user.photoUser} />}
                  {!user && <MenuIcon />}
                </IconButton>
              </>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {!user &&
                settings.map((settings, Index) => (
                  <LinkRouter
                    key={Index}
                    onClick={handleCloseUserMenu}
                    to={settings.to}
                  >
                    <MenuItem>
                      <Typography textAlign="center" className="generalFont">
                        {settings.name}
                      </Typography>
                    </MenuItem>
                  </LinkRouter>
                ))}
              {user && (
                <MenuItem onClick={logOut}>
                  <Typography textAlign="center" className="generalFont">
                    Log Out
                  </Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;
