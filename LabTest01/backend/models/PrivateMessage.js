const mongoose = ('require')

const PrivateMessageSchema = new mongoose.Schema(
    {
        from_user:{
            type:String,
            required: true,
            unique: true
        },
        to_user:{
            type:String,
            required: true,
            unique: true
        },
        message:{
            type:String,
            minLength:1,
            required: true
        },
        date_sent:{
            type: Date,
            required: true
        }
    }
)

const PrivateMessage = mongoose.Model("PrivateMessage", PrivateMessageSchema);
module.exports =  PrivateMessage;