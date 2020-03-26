import mongoose from "mongoose"
import CryptoJS from "crypto-js"

// User Columns
const userSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    username: {
        type: String,
        required: true,
    },
    cnpj: {
        type: String,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now,
    },
    is_admin: {
        type: Boolean,
        default: false,
    },
    updated_at: {
        type: Date,
        required: true,
        default: Date.now,
    },
    remember_hash: {
        type: String,
    },
    role: {
        type: String
    }
})

userSchema.pre('save', function(next){
    this.password = bcrypt.hashSync(this.password, saltRounds)
    next()
})

export default mongoose.model("User", userSchema)
