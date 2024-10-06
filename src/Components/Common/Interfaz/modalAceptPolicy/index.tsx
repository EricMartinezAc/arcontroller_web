import React from "react";
import { Button, Divider, Link, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import LogoISE from "../../../../Assets/Imgs/logos/climatecontrols/5-transp.png";

// Definir los tipos de las propiedades que recibirá el componente
interface AlertCookiesProps {
  AceptacionCookies: () => void;
  DenegarCookies: () => void;
}

const AlertCookies: React.FC<AlertCookiesProps> = ({
  AceptacionCookies,
  DenegarCookies,
}) => {
  return (
    <Box
      sx={{
        display: "block",
      }}
    >
      {/* celda 1 */}
      <Box
        sx={{
          backgroundColor: "#4533B8",
          height: "auto",
          width: "100%",
          display: "flex",
          justifyContent: "left",
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
          }}
        >
          <Typography
            sx={{
              padding: "0 auto",
              margin: "auto 0",
              textAlign: "center",
              color: "#ede",
            }}
          >
            Powered by
          </Typography>
          <img
            style={{
              width: "110px",
              backgroundColor: "#cec",
            }}
            src={LogoISE}
            alt="logo_ISE"
          />
        </Box>
      </Box>

      {/* celda2 */}
      <Box>
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            margin: "0 auto",
            padding: "30px 50px",
          }}
        >
          Esta aplicación web usa cookies. Acepta las políticas para continuar.
        </Typography>
        <Typography
          sx={{
            margin: 0,
            padding: "10px 100px 20px 20px",
          }}
        >
          Las cookies de éste sitio son usadas para mejorar la experiencia en la
          autenticación y registro de usuarios nuevos para cliente
          ARControllers, así como para el manejo de datos y su funcionalidad.
          Las cookies son estrictamente necesarias para el funcionamiento de
          este sistema. Al usar este sistema, acepta las políticas de manejo de
          información. Por motivos de seguridad, este consentimiento tiene
          caducidad de tiempo.
          <br />
          <Link href="https://www.privacy-regulation.eu/es/6.htm">
            Artículo 6 UE RGDP "Licitud del tratamiento"
          </Link>
        </Typography>
      </Box>

      {/* ultima */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          border: "#ece 1px solid",
          width: "100%",
          padding: "10px auto",
          height: "auto",
          margin: "auto 0",
        }}
      >
        <Link
          sx={{
            margin: "auto",
            width: "max-content",
            height: "min-content",
          }}
          href="https://www.cookiebot.com/en/privacy-policy/"
        >
          Política de privacidad
        </Link>

        <Stack sx={{ p: 2, zIndex: 100 }} direction="row" spacing={2}>
          <Button
            onClick={AceptacionCookies}
            variant="contained"
            color="primary"
          >
            Aceptar
          </Button>
          <Button onClick={DenegarCookies} variant="outlined">
            No aceptar
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default AlertCookies;
