import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Box } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
export const FullScreenDialog = () => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <React.Fragment>
      <Button
        variant=""
        startIcon={<ShoppingCartIcon fontSize="large" />}
        onClick={handleClickOpen}
      >
        <span role="img" aria-label="trash">
          {/* <ShoppingCartIcon fontSize="small" sx={{color:"white"}}/> */}
        </span>
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar  sx={{ position: "relative", backgroundColor: "black" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Cart
            </Typography>
            <Button color="inherit" variant="outlined" onClick={handleClose}>
              Buy
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          <ListItemButton>
            <ListItemText primary="Phone ringtone" secondary="Titania" />
            <Box ml="auto">
              <ListItemText primary="🗑️" onClick={handleClose} />
            </Box>
          </ListItemButton>
          <Divider />
          <ListItemButton>
            <ListItemText primary="Default notification ringtone" />
          </ListItemButton>
        </List>
      </Dialog>
    </React.Fragment>
  );
};
