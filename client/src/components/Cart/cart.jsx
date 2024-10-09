import React, { useEffect } from "react";
import { useLazyQuery } from '@apollo/client';
import { QUERY_CHECKOUT } from '../../utils/query';

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

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

export const FullScreenDialog = ({ icon }) => {
  const [open, setOpen] = React.useState(false);
  const [state, dispatch] = useGlobalState();
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);
  const [couponCode, setCouponCode] = React.useState('');
  
  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);

  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise('cart', 'get');
      dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
    }

    if (!state.cart.length) {
      getCart();
    }
  }, [state.cart.length, dispatch]);




  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRemoveFromCart = (id) => {
    dispatch({
      type: "REMOVE_TRIP_FROM_CART",
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
      getCheckout({
        variables: { 
          // products: [...state.cart],
          // TODO: add the products from the cart
          // TODO: add the coupon code from the input field
          // The bottom is just a test using a static product 
          products:[{
            image: "http://placehold.it/100x100",
            name: "Test Product",
            _id: "1234567",
            price: 100,
            purchaseQuantity: 1
          }]
        },
      });
  
    } catch (error) {
      console.error('Error creating checkout session:', error);
    }
  };

  const handleClearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const subtotal = state.cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
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
          sx: { width: { xs: '100%', sm: 400 }, backgroundColor: "#f5f5f5" },
        }}
      >
        <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
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
                <React.Fragment key={item.id}>
                  <ListItem
                    secondaryAction={
                      <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveFromCart(item.id)}>
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
          <Paper elevation={3} sx={{ marginTop: 2, padding: 2, backgroundColor: '#e3f2fd' }}>
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
                backgroundColor: '#4caf50',
                '&:hover': {
                  backgroundColor: '#45a049',
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