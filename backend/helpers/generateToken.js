require('dotenv').config()
const jwt = require('jsonwebtoken')


const generateToken = async (req, res, loginId) => {
    // const email = req.body.email
    try {
        const token = await jwt.sign(loginId, process.env.ACCESS_TOKEN_SECRET);

        //currenly sending from here but later from react
        res.cookie("jwt", token, {
          httpOnly: true,
        });
         console.log("token",token);
        return token
    } catch (error) {
        return  error.message

    }
  
  
};

module.exports = {generateToken}