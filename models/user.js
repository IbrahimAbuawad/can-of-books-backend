
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/books', { useNewUrlParser: true, useUnifiedTopology: true });

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
        email: 'ibrahim@gmail.com', books: [
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
        email: 'enas@gmail.com', books: [
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


const getCatsByOwner = (req, res) => {
    const { email } = req.query;
    console.log(email);
    userModel.find({ email: email }, function (err, ownerData) {
        if (err) res.send('didnt work.');
        console.log(ownerData[0].books)
        res.send(ownerData[0].books);
    });
}

module.exports = getCatsByOwner;