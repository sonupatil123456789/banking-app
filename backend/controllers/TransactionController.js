const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");
const User = require("../Model/UserModel");
const Transaction = require("../Model/TransactionModel");

class TransactionControllers {
  static async userTransaction(req, res, next) {
    try {
      const user = await User.findOne({ token: req.myToken })
        .select("-password")
        .select("-token")
        .exec();

      const transactionList = await Transaction.find({user: user._id });
      if (!user) {
        return res
          .status(401)
          .send({ success: false, message: "Invalid access token" , errorStatus :'USER NOT AYTHANTICATED' });
      }
      return res.status(200).json({
        success: true,
        user: user,
        balance: user.balance,
        transaction: user.transaction,
        transactionList :transactionList,
        message: `User login successfully`,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        success: false,
        message: `Some error occured`,
        errorStatus: error,
      });
    }
  }


  static async withdrawController(req, res, next) {
    try {
      const userEnteredamount = parseInt(req.body.amount) ;
      const user = await User.findOne({token: req.myToken });
      console.log(userEnteredamount)
      console.log(user.balance)
      if (userEnteredamount <= user.balance) {
        var withDrawAmount = user.balance - userEnteredamount;
        user.balance = withDrawAmount;

        const transaction = new Transaction({
          user: user._id,
          type: "withdraw",
          amount: userEnteredamount,
          balance: withDrawAmount,
        });

        await transaction.save();
        await user.save();

        return res.status(200).json({
          success: true,
          message: `Withdrawed amount`,
          transaction: transaction,
        });
      }

      return res.status(200).json({
        success: false,
        message: `You dont have enough balance in your account`,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        success: false,
        message: `Some error occured`,
        errorStatus: error,
      });
    }
  }
  static async depositController(req, res, next) {
    try {
      const userEnteredamount = parseInt(req.body.amount) ;
      const user = await User.findOne({token: req.myToken });
      console.log(userEnteredamount)
      console.log(user.balance)
      if (userEnteredamount <= 10000) {
        var depositedAmount = user.balance + userEnteredamount;
        user.balance = depositedAmount;

        const transaction = new Transaction({
          user: user._id,
          type: "deposit",
          amount: userEnteredamount,
          balance: depositedAmount,
        });

        await transaction.save();
        await user.save();

        return res.status(200).json({
          success: true,
          message: `Deposited amount`,
          transaction: transaction,
        });
      }

      return res.status(200).json({
        success: false,
        message: `You cannot deposit more than 10000 in your account account`,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        success: false,
        message: `Some error occured`,
        errorStatus: error,
      });
    }
  }
}

// const token = authHeader && authHeader.split(' ')[1];

module.exports = TransactionControllers;
