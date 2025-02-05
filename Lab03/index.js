const express = require('express')
const mongoose = require('mongoose')
const PORT = 3003;
const restaurantRouter = require('./routes/RestaurantRoutes')
const connectionString = 'mongodb+srv://chrisTri:hSjGkLaixUT5HOWI@cluster0.xfp6unm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

const app = express()
app.use(express.json())
mongoose.connect(`${connectionString}`, {
  }).then(success => {
    console.log('Success Mongodb connection')
  }).catch(err => {
    console.log(err)
  });

app.listen(PORT, ()=> {
    console.log(`Server is running on ${PORT}`)
});
