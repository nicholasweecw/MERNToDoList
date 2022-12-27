const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId, // Defines this field as the user id
      required: true,
      ref: "User", // Sets the ObjectId as a user id
    },
    text: {
      type: String,
      required: [true, "Please add a text value"],
    },
  },
  {
    timestamps: true,
  }
);

// 1st parameter of .model() is the singular name of the collection name
module.exports = mongoose.model("Task", taskSchema);
