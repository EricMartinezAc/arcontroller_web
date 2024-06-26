import { Box, Divider, Drawer, Grid, IconButton, List } from "@mui/material";
import React, { useEffect } from "react";

//recursos
import "./Dashboard.css";
import Cookies from "universal-cookie";
import FindUserActive from "./Queries/FindUserActive.js";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";

//componentes
//-Header
import ToolbarDashboard from "../../Comun/Interfaz/Toolbar_dashboard.js";
import ListItemsPrincDashboard from "../../Comun/Interfaz/ListItems_princ_dashboard.js";
import ListItemsSecundDashboard from "../../Comun/Interfaz/ListItems_secund_dashboard.js";

//-Main
import ViewAyuda from "./Components/viewAyuda/View.js";
import ViewConfig from "./Components/viewConfig/View.js";
import ViewDashboard from "./Components/viewDashboard/View.js";
import ViewDashboardContable from "./Components/viewDashboardContable/View.js";
import ViewDashboardMtto from "./Components/viewDashboardMtto/View.js";
import ViewHSEQ from "./Components/viewHSEQ/View.js";
import ViewSucursal from "./Components/viewSucursal/View.js";
import ViewLogist from "./Components/viewLogistica/View.js";
import ViewMarcoLegal from "./Components/viewMarcoLeg/View.js";
import ViewPlaneacion from "./Components/viewPlaneacion/View.js";
import ViewRRHH from "./Components/viewRRHH/ViewRRHH.js";

import Footer from "../../Comun/Interfaz/Footer/Footer";

//alertas
import Loading from "../../Comun/Intercciones/Loading.js";
import DescriptionAlerts from "../../Comun/Intercciones/DescriptionAlerts.js";

import { useState } from "react";
import pages from "../../../Assets/pages.js";

function Dashboard(props) {
  //instances
  const cookies = new Cookies();
  const findUserActive = new FindUserActive();

  //global variables
  const fecha = {
    dia: String(new Date(Date.now()).getDate()),
    mes: String(new Date(Date.now()).getMonth() + 1),
    anio: String(new Date(Date.now()).getFullYear()),
  };

  //states and yourself func
  //--> by left side menu
  const [openDrawer, setOpenDrawer] = useState("none");
  //--> by windows
  const [valueWindows, setValueWindows] = useState("0");
  const [modeStrict, setModeStrict] = useState(true);
  //window loading and alert
  const [stateLoading, setStateLoading] = useState("none");
  const [AlertDialogs, setAlertDialogs] = useState(["none", "", "", "", ""]);
  //datas
  const [user, setUser] = useState();
  const [usersOwner, setUsersOwner] = useState(null);

  const [sucursales, setSucursales] = useState();
  const [actions, setActions] = useState([3, 11]);

  //relation beetwen left side menu and windows
  useEffect(() => {
    setOpenDrawer("none");
  }, [valueWindows]);
  const handleWindow = (newValue) => {
    setValueWindows(newValue);
  };
  const handleDrawer = () => {
    setOpenDrawer(openDrawer === "none" ? "block" : "none");
  };
  useEffect(() => {
    modeStrict
      ? console.log("App con restricciones")
      : console.log("Usuario root");
  }, [modeStrict]);
  const CerrarApp = () => {
    setTimeout(() => {
      window.location = `${pages.this}`;
    }, 5000);
  };

  //Load App --------
  useEffect(() => {
    console.log("-----", cookies.getAll());
    //steep one: validación de permanencia en la APP
    if (
      !cookies.get("aceptLegacy") ||
      typeof cookies.get("user") === "undefined" ||
      typeof cookies.get("token") === "undefined"
    ) {
      setAlertDialogs([
        "block",
        "error",
        "Alerta de seguridad",
        "SECUREAPP value: ",
        "no cuenta con credenciales suficientes",
      ]);
      console.log(cookies.getAll());
      setTimeout(() => {
        window.location = "/";
      }, 35000);
    }

    //steep two: carga de datos en API
    findUserActive.SetDatos(
      null,
      cookies.get("user"),
      null,
      cookies.get("token"),
      null,
      null
    );

    findUserActive
      .loadData(cookies.get("owner"))
      .then(async (data) => {
        console.log("resp API ---------", await data.datos);
        await setModeStrict(data.datos.userReq.rol === "PM" ? true : false);
        await setUsersOwner(
          data.datos.userReq.rol === "PO" ? data.datos.usersOfOwner : "PM"
        );
        await setUser(data.datos.userReq);
        await setSucursales(data.datos.branch);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Box className={"AppContainer"}>
        {/* alerts */}
        <Box
          sx={{
            display: stateLoading,
            backgroundColor: "rgba(238, 221, 238, 0.742)",
            zIndex: 10,
            position: "absolute",
            width: "100%",
            height: "125%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Loading />
        </Box>
        <Box
          sx={{
            display: "block",
            zIndex: 10,
            width: "100%",
            height: "auto",
            position: "absolute",
            top: "10%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <DescriptionAlerts
            AlertSeverity={AlertDialogs[1]}
            AlertTilte={AlertDialogs[2]}
            AlertMsjLow={AlertDialogs[3]}
            AlertMsjHight={AlertDialogs[4]}
          />
        </Box>
        <header>
          <ToolbarDashboard
            fecha={fecha}
            user={cookies.get("user")}
            owner={cookies.get("owner")}
            actions={actions}
            setActions={setActions}
            handleDrawer={handleDrawer}
            openDrawer={openDrawer}
            CerrarApp={CerrarApp}
          />
        </header>
        <Grid container spacing={0}>
          {/* left side menu */}
          <Grid item xs={2}>
            <aside>
              <Drawer
                style={{ display: openDrawer }}
                variant="temporary"
                open={true}
              >
                <IconButton onClick={handleDrawer}>
                  <ChevronLeftIcon />
                </IconButton>
                <Divider />
                <List>
                  <ListItemsPrincDashboard handleWindow={handleWindow} />
                </List>
                <Divider />
                <List>
                  <ListItemsSecundDashboard
                    handleWindow={handleWindow}
                    modeStrict={modeStrict}
                  />
                </List>
              </Drawer>
            </aside>
          </Grid>
          {/* ventanas */}
          <Grid item xs={12}>
            <main className="mainContainer">
              <TabContext value={valueWindows}>
                <TabPanel value="0">
                  <ViewDashboard />
                </TabPanel>
                <TabPanel value="1">
                  <ViewDashboardContable />
                </TabPanel>
                <TabPanel value="2">
                  <ViewDashboardMtto />
                </TabPanel>
                <TabPanel value="3">
                  <ViewSucursal
                    owner={cookies.get("owner")}
                    user={user}
                    usersOwner={usersOwner}
                    sucursales={sucursales}
                  />
                </TabPanel>
                <TabPanel value="4">
                  <ViewRRHH />
                </TabPanel>
                <TabPanel value="5">
                  <ViewLogist />
                </TabPanel>
                <TabPanel value="6">
                  <ViewPlaneacion />
                </TabPanel>
                <TabPanel value="7">
                  <ViewHSEQ />
                </TabPanel>
                <TabPanel value="8">
                  <ViewMarcoLegal />
                </TabPanel>
                <TabPanel value="9">
                  <ViewConfig />
                </TabPanel>
                <TabPanel value="10">
                  <ViewAyuda />
                </TabPanel>
                <TabPanel value="11">
                  <ViewMarcoLegal />
                </TabPanel>
              </TabContext>
            </main>
          </Grid>
        </Grid>

        <footer>
          <Footer />
        </footer>
      </Box>
    </>
  );
}

Dashboard.propTypes = {};

export default Dashboard;
