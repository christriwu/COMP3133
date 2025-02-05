const express = require('express')
const restaurantModel = require('../models/Restaurant')
const app = express()

//Read all
app.get('/restaurants', async (req,res) => {
    const restaurants = await restaurantModel.find({});

    try{
        console.log(restaurants);
        res.status(200).send(restaurants)
    }
    catch(error){
        res.status(500).send(error);
    }
});
module.exports = app