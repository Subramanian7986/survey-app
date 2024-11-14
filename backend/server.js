const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const surveyRoutes = require('./routes/survey');
const seedDatabase = require('./seed');
const User = require('./models/User');

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/surveyapp');

const createAdminIfNotExists = async () => {
  const adminEmail = 'admin@gmail.com';
  const adminPassword = 'admin'; // Consider hashing the password
  
  const existingAdmin = await User.findOne({ email: adminEmail });
  if (!existingAdmin) {
    const adminUser = new User({
      username: 'Admin',
      email: adminEmail,
      password: adminPassword, // Hash the password in production
      isAdmin: true
    });
    await adminUser.save();
    console.log('Admin user created.');
  } else {
    console.log('Admin user already exists.');
  }
};

// Create the admin user if it does not exist
createAdminIfNotExists();

app.use('/api', authRoutes);
app.use('/api', surveyRoutes);

app.listen(5000, async () => {
  console.log('Server running on http://localhost:5000');
  
  // Seed the database when the server starts
  await seedDatabase(); 
});
