import axios from "axios";

const itinerariesActions = {
  getItinerariesByCity: (id) => {
    return async (dispatch, getState) => {
      //async porque espera la respuesta del axios (await axios), trae 2 parametros dispatch, getState
      const res = await axios.get(
        `http://localhost:4000/api/itinerariesbycity/${id}`
      );
      dispatch({ type: "GET_ITINERARIES", payload: res.data.response }); //envia un obj que tiene 2 props, el payload carga la respuesta del axios
    };
  },
  getActivitiesByItinerary: (id) => {
    return async (dispatch, getState) => {
      //async porque espera la respuesta del axios (await axios), trae 2 parametros dispatch, getState
      const res = await axios.get(
        `http://localhost:4000/api/itineraries/${id}/activities`
      );
      const { activities } = res.data.response;
      dispatch({ type: "GET_ACTIVITIES", payload: { [id]: activities } }); //envia un obj que tiene 2 props, el payload carga la respuesta del axios
    };
  },
  comment: (idItinerary, comment, cityId) => {
    return async (dispatch, getState) => {
      const token = localStorage.getItem("token");
      await axios.post(
        `http://localhost:4000/api/itineraries/comments`,
        { itinerary: idItinerary, comments: comment },
        { headers: { Authorization: "Bearer " + token } } //bearer metodo de https request para auntenticar y autorizar usuario
      );
      dispatch(itinerariesActions.getItinerariesByCity(cityId)); // vuelvo a fetchear los itinerarios para que se actualicen los comentarios
    };
  },
  deleteComment: (idItinerary, commentId, cityId) => {
    return async (dispatch, getState) => {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:4000/api/itineraries/${idItinerary}/comments/${commentId}`,
        { headers: { Authorization: "Bearer " + token } } //bearer metodo de https request para auntenticar y autorizar usuario
      );
      dispatch(itinerariesActions.getItinerariesByCity(cityId)); // vuelvo a fetchear los itinerarios para que se actualicen los comentarios
    };
  },
  modifyComment: (idItinerary, comment, commentId, cityId) => {
    return async (dispatch, getState) => {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:4000/api/itineraries/comments`,
        { itinerary: idItinerary, comments: commentId, comment },
        { headers: { Authorization: "Bearer " + token } } //bearer metodo de https request para auntenticar y autorizar usuario
      );
      dispatch(itinerariesActions.getItinerariesByCity(cityId)); // vuelvo a fetchear los itinerarios para que se actualicen los comentarios
    };
  },
  likeDislike: (idItinerary, cityId) => {
    return async (dispatch) => {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:4000/api/itineraries/${idItinerary}/likes`,
        {},
        { headers: { Authorization: "Bearer " + token } } //bearer metodo de https request para auntenticar y autorizar usuario
      );
      dispatch(itinerariesActions.getItinerariesByCity(cityId)); // vuelvo a fetchear los itinerarios para que se actualicen los likes
    };
  },
};

export default itinerariesActions;
