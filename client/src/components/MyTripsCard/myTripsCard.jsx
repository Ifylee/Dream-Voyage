// import React from "react";
// import { styled } from "@mui/material/styles";
// import Card from "@mui/material/Card";
// import CardHeader from "@mui/material/CardHeader";
// import CardMedia from "@mui/material/CardMedia";
// import IconButton from "@mui/material/IconButton";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import Avatar from "@mui/material/Avatar";
// import { red } from "@mui/material/colors";
// import { Grid2 as Grid } from "@mui/material";
// import Box from "@mui/material/Box";
// const MyTripsCardStyled = styled(Card)({
//   width: 400,
//   height: 400,
// });
// export const MyTripsCard = ({ trip, title, summary, description, img, price }) => {
//   const [expanded, setExpanded] = React.useState(false);
//   const handleExpandClick = () => {
//     setExpanded(!expanded);
//   };
//   return (
//     <Grid size={{md:12}}>
//       <MyTripsCardStyled>
//         <CardHeader

//           title={title}

//         />
//         <Box sx={{ height: 200, overflow: 'hidden' }}>
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
//         </Box>
//         {/* Rest of your code */}
//       </MyTripsCardStyled>
//     </Grid>
//   );
// };

import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import InfoIcon from "@mui/icons-material/Info";
import { useGlobalState } from "../../utils/GlobalState";

import { useMutation } from "@apollo/client";
import { DELETE_FROM_LIST } from "../../utils/mutation";
// eslint-disable-next-line react/prop-types
export const MyTripsCard = ({ id, title, img, }) => {
  const [expanded] = React.useState(false);
  const [state, dispatch] = useGlobalState();
  console.log(state);
  const [removeFromList] = useMutation(DELETE_FROM_LIST);



  const deleteWishList = async () => {
    try {
      const { data } = await removeFromList({ variables: { id } });
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
    <Card key={id} sx={{ width: 345, height: 325 }}>
      <CardHeader
        title={
          <Typography variant="h6" sx={{ fontSize: "1.3rem" }}>
            {title}
          </Typography>
        }
      />
      <CardMedia
        component="img"
        height="194"
        src={`/images/${img}`}
        alt={title}
        onClick={handleImageClick}
        style={{ cursor: "pointer" }}
      />

      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Grouping first two buttons */}
        <Box>
          <IconButton aria-label="add to favorites" onClick={deleteWishList}>
            <DeleteForeverIcon />
          </IconButton>
          {/* <IconButton aria-label="share" onClick={addToCart}>
            <ShoppingCartIcon />
          </IconButton> */}
        </Box>

        {/* Spacer to push the button to the end */}
        <Box sx={{ flexGrow: 1 }} />

        {/* New button at the end */}
        <IconButton aria-label="settings" onClick={handleImageClick}>
          <InfoIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};
