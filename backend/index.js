const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');
dotenv.config();
require('./config/db')();

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/event', require('./routes/eventRoute'));
app.use('/api/budget', require('./routes/budgetRoutes'));
app.use('/api/feedback', require('./routes/feedbackRoutes'));
app.use('/api/payment', require('./routes/paymentRoutes'));

app.use(notFound)
app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});