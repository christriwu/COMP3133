const mongoose = require("mongoose");


const GroupMessageSchema = new mongoose.Schema({
    _id: {
         type: String,
         required: true 
        },

    from_user: { 
        type: String,
         required: true 
        },
    room: { 
        type: String,
         required: true,
         enum: ['devops','cloud computing','covid19','sports','nodejs']
        },
    message: {
         type: String,
          required: true 
        },
    date_sent: {
         type: String,
          required: true 
        }
});


const GroupMessage = mongoose.model("GroupMessage", GroupMessageSchema);
module.exports = GroupMessage;
