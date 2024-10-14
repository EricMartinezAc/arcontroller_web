import React, { useState } from "react";
import { Box, Grid, IconButton, styled, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import AddIcon from "@mui/icons-material/Add";
import PrintIcon from "@mui/icons-material/Print";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

import { alpha } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { SearchSharp } from "@mui/icons-material";

import ModalFormAddSucursal from "./Modal_form_add_sucursal";
import ModalFormEditSucursal from "./Modal_form_editar_sucursal";
import ModalFormPrintSucursal from "./Modal_form_imprimir_sucursal";
import ModalFormDropSucursal from "./Modal_form_borrar_sucursal";

function MenuSucursal() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const Search = styled("button")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha("#GGG", 0.5),
    "&:hover": {
      backgroundColor: alpha("#111", 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "97%",
    },
    border: "none",
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
  }));

  //states and self func
  const [openModalAdd, setModalAdd] = useState(false);
  const visibleModalAdd = () => setModalAdd(!openModalAdd);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const visibleModalEdit = () => setOpenModalEdit(!openModalEdit);
  const [openModalDrop, setOpenModalDrop] = useState(false);
  const visibleModalDrop = () => setOpenModalDrop(!openModalDrop);
  const [openModalPrint, setOpenModalPrint] = useState(false);
  const visibleModalPrint = () => setOpenModalPrint(!openModalPrint);
  const [visibleSearch, setVisibleSearch] = useState(false);
  const visibleSearchSucursal = () => setVisibleSearch(!visibleSearch);

  return (
    <nav className="menu-main">
      <Box sx={{ flexGrow: 1 }}>
        <Item>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <IconButton>
                <Typography component="h5" variant="h6">
                  Sucursales
                </Typography>
              </IconButton>
            </Grid>
            <Grid item xs={4}>
              <IconButton onClick={visibleSearchSucursal}>
                <SearchSharp />
              </IconButton>
              <IconButton onClick={visibleModalAdd} size="medium">
                <AddIcon fontSize="100%" style={{ zIndex: 10 }} />
              </IconButton>
              <IconButton onClick={visibleModalEdit} size="medium">
                <EditIcon fontSize="100%" style={{ zIndex: 10 }} />
              </IconButton>
              <IconButton onClick={visibleModalPrint} size="medium">
                <PrintIcon fontSize="100%" style={{ zIndex: 10 }} />
              </IconButton>
              <IconButton onClick={visibleModalDrop} size="medium">
                <DeleteForeverIcon fontSize="100%" style={{ zIndex: 10 }} />
              </IconButton>
            </Grid>
          </Grid>
        </Item>
      </Box>
      <br />
      <Box
        style={{ display: visibleSearch === false ? "none" : "block" }}
        sx={{ flexGrow: 1 }}
      >
        <Item>
          <Grid container spacing={2}>
            <Grid item xs={7}>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
            </Grid>
            <Grid item xs={1}>
              <IconButton button>
                <ChevronRightIcon />
              </IconButton>
            </Grid>
            <Grid item xs={4}>
              <Item>
                <Typography variant="h7">Result</Typography>
              </Item>
            </Grid>
          </Grid>
        </Item>
      </Box>
      <ModalFormAddSucursal
        open={openModalAdd}
        visibleModalAdd={visibleModalAdd}
      />
      <ModalFormEditSucursal
        open={openModalEdit}
        visibleModalEdit={visibleModalEdit}
      />
      <ModalFormPrintSucursal
        open={openModalPrint}
        visibleModalPrint={visibleModalPrint}
      />
      <ModalFormDropSucursal
        open={openModalDrop}
        visibleModalDrop={visibleModalDrop}
      />
    </nav>
  );
}

MenuSucursal.propTypes = {};

export default MenuSucursal;
