const express = require('express');
const cors = require('cors'); // 👈 ADD THIS
const dotenv = require('dotenv');
const sequelize = require('./Database/database');
const routes = require('./routes');
const User = require('./Database/models/User');

dotenv.config();

const app = express();

app.use(cors()); // 👈 ENABLE CORS (allow all origins)
// Or more securely:
// app.use(cors({ origin: 'http://localhost:3001' }));

app.use(express.json());
app.use('/api', routes);

sequelize.sync().then(async () => {
  console.log('✅ Database synced');

  app.listen(process.env.PORT, () => {
    console.log(`🚀 Server running on port ${process.env.PORT}`);
  });
}).catch(err => console.log('❌ Database error:', err));
