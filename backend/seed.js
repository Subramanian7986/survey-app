const Question = require('./models/Question');

const seedDatabase = async () => {
  const questions = [
    { text: 'What is your favorite color?' },
    { text: 'What is your favorite food?' },
    { text: 'What is your favorite hobby?' },
    { text: 'What is your favorite movie?' },
    { text: 'What is your favorite book?' },
    { text: 'What is your dream job?' },
    { text: 'What is your favorite travel destination?' }
  ];

  try {
    // Loop through each question and check if it already exists
    for (const question of questions) {
      const existingQuestion = await Question.findOne({ text: question.text });

      // If the question does not exist, insert it
      if (!existingQuestion) {
        await Question.create(question);
        console.log(`Inserted new question: ${question.text}`);
      } else {
        console.log(`Question already exists: ${question.text}`);
      }
    }

    console.log('Database seeding completed');
  } catch (error) {
    console.error('Error seeding database:', error.message);
  }
};

module.exports = seedDatabase;
