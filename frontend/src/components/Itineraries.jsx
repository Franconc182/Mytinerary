import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Button} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import itinerariesActions from "../redux/actions/itinerariesActions";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard({ itinerary }) {
  const [expanded, setExpanded] = React.useState(false);
  const [currentCarrouselSlide, setCurrentCarrouselSlide] = React.useState(0); // index de la activity a mostrarse en el carrousel
  const [commentContent, setCommentContent] = React.useState(""); // value del input para nuevo comentario
  const [modifyingComment, setModifyingComment] = React.useState(); // id de comentario a modificar
  const [modifyingCommentContent, setModifyingCommentContent] =
    React.useState(""); // value del input para modificar comentario
  const user = useSelector((state) => state.userReducer.user);
  const dispatch = useDispatch();
  const activities = useSelector(
    (store) => store.itinerariesReducer.activities[itinerary._id]
  ); // traigo las activities correspondientes al itinerario actual

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    dispatch(itinerariesActions.getActivitiesByItinerary(itinerary._id));
    // eslint-disable-next-line
  }, [itinerary]);

  const handleNextCarrousel = () => {
    if (activities.length - 1 === currentCarrouselSlide) { // si estoy en el ultimo item del carrousel, ir hacia la derecha lo reinicia
      setCurrentCarrouselSlide(0);
    } else {
      setCurrentCarrouselSlide(currentCarrouselSlide + 1); // sino voy para adelante
    }
  };

  const handleBackCarrousel = () => {
    if (currentCarrouselSlide === 0) { // si estoy en el primer item del carrousel, ir hacia la izquierda me lleva al final
      setCurrentCarrouselSlide(activities.length - 1);
    } else {
      setCurrentCarrouselSlide(currentCarrouselSlide - 1); // sino retrocedo
    }
  };

  const currentCarrouselItem = activities && activities[currentCarrouselSlide]; // item a mostrarse en el carrousel

  const handleSubmitComment = () => {
    if (!!commentContent.trim()) { // si el comment no esta vacio
      dispatch(
        itinerariesActions.comment(
          itinerary._id,
          commentContent,
          itinerary.city._id
        )
      );
      setCommentContent(""); // reinicio el contenido del comentario
    }
  };

  const handleDeleteComment = (id) => {
    dispatch(
      itinerariesActions.deleteComment(itinerary._id, id, itinerary.city._id)
    );
  };

  const handleModify = (id, content) => {
    setModifyingComment(id); // digo que el comentario seleccionado es el que estoy modificando
    setModifyingCommentContent(content); // el value inicial es el contenido del comentario original
  };

  const handleModifyCancel = () => {
    setModifyingComment(undefined);
    setModifyingCommentContent("");
  };

  const handleModifySubmit = () => {
    if (!!modifyingCommentContent.trim()) { // si el comment no esta vacio
      dispatch(
        itinerariesActions.modifyComment(
          itinerary._id,
          modifyingCommentContent,
          modifyingComment,
          itinerary.city._id
        )
      );
      handleModifyCancel();
    }
  };

  const hasLiked = itinerary.likes.includes(user && user.id); // si entre los likes se encuentra el del usuario, para marcar el corazon en rojo

  const handleLikeDislike = () => {
    dispatch(itinerariesActions.likeDislike(itinerary._id, itinerary.city._id));
  };

  return (
    <>
      <div className="centerItinerary" key={itinerary.user}>
        <Card className="cardWidth" sx={{ minWidth: { xs: 0, md: 400 } }}>
          <CardHeader
            avatar={
              <Avatar
                sx={{ width: 70, height: 70 }}
                aria-label="recipe"
                alt="Remy Sharp"
                src={itinerary.authorimage}
              ></Avatar>
            }
            title={itinerary.author}
            subheader=""
          />
          <CardContent className="itinerariesContent">
            <Typography variant="h4" color="text.primary">
              Itinerary:
            </Typography>
            <Typography variant="h5" color="text.secondary">
              {itinerary.user}
            </Typography>
            <Typography variant="h4" color="text.primary">
              Price:
            </Typography>
            <Typography variant="h5" color="text.secondary">
              {itinerary.price}
            </Typography>
            <Typography variant="h4" color="text.primary">
              Hashtags:
            </Typography>
            <Typography variant="h5" color="text.secondary">
              {itinerary.hashtags}
            </Typography>
            <Typography variant="h4" color="text.primary">
              Duration:
            </Typography>
            <Typography variant="h5" color="text.secondary">
              {itinerary.duration}hs
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton
              aria-label="add to favorites"
              onClick={handleLikeDislike}
            >
              <FavoriteIcon
                style={{ color: hasLiked ? "#ff4747" : "#c4c4c4" }}
              />
              <span style={{ marginLeft: "5px" }}>
                {itinerary.likes.length}
              </span>
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
              <Typography paragraph>Activities:</Typography>
              {currentCarrouselItem && (
                <Box
                  style={{
                    backgroundImage: `url(${currentCarrouselItem.pictureActivity})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "1080px",
                    backgroundPosition: "center",
                    height: "600px",
                    width: "100%",
                  }}
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <IconButton
                    className="carrouselChevron"
                    onClick={handleBackCarrousel}
                  >
                    <ChevronLeftIcon />
                  </IconButton>
                  <Box
                    display="inline-block"
                    alignSelf="flex-end"
                    mb={4}
                    style={{
                      backgroundColor: "#ffffff96",
                      width: "50%",
                      textAlign: "center",
                      padding: "15px",
                      fontSize: "25px",
                      fontWeight: "bold",
                    }}
                  >
                    {currentCarrouselItem.activityName}
                  </Box>
                  <IconButton
                    className="carrouselChevron"
                    onClick={handleNextCarrousel}
                  >
                    <ChevronRightIcon />
                  </IconButton>
                </Box>
              )}

              <Typography paragraph key={1}>Comments:</Typography>
              <Box display="flex" flexDirection="column">
                {itinerary.comments.map((comment) => (
                  <Box
                    mb={2}
                    px={2}
                    py={1}
                    style={{ background: "lightpink", borderRadius: "4px" }}
                  >
                    <Box display="flex" alignItems="center">
                      <img
                        src={comment.user.photoUser}
                        alt="aa"
                        width={40}
                        style={{
                          borderRadius: "50%",
                        }}
                      />
                      <span
                        style={{
                          marginLeft: "10px",
                          fontWeight: "bold",
                          fontSize: "17px",
                        }}
                      >
                        {comment.user.nameUser} {comment.user.lastNameUser}
                      </span>
                      {/* si el comentario le pertenece al usuario logeado le ofrezco modificarlo o eliminarlo */}
                      {comment.user._id === (user && user.id) && (
                        <>
                          {modifyingComment !== comment._id && (
                            <span
                              className="link"
                              onClick={() =>
                                handleModify(comment._id, comment.comment)
                              }
                            >
                              Modify
                            </span>
                          )}
                          <span
                            className="link"
                            onClick={() => handleDeleteComment(comment._id)}
                          >
                            Delete
                          </span>
                        </>
                      )}
                    </Box>
                    {/* Si no estoy modificando el comentario muestro el contenido  */}
                    {modifyingComment !== comment._id && (
                      <span style={{ fontSize: "19px" }}>
                        {comment.comment}
                      </span>
                    )}
                    {/* Si lo estoy modificando muestro un input con sus acciones  */}
                    {modifyingComment === comment._id && (
                      <Box display="flex" flexDirection="column">
                        <input
                          type="text"
                          value={modifyingCommentContent}
                          onChange={(e) =>
                            setModifyingCommentContent(e.target.value)
                          }
                        />
                        <Box>
                          <Button onClick={handleModifySubmit}>Modify</Button>
                          <Button onClick={handleModifyCancel}>Cancel</Button>
                        </Box>
                      </Box>
                    )}
                  </Box>
                ))}
                <Typography>Leave a comment:</Typography>
                <input
                  type="text"
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                />
                <Button onClick={handleSubmitComment}>Submit</Button>
              </Box>
            </CardContent>
          </Collapse>
        </Card>
      </div>
    </>
  );
}
