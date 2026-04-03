const mongoose = require('mongoose');
const Transaction = require('../models/Transaction');


exports.createTransaction = async (req, res) => {
  try {
    const { amount, type, category, notes, date } = req.body;

    
    if (!amount || !type || !category) {
      return res.status(400).json({
        message: "Amount, type, and category are required"
      });
    }

    if (amount <= 0) {
      return res.status(400).json({
        message: "Amount must be greater than 0"
      });
    }

    if (!['income', 'expense'].includes(type)) {
      return res.status(400).json({
        message: "Type must be either 'income' or 'expense'"
      });
    }

    const transaction = await Transaction.create({
      amount,
      type,
      category,
      notes,
      date,
      user: req.user.id
    });

    res.status(201).json({
      message: "Transaction created",
      transaction
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getTransactions = async (req, res) => {
  try {
    const { type, category, startDate, endDate } = req.query;

    const filter = { user: req.user.id };

    if (type) filter.type = type;
    if (category) filter.category = category;

    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }

    
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    
    const sortBy = req.query.sortBy || 'date';
    const order = req.query.order === 'asc' ? 1 : -1;

    const total = await Transaction.countDocuments(filter);

    const transactions = await Transaction.find(filter)
      .sort({ [sortBy]: order })
      .skip(skip)
      .limit(limit);

    res.json({
      total,
      page,
      pages: Math.ceil(total / limit),
      data: transactions
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



exports.updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    const transaction = await Transaction.findOne({
      _id: id,
      user: req.user.id
    });

    if (!transaction) {
      return res.status(404).json({
        message: 'Transaction not found'
      });
    }

   
    const { amount, type, category, notes, date } = req.body;

    if (amount !== undefined && amount <= 0) {
      return res.status(400).json({
        message: 'Amount must be greater than 0'
      });
    }

    if (type && !['income', 'expense'].includes(type)) {
      return res.status(400).json({
        message: 'Type must be income or expense'
      });
    }

    transaction.amount = amount ?? transaction.amount;
    transaction.type = type ?? transaction.type;
    transaction.category = category ?? transaction.category;
    transaction.notes = notes ?? transaction.notes;
    transaction.date = date ?? transaction.date;

    await transaction.save();

    res.json({
      message: 'Transaction updated',
      transaction
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



exports.deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    const transaction = await Transaction.findOneAndDelete({
      _id: id,
      user: req.user.id
    });

    if (!transaction) {
      return res.status(404).json({
        message: 'Transaction not found'
      });
    }

    res.json({
      message: 'Transaction deleted successfully'
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



exports.getStats = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id });

    let income = 0;
    let expense = 0;

    const categoryStats = {};

    transactions.forEach(t => {
     
      if (t.type === 'income') income += t.amount;
      else expense += t.amount;

     
      if (!categoryStats[t.type]) {
        categoryStats[t.type] = {};
      }

      if (!categoryStats[t.type][t.category]) {
        categoryStats[t.type][t.category] = 0;
      }

      categoryStats[t.type][t.category] += t.amount;
    });

    res.json({
      totalIncome: income,
      totalExpense: expense,
      balance: income - expense,
      categoryBreakdown: categoryStats
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMonthlyTrends = async (req, res) => {
  try {
    const transactions = await Transaction.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(req.user.id) // ✅ FIXED
        }
      },
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            month: { $month: "$date" }
          },
          income: {
            $sum: {
              $cond: [{ $eq: ["$type", "income"] }, "$amount", 0]
            }
          },
          expense: {
            $sum: {
              $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0]
            }
          }
        }
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1
        }
      }
    ]);

    const formatted = transactions.map(t => ({
      month: `${t._id.year}-${String(t._id.month).padStart(2, '0')}`,
      income: t.income,
      expense: t.expense
    }));

    res.json({ monthlyData: formatted });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};