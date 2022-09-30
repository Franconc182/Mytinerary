const mongoose = require('mongoose')

const activitySchema = new mongoose.Schema ({
    itinerary: {type: mongoose.Types.ObjectId, ref: "itinerary"},
    activityName: {type:String, required:true},
    pictureActivity: {type:String, required:true},
})

const Activity = mongoose.model('activity',activitySchema)//cuando creo un model, se guarda en la tabla activity
module.exports = Activity
