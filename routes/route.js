const Router = require("express").Router();
const cityController = require("../controllers/citiesControllers");
const itinerariesControllers = require("../controllers/itinerariesControllers");
const validator = require("../config/validator");
const passport = require("../config/passport");
const activitiesControllers = require("../controllers/activitiescontrollers");
const {
  getCities,
  getOneCity,
  addCity,
  addMultipleCity,
  modifyCity,
  removeCity,
} = cityController;
const {
  getItineraries,
  getOneItinerary,
  addItinerary,
  modifyItinerary,
  removeItinerary,
  multiplesItineraries,
  getItinerariesByCity,
  likeDislike,
  addComment,
  deleteComment,
  modifyComment,
} = itinerariesControllers;
const {
  signIn,
  signUp,
  verifyMail,
  signOut,
  verifyToken,
} = require("../controllers/userControllers");
const {
  getActivities,
  getActivitiesByItinerary,
  uploadActivity,
  deleteAct,
  modifyAct,
  oneActivity,
  findActFromTin,
} = activitiesControllers;

Router.route("/cities").get(getCities).post(addCity);

Router.route("/cities/:id").delete(removeCity).put(modifyCity).get(getOneCity);

Router.route("/addMultipleCity").post(addMultipleCity);

//itineraries
Router.route("/itineraries").get(getItineraries).post(addItinerary);

Router.route("/itineraries/:id/likes").put(
  passport.authenticate("jwt", { session: false }),
  likeDislike
);

Router.route("/itineraries/comments")
  .post(passport.authenticate("jwt", { session: false }), addComment)
  .delete(passport.authenticate("jwt", { session: false }), deleteComment)
  .put(passport.authenticate("jwt", { session: false }), modifyComment);

Router.route("/itineraries/:id")
  .delete(removeItinerary)
  .put(modifyItinerary)
  .get(getOneItinerary);

Router.route("/itineraries/:idItinerary/comments/:idComment")
.delete(passport.authenticate("jwt", { session: false }), deleteComment)

Router.route("/itineraries/:id/activities").get(getActivitiesByItinerary);

Router.route("/multiplesItineraries").post(multiplesItineraries);

Router.route("/itinerariesbycity/:id").get(getItinerariesByCity);

//user
Router.route("/auth/signUp").post(validator, signUp);

Router.route("/auth/signIn").post(signIn);

Router.route("/verify/:string").get(verifyMail);

Router.route("/auth/signOut").post(signOut);

Router.route("/auth/verifyToken").get(
  passport.authenticate("jwt", { session: false }),
  verifyToken
); //una vez que auntentica pasa al verify token

//activities

Router.route("/activities").get(getActivities).post(uploadActivity);

Router.route("/activities/:id")
  .delete(deleteAct)
  .put(modifyAct)
  .get(oneActivity);

Router.route("/activities/tineraries/:id").get(findActFromTin);

module.exports = Router;
