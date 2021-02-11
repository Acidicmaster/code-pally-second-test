const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  description: {
    type: String,
  },
  status:{
    type : Boolean,
    default: false
  },
  
},
{
    timestamps: true
}
);

module.exports = mongoose.model("Todo", TodoSchema);
