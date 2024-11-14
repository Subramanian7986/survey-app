const express = require('express');
const Question = require('../models/Question');
const Answer = require('../models/Answer');
const jwt = require('jsonwebtoken');

const router = express.Router();
const jwtSecret = 'your_jwt_secret'; // Use the same hardcoded secret key here

// Fetch all questions
router.get('/questions', async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Submit answers
router.post('/answer', async (req, res) => {
  const { answers } = req.body;
  if (!answers || !Array.isArray(answers)) {
    return res.status(400).json({ message: 'Invalid data format' });
  }
  const token = req.headers.authorization.split(' ')[1]; // Assuming JWT is passed as Bearer token
  try {
    const decoded = jwt.verify(token, jwtSecret); // Use the same secret key as auth.js
    const userId = decoded.userId;

    // Save answers in the Answer model
    const answerDoc = new Answer({
      user: userId,
      answers: answers.map((ans) => ({
        question: ans.questionId,
        answer: ans.answer
      }))
    });
    await answerDoc.save();

    res.json({ message: 'Answers saved successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving answers', error });
  }
});

// Admin route to get all users' answers
router.get('/admin/answers', async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];

  try {
    // Verify token and check if the user is an admin
    const decoded = jwt.verify(token, jwtSecret);
    if (!decoded.isAdmin) {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }

    // Find all answers with the user and question details
    const answers = await Answer.find().populate('user').populate('answers.question').sort({ createdAt: -1 });
    const result = answers.map((answerDoc) => ({
      username: answerDoc.user.username,
      email: answerDoc.user.email,
      answers: answerDoc.answers.map((ans) => ({
        question: ans.question.text,
        answer: ans.answer,
      })),
    }));

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;  