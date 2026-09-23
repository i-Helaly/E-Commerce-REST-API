const jwt = require("jsonwebtoken");

const JWT = (payload)=>{
    
  const token =  jwt.sign(payload ,process.env.JWT_SECRET_KEY , {expiresIn: "10m"} );
  return token;
}

module.exports= JWT;