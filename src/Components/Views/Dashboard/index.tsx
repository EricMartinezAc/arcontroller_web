// import { Box, Divider, Drawer, Grid, IconButton, List } from "@mui/material";
// import React, { useEffect, useState } from "react";

// // Recursos
// import "../../../Assets/styles/Dashboard.css";
// import Cookies from "universal-cookie";
// import FindUserActive from "./Queries/FindUserActive";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import TabContext from "@mui/lab/TabContext";
// import TabPanel from "@mui/lab/TabPanel";

// // Componentes
// // - Header
// import ToolbarDashboard from "../../Common/Interfaz/Toolbar_dashboard";
// import ListItemsPrincDashboard from "../../Common/Interfaz/ListItems_princ_dashboard";
// import ListItemsSecundDashboard from "../../Common/Interfaz/ListItems_secund_dashboard";

// // - Main
// import ViewAyuda from "./Components/viewAyuda/View";
// import ViewConfig from "./Components/viewConfig/View";
// import ViewDashboard from "./Components/viewDashboard/View";
// import ViewDashboardContable from "./Components/viewDashboardContable/View";
// import ViewDashboardMtto from "./Components/viewDashboardMtto/View";
// import ViewHSEQ from "./Components/viewHSEQ/View";
// import ViewSucursal from "./Components/viewSucursal/View";
// import ViewLogist from "./Components/viewLogistica/View";
// import ViewMarcoLegal from "./Components/viewMarcoLeg/View";
// import ViewPlaneacion from "./Components/viewPlaneacion/View";
// import ViewRRHH from "./Components/viewRRHH/ViewRRHH";

// import Footer from "../../Common/Interfaz/Footer";

// // Alertas
// import Loading from "../../Common/Intercciones/Loading";
// import DescriptionAlerts from "../../Common/Intercciones/DescriptionAlerts";

// import pages from "../../../constans/Routes";

// // Definir los tipos para las props del componente
// interface DashboardProps {
//   // Puedes definir aquí los tipos para las props si es necesario
// }

// const Dashboard: React.FC<DashboardProps> = (props) => {
//   // Instancias
//   const cookies = new Cookies();
//   const findUserActive = new FindUserActive();

//   // Variables globales
//   const fecha = {
//     dia: String(new Date(Date.now()).getDate()),
//     mes: String(new Date(Date.now()).getMonth() + 1),
//     anio: String(new Date(Date.now()).getFullYear()),
//   };

//   // Estados y funciones
//   const [openDrawer, setOpenDrawer] = useState<string>("none");
//   const [valueWindows, setValueWindows] = useState<string>("0");
//   const [modeStrict, setModeStrict] = useState<boolean>(true);
//   const [stateLoading, setStateLoading] = useState<string>("none");
//   const [AlertDialogs, setAlertDialogs] = useState<string[]>([
//     "none",
//     "",
//     "",
//     "",
//     "",
//   ]);
//   const [user, setUser] = useState<any>(undefined); // Cambiado a `any` para mayor flexibilidad
//   const [usersOwner, setUsersOwner] = useState<any>(null); // Cambiado a `any` para mayor flexibilidad
//   const [sucursales, setSucursales] = useState<any>(undefined); // Cambiado a `any` para mayor flexibilidad
//   const [actions, setActions] = useState<number[]>([3, 11]);

//   // Relación entre el menú de la izquierda y las ventanas
//   useEffect(() => {
//     setOpenDrawer("none");
//   }, [valueWindows]);

//   const handleWindow = (newValue: string) => {
//     setValueWindows(newValue);
//   };

//   const handleDrawer = () => {
//     setOpenDrawer(openDrawer === "none" ? "block" : "none");
//   };

//   useEffect(() => {
//     modeStrict
//       ? console.log("App con restricciones")
//       : console.log("Usuario root");
//   }, [modeStrict]);

//   const CerrarApp = () => {
//     setTimeout(() => {
//       window.location.href = `${pages.thisApp}`;
//     }, 5000);
//   };

//   // Cargar la aplicación
//   useEffect(() => {
//     console.log("-----", cookies.getAll());
//     // Paso uno: validación de permanencia en la APP
//     if (
//       !cookies.get("aceptLegacy") ||
//       typeof cookies.get("user") === "undefined" ||
//       typeof cookies.get("token") === "undefined"
//     ) {
//       setAlertDialogs([
//         "block",
//         "error",
//         "Alerta de seguridad",
//         "SECUREAPP value: ",
//         "no cuenta con credenciales suficientes",
//       ]);
//       console.log(cookies.getAll());
//       setTimeout(() => {
//         window.location.href = "/";
//       }, 35000);
//     }

//     // Paso dos: carga de datos en API
//     findUserActive.SetDatos(
//       null,
//       cookies.get("user"),
//       null,
//       cookies.get("token"),
//       null,
//       null
//     );

//     findUserActive
//       .loadData(cookies.get("owner"))
//       .then(async (data) => {
//         console.log("resp API ---------", await data.datos);
//         await setModeStrict(data.datos.userReq.rol === "PM" ? true : false);
//         await setUsersOwner(
//           data.datos.userReq.rol === "PO" ? data.datos.usersOfOwner : "PM"
//         );
//         await setUser(data.datos.userReq);
//         await setSucursales(data.datos.branch);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, []);

//   return (
//     <>
//       <Box className={"AppContainer"}>
//         {/* alertas */}
//         <Box
//           sx={{
//             display: stateLoading,
//             backgroundColor: "rgba(238, 221, 238, 0.742)",
//             zIndex: 10,
//             position: "absolute",
//             width: "100%",
//             height: "125%",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           <Loading />
//         </Box>
//         <Box
//           sx={{
//             display: "block",
//             zIndex: 10,
//             width: "100%",
//             height: "auto",
//             position: "absolute",
//             top: "10%",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           {/* <DescriptionAlerts
//             AlertSeverity={AlertDialogs[1]}
//             AlertTilte={AlertDialogs[2]}
//             AlertMsjLow={AlertDialogs[3]}
//             AlertMsjHight={AlertDialogs[4]}
//           /> */}
//         </Box>
//         <header>
//           <ToolbarDashboard
//             fecha={fecha}
//             user={cookies.get("user")}
//             owner={cookies.get("owner")}
//             actions={actions}
//             setActions={setActions}
//             handleDrawer={handleDrawer}
//             openDrawer={openDrawer}
//             CerrarApp={CerrarApp}
//           />
//         </header>
//         <Grid container spacing={0}>
//           {/* menú de la izquierda */}
//           <Grid item xs={2}>
//             <aside>
//               <Drawer
//                 style={{ display: openDrawer }}
//                 variant="temporary"
//                 open={true}
//               >
//                 <IconButton onClick={handleDrawer}>
//                   <ChevronLeftIcon />
//                 </IconButton>
//                 <Divider />
//                 <List>
//                   <ListItemsPrincDashboard handleWindow={handleWindow} />
//                 </List>
//                 <Divider />
//                 <List>
//                   <ListItemsSecundDashboard
//                     handleWindow={handleWindow}
//                     modeStrict={modeStrict}
//                   />
//                 </List>
//               </Drawer>
//             </aside>
//           </Grid>
//           {/* ventanas */}
//           <Grid item xs={12}>
//             <main className="mainContainer">
//               <TabContext value={valueWindows}>
//                 <TabPanel value="0">
//                   <ViewDashboard />
//                 </TabPanel>
//                 <TabPanel value="1">
//                   <ViewDashboardContable />
//                 </TabPanel>
//                 <TabPanel value="2">
//                   <ViewDashboardMtto />
//                 </TabPanel>
//                 <TabPanel value="3">
//                   <ViewSucursal
//                     owner={cookies.get("owner")}
//                     user={user}
//                     usersOwner={usersOwner}
//                     sucursales={sucursales}
//                   />
//                 </TabPanel>
//                 <TabPanel value="4">
//                   <ViewRRHH />
//                 </TabPanel>
//                 <TabPanel value="5">
//                   <ViewLogist />
//                 </TabPanel>
//                 <TabPanel value="6">
//                   <ViewPlaneacion />
//                 </TabPanel>
//                 <TabPanel value="7">
//                   <ViewHSEQ />
//                 </TabPanel>
//                 <TabPanel value="8">
//                   <ViewMarcoLegal />
//                 </TabPanel>
//                 <TabPanel value="9">
//                   <ViewConfig />
//                 </TabPanel>
//                 <TabPanel value="10">
//                   <ViewAyuda />
//                 </TabPanel>
//                 <TabPanel value="11">
//                   <ViewMarcoLegal />
//                 </TabPanel>
//               </TabContext>
//             </main>
//           </Grid>
//         </Grid>

//         <footer>
//           <Footer />
//         </footer>
//       </Box>
//     </>
//   );
// };

// export default Dashboard;
import React from "react";

export const Dashboard = () => {
  return <div>DAshboar</div>;
};
