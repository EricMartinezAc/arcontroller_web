import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Componentes
// import Inicio_ from "./Components/Routes/Inicio";
import SignUpOrSignIn from "./Components/Routes/Session/SignUpOrSignIn";
import Dashboard_ from "./Components/Routes/Dashboard/Dashboard";

// Contexto
import { AuthProvider, useAuth } from "./Contexts/AuthContext";
import { UserDTO } from "./dto/User.dto";
import { ProdctDTO } from "./dto/Prodct.dto";
import { BranchesDTO } from "./dto/Branches.dto";

import Cookies from "universal-cookie";
import ValideCookies from "./Components/Common/ModulosSis/ValideCookies";
import Loading from "./Components/Common/Intercciones/Loading";
import { Box } from "@mui/material";
import pages from "./Assets/pages";

function App() {
  const [isSmallScreen, setSmallScreen] = useState<boolean>(
    window.innerWidth < 600
  );
  const [user, setUser] = useState<UserDTO[]>([]);
  const [prodct, setProdct] = useState<ProdctDTO[]>([]);
  const [branches, setBranches] = useState<BranchesDTO[]>([]);
  const [aceptLegacy, setAceptLegacy] = useState<boolean>(false);
  const [AlertDialogs, setAlertDialogs] = useState<string[]>([
    "none",
    "",
    "",
    "",
    "",
  ]);
  const [stateLoading, setStateLoading] = useState<string>("none");

  const cookies = new Cookies();

  //for mobile app
  useEffect(() => {
    const handleResize = () => {
      setSmallScreen(window.innerWidth < 600);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Validación de cookies
  useEffect(() => {
    const rspValideCookies = ValideCookies("Singin", cookies, pages);
    console.log(rspValideCookies);
    if (rspValideCookies.getApp === null && rspValideCookies.msj !== null) {
      setStateLoading("block");
      setTimeout(() => {
        window.location.href = pages.this;
      }, 6000);
    }
    if (rspValideCookies.getApp) {
      setStateLoading("block");
      setTimeout(() => {
        reqResDatos_auth_API.GetAPP(
          cookies.get("user") || "undefined",
          cookies.get("token")
        );
      }, 6000);
    }
  }, [user, prodct, branches]);

  return (
    <AuthProvider>
      <div className="App">
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
        {isSmallScreen ? (
          <div className="noRenderable">
            <p>
              Tu dispositivo no cumple con las características necesarias.
              <br />
              <b>Ponte en contacto con el proveedor del servicio.</b>
            </p>
          </div>
        ) : (
          <Router>
            <Routes>
              {/* <Route path="/" element={<Inicio_ />} /> */}
              <Route
                path="/"
                element={
                  <SignUpOrSignIn
                    serverResources={{
                      user,
                      setUser,
                      prodct,
                      setProdct,
                      branches,
                      setBranches,
                    }}
                    engineResources={{
                      aceptLegacy,
                      setAceptLegacy,
                      cookies,
                      AlertDialogs,
                      setAlertDialogs,
                      ValideCookies,
                      pages,
                    }}
                  />
                }
              />
              <Route
                path="/arcontroller/web/main/Dashboard"
                element={<Dashboard_ />}
              />
            </Routes>
          </Router>
        )}
      </div>
    </AuthProvider>
  );
}

export default App;
