import React, { Component, useState } from "react";
import {
  Box,
  Grid,
  Icon,
  IconButton,
  ListItem,
  ListItemIcon,
  styled,
  Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import AddIcon from "@mui/icons-material/Add";
import PrintIcon from "@mui/icons-material/Print";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import { alpha } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { SearchSharp } from "@mui/icons-material";

import ModalFormAddLocalidades from "./Modal_form_add_localidades";
import ModalFormEditLocalidades from "./Modal_form_editar_localidades";
import ModalFormPrintLocalidades from "./Modal_form_imprimir_localidades";
import ModalFormDropLocalidades from "./Modal_form_borrar_localidades";

import PropTypes from "prop-types";

function MenuLocalidades(props) {
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
  const visibleSearchLocalidades = () => setVisibleSearch(!visibleSearch);

  return (
    <nav className="menu-main">
      <Box sx={{ flexGrow: 1 }}>
        <Item>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <IconButton>
                <Typography component="h5" variant="h6">
                  Localidades
                </Typography>
              </IconButton>
            </Grid>
            <Grid item xs={4}>
              <IconButton onClick={visibleSearchLocalidades}>
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
      <ModalFormAddLocalidades
        open={openModalAdd}
        visibleModalAdd={visibleModalAdd}
      />
      <ModalFormEditLocalidades
        open={openModalEdit}
        visibleModalEdit={visibleModalEdit}
      />
      <ModalFormPrintLocalidades
        open={openModalPrint}
        visibleModalPrint={visibleModalPrint}
      />
      <ModalFormDropLocalidades
        open={openModalDrop}
        visibleModalDrop={visibleModalDrop}
      />
    </nav>
  );
}

MenuLocalidades.propTypes = {};

export default MenuLocalidades;
