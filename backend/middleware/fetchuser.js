var jwt = require(`jsonwebtoken`);
const JWT_SECRET =
  "It is string which  is used as a sign in webtoken using this";

const fetchuser =( req , res , next) =>{

    // we will get the user from the jwt token and add id to req object
    const token = req.header('auth-token');
    if(!token)
    {
        res.status(401).send({error : "plese authenticate using a valid token"})
    }

    try {
        
        const data = jwt.verify(token , JWT_SECRET)
        
        
    req.user = data.user;
  
    
    next();

    } catch (error) {
        res.status(401).send({error : "Internal server error"})
    }
}




module.exports = fetchuser;