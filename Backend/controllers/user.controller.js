import userModel from "../models/userModel.js";
import bcrypt from "bcrypt"


export async function register(req, res) {
    try {
        let user = req.body;
        let createdUser = await userModel.create(user);
        return res.json({
            message: "user registered successfully",
            tokens: {
                accessToken: createdUser.generateAccessToken(),
                refressToken: createdUser.refressToken
            }
        })
    } catch (error) {
        return res.json({
            message: "can't register",
            error: error.message
        })
    }
}

export async function login(req, res) {
    try {
        let user = req.body;
        let data = await userModel.findOne({ email: user.email });
        if (data) {
            const isMatch = await bcrypt.compare(user.password, data.password);
            if (isMatch) {
                let accessToken = data.generateAccessToken();
                return res.json({
                    message: "user logged in successfully",
                    tokens: {
                        accessToken: accessToken,
                        refressToken: data.refressToken
                    }
                })
            } else {
                return res.json({
                    message: "wrong password"
                })
            }
        } else {
            return res.json({
                message: "user not found"
            })
        }
    } catch (error) {
        return res.json({
            message: "can't login",
            error
        })
    }
}


export async function userProfile(req,res){
    try {
        let id = req.user._id;
        let data = await userModel.findById(id).select("-password -refressToken -createdAt -updatedAt -email");;
        return res.json(data);
    } catch (error) {
        return res.json({
            message: "can't get user profile",
            error
        })
    }
}



export async function getUserProfile(req,res){
    try {
        let id = req.params.id;
        let data = await userModel.findById(id).select("-password -refressToken -createdAt -updatedAt -email");;
        return res.json(data);
    } catch (error) {
        return res.json({
            message: "can't get user profile",
            error
        })
    }
}