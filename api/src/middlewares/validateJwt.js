const {response} = require('express');
const jwt = require('jsonwebtoken')


const validateJwt = (req, res= response, next) => {
 const  token = req.header('x-token');

if(!token) return res.status(401).json({ok:false, msg: 'token is not request'});
 try {
      const payload = jwt.verify(
          token,
          process.env.SECRET_JWT_SEED
      );
      req.id = payload.id;
      req.name = payload.name;

 } catch (error) {
     return res.status(401).json({ ok:false, msg: 'invalid token'});
 }
 next();
}

module.exports = {
    validateJwt
};