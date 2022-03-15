const mongoose =require ('mongoose');
const Schema = mongoose.Schema;


const BookSchema = new Schema({
  bookName: {
    type: String,
    required: [true, 'Book Name field is required']
},
author: {
    type: String,
    required : [true, 'Author field is required']
},
availablity : {
    type : Boolean,
    default : true
},
borrowedBy : { 
        type: Schema.Types.ObjectId, 
        ref: "user"



}
});

const Books = mongoose.model('book', BookSchema)


module.exports = Books;