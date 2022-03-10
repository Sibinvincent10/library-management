const mongoose =require ('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name field is required']
},
email: {
    type: String,
    required : [true, 'Email field is required']
},
password:{
    type: String,
    required : [true, 'Password field is required']
},
type : {
     type : String,
     required : true
}
});


const User = mongoose.model('user', UserSchema)

module.exports = User;