require('dotenv').config();

const connectDB = require('./config/db');
const seedAdmin = require('./utils/seed');
const app = require('./app');

const PORT = process.env.PORT || 3001;

connectDB().then(async () => {
  await seedAdmin();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
