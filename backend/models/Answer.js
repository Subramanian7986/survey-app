const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  answers: [{ question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' }, answer: String }]
}, { timestamps: true });

module.exports = mongoose.model('Answer', answerSchema);
