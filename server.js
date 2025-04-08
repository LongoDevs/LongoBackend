const express = require('express');
const cors = require('cors'); // 👈 ADD THIS
const dotenv = require('dotenv');
const sequelize = require('./Database/database');
const routes = require('./routes');
const User = require('./Database/models/models');

dotenv.config();

const app = express();

app.use(cors()); // 👈 ENABLE CORS (allow all origins)
// Or more securely:
// app.use(cors({ origin: 'http://localhost:3001' }));

app.use(express.json());
app.use('/api', routes);

const startServer = async () => {
  try {
    await sequelize.authenticate();  // Ensure connection is established
    console.log('✅ Database connected');

    await sequelize.sync();  // Sync models with database
    console.log('✅ Database synced');

    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running on port ${process.env.PORT}`);
    });
  } catch (err) {
    console.error('❌ Database error:', err);
    process.exit(1); // Exit the process with error code
  }
};

startServer();
