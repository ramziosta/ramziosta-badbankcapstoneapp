const User = require("../model/client.model");
const Transaction = require("../model/transaction.model");

const handleNewTransaction = async (req, res) => {
  const { email, amount, balance, transactionDate, transactionType, accountType } = req.body;
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No content
  const refreshToken = cookies.jwt;
  try {
    const newTransaction = await Transaction.create({
          email: email,
          amount: amount,
          balance: balance,
          transactionDate: transactionDate,
          transactionType: transactionType,
          accountType: accountType,
    });


    res
      .status(201)
      .json({ success: `Your ${newTransaction.transactionType} successful!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllTransactions = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No content
  const refreshToken = cookies.jwt;
  const transactions = await Transaction.find();
  if (!transactions)
    return res.status(204).json({ message: "No transactions found" });
  res.json(transactions);
};

const getUserTransaction = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No content
  const refreshToken = cookies.jwt;
  if (!req?.params?.email)
    return res.status(400).json({ message: "User Email required" });
  const userTransaction = await Transaction.find({
    email: req.params.email,
  }).exec();
  if (!userTransaction) {
    return res
      .status(204)
      .json({ message: `User Email ${req.params.email} not found` });
  }
  res.json(userTransaction);
};

module.exports = {
  handleNewTransaction,
  getAllTransactions,
  getUserTransaction,
};
