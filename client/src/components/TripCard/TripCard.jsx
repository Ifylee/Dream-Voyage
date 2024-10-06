import * as React from "react";
import { useNavigate } from "react-router-dom"; 
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  transform: (props) => (props.expand ? "rotate(180deg)" : "rotate(0deg)"),
}));

export const TripCard = ({ id, title, summary, description, img, price }) => {
  const [expanded, setExpanded] = React.useState(false);

 
  const navigate = useNavigate();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };


  const handleImageClick = () => {
    navigate(`/trip/${id}`); 
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader 
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={title}
        subheader={`Price: $${price.toFixed(2)}`}
      />

      <CardMedia
        component="img"
        height="194"
        src={`/images/${img}`}
        alt={title}
        onClick={handleImageClick} 
        style={{ cursor: 'pointer' }} 
      />
      <CardContent>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {summary}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShoppingCartIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
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
