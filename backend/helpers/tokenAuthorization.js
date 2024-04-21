require("dotenv").config();
const jwt = require("jsonwebtoken");
const con = require("../config/dbConnection");

const authVerification = async (req, res, next) => {
  try {
    console.log(req.cookies)
    token = req.cookies.jwt ;
    console.log("Token",token);
    // console.log(token);
    const {userId} = req.body;
    console.log(userId);
    if (!token) {
      return res.status(400).json({ error: "No Token" });
    }
    console.log("hii")
    const verified =  jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );
    console.log(verified);
    // console.log("---Hellooo=-==", verified);
    // console.log("--loginId",userid);
    //console.log("Sorry",verified,email)
    if (verified !== userId) {
      return res.status(400).json({ error: "Sorry you are not verified" });
    }
    // const verifiedEmail = emailValidator.validate(loginId)
    const [users] = await con
    .promise()
    .query(`SELECT * FROM users WHERE user_id = ? AND token = ?`, [verified,token]);
    console.log("user from",users[0])
    if (!users[0].length<0) {
      return res.status(400).json({ error: "Token is not assigned with this user Id" });

    }
    // console.log("-----", user.dataValues.token);
    // console.log("-----", token);
    // console.log("email ----",user);
    // if (!user.dataValues.is_verified) {
    //   return errorFunc(res, 400, "Your id is not verified");
    // }
    if (!(users[0].token === token)) {
      return res.status(400).json({ error: "Not verified go and verify first" });
    }

    next();
    console.log("I am gere")
  } catch (error) {
    return res.status(400).json({ error: error });
  }
};

module.exports = { authVerification };
