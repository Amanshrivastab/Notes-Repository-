const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;


//id 6a7a765a805b2752c8a84977