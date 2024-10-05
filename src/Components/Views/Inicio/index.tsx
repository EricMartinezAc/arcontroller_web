import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUpOrSignIn from "../Session/SignUpOrSignIn";
import { ResponseValideCookies } from "@/dto/RespValideCookies.dto";
import { UserDTO } from "@/dto/User.dto";
import { ProdctDTO } from "@/dto/Prodct.dto";
import { BranchesDTO } from "@/dto/Branches.dto";
import { PagesDTO } from "@/dto/Pages.dto";
import Loading from "../../Common/Intercciones/Loading";
import { InicioProps } from "@/dto/InicioProps.dto";
import Dashboard from "../Dashboard";

const Inicio: React.FC<InicioProps> = ({
  serverResources,
  engineResources,
}) => {
  // Validación de cookies
  useEffect(() => {
    const rspValideCookies: ResponseValideCookies =
      engineResources.ValideCookies(
        "Singin",
        engineResources.cookies,
        engineResources.pages
      );

    // Verifica si rspValideCookies.getApp no es null antes de usarlo
    if (rspValideCookies.value && rspValideCookies.getApp) {
      window.location.href = rspValideCookies.getApp;
    } else {
      engineResources.setStateLoading(false);
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <Box
          sx={{
            display: engineResources.stateLoading ? "flex" : "none",
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
        {engineResources.isSmallScreen ? (
          <div className="noRenderable">
            <p>
              Tu dispositivo no cumple con las características necesarias.
              <br />
              <b>Ponte en contacto con el proveedor del servicio.</b>
            </p>
          </div>
        ) : (
          <Routes>
            <Route
              path="/"
              element={
                <SignUpOrSignIn
                  serverResources={serverResources}
                  engineResources={engineResources}
                />
              }
            />
            <Route
              path="/arcontroller/web/main/Dashboard"
              element={<Dashboard />}
            />
          </Routes>
        )}
      </div>
    </Router>
  );
};

export default Inicio;
