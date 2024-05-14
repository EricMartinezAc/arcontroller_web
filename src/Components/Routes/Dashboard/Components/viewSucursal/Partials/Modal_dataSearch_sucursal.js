import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { List, ListItem, ListItemText, ListSubheader } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ dat, open, visibleModalDataSearch }) {
  if (dat !== null) {
    const proveedores = JSON.parse(dat.proveedores[0]);
    const areas = JSON.parse(dat.areas[0]);
    const team = dat.team;
    console.log([proveedores[0], areas[0], team[0]]);
    return (
      <>
        <Modal
          open={open}
          onClose={visibleModalDataSearch}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Datos encontrados
            </Typography>
            <List
              sx={{
                width: "100%",
                maxWidth: 360,
                bgcolor: "background.paper",
                position: "relative",
                overflow: "auto",
                maxHeight: 300,
                "& ul": { padding: 0 },
              }}
              subheader={<li />}
            >
              <li key={`section`}>
                <ul>
                  <ListSubheader>{`Datos generales de sucursal ${dat.sucursal}`}</ListSubheader>
                  <ListItem key={`gerente`}>
                    <ListItemText primary={`Gerente:  ${dat.gerente}`} />
                  </ListItem>
                  <ListItem key={`inicioOp}`}>
                    <ListItemText
                      primary={`Inicio de operación:  ${dat.inicioOp}`}
                    />
                  </ListItem>
                </ul>

                <ul>
                  <ListSubheader>{`Detalles`}</ListSubheader>
                  <ListItem key={`contacts}`}>
                    <ListItemText
                      primary={`Contactos:  ${dat.contactos[0]} - ${dat.contactos[1]}`}
                    />
                  </ListItem>
                  <ListItem key={`equipo}`}>
                    <ListItemText primary={`Equipo:  ${team[0]}`} />
                  </ListItem>
                </ul>
              </li>
            </List>
          </Box>
        </Modal>
      </>
    );
  }
}
