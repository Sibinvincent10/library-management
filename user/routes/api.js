const express = require('express');
const router = express.Router();
const Books = require('../../models/Books');
const User = require('../../models/User');
const jwt = require('jsonwebtoken')

//get all books
router.get('/books',authenticateToken, function(req, res, next){
    Books.find({}).then(function(books){
        res.send(books);
    }); 
});

//get a particular book
router.get('/book/:id',authenticateToken, function(req, res, next){
    Books.findById(req.params.id).then(function(books){
        res.send(books);
    }); 
});

//borrow a book
router.put('/borrowbook/:id', authenticateToken, async function(req, res, next){
    let book = await Books.findById(req.params.id);
    if(book.availablity){
        let updateBook = await Books.findByIdAndUpdate(req.params.id,{"$set":{"availablity":false, borrowedBy : req.user}},{new:true})
        res.send(updateBook)
    }
    else{
        res.send("Book not available")
    }
})

//return a book
router.put('/returnbook/:id',authenticateToken, async function(req, res, next){
    let book = await Books.findById(req.params.id);
    if(!book.availablity){
        let updateBook = await Books.findByIdAndUpdate(req.params.id,{"$set":{"availablity":true, borrowedBy : req.user}},{new:true})
        res.send(updateBook)
    }
    else{
        res.send("Book available")
    }
})

router.post('/user', async function(req, res, next){
    let user = new User({
        name : req.body.name,
        email : req.body.email,
        password : req.body.password,
        type : "user"
    })
    res.send(await user.save())
});

router.post('/login',async (req, res) =>{
    const user = await User.findOne({email:req.body.email, password:req.body.password})
    if(!user){
        res.send("Invalid Email or Password")
    }
    const token = jwt.sign(user.id,'secretKey');
    res.json({accessToken : token})
})

function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null ){
       return res.sendStatus(401)
    }
    jwt.verify(token, 'secretKey', (err, user) =>{
        if(err){
            console.log(err)
            return res.sendStatus(403)
        }
        req.user = user
        next()
    })
}

router.get('/borrowbooks',authenticateToken, async function(req, res, next){
    res.send(await Books.find({"borrowedBy":req.user}));

})

router.get('/searchbooks',authenticateToken, async function(req, res, next){
    res.send(await Books.find({"bookName": new RegExp(req.body.bookName, 'i')}));
})

module.exports = router;