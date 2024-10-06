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
import { Divider } from "@mui/material";
//import AdbIcon from '@mui/icons-material/Adb';

import "./Header.css";

import Loading from "../../../../Common/Intercciones/Loading";

import LogoARC from "../../../../../Assets/Imgs/logos/logo_632x512.png";
import Logck from "../../../../../Assets/Imgs/icos/logck.png";

const pages = ["Asesorías", "Productos", "Contacto", "Nosotros"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function ResponsiveAppBar(props) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const RedirectSigin = () => {
    window.location = "/Sesion";
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{
              gridTemplateColumns: "1fr 1fr",
              margin: "20px",
              display: "grid",
              width: "100%",
            }}
          >
            <img width={130} alt="LogoARC" src={LogoARC} />
          </Box>

          {/* MENU */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {/* MOBILE MENU */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
            }}
          >
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
              {pages.map((page) => (
                <MenuItem
                  sx={{
                    bgcolor: "coral",
                    width: "100vh",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  key={page}
                  onClick={handleCloseNavMenu}
                >
                  <Button
                    key={page}
                    onClick={handleCloseNavMenu}
                    sx={{
                      padding: 0,
                      margin: 0,
                      my: 2,
                      color: "blue",
                      display: "block",
                    }}
                  >
                    {page}
                  </Button>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box
            onClick={RedirectSigin}
            sx={{
              cursor: "pointer",
              display: props.state_permission_login ? "grid" : "none",
              gridTemplateColumns: "1fr 2fr 1fr",
              width: "min-content",
              height: "min-content%",
            }}
          >
            <Divider
              sx={{ border: "1px solid #abb" }}
              orientation="vertical"
              flexItem
            />
            <Typography
              sx={{
                padding: "7px 20px 0px 15px",
                width: "max-content",
                height: "min-contnent",
              }}
            >
              Inicia sesión
            </Typography>

            <Box
              sx={{ width: "min-content", height: "min-content", flexGrow: 0 }}
            >
              <Tooltip title="Inicia sesión">
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{ height: "100%", p: 0 }}
                >
                  <Avatar alt="Remy Sharp" src={Logck} />
                </IconButton>
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
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
