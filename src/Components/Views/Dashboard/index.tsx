import { Box, Divider, Drawer, Grid, IconButton, List } from "@mui/material";
import React, { useEffect, useState } from "react";

// Recursos
import "../../../Assets/styles/Dashboard.css";
import { loadData } from "./Queries/handleData";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";

// Componentes
// - Header
import ToolbarDashboard from "../../Common/Interfaz/Toolbar_dashboard";
import ListItemsPrincDashboard from "../../Common/Interfaz/ListItems_princ_dashboard";
import ListItemsSecundDashboard from "../../Common/Interfaz/ListItems_secund_dashboard";

// - Main
import ViewAyuda from "./Components/viewAyuda/View";
import ViewConfig from "./Components/viewConfig/View";
import ViewDashboard from "./Components/viewDashboard/View";
import ViewDashboardContable from "./Components/viewDashboardContable/View";
import ViewDashboardMtto from "./Components/viewDashboardMtto/View";
import ViewHSEQ from "./Components/viewHSEQ/View";
import ViewSucursal from "./Components/viewSucursal/View";
import ViewLogist from "./Components/viewLogistica/View";
import ViewMarcoLegal from "./Components/viewMarcoLeg/View";
import ViewPlaneacion from "./Components/viewPlaneacion/View";
import ViewRRHH from "./Components/viewRRHH/ViewRRHH";

import Footer from "../../Common/Interfaz/Footer";

import { Routes as pages } from "../../../constans";
import { useGeneralContext } from "../../../Context/GeneralContext";

// Definir los tipos para las props del componente
interface DashboardProps {
  // Puedes definir aquí los tipos para las props si es necesario
}

const Dashboard: React.FC<DashboardProps> = () => {
  const { engineResources, serverResources } = useGeneralContext();

  // Estados y funciones
  const [openDrawer, setOpenDrawer] = useState<string>("none");
  const [valueWindows, setValueWindows] = useState<string>("0");
  const [modeStrict, setModeStrict] = useState<boolean>(true);
  const [actions, setActions] = useState<number[]>([3, 11]);

  // Cargar la aplicación
  useEffect(() => {
    console.log(engineResources.cookies.getAll());
    // Paso uno: validación de permanencia en la APP
    if (
      !engineResources.cookies.get("aceptLegacy") ||
      !engineResources.cookies.get("user") ||
      !engineResources.cookies.get("token") ||
      !engineResources.cookies.get("owner") ||
      !engineResources.cookies.get("_id")
    ) {
      engineResources.DescriptionAlerts[1]([
        "block",
        "error",
        "Alerta de seguridad",
        "SECUREAPP value: ",
        "no cuenta con credenciales suficientes",
      ]);
      console.log(engineResources.cookies.getAll());
      setTimeout(() => {
        window.location.href = "/";
      }, 6000);
    }

    // Paso dos: carga de datos en API
    loadData(
      //por ahora, solo carga branches
      engineResources.cookies.get("owner"),
      engineResources.cookies.get("token"),
      engineResources.cookies.get("_id")
    )
      .then(async (data: any) => {
        console.log("resp API ---------", [
          data.datos,
          serverResources.user.rol,
        ]);
      })
      .catch((err: any) => {
        console.log(err);
      });

    //paso tres: modo estricto
    setModeStrict(serverResources.user.rol === "PO" ? false : true);
  }, []);

  // Variables globales
  const fecha = {
    dia: String(new Date(Date.now()).getDate()),
    mes: String(new Date(Date.now()).getMonth() + 1),
    anio: String(new Date(Date.now()).getFullYear()),
  };

  // Relación entre el menú de la izquierda y las ventanas
  useEffect(() => {
    setOpenDrawer("none");
  }, [valueWindows]);

  const handleWindow = (newValue: string) => {
    setValueWindows(newValue);
  };

  const handleDrawer = () => {
    setOpenDrawer(openDrawer === "none" ? "block" : "none");
  };

  useEffect(() => {
    modeStrict
      ? console.log("App con restricciones")
      : console.log("Usuario root"); //si es Product Owner
  }, [modeStrict]);

  const CerrarApp = () => {
    setTimeout(() => {
      window.location.href = `${pages.thisApp}`;
    }, 5000);
  };

  return (
    <>
      <Box className={"AppContainer"}>
        <header>
          <ToolbarDashboard
            modeStrict={modeStrict}
            fecha={fecha}
            user={engineResources.cookies.get("user") || "ArturoMartinez1992*"}
            owner={engineResources.cookies.get("owner") || "nullo@gmail"}
            actions={actions}
            setActions={setActions}
            handleDrawer={handleDrawer}
            openDrawer={openDrawer}
            CerrarApp={CerrarApp}
          />
        </header>
        <Grid container spacing={0}>
          {/* menú de la izquierda */}
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
                  {/* <ViewSucursal
                    owner={engineResources.cookies.get("owner")}
                    user={user}
                    usersOwner={usersOwner}
                    sucursales={sucursales}
                  /> */}
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
};

export default Dashboard;
