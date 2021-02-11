const mongoose = require("mongoose");

const connectDb =  () => {

const conn =  mongoose.connect(process.env.my_db, {useNewUrlParser: true,useCreateIndex: true, useUnifiedTopology: true,});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected to database');
 
});
}
module.exports = connectDb;