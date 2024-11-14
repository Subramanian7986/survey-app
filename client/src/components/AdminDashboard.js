import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // For navigation

const AdminDashboard = () => {
  const [userAnswers, setUserAnswers] = useState([]);
  const navigate = useNavigate(); // Initialize navigate for redirection

  useEffect(() => {
    const fetchUserAnswers = async () => {
      try {
        const token = localStorage.getItem('token'); // Assuming JWT is stored in localStorage
        const response = await axios.get('http://localhost:5000/api/admin/answers', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUserAnswers(response.data);
      } catch (error) {
        console.error('Error fetching user answers:', error.response?.data || error.message);
      }
    };

    fetchUserAnswers();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    navigate('/login'); // Redirect to the login page
  };

  return (
    <div>
      <h1>Admin Dashboard - User Answers</h1>
      <button onClick={handleLogout}>Logout</button> {/* Logout button */}
      
      {userAnswers.length === 0 ? (
        <p>No answers available.</p>
      ) : (
        userAnswers.map((user, index) => (
          <div key={index}>
            <h2>{user.username} ({user.email})</h2>
            <ul>
              {user.answers.map((answer, idx) => (
                <li key={idx}>
                  <strong>Question:</strong> {answer.question} <br />
                  <strong>Answer:</strong> {answer.answer}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminDashboard;
