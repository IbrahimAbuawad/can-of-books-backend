'use strict';


const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');
const getBooksByOwner = require('./models/user');
const app = express();
app.use(cors());
require('dotenv').config();



const PORT = process.env.PORT || 3001;


app.get('/', (request, response) => {

  response.send('booksFunc');

})

app.get('/books', getBooksByOwner)



app.get('/test', (request, response) => {

  // TODO: 
  // STEP 1: get the jwt from the headers
  // STEP 2. use the jsonwebtoken library to verify that it is a valid jwt
  // jsonwebtoken dock - https://www.npmjs.com/package/jsonwebtoken
  // STEP 3: to prove that everything is working correctly, send the opened jwt back to the front-end

})

app.listen(PORT, () => console.log(`listening on ${PORT}`));
