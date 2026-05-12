const express = require('express');
const bodyParser = require('body-parser');
const todoRouter = require('./routes/todo.routes');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(bodyParser.json());

app.use('/', todoRouter);

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running on Port 3000.');
});