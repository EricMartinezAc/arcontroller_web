import * as React from "react";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        <TableCell component="th" scope="row">
          {row.sucursal} ({row.centroCosto})
        </TableCell>
        <TableCell align="right">{row.state}</TableCell>
      </TableRow>

      <TableRow>
        <TableCell
          style={{
            backgoundColor: "yellow",
            paddingBottom: 0,
            paddingTop: 0,
          }}
          colSpan={6}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <img
                style={{ borderRadius: "200%", width: "50px", height: "50px" }}
                src={row.imagen[0]}
              />
              <Typography variant="h8" gutterBottom component="div">
                <b> Datos generales</b>
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell h9>
                      <Typography variant="h9" gutterBottom component="div">
                        <b> Gerente </b>
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h9" gutterBottom component="div">
                        <b> Ubicación </b>
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h9" gutterBottom component="div">
                        <b> Contactos </b>
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h9" gutterBottom component="div">
                        <b> Inicio de operaciones (YYYY-MM-DD) </b>
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="h9" gutterBottom component="div">
                        <b> Ver más </b>
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell h9>
                      <Typography variant="h10" gutterBottom component="div">
                        {row.gerente}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {" "}
                      <Typography variant="h10" gutterBottom component="div">
                        {row.ubicacion[0]}, {row.ubicacion[1]},{" "}
                        {row.ubicacion[2]}, {row.ubicacion[3]}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h10" gutterBottom component="div">
                        {row.contactos[0]} / {row.contactos[1]}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h10" gutterBottom component="div">
                        {row.inicioOp.slice(1, -1).split("T")[0]}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="h12" gutterBottom component="div">
                        <Button className="btn btn-primary">Áreas</Button>
                        <br />
                        <Button className="btn btn-primary">Equipo</Button>
                        <br />
                        <Button className="btn btn-primary">Proveedores</Button>
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable({ datos }) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow sx={{ backgoundColor: "black" }}>
            <TableCell />
            <TableCell>
              <Typography variant="h5" gutterBottom component="div">
                Nombre (Centro de costo){" "}
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="h5" gutterBottom component="div">
                Estado de servicio{" "}
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {datos.map((item, row) => (
            <Row key={row} row={item} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
