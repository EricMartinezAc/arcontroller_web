import { Button, Grid } from "@mui/material";
import React from "react";
import TableListRRHH from "./TableListRRHH.tsx";
import ModalAddRRHH from "./ModalAddRRHH.tsx";
import { useGeneralContext } from "../../../../../Context/GeneralContext";
import Colores from "../../../../../Components/Common/ModulosGen/Colores";

function ViewRRHH() {
  const { serverResources } = useGeneralContext();

  const [open, setOpen] = React.useState(false);
  const handleModal = () => setOpen(!open);
  return (
    <>
      <ModalAddRRHH open={open} handleModal={handleModal} />
      <Grid container spacing={0.3}>
        <Grid item xs={12} md={12}>
          <h2>GESTIÓN DE RECURSOS HUMANOS</h2>
        </Grid>
        <Grid item xs={12} md={4}>
          <Button
            onClick={handleModal}
            sx={{ width: "100%", bgcolor: Colores.grosella_negra }}
          >
            AGREGAR
          </Button>
        </Grid>
        <Grid item xs={12} md={4}>
          <Button sx={{ width: "100%", bgcolor: Colores.grosella_negra }}>
            EDITAR
          </Button>
        </Grid>
        <Grid item xs={12} md={4}>
          <Button sx={{ width: "100%", bgcolor: Colores.rosa }}>
            ELIMINAR
          </Button>
        </Grid>
        <TableListRRHH />
      </Grid>
    </>
  );
}

export default ViewRRHH;
