import React, { useEffect } from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { Box } from "@mui/material";

// Definir los valores posibles para AlertSeverity
type AlertSeverityType = "error" | "warning" | "info" | "success";

// Definir las propiedades esperadas del componente
interface DescriptionAlertsProps {
  AlertSeverity: AlertSeverityType;
  AlertTilte: string;
  AlertMsjLow: string;
  AlertMsjHight: string;
}

const DescriptionAlerts: React.FC<DescriptionAlertsProps> = ({
  AlertSeverity,
  AlertTilte,
  AlertMsjLow,
  AlertMsjHight,
}) => {
  useEffect(() => {
    console.log([AlertSeverity, AlertTilte, AlertMsjLow, AlertMsjHight]);
  }, []);

  return (
    <Box sx={{ width: "100%", padding: "20px" }}>
      <Alert severity={AlertSeverity}>
        <AlertTitle>{AlertTilte}</AlertTitle>
        {AlertMsjLow}.<strong> {AlertMsjHight}</strong>
      </Alert>
    </Box>
  );
};

export default DescriptionAlerts;
