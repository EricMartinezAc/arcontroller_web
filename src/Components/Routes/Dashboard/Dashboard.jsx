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
import ViewLocalidades from "./Components/viewLocalidades/View.js";
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
  //window loading and alert
  const [stateLoading, setStateLoading] = useState("none");
  const [AlertDialogs, setAlertDialogs] = useState(["none", "", "", "", ""]);
  //datas
  const [user, setUser] = useState();
  const [locations, setLocations] = useState([]);
  const [actions, setActions] = useState([3, 11]);

  //relation beetwen left side menu and windows
  useEffect(() => {
    setOpenDrawer("none");
  }, [valueWindows]);
  const handleWindow = (newValue) => {
    console.log(newValue);
    setValueWindows(newValue);
  };
  const handleDrawer = () => {
    setOpenDrawer(openDrawer === "none" ? "block" : "none");
  };
  const CerrarApp = () => {
    setTimeout(() => {
      window.location = `${pages.this}`;
    }, 5000);
  };

  useEffect(() => {
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
    const resptFindUserActive = findUserActive.loadData(cookies.get("owner"));
    console.log([12, resptFindUserActive]);
    setUser(resptFindUserActive);
  }, []);
  // consumo de API
  // const CargaInicial = () => {
  //   let RSPTaAPI = Class_API_.ConsumirDatos(
  //     cookies.get("token"),
  //     cookies.get("id_prod"),
  //     cookies.get("user"),
  //     "StartApp",
  //     axios
  //   );
  //   if (RSPTaAPI.valor === 200) {
  //     console.log("datos cargados");
  //     setState({
  //       user: RSPTaAPI.user,
  //       datas: RSPTaAPI.datas,
  //       visibleVentana: {
  //         viewEmptyDatasDashboard: "none",
  //         viewDashboard: "block",
  //         viewDashboardContable: "none",
  //         viewDashboardMtto: "none",
  //         viewLocalidades: "none",
  //         viewRRHH: "none",
  //         viewLogist: "none",
  //         viewPlaneacion: "none",
  //         viewHSEQ: "none",
  //         viewMarcoLegal: "none",
  //         viewConfig: "none",
  //         viewAyuda: "none",
  //         viewNubeVirtual: "none",
  //       },
  //     });
  //   } else {
  //     setState({
  //       user: {},
  //       datas: {},
  //       visibleVentana: {
  //         viewEmptyDatasDashboard: "block",
  //         viewDashboard: "none",
  //         viewDashboardContable: "none",
  //         viewDashboardMtto: "none",
  //         viewLocalidades: "none",
  //         viewRRHH: "none",
  //         viewLogist: "none",
  //         viewPlaneacion: "none",
  //         viewHSEQ: "none",
  //         viewMarcoLegal: "none",
  //         viewConfig: "none",
  //         viewAyuda: "none",
  //         viewNubeVirtual: "none",
  //       },
  //     });
  //   }
  // };

  // ciclo de vida del componente

  // const componentDidMount = () => {
  //   let resptValideCookies = ValideCookies("Dashboard", cookies);
  //   let compareTokens = true; //se debe compara token de cookies con token de usuario
  //   if (resptValideCookies.value === false || !compareTokens) {
  //     CerrarApp(resptValideCookies.msj);
  //   } else {
  //     // CambiarEstadoDescriptionAlerts(
  //     //   true,
  //     //   "success",
  //     //   "CREDENTIALES VERIFICADAS",
  //     //   cookies.get("user"),
  //     //   resptValideCookies.msj
  //     // );
  //     // setTimeout(() => {
  //     //   CambiarEstadoDescriptionAlerts(false, "", "", "", "");
  //     // }, 3000);
  //     // CargaInicial();
  //   }
  // };

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
                  <ListItemsSecundDashboard handleWindow={handleWindow} />
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
                  <ViewLocalidades />
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
