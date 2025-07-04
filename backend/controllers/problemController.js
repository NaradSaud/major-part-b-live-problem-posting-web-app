const Problem = require('../models/Problem');
const path = require('path');

exports.createProblem = async (req, res) => {
  try {
    const { lat, lng, description } = req.body;
    if (!req.file) return res.status(400).json({ message: 'Photo is required' });
    if (!lat || !lng) return res.status(400).json({ message: 'Location is required' });

    const newProblem = new Problem({
      user: req.user._id,
      photoUrl: req.file.filename,
      location: { lat: parseFloat(lat), lng: parseFloat(lng) },
      description
    });
    const savedProblem = await newProblem.save();
    res.status(201).json(savedProblem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProblems = async (req, res) => {
  try {
    // Return all problems, populate user name and email
    const problems = await Problem.find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 });
    res.json(problems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!['Pending', 'Processing', 'Solved'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }
    const problem = await Problem.findById(id);
    if (!problem) return res.status(404).json({ message: 'Problem not found' });

    problem.status = status;
    await problem.save();
    res.json(problem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};