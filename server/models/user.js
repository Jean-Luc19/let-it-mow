const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const UserSchema = mongoose.Schema({
  googleID: {type: Number, required: true},
  //name: {type: String, required: true},
  accessToken: {type: String, required: true},
  listings: [],
  ratings: [{type: Schema.Types.ObjectId, ref: 'Rating'}],
  zipcode: {type: Number, required: false},
  profilePic: {type: String, required: true}
},
{
  timestamps: true
});

const User = mongoose.model('User', UserSchema);


module.exports = User;
