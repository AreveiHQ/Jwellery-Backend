const {JWT_SECRET} = require("../config.js")
const jwt = require("jsonwebtoken");

const adminAuth = (req,res,next)=>{
    const head_token = req.headers.authorization;
    
    
    if(!head_token || !head_token.startsWith("Bearer ")){
        return res.status(403).json({
            meassage:"Invalid Token"
        })
    }

    const token=head_token.split(" ")[1];

    try{
        const decode = jwt.verify(token,JWT_SECRET);
        req.adminId=decode.adminId;
        next();
    }
    catch(err){
        return res.status(403).json({
            meassage:"Something went wrong",
            err:err
        })
    }
}

module.exports={
    adminAuth
}