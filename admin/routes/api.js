const express = require('express');
const router = express.Router();
const Books = require('../../models/Books');

//get list of all books
router.get('/books', function(req, res, next){
    Books.find({}).then(function(books){
        res.send(books);
    }).catch(next);
    }); 



//add a new books to the db
router.post('/book', function(req, res, next){
    Books.create(req.body).then(function(books){
        res.send(books);
        }).catch(next);
});

//view a particular book
router.get('/book/:id', function(req, res, next){
    try{
        Books.findById(req.params.id).then(function(books){
            res.send(books);
        }); 
    }
    catch(err){
        console.log(err)
    }
    
});

//update a books to the db
router.put('/book/:id', function(req, res, next){
    Books.findByIdAndUpdate({_id: req.params.id},req.body).then(function(){
        Books.findOne({_id: req.params.id}).then(function(books){
            res.send(books)

        });
    });

});
module.exports = router;