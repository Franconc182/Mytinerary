const Activity = require("../models/activity");
const activitiesControllers = {
  getActivities: async (req, res) => {
    let activities;
    let error = null;
    try {
      activities = await Activity.find();
      console.log(activities);
    } catch (err) {
      error = err;
    }
    res.json({
      response: error ? "ERROR" : { activities },
      success: error ? false : true,
      error: error,
    });
  },
  getActivitiesByItinerary: async (req, res) => {
    const id = req.params.id;
    let activities;
    let error = null;
    try {
      activities = await Activity.find({ itinerary: id });
      console.log(activities);
    } catch (err) {
      error = err;
    }
    res.json({
      response: error ? "ERROR" : { activities },
      success: error ? false : true,
      error: error,
    });
  },
  oneActivity: async (req, res) => {
    const id = req.params.id;
    let activities;
    let error = null;
    try {
      activities = await Activity.findOne({ _id: id });
    } catch (err) {
      error = err;
    }
    res.json({
      response: error ? "ERROR" : activities,
      success: error ? false : true,
      error: error,
    });
  },
  uploadActivity: async (req, res) => {
    console.log(req.body);
    const { itinerary, activityName, pictureActivity } = req.body;
    let activities;
    let error = null;
    try {
      activities = await new Activity({
        itinerary: itinerary,
        activityName: activityName,
        pictureActivity: pictureActivity,
      }).save();
    } catch (err) {
      error = err;
    }
    console.log(error);
    res.json({
      response: error ? "ERROR" : activities,
      success: error ? false : true,
      error: error,
    });
  },
  modifyAct: async (req, res) => {
    const id = req.params.id;
    const activities = req.body;
    let activitiesdb;
    let error = null;
    try {
      activitiesdb = await Activity.findOneAndUpdate({ _id: id }, activities, {
        new: true,
      });
    } catch (err) {
      error = err;
    }
    res.json({
      response: error ? "ERROR" : activitiesdb,
      success: error ? false : true,
      error: { error: error },
    });
  },
  deleteAct: async (req, res) => {
    const id = req.params.id;
    let activities;
    let error = null;
    try {
      activities = await Activity.findOneAndDelete({ _id: id });
    } catch (err) {
      error = err;
    }
    res.json({
      response: error ? "ERROR" : activities,
      success: error ? false : true,
      error: error,
    });
  },

  findActFromTin: async (req, res) => {
    const id = req.params.id;
    let activities;
    let error = null;
    try {
      activities = await Activity.find({ itinerary: id }).populate("itinerary");
    } catch (err) {
      error = err;
    }
    res.json({
      response: error ? "ERROR" : activities,
      success: error ? false : true,
      error: error,
    });
  },
};
module.exports = activitiesControllers;
