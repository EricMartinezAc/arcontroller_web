import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ModalAddRRHH(props: any) {
  return (
    <div>
      <Modal
        keepMounted
        open={props.open}
        onClose={props.handleModal}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
            AGREGAR PERSONA COMO RECURSO HUMANO
          </Typography>
          <Grid container spacing={0.3}>
            <Grid item xs={12} md={12}></Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
