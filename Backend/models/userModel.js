import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import "dotenv/config";

const REFRESS_SECRET = process.env.REFRESS_SECRET
const ACCESS_SECRET = process.env.ACCESS_SECRET

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
    },
    picture:{
        type: String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmJKSYHfOBBKY-cdczA98vV6nmveKCHR0RuQ&s"
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    refressToken:{
        type: String
    }
}, {
    timestamps: true
});


userSchema.pre("save", async function () {
     if(!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
    this.refressToken = jwt.sign({email: this.email , userName: this.userName}, REFRESS_SECRET, {expiresIn: "7d"});
})

userSchema.methods.generateAccessToken = function () {
    return jwt.sign({email: this.email , _id: this._id}, ACCESS_SECRET);
}

userSchema.methods.generateRefressToken = function () {
    return jwt.sign({email: this.email , _id: this._id}, REFRESS_SECRET);
}


export default mongoose.model("User", userSchema);