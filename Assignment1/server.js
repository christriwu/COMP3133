const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 8081
const dotenv = require('dotenv');
dotenv.config();
const bodyParser = require('body-parser');
const cors = require('cors');


//import GraphQL Schema and Resolvers
const TypeDefs = require('./GQL/schemas');
const Resolvers = require('./GQL/resolvers')

//create an instance of ApolloServer
const {ApolloServer} = require('apollo-server-express')
const apolloServer = new ApolloServer({
    typeDefs: TypeDefs.typeDefs,
    resolvers: Resolvers.resolvers
})

app.use(bodyParser.json());
app.use('*', cors());

const connectDB = async() => {
    try{
        console.log(`Attempting to connect to DB`);

        mongoose.connect(process.env.Mongo_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then( () => {
            console.log(`MongoDB connected`)
        }).catch( (err) => {
            console.log(`Error while connecting to MongoDB : ${JSON.stringify(err)}`)
        });
    }catch(error){
        console.log(`Unable to connect to DB : ${error.message}`);
        
    }
}

const startExpressServer = async() => {

    //connect to database
    connectDB()

    await apolloServer.start()
    


    apolloServer.applyMiddleware({app})

    app.listen(PORT, () => {
        console.log(`The server started running at http://localhost:${PORT}`);
        console.log(`Access GraphQL at http://localhost:${PORT}${apolloServer.graphqlPath}`)
        

    })
}

startExpressServer()
