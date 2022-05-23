const mongoose = require("mongoose");

const Transaction = new mongoose.Schema(
  {
    email:  { type: String, required: true },
    amount: { type: Number, required: true },
    balance: { type: Number, required: true },
    transactionDate: { type: Date, required: true },
    transactionType: { type: String, required: true },
    accountType: { type: String },
  }
);

const model = mongoose.model("TransactionData", Transaction);

module.exports = model;
