// import React from "react";
// import Button from "@mui/material/Button";
// import Dialog from "@mui/material/Dialog";
// import ListItemText from "@mui/material/ListItemText";
// import ListItemButton from "@mui/material/ListItemButton";
// import List from "@mui/material/List";
// import Divider from "@mui/material/Divider";
// import AppBar from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
// import IconButton from "@mui/material/IconButton";
// import Typography from "@mui/material/Typography";
// import CloseIcon from "@mui/icons-material/Close";
// import Slide from "@mui/material/Slide";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import { Box } from "@mui/material";

// const Transition = React.forwardRef(function Transition(props, ref) {
//   return <Slide direction="down" ref={ref} {...props} />;
// });
// export const FullScreenDialog = () => {
//   const [open, setOpen] = React.useState(false);
//   const handleClickOpen = () => {
//     setOpen(true);
//   };
//   const handleClose = () => {
//     setOpen(false);
//   };
//   return (
//     <React.Fragment>
//       <Button
//         variant=""
//         startIcon={<ShoppingCartIcon fontSize="large" />}
//         onClick={handleClickOpen}
//       >
//         <span role="img" aria-label="trash">
//           {/* <ShoppingCartIcon fontSize="small" sx={{color:"white"}}/> */}
//         </span>
//       </Button>
//       <Dialog
//         fullScreen
//         open={open}
//         onClose={handleClose}
//         TransitionComponent={Transition}
//       >
//         <AppBar  sx={{ position: "relative", backgroundColor: "black" }}>
//           <Toolbar>
//             <IconButton
//               edge="start"
//               color="inherit"
//               onClick={handleClose}
//               aria-label="close"
//             >
//               <CloseIcon />
//             </IconButton>
//             <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
//               Cart
//             </Typography>
//             <Button color="inherit" variant="outlined" onClick={handleClose}>
//               Buy
//             </Button>
//           </Toolbar>
//         </AppBar>
//         <List>
//           <ListItemButton>
//             <ListItemText primary="Phone ringtone" secondary="Titania" />
//             <Box ml="auto">
//               <ListItemText primary="🗑️" onClick={handleClose} />
//             </Box>
//           </ListItemButton>
//           <Divider />
//           <ListItemButton>
//             <ListItemText primary="Default notification ringtone" />
//           </ListItemButton>
//         </List>
//       </Dialog>
//     </React.Fragment>
//   );
// };



import React from "react";
import { useMutation } from "@apollo/client";
// import { CREATE_CHECKOUT_SESSION } from "../../utils/mutation";
import { loadStripe } from "@stripe/stripe-js";
import { useGlobalState } from "../../utils/GlobalState";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Box, Divider, Paper, Badge, TextField } from "@mui/material";
import { REMOVE_TRIP_FROM_CART } from "../../utils/actions";
const stripePromise = loadStripe('your_stripe_publishable_key');
export const FullScreenDialog = ({ icon }) => {
  const [open, setOpen] = React.useState(false);
  const [state, dispatch] = useGlobalState();
  // const [createCheckoutSession] = useMutation(CREATE_CHECKOUT_SESSION);
  const [couponCode, setCouponCode] = React.useState('');
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleRemoveFromCart = (id) => {
    dispatch({
      type: REMOVE_TRIP_FROM_CART,
      payload: id,
    });
  };
  const handleUpdateQuantity = (id, change) => {
    dispatch({
      type: "UPDATE_CART_QUANTITY",
      payload: { id, change },
    });
  };
  const handleCheckout = async () => {
    try {
      const { data } = await createCheckoutSession({
        variables: { items: state.cart.map(item => item.id) },
      });
      const stripe = await stripePromise;
      const result = await stripe.redirectToCheckout({
        sessionId: data.createCheckoutSession.sessionId,
      });
      if (result.error) {
        console.error(result.error);
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
    }
  };
  const handleClearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };
  const subtotal = state.cart.reduce((acc, item) => acc + item.price, 0);
  const tax = subtotal * 0.1; // Assuming 10% tax
  const total = subtotal + tax;
  return (
    <React.Fragment>
      <IconButton color="inherit" onClick={handleClickOpen}>
        <Badge badgeContent={state.cart.length} color="secondary">
          {icon || <AirplanemodeActiveIcon />}
        </Badge>
      </IconButton>
      <Drawer
        anchor="right"
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: { width: { xs: '100%', sm: 400 }, backgroundColor: "#F5F5F5" },
        }}
      >
        <AppBar position="static" sx={{ backgroundColor: "#1976D2" }}>
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Your Travel Cart
            </Typography>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box sx={{ padding: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Paper elevation={3} sx={{ padding: 2, flexGrow: 1, overflow: 'auto' }}>
            <List>
              {state.cart.map((item, index) => (
                <React.Fragment key={item._id}>
                  <ListItem
                    secondaryAction={
                      <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveFromCart(item._id)}>
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar alt={item.title} src={`/images/${item.img}`} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={item.title}
                      secondary={`$${item.price.toFixed(2)}`}
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                      <IconButton onClick={() => handleUpdateQuantity(item.id, -1)} disabled={item.quantity <= 1}>
                        <RemoveIcon />
                      </IconButton>
                      <Typography>{item.quantity}</Typography>
                      <IconButton onClick={() => handleUpdateQuantity(item.id, 1)}>
                        <AddIcon />
                      </IconButton>
                    </Box>
                  </ListItem>
                  {index < state.cart.length - 1 && <Divider variant="inset" component="li" />}
                </React.Fragment>
              ))}
            </List>
            {state.cart.length === 0 && (
              <Typography variant="subtitle1" align="center" sx={{ marginTop: 2 }}>
                Your cart is empty. Start adding some amazing trips!
              </Typography>
            )}
          </Paper>
          <Paper elevation={3} sx={{ marginTop: 2, padding: 2, backgroundColor: '#E3F2FD' }}>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 1 }}>
              <Typography>Subtotal:</Typography>
              <Typography>${subtotal.toFixed(2)}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 1 }}>
              <Typography>Tax:</Typography>
              <Typography>${tax.toFixed(2)}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
              <Typography variant="h6">Total:</Typography>
              <Typography variant="h6">${total.toFixed(2)}</Typography>
            </Box>
            <TextField
              fullWidth
              label="Coupon Code"
              variant="outlined"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              sx={{ marginBottom: 2 }}
            />
            <Button
              variant="contained"
              fullWidth
              onClick={handleCheckout}
              startIcon={<AirplanemodeActiveIcon />}
              sx={{
                backgroundColor: '#4CAF50',
                '&:hover': {
                  backgroundColor: '#45A049',
                },
                marginBottom: 1,
              }}
            >
              Proceed to Checkout
            </Button>
            <Button
              variant="outlined"
              fullWidth
              onClick={handleClearCart}
              sx={{ marginBottom: 1 }}
            >
              Clear Cart
            </Button>
            <Button
              variant="text"
              fullWidth
              onClick={handleClose}
            >
              Continue Shopping
            </Button>
          </Paper>
        </Box>
      </Drawer>
    </React.Fragment>
  );
};
