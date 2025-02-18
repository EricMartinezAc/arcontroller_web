import { Box, Divider, Drawer, Grid, IconButton, List } from "@mui/material";
import React, { useEffect, useState } from "react";

// Recursos
import "../../../Assets/styles/Dashboard.css";
import { loadData } from "./Queries/loadData";
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
import Colores from "../../../Components/Common/ModulosGen/Colores";
import { ChevronRight, Description } from "@mui/icons-material";

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

  // Valide sesion
  useEffect(() => {
    engineResources.Loading[1]("none");
    if (
      serverResources.user.token === undefined ||
      serverResources.user.token?.length < 3
    ) {
      console.log("sesión no válida", serverResources.user.token);
      // engineResources.DescriptionAlerts[1]([
      //   "block",
      //   "error",
      //   "Alerta de seguridad",
      //   "SECUREAPP value: ",
      //   "no cuenta con credenciales suficientes",
      // ]);
      //window.location.href = "/";
    }
  }, []);

  // Cargar datos
  useEffect(() => {
    loadData(
      serverResources.user.user,
      serverResources.prodct.owner,
      serverResources.user.token
    )
      .then(async (data: any) => {
        if (!serverResources.setBranches) throw new Error("errir");
        console.log(data);
        data.statusCode === 200 &&
          serverResources.setBranches(data.datos.branchResp);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, [serverResources.branches]);

  useEffect(() => {
    console.log("edit branches", serverResources.branches);
  }, [serverResources.branches]);

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

  return (
    <>
      <Box className={"AppContainer"}>
        <header>
          <ToolbarDashboard
            actions={actions}
            setActions={setActions}
            handleDrawer={handleDrawer}
            openDrawer={openDrawer}
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
                <IconButton sx={{ borderRadius: 0 }} onClick={handleDrawer}>
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
          <Grid container spacing={0} sx={{ bgcolor: Colores.naranja }}>
            {/* <Grid item xs={0.3} md={0.3}>
              <IconButton
                sx={{
                  width: "100%",
                  height: "100%",
                  bgcolor: Colores.marfil,
                  borderRadius: 0,
                }}
                onClick={handleDrawer}
              >
                <ChevronRight />
              </IconButton>
            </Grid> */}
            <Grid item xs={12} md={12}>
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
                    <ViewSucursal />
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
        </Grid>

        <footer>
          <Footer />
        </footer>
      </Box>
    </>
  );
};

export default Dashboard;
