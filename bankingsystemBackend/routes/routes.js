const express = require('express')
const routes = express.Router()

const AuthControllers = require('../controllers/LoginController');
const TransactionControllers = require('../controllers/TransactionController');
const { authenticateToken } = require("../Utils/helperFunctions")


console.log(typeof AuthControllers)

routes.post("/login" ,AuthControllers.loginController)
routes.post("/signeup" ,AuthControllers.signupController)


routes.get("/transaction",authenticateToken ,TransactionControllers.userTransaction);
routes.get("/transactionlist",authenticateToken ,TransactionControllers.userTransaction);
routes.post("/withdraw",authenticateToken ,TransactionControllers.withdrawController);
routes.post("/deposit",authenticateToken ,TransactionControllers.depositController);

module.exports = routes;



