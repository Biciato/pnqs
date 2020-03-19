import mongoose from "mongoose";
import CryptoJS from "crypto-js";

// User Columns
const userSchema = new mongoose.Schema({
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
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    updatedAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
    rememberHash: {
        type: String,
    },
});

// encrypt password before save
userSchema.pre("save", function(next) {
    const user = this
    user.password = CryptoJS.AES.encrypt(user.password, 'abes_secret').toString()
    next();
});

export default mongoose.model("User", userSchema);
