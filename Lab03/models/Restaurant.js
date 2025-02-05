const mongoose = require('mongoose')

const RestaurantSchema = new mongoose.Schema({
    address: {
        street:{
            type: String
        },
        zipcode:{
            type: String
        }
    },
    city: {
        type: String
    },
    cuisine:{
        type: String
    },
    name: {
        type: String
    },
    restaurant_id: {
        type:Number
    }
    
})

const Restaurant = mongoose.model("Restaurant", RestaurantSchema);
module.exports = Restaurant;