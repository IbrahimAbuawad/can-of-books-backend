'use strict';

const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');
const user = require('./models/user');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
app.use(cors());

mongoose.connect('mongodb://localhost:27017/books', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());


const PORT = process.env.PORT || 3001;

app.get('/', (request, response) => {
    response.send('booksFunc');
})

app.get('/books', user.getBooksByOwner);


app.post('/books', user.postBooksByPerson);


app.delete('/books/:index', user.deleteBooksByPerson);


app.put('/books/:index', user.updateBookForOwner);


app.get('/test', (request, response) => {

    // TODO: 
    // STEP 1: get the jwt from the headers
    // STEP 2. use the jsonwebtoken library to verify that it is a valid jwt
    // jsonwebtoken dock - https://www.npmjs.com/package/jsonwebtoken
    // STEP 3: to prove that everything is working correctly, send the opened jwt back to the front-end

})

app.listen(PORT, () => console.log(`listening on ${PORT}`));
