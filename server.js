'use strict';


const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');
// const { postBooksByPerson, getBooksByOwner } = require('./models/user');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
app.use(cors());

app.use(express.json());//recode the request body
mongoose.connect('mongodb://localhost:27017/books', { useNewUrlParser: true, useUnifiedTopology: true });

const PORT = process.env.PORT || 3001;


const BookSchema = new mongoose.Schema({
    description: String,
    status: String,
    name: String

});

const User = new mongoose.Schema({
    email: String,
    books: [BookSchema]
});


const bookModel = mongoose.model('bookModel', BookSchema);

const userModel = mongoose.model('userModel', User);


const booksFunc = () => {
    const ibrahimObj = new userModel({
        email: 'ibrahimabuawadwork@gmail.com', books: [
            {
                description: 'this book is great, ibrahim',
                status: 'very Good, ibrahim',
                name: ' Book Name 1, ibrahim'
            },
            {
                description: 'this book is great, ibrahim',
                status: 'very Good, ibrahim',
                name: ' Book Name 2, ibrahim'
            },
            {
                description: 'this book is so great walla, ibrahim',
                status: 'very great, ibrahim',
                name: ' Book Name 3, ibrahim'
            }

        ]
    });

    const enasObj = new userModel({
        email: 'enas.z.bataineh307@gmail.com', books: [
            {
                description: 'this book is very good, enas',
                status: 'very Good, enas',
                name: ' Book Name 1, enas'
            },
            {
                description: 'this book is good, enas',
                status: 'very Good, enas',
                name: ' Book Name 2, enas'
            },
            {
                description: 'this book is so great, enas',
                status: 'very great, enas',
                name: ' Book Name 3, enas'
            }
        ]
    });

    ibrahimObj.save();
    enasObj.save();

}

//booksFunc();




const getBooksByOwner = (req, res) => {
    const { email } = req.query;
    //   console.log(email);
    userModel.find({ email: email }, function (err, element) {
        if (err) res.send('fail');
        // console.log(element[0].books)
        res.send(element[0].books);

        // res.send(element[0].books.map(desc => desc.description));
    });
}



const postBooksByPerson = (req, res) => {
    const { name, description, status, email } = req.body;
    // console.log(req.body);
    userModel.find({ email: email }, (error, myData) => {
        myData[0].books.push({


            description: description,
            status: status,
            name: name
        })
        myData[0].save();
        res.send(myData[0].books);
    })
}

const deleteBooksByPerson = (req, res) => {
    const index = Number(req.params.index) //to get the index
    const { email } = req.query; //destructure the value from the obj (get the value from the body)
    userModel.find({ email: email }, (error, myData) => {

        const newBooksArr = myData[0].books.filter((book, idx) => {
            return idx !== index;
        });


        myData[0].books = newBooksArr;
        myData[0].save();

        // res.send(myData[0].books);
    })
}

app.get('/', (request, response) => {
    response.send('booksFunc');
})

app.get('/books', getBooksByOwner);


app.post('/books', postBooksByPerson);


app.delete('/books/:index', deleteBooksByPerson);



app.get('/test', (request, response) => {

    // TODO: 
    // STEP 1: get the jwt from the headers
    // STEP 2. use the jsonwebtoken library to verify that it is a valid jwt
    // jsonwebtoken dock - https://www.npmjs.com/package/jsonwebtoken
    // STEP 3: to prove that everything is working correctly, send the opened jwt back to the front-end

})

app.listen(PORT, () => console.log(`listening on ${PORT}`));
