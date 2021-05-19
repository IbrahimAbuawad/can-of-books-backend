
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
    const index = Number(req.params.index)
    const { email } = req.query;
    userModel.find({ email: email }, (error, myData) => {

        const newBooksArr = myData[0].books.filter((book, idx) => {
            return idx !== index;
        });


        myData[0].books = newBooksArr;
        myData[0].save();

    })
}

const updateBookForOwner = (req, res) => {

    const index = Number(req.params.index);

    const { description, name, status, email } = req.body;

    userModel.find({ email: email }, (err, myData) => {

        myData[0].books.splice(index, 1, {
            name: name,
            description: description,
            status: status
        });
        myData[0].save();
        res.send(myData[0].books)
    });
}

module.exports = { getBooksByOwner, postBooksByPerson, deleteBooksByPerson, updateBookForOwner };