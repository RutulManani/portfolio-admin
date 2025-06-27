const express = require('express');
const router = express.Router();
const Skill = require('../models/skill');

// List all skills
router.get('/', async (req, res) => {
  const skills = await Skill.find();
  res.render('skills/index', { skills });
});

// New skill form
router.get('/new', (req, res) => {
  res.render('skills/new');
});

// Create skill
router.post('/', async (req, res) => {
  const { name, category } = req.body;
  await Skill.create({ name, category });
  res.redirect('/skills');
});

// Edit skill form
router.get('/:id/edit', async (req, res) => {
  const skill = await Skill.findById(req.params.id);
  res.render('skills/edit', { skill });
});

// Update skill
router.post('/:id', async (req, res) => {
  const { name, category } = req.body;
  await Skill.findByIdAndUpdate(req.params.id, { name, category });
  res.redirect('/skills');
});

// Delete skill
router.post('/:id/delete', async (req, res) => {
  await Skill.findByIdAndDelete(req.params.id);
  res.redirect('/skills');
});

module.exports = router;