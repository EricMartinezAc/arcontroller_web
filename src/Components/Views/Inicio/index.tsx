import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";

import { useGeneralContext } from "../../../Context/GeneralContext";

import Home from "../Home";
import { SignUpOrSignIn } from "../Session/SignUpOrSignIn";
import { Dashboard } from "../Dashboard";

import Loading from "../../../Components/Common/Intercciones/Loading";

const Inicio: React.FC = () => {
  const { engineResources } = useGeneralContext();

  // Validación de cookies
  useEffect(() => {
    engineResources.Loading[1]("none");
    const rspValideCookies = engineResources.ValideCookies();

    // Verifica si rspValideCookies.getApp no es null antes de usarlo
    if (rspValideCookies.value && rspValideCookies.getApp) {
      window.location.href = rspValideCookies.getApp;
    } else {
      engineResources.IUComponets[1](false);
    }
  }, []);

  return (
    <>
      <Box
        sx={{
          display: engineResources.Loading[0],
          backgroundColor: "rgba(238, 221, 238, 0.742)",
          zIndex: 1000,
          position: "absolute",
          width: "100%",
          height: "220%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Loading />
      </Box>
      <Router>
        {engineResources.mobile ? (
          <div className="noRenderable">
            <p>
              Tu dispositivo no cumple con las características necesarias.
              <br />
              <b>Ponte en contacto con el proveedor del servicio.</b>
            </p>
          </div>
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/Sesion" element={<SignUpOrSignIn />} />
            <Route
              path="/arcontroller/web/main/Dashboard"
              element={<Dashboard />}
            /> */}
          </Routes>
        )}
      </Router>
    </>
  );
};

export default Inicio;
