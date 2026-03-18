import jwt from "jsonwebtoken"
import "dotenv/config";

const ACCESS_SECRET = process.env.ACCESS_SECRET

function authMiddleware(req,res,next){
    try {
        let token = req.headers.authorization;

        if(!token){
            return res.status(401).json({
                message: "token not found"
            });
        }

        token = token.split(" ")[1];

        let decoded = jwt.verify(token, ACCESS_SECRET);
        req.user = decoded;

        next();
    } catch (error) {
        return res.json({
            message: "Invalid Token..."
        })
    }

}

export default authMiddleware