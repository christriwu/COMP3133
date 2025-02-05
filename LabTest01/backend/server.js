const express = require('express')
const app = express()
const PORT = 3005;
var socketio = require('socket.io');
const mongoose = require("mongoose");
const userRouter = require('./routes/UserRoutes')

//mongodb atlas connection issue, used local container instead
const connectionString = "mongodb://admin:password@localhost:27017/?authSource=admin"; 

function connectDB(){
    mongoose
    .connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("connected to mongdb"))
    .catch((err) => console.error( err));

}
connectDB()
app.use(userRouter);
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/frontend/index.html')
})

const server = app.listen(PORT, ()=>{
    console.log(`Server running on ${PORT}`);
})

const io = socketio(server)
io.on('connection', (socket) => {
    console.log(`New socket connection: ${socket.id}`)
    
    socket.on('disconnect', (reason) =>{
        console.log(`Client disconnect ${socket.id} : ${reason}`)
    })

    socket.on('message', (data)=>{
        console.log(`Data: ${data}`)
    })
    socket.on('chat_message', (data)=> {
        console.log(JSON.stringigy(data))
        socket.broadcast.emit('chat_message', data)
    })
    socket.on('group_message', (data)=> {
        console.log(JSON.stringify(data))
        io.to(data.group_name).emit('group_message', data)
    })
    socket.on('join_group', (groupName)=> {
        console.log(`${socket.id} joined ${groupName}`)
        socket.join(groupName)
    })
    socket.on('leave_group', (groupName) => {
        console.log(`${socket.id} has left ${groupName}`)
        socket.leave(groupName)
    })

})