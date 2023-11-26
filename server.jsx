const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/studentdb', { useNewUrlParser: true, useUnifiedTopology: true });

// Define a Mongoose schema
const studentSchema = new mongoose.Schema({
    // Define your schema fields here
    firstName: String,
    lastName: String,
    gender: String,
    dateOfBirth: Date,
    nationality: String,
    address: String,
    email: String,
    phone: String,
    admissionDate: String,
    courses: String
});

const Student = mongoose.model('Student', studentSchema);

// API routes
app.get('/api/students', async (req, res) => {
    const students = await Student.find();
    res.json(students);
});

app.post('/api/students', async (req, res) => {
    const newStudent = new Student(req.body);
    await newStudent.save();
    res.json(newStudent);
});

app.delete('/api/students/:id', async (req, res) => {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: 'Student deleted' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
