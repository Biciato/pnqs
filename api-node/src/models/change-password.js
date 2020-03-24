import mongoose from 'mongoose'

const changePasswordSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    ip: {
        type: String, 
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model("ChangePassword", changePasswordSchema);