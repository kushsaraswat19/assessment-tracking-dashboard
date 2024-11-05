// backend/server.js
const express = require('express');
const cors = require('cors');
const pool = require('./db'); // Import the database pool from db.js

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// Routes

// Get all candidates
app.get('/api/candidates', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM candidates');
    res.json(result.rows); // Send the rows as JSON response
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching candidates');
  }
});

// Add a new candidate
app.post('/api/candidates', async (req, res) => {
  const { name, chemistryMarks, biologyMarks, dateOfBirth, assessmentStatus } = req.body;
  try {
    await pool.query(
      'INSERT INTO candidates (name, chemistry_marks, biology_marks, date_of_birth, assessment_status) VALUES ($1, $2, $3, $4, $5)',
      [name, chemistryMarks, biologyMarks, dateOfBirth, assessmentStatus]
    );
    res.status(201).send('Candidate added');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error adding candidate');
  }
});

// Update a candidate's assessment status
app.put('/api/candidates/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    await pool.query('UPDATE candidates SET assessment_status = $1 WHERE id = $2', [status, id]);
    res.status(200).send('Status updated');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating status');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
