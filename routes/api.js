const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const Skill = require('../models/skill');

// GET all projects
router.get('/projects', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// GET all skills
router.get('/skills', async (req, res) => {
  try {
    const skills = await Skill.find();
    res.json(skills);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch skills' });
  }
});

module.exports = router;
