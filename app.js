const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
const errorMiddleware = require('./middlewares/errorMiddleware');

require('dotenv').config();

app.use(express.json());
app.use('/auth', authRoutes);
//app.use(errorMiddleware);

module.exports = app;