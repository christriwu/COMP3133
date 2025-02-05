const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
    {
        username:{
            type: String,
            uniquie: true,
            required: true,
            minLength: 2,
            maxLength: 12
        },
        firstName:{
            type: String,
            required: true,
            minLength: 2,
            maxLength: 12
        },
        lastname: {
            type: String,
            required: true,
            minLength: 2,
            maxLength: 12
        },
        password:{
            type: String,
            required: true
        },
        createon:{
            type: Date,
            required: true
        }
    }
);

const User = mongoose.model("User", UserSchema);
module.exports =  User;