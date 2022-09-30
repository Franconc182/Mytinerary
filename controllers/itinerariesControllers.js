const Itinerary = require("../models/itinerary");
const itinerariesControllers = {
  getItineraries: async (req, res) => {
    let itinerary;
    let error = null;
    try {
      itinerary = await Itinerary.find();
    } catch (err) {
      error = err;
    }
    res.json({
      response: error ? "ERROR" : { itinerary },
      success: error ? false : true,
      error: error,
    });
  },
  getOneItinerary: async (req, res) => {
    const id = req.params.id;
    let itinerary;
    let error = null;
    try {
      itinerary = await itinerary.findOne({ _id: id });
    } catch (err) {
      error = err;
    }
    res.json({
      response: error ? "ERROR" : itinerary,
      success: error ? false : true,
      error: error,
    });
  },
  addItinerary: async (req, res) => {
    const {
      user,
      author,
      authorimage,
      description,
      price,
      duration,
      hashtags,
      likes,
      city,
    } = req.body.data;
    let itinerary;
    let error = null;
    try {
      itinerary = await new Itinerary({
        user: user,
        author: author,
        authorimage: authorimage,
        description: description,
        price: price,
        duration: duration,
        hashtags: hashtags,
        likes: likes,
        city: city,
      }).save();
    } catch (err) {
      error = err;
    }
    res.json({
      response: error ? "ERROR" : itinerary,
      success: error ? false : true,
      error: error,
    });
  },
  multiplesItineraries: async (req, res) => {
    const data = req.body.data;
    let error = null;
    try {
      data.map(async (item) => {
        await new Itinerary({
          user: item.user,
          author: item.author,
          authorimage: item.authorimage,
          description: item.description,
          price: price,
          duration: item.duration,
          hashtags: item.hashtags,
          like: item.like,
          activities: item.activities,
        }).save();
      });
    } catch (err) {
      error = err;
    }

    res.json({
      response: error ? "ERROR" : Itinerary,
      success: error ? false : true,
      error: error,
    });
  },
  modifyItinerary: async (req, res) => {
    const id = req.params.id;
    const itinerary = req.body.data;
    let itinerarydb;
    let error = null;
    try {
      itinerarydb = await Itinerary.findOneAndUpdate({ _id: id }, itinerary, {
        new: true,
      });
    } catch (err) {
      error = err;
    }
    res.json({
      response: error ? "ERROR" : itinerarydb,
      success: error ? false : true,
      error: {
        error: error,
        message:
          "no es posible modificar la ciudad, verifica los datos enviados",
      },
    });
  },
  removeItinerary: async (req, res) => {
    const id = req.params.id;
    let itinerary;
    let error = null;
    try {
      itinerary = await Itinerary.findOneAndDelete({ _id: id });
    } catch (err) {
      error = err;
    }
    res.json({
      response: error ? "ERROR" : itinerary,
      success: error ? false : true,
      error: error,
    });
  },
  getItinerariesByCity: async (req, res) => {
    const id = req.params.id;
    let itinerary;
    let error = null;
    try {
      itinerary = await Itinerary.find({ city: id })
        .populate("city")
        .populate("comments.user");
    } catch (err) {
      error = err;
    }
    res.json({
      response: error ? "ERROR" : itinerary,
      success: error ? false : true,
      error: error,
    });
  },
  likeDislike: async (req, res) => {
    const id = req.params.id; //agarra el id del parametro id de la url
    const user = req.user._id; // agarro el id de user que viene por passport (viene x passport porque le estoy mandando por el token)
    let itinerary; 
    let error = null; //si hay error se guarda aca
    try { //es para controlar los errores que me salgan, si explota va al catch
      itinerary = await Itinerary.findOne({ _id: id }); //busco el id de itinerary por id
      if (itinerary.likes.includes(user)) { //si el usuario ya le dio like
        itinerary = await Itinerary.findOneAndUpdate(//busco por id y lo saco de los like
          { _id: id },
          { $pull: { likes: user } }, //PULL QUITA, SACA. va a buscar en el array de likes el id del usuario para sacarlo esto lo hace like:user
          { new: true }
        ); 
      } else {
        itinerary = await Itinerary.findOneAndUpdate( //lo mismo pero lo agrega en vez de quitar
          { _id: id },
          { $push: { likes: user } },
          { new: true }
        ); //PUSH AGREGA
      }
    } catch (err) {
      error = err;
    }
    res.json({
      response: error ? "ERROR" : itinerary,
      success: error ? false : true,
      error: error,
    });
  },
  addComment: async (req, res) => {
    const { itinerary, comments } = req.body;//agarro los parametros del body del request
    const user = req.user._id;//agarro el id de user que viene por passport (viene x passport porque le estoy mandando por el token)
    let newComment;
    let error = null;
    try {
      newComment = await Itinerary.findOneAndUpdate(
        { _id: itinerary },
        { $push: { comments: { comment: comments, user: user } } }//pusheo al array del comments el objeto {comments:comments, user: user} esto va al array de comments
      );
    } catch (err) {
      error = err;
    }
    res.json({
      response: error ? "ERROR" : newComment,
      success: error ? false : true,
      error: error,
    });
  },
  deleteComment: async (req, res) => {
    const { idItinerary, idComment } = req.params; //params que saco de la url
    const user = req.user._id;
    let itinerarydb;
    let error = null;
    try {
      itinerarydb = await Itinerary.findOne({ _id: idItinerary });
      const canDelete = itinerarydb.comments //puedo borrar cuando el comment peretenece al usuario
        .find((comment) => comment._id == idComment) //busco el comentario a borrar y si es el mismo lo borra
        .user.equals(user); //equals es para ver si dos variables son iguales si user(idmongo) es igual a la de passport lo borra
      if (canDelete) {
        await Itinerary.findOneAndUpdate(
          { _id: idItinerary },
          { $pull: { comments: { _id: idComment } } }//si es igual el id del comment, hace pull y lo borra
        );
      } else {
        error = "error";
      }
    } catch (err) {
      error = err;
    }
    res.json({
      response: error ? "ERROR" : itinerarydb,
      success: error ? false : true,
      error: error,
    });
  },
  modifyComment: async (req, res) => {
    const { itinerary, comments, comment } = req.body;
    const user = req.user._id; //user por passport
    let itinerarydb;
    let error = null;
    try {
      itinerarydb = await Itinerary.findOne({ _id: itinerary });// busco itinerario por id
      const canModify = itinerarydb.comments // si se puede modificar, lo hace
        .find((comment) => comment._id == comments) //busca el id del comentario
        .user.equals(user); //si el que lo comento fue el usuario lo modifica
      if (canModify) {
        await Itinerary.findOneAndUpdate(
          { "comments._id": comments },//busco el itinerario que contiene el comentario 
          { $set: { "comments.$.comment": comment } }//seteo el valor de ese comentario
        );
      } else {
        error = "error";
      }
    } catch (err) {
      error = err;
    }
    res.json({
      response: error ? "ERROR" : itinerarydb,
      success: error ? false : true,
      error: {
        error: error,
        message:
          "no es posible modificar la ciudad, verifica los datos enviados",
      },
    });
  },
};
module.exports = itinerariesControllers;

//
