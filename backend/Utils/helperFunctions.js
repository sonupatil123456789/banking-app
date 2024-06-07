const jwt = require('jsonwebtoken');


// { expiresIn: '1h' }
// note : - secret keys should be stored in envornment variable for assignment purpose i am storing it to variable 
const secretKey = "pihgcvbnm3hdjuiskdocpfmrnbhcvbxnxmc"

const generateAccessToken = async (data) => {
    const token = await jwt.sign(data,secretKey);
    return token ;
}

const authenticateToken = (req, res, next) => {
    try {
        const token = req.headers['auth-token'];

    
    if (!token) {
      return res.status(401).json({success : false , message : "User is not validated"});
    }
    
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.status(403).json({success : false , message : "Token is not valid"});
      }
      req.myToken = token
      next();
    });
    } catch (error) {
        console.log(error)
        return res.sendStatus(403).json({success : false , message : "Something went wrong"});
    }
  };


module.exports= {generateAccessToken , authenticateToken}