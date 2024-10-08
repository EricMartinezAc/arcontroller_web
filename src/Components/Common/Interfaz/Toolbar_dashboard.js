import React from "react";
import clsx from "clsx";
import rutaImgLogoPNG from "../../../Assets/Imgs/logos/logo_153x124.png";
import { Badge, Grid, IconButton, Toolbar, Typography } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MessageIcon from "@mui/icons-material/Message";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import Colores from "../ModulosGen/Colores";
import PropTypes from "prop-types";
import { useGeneralContext } from "../../../Context/GeneralContext";

function Toolbar_dashboard({
  modeStrict,
  fecha,
  user,
  owner,
  actions,
  setActions,
  handleDrawer,
  openDrawer,
  CerrarApp,
}) {
  const { serverResources } = useGeneralContext();

  return (
    <>
      <Toolbar
        sx={{
          background: modeStrict ? Colores.gris_tenue : Colores.grosella_negra,
        }}
      >
        {/* boton de menu icono */}
        <IconButton
          edge="start"
          aria-label="open drawer"
          onClick={handleDrawer}
          className={clsx(openDrawer)}
        >
          <img
            alt="logo"
            style={{
              width: 50,
              borderRadius: "0",
              marginRight: 30,
              marginTop: 4,
            }}
            src={rutaImgLogoPNG}
          />
        </IconButton>
        <Grid direction="row" justifyContent="flex-end" container spacing={1}>
          {/* //tittle */}
          <Grid item xs={8}>
            <Typography
              style={{
                fontFamily: "Poppins",
                color: Colores.blanco,
                textAlign: "right",
              }}
              component="h1"
              variant="h6"
              noWrap
            >
              {owner.split("@")[0] || "Modo de prueba"} /
              {user.replace(/[^a-zA-Z]/g, "") || "Sin user"}
            </Typography>
          </Grid>
          {/* barra de Notificaciones */}
          <Grid item lg={1}>
            <IconButton sx={{ color: Colores.marfil }}>
              <Badge badgeContent={actions[0]} color="info">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Grid>
          {/* barra de mensajes */}
          <Grid item lg={1}>
            <IconButton sx={{ color: Colores.marfil }}>
              <Badge badgeContent={actions[1]} color="info">
                <MessageIcon />
              </Badge>
            </IconButton>
          </Grid>
          {/* Boton apagado */}
          <Grid item lg={1}>
            <IconButton sx={{ color: Colores.rosa }} onClick={CerrarApp}>
              <PowerSettingsNewIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Toolbar>
    </>
  );
}

Toolbar_dashboard.propTypes = {};

export default Toolbar_dashboard;
