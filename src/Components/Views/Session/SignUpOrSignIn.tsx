import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Grid, Link, Typography } from "@mui/material";
import { useGeneralContext } from "../../../Context/GeneralContext";
import FormAuthRegtr from "./Login/FormAuthRegtr";

import ClassAUTHREG from "../../Common/ModulosSis/auth/ClassAUTHREG";

const SignUpOrSignIn: React.FC<any> = () => {
  const navigate = useNavigate();
  const { engineResources, serverResources } = useGeneralContext();

  const classAUTHREG = new ClassAUTHREG();

  const [visibleFormAuth, setVisibleFormAuth] = useState<boolean>(true);

  useEffect(() => {
    if (!engineResources.Legacy[0]) {
      window.location.href = "/";
    }

    if (
      serverResources.user.token !== undefined &&
      serverResources.user.token?.length > 3
    ) {
      navigate("/Dashboard");
    }
  }, []);

  return (
    <Grid
      container
      sx={{
        backgroundColor: "#a9a",
        height: "auto",
      }}
    >
      {/* Forms */}
      <Grid
        sx={{
          padding: "0 5%",
        }}
        item
        md={5}
        xs={12}
      >
        <Box>
          <FormAuthRegtr visibleFormAuth={visibleFormAuth} />
        </Box>
      </Grid>

      {/* Handle visible forms */}
      <Grid
        sx={{
          backgroundColor: "#ede",
        }}
        item
        md={7}
        xs={12}
      >
        <Box
          borderLeft={3}
          borderColor="#989"
          sx={{
            padding: "50px 100px 0 100px",
            height: "100vh",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              width: "100%",
            }}
          >
            {visibleFormAuth
              ? "Si desea incorporar un nuevo usuario"
              : "Inicie sesión con usuario registrado"}
            <Link
              sx={{ marginLeft: "5px", cursor: "pointer" }}
              onClick={() => setVisibleFormAuth(!visibleFormAuth)}
            >
              clic aquí
            </Link>
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default SignUpOrSignIn;
