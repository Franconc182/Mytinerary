import React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { Link as LinkRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import citiesActions from "../redux/actions/citiesActions";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions } from "@mui/material";
import Itinerary from "./Itineraries";
import itinerariesActions from "../redux/actions/itinerariesActions";
import ErrorItinerary from "../components/ErrorItinerary";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export default function Details() {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(citiesActions.getOneCity(id));
    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    dispatch(itinerariesActions.getItinerariesByCity(id));
    // eslint-disable-next-line
  }, [id]);

  const city = useSelector((store) => store.citiesReducer.oneCity);
  const itinerary = useSelector(
    (store) => store.itinerariesReducer.itineraries
  );

  return (
    <>
      <NavBar />
      <div className="detailsCenter">
        <div>
          <Card sx={{ maxWidth: 941 }}>
            <CardActionArea key={city._id}>
              <CardMedia
                component="img"
                height="300"
                image={city.image}
                alt={city.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h4" component="div">
                  {city.name}
                </Typography>
                <Typography variant="h5" color="text.secondary">
                  {city.description}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <LinkRouter
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                to={`/cities`}
              >
                <IconButton
                  sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                  aria-label={`info about ${city.name}`}
                >
                  <Button
                    className="btnBackToCities"
                    component="span"
                    variant="contained"
                  >
                    Back to cities
                  </Button>
                </IconButton>
              </LinkRouter>
            </CardActions>
          </Card>
        </div>
      </div>
      {itinerary.length === 0 ? (
        <ErrorItinerary />
      ) : (
        itinerary.map((itinerary) => (
          <Itinerary itinerary={itinerary} key={itinerary._id} />
        ))
      )}
      <Footer />
    </>
  );
}
