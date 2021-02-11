const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please Title is required"],
  },
  listOfTodos: {
    type: String
  }
},
{
  timestamps: true
});

module.exports = mongoose.model("Project", ProjectSchema);
