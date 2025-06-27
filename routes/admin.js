const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const Skill = require('../models/skill');

// Home admin dashboard
router.get('/', async (req, res) => {
  res.redirect('/projects');
});

// Add Project
router.post('/add-project', async (req, res) => {
  const { title, description, role, tags, image } = req.body;
  await Project.create({ title, description, role, tags: tags.split(','), image });
  res.redirect('/');
});

// Delete Project
router.post('/delete-project/:id', async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.redirect('/');
});

// Add Skill
router.post('/add-skill', async (req, res) => {
  const { name, category } = req.body;
  await Skill.create({ name, category });
  res.redirect('/');
});

// Delete Skill
router.post('/delete-skill/:id', async (req, res) => {
  await Skill.findByIdAndDelete(req.params.id);
  res.redirect('/');
});

module.exports = router;
