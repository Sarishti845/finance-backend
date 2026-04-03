const express = require('express');
const app = express();

require('dotenv').config();
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
connectDB(); 

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API Running');
});

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/protected', require('./routes/protectedRoutes'));
app.use('/api/transactions', require('./routes/transactionRoutes'));
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Server is healthy '
  });
});