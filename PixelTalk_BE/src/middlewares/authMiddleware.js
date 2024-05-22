import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
export default async function(req,res,next){
    if(!req.headers["authorization"]) return next(createHttpError.Unauthorized("Authorizied personnel only."));
    const bearerToken=req.headers["authorization"];
    const token=bearerToken.split(" ")[1];
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,payload)=>{
        if(err)
        {
            return next(createHttpError.Unauthorized());
        }
        req.user=payload;
        next();
    });
}
//payload is registered in property called userID - in authController - jwt token is added in userId