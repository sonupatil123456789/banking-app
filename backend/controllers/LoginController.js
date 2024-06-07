const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");
const { generateAccessToken } = require("../Utils/helperFunctions");
const User = require("../Model/UserModel");

class AuthControllers {
  static async loginController(req, res, next) {
    try {
      const { username, password } = req.body;
     
      const user = await User.findOne({ username });
      if (!user) {
        return res
          .status(200)
          .send({success :false , message: "Invalid username or password" ,errorStatus :'INVALID CREDENTIALS'});
      }

      let passwordmatch = await bcrypt.compare(password, user.password);

      if (!passwordmatch) {
        return res
        .status(200)
        .send({success :false , message: "Invalid username or password"  , errorStatus :'INVALID CREDENTIALS', });
      }
      
      const userId = uuid.v4();
      console.log(userId)
      const accessToken = await generateAccessToken({ uuid: userId });
      user.token = accessToken;
      await user.save();
      
      res.setHeader('auth-token', accessToken);
      return res.status(200).json({
        success: true,
        user: user,
        message: `User login successfully`,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        success: false,
        message: `Some error occured`,
        errorStatus :error,
      });
    }
  }

  static async signeupController(req, res, next) {
    try {
      let { username, email, password } = req.body;

      let user = await User.findOne({ email: email });

      if (user) {
        return res.status(200).json({
          success: false,
          errorStatus :'USER ALREDY EXHISTED',
          message: `User already exhisted with this emailid. try using different id`,
        });
      }

      const userId = uuid.v4();
      console.log(userId)
      const salt = await bcrypt.genSalt(10);
      const hash_password = await bcrypt.hash(password, salt);
      const accessToken = await generateAccessToken({ uuid:userId });

      user = new User({
        userId: userId,
        username,
        email,
        password: hash_password,
        token: accessToken,
      });
      await user.save();
      
      res.setHeader('auth-token', accessToken);
      return res.status(200).json({
        success: true,
        user: user,
        message: `User registered successfully`,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        success: false,
        message: `Some error occured`,
        errorStatus : error,
      });
    }
  }
}

module.exports = AuthControllers;

