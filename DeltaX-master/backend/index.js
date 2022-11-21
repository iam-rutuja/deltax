const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8000;

//application middlewares
app.use(morgan('dev'));
app.use(express.json());
if(process.env.NODE_ENV == 'development'){
    app.use(cors({origin: 'http://localhost:3000'}));
};

/**DataBase Connection */
mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
        console.log('Connection successful');
    })
    .catch((err) => {
        console.log(err);
    })

//middleware routes
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const statusRouter = require('./routes/lead');

app.use('/api', authRouter);
app.use('/api', userRouter);
app.use('/api', statusRouter);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})