const mongoose = require ('mongoose')

const itinerarySchema = new mongoose.Schema({
    user: {type: String, require: true},
    author: {type: String, require: true},
    authorimage: {type: String, require: true},
    description: {type: String, require: true},
    price: {type: String, require: true},
    duration: {type: String, require: true},
    hashtags: {type: String, require: true},
    likes: {type:Array},
    comments: [{
        user:{type: mongoose.Types.ObjectId, ref: "users", required:true},
        comment: {type: String, required:true}
    }],
    city: {type: mongoose.Types.ObjectId, ref: "cities"} //con esta propiedad relaciono el itinerario con la ciudad

})

const Itinerary = mongoose.model("itineraries", itinerarySchema); // crea en la colecc, el schema
module.exports = Itinerary;
