# 📝 Online Survey Application  

A dynamic survey application that presents users with 5 random questions from a database. Users can answer these questions, and admins can view all user responses in a secure dashboard. 🚀  

---

## ✨ Features  

### 🌟 User Features:  
- 📋 **Answer Random Questions**: Get 5 random questions from a collection and submit your answers.  
- 🔑 **Authentication**: Secure login and registration system.  
- 📌 **Dashboard**: Submit responses and view surveys interactively.  

### 🌟 Admin Features:  
- 🛡️ **Admin Dashboard**: View all user responses with detailed question-answer mappings.  
- 🔒 **Secure Access**: Only admins can access the answers dashboard.  

---

## 🛠️ Tech Stack  

### Backend:  
- ⚡ **Express.js**  
- 💾 **MongoDB (Mongoose)**  
- 🔐 **JWT Authentication**  

### Frontend:  
- 🌐 **React.js**  
- 🎨 **CSS** for styling  
- 🌍 **Axios** for API requests  

---

## 🚀 Installation  

### Prerequisites:  
- **Node.js**  
- **MongoDB**  

### Steps:  

1. Clone the repository:  
   ```bash  
   git clone https://github.com/your-repo-url.git  
   ```  

2. Navigate to the project directory:  
   ```bash  
   cd online-survey-application  
   ```  

3. Set up the backend:  
   ```bash  
   cd backend  
   npm install  
   npm start  
   ```  

4. Seed the database (optional if not automated):  
   ```bash  
   node seed.js  
   ```  

5. Set up the frontend:  
   ```bash  
   cd ../client  
   npm install  
   npm start  
   ```  

6. Open [http://localhost:3000](http://localhost:3000) in your browser to use the app.  

---

## 📁 Project Structure  

### Backend:  
- **server.js**: Main server file with routes and database initialization.  
- **models/**: Mongoose schemas for `User`, `Question`, and `Answer`.  
- **routes/**: API endpoints for authentication and survey management.  
- **seed.js**: Script to populate the database with initial questions.  

### Frontend:  
- **App.js**: Routes and main React component.  
- **components/**:  
  - **Login.js**: User login form.  
  - **Register.js**: User registration form.  
  - **Dashboard.js**: User dashboard to answer questions.  
  - **AdminDashboard.js**: Admin dashboard to view responses.  

---

## 📝 License  
This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.  

---

Manage surveys efficiently and gain valuable insights! 🎉  
