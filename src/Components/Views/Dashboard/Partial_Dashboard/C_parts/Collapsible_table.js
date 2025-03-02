import * as React from "react";
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
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useGeneralContext } from "../../../../../Context/GeneralContext";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { FormHelperText, MenuItem } from "@mui/material";

function createData(name, calories, fat, carbs, protein, price, valen) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    valen,
    history: [
      {
        date: "2020-01-05",
        customerId: "11091700",
        amount: 3,
      },
      {
        date: "2020-01-02",
        customerId: "Anonymous",
        amount: 1,
      },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <>
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
          {row.name}
        </TableCell>
        <TableCell align="right">{row.calories}</TableCell>
        <TableCell align="right">{row.fat}</TableCell>
        <TableCell align="right">{row.carbs}</TableCell>
        <TableCell align="right">{row.protein}</TableCell>
        <TableCell align="right">{row.valen}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      })
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
    valen: PropTypes.number.isRequired,
  }).isRequired,
};

const rows = [
  // createData("ballena vacia", 212, 11.0, 29, 2, 1.1, 110),
  // createData("Frozen yoghurt", 159, 6.0, 24, 4.0, 3.99, 110),
  // createData("Ice cream sandwich", 237, 9.0, 37, 4.3, 4.99, 110),
  // createData("Eclair", 262, 16.0, 24, 6.0, 3.79, 110),
  // createData("Cupcake", 305, 3.7, 67, 4.3, 2.5, 110),
  // createData("Gingerbread", 356, 16.0, 49, 3.9, 1.5, 110),
];

export default function CollapsibleTable() {
  const { serverResources, engineResources, engineResourcesSetters } =
    useGeneralContext();

  return (
    <TableContainer
      style={{
        padding: 0,
        margin: 0,
        height: "max-content",
        overflowX: "scroll",
      }}
      component={Paper}
    >
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>SUCURSALES</TableCell>

            <TableCell sx={{ border: "none" }} align="right">
              <FormControl sx={{ m: 1, minWidth: 100 }}>
                <InputLabel id="demo-simple-select-helper-label-historico">
                  Histórico
                </InputLabel>
                <Select
                  variant="standard"
                  sx={{
                    height: "70px",
                    borderRadius: "3%",
                    font: "14px",
                    padding: 0,
                    margin: 0,
                    position: "relative",
                    top: "-9px",
                  }}
                  disableUnderline
                  labelId="demo-simple-select-helper-label-historico"
                  id="demo-simple-select-helper-historico"
                  value={null}
                  label="historico"
                >
                  <MenuItem value="">
                    <em></em>
                  </MenuItem>
                </Select>
              </FormControl>
            </TableCell>

            <TableCell sx={{ border: "none" }} align="right">
              <FormControl sx={{ m: 1, minWidth: 100 }}>
                <InputLabel id="demo-simple-select-helper-label-kpi">
                  KPI
                </InputLabel>
                <Select
                  variant="standard"
                  sx={{
                    height: "70px",
                    borderRadius: "3%",
                    font: "14px",
                    padding: 0,
                    margin: 0,
                    position: "relative",
                    top: "-9px",
                  }}
                  disableUnderline
                  labelId="demo-simple-select-helper-label-kpi"
                  id="demo-simple-select-helper-kpi"
                  value={null}
                  label="kpi"
                >
                  <MenuItem value="">
                    <em></em>
                  </MenuItem>
                </Select>
              </FormControl>
            </TableCell>

            {Array.isArray(serverResources.areas) &&
              serverResources.areas.length > 0 &&
              serverResources.areas[0] !== null &&
              serverResources.areas[0].map((area) => (
                <TableCell align="right" key={area.id || area.name}>
                  {area.name}
                </TableCell>
              ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
