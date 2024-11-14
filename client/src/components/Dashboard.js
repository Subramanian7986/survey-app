import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // For navigation

const Dashboard = () => {
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const navigate = useNavigate(); // Initialize navigate for redirection

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/questions');
        const randomQuestions = getRandomQuestions(response.data, 5); // Fetch 5 unique random questions
        setSelectedQuestions(randomQuestions);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    if (selectedQuestions.length === 0) {
      fetchQuestions();
    }
  }, [selectedQuestions]);

  const getRandomQuestions = (questionsArray, n) => {
    const shuffled = [...questionsArray].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
  };

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = { questionId: selectedQuestions[index]._id, answer: value }; 
    setAnswers(newAnswers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:5000/api/answer',
        { answers },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Answers submitted successfully!');
      setAnswers([]);
      setSelectedQuestions([]); 
    } catch (error) {
      console.error('Error submitting answers:', error.response?.data || error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the JWT token from localStorage
    navigate('/login'); // Redirect to the login page
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={handleLogout}>Logout</button> {/* Add Logout button */}
      <form onSubmit={handleSubmit}>
        {selectedQuestions.map((question, index) => (
          <div key={index} class="dashboard">
            <p>{question.text}</p>
            <input
              type="text"
              value={answers[index]?.answer || ''} 
              onChange={(e) => handleAnswerChange(index, e.target.value)}
              placeholder="Your answer"
              required
            />
          </div>
        ))}
        <button type="submit">Submit Answers</button>
      </form>
    </div>
  );
};

export default Dashboard;
