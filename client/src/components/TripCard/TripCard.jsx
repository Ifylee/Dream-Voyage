// import * as React from "react";
// import { styled } from "@mui/material/styles";
// import Card from "@mui/material/Card";
// import CardHeader from "@mui/material/CardHeader";
// import CardMedia from "@mui/material/CardMedia";
// import CardContent from "@mui/material/CardContent";
// import CardActions from "@mui/material/CardActions";
// import Collapse from "@mui/material/Collapse";
// import Avatar from "@mui/material/Avatar";
// import IconButton from "@mui/material/IconButton";
// import Typography from "@mui/material/Typography";
// import { red } from "@mui/material/colors";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import ShareIcon from "@mui/icons-material/Share";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import { Grid2 } from "@mui/material";
// import Container from "@mui/material/Container";
// import Box from "@mui/material/Box";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import { useGlobalState } from "../../utils/GlobalState";
// import { Link } from "react-router-dom";

// import { useMutation } from "@apollo/client";
// import { ADD_WISH_LIST } from "../../utils/mutation";
// import { ADD_TRIP_TO_CART } from "../../utils/actions";

// const ExpandMore = styled((props) => {
//   const { expand, ...other } = props;
//   return <IconButton {...other} />;
// })(({ theme }) => ({
//   marginLeft: "auto",
//   transition: theme.transitions.create("transform", {
//     duration: theme.transitions.duration.shortest,
//   }),
//   transform: (props) => (props.expand ? "rotate(180deg)" : "rotate(0deg)"),
// }));

// export const TripCard = ({ trip, title, summary, description, img, price, handleSaveTrip,id }) => {
//   const [state, dispatch] = useGlobalState();
//   console.log(state);
//   const [addList, { error }] = useMutation(ADD_WISH_LIST);
//   const [expanded, setExpanded] = React.useState(false);

//   const handleExpandClick = () => {
//     setExpanded(!expanded);
//   };

//   const addToCart = async () => {
//     dispatch({
//       type: ADD_TRIP_TO_CART,
//       payload: { title, img, price, id },
//     });
//   };

//   const addWishTrip = async () => {
//     try {
//       const { data } = await addList({ variables: { id } });
//       console.log("Success:", data);
//     } catch (err) {
//       console.log(err);
//     }
//   };
//   return (
//     <Grid2 >
//       <Card sx={{ width: 400, height: 400 }}>
//         <CardHeader
//           avatar={
//             <Avatar sx={{ bgcolor: red[500] }} aria-label="trip">
//               {title[0]}
//             </Avatar>
//           }
//           action={
//             <IconButton aria-label="settings">
//               <MoreVertIcon />
//             </IconButton>
//           }
//           title={title}
//           subheader={`Price: $${price.toFixed(2)}`}
//         />
//         <Box sx={{ height: 200, overflow: 'hidden' }}>
//           <Link to ={`/trip/${id}`}>
//           <CardMedia
//             component="img"
//             image={`/images/${img}`}
//             alt={title}
//             sx={{
//               width: '100%',
//               height: '100%',
//               objectFit: 'cover'
//             }}
//           />
//           </Link>

//         </Box>
//         <CardContent>
//           <Typography variant="body2" sx={{ color: "text.secondary" }}>
//             {summary}
//           </Typography>
//         </CardContent>
//         <CardActions disableSpacing>
//           <IconButton aria-label="add to favorites" onClick={addWishTrip}>
//             <FavoriteIcon />
//           </IconButton>
//           <IconButton aria-label="share" onClick={addToCart}>
//            <ShoppingCartIcon/>
//           </IconButton>

//         </CardActions>
//         <Collapse in={expanded} timeout="auto" unmountOnExit>
//           <CardContent>
//             <Typography variant="body2">Description:</Typography>
//             <Typography>{description}</Typography>
//           </CardContent>
//         </Collapse>
//       </Card>
//     </Grid2>
//   );
// }

import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import FavoriteIcon from "@mui/icons-material/Favorite";
import InfoIcon from "@mui/icons-material/Info";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useGlobalState } from "../../utils/GlobalState";

import { useMutation } from "@apollo/client";
import { ADD_WISH_LIST } from "../../utils/mutation";
import { ADD_TRIP_TO_CART } from "../../utils/actions";


// eslint-disable-next-line react/prop-types
export const TripCard = ({ id, title, description, img, price }) => {
  const [expanded] = React.useState(false);
  const [state, dispatch] = useGlobalState();
  console.log(state);
  const [addList] = useMutation(ADD_WISH_LIST);

  const addToCart = async () => {
    dispatch({
      type: ADD_TRIP_TO_CART,
      payload: { title, img, price, id },
    });
  };

  const addWishTrip = async () => {
    try {
      const { data } = await addList({ variables: { id } });
      console.log("Success:", data);
    } catch (err) {
      console.log(err);
    }
  };
  const navigate = useNavigate();

  const handleImageClick = () => {
    navigate(`/trip/${id}`);
  };
  return (
    <Card key ={id} sx={{ width: 345, height: 400 }}>
      <CardHeader
        title={
          <Typography variant="h6" sx={{ fontSize: "1.3rem" }}>
            {title}
          </Typography>
        }
        // eslint-disable-next-line react/prop-types
        subheader={`Price: $${price.toFixed(2)}`}
      />
      <CardMedia
        component="img"
        height="194"
        src={`/images/${img}`}
        alt={title}
        onClick={handleImageClick}
        style={{ cursor: "pointer" }}
      />
      <CardContent></CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Grouping first two buttons */}
        <Box>
          <IconButton aria-label="add to favorites"  onClick={addWishTrip}>
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share" onClick={addToCart}>
            <ShoppingCartIcon />
          </IconButton>
        </Box>

        {/* Spacer to push the button to the end */}
        <Box sx={{ flexGrow: 1 }} />

        {/* New button at the end */}
        <IconButton aria-label="settings" onClick={handleImageClick}>
          <InfoIcon />
        </IconButton>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="body2">Description:</Typography>
          <Typography>{description}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};
