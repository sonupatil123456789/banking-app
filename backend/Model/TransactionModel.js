const mongoose = require("mongoose");

// Define Transaction Schema
const transactionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  type: { type: String, enum: ["deposit", "withdraw"] },
  amount: { type: Number, required: true },
  balance: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

// Create Transaction Model
const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction;
