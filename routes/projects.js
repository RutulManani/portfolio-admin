const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// List all projects
router.get('/', async (req, res) => {
  const projects = await Project.find();
  res.render('projects/index', { projects });
});

// New project form
router.get('/new', (req, res) => {
  res.render('projects/new');
});

// Create project
router.post('/', async (req, res) => {
  const { title, description, role, tags, image, techStack } = req.body;
  await Project.create({ 
    title,
    description,
    role,
    tags: tags.split(',').map(t => t.trim()),
    techStack: techStack.split(',').map(t => t.trim()),
    image
  });
  res.redirect('/projects');
});

// Edit form
router.get('/:id/edit', async (req, res) => {
  const project = await Project.findById(req.params.id);
  res.render('projects/edit', { project });
});

// Update project
router.post('/:id', async (req, res) => {
  const { title, description, role, tags, image, techStack } = req.body;
  await Project.findByIdAndUpdate(req.params.id, {
    title,
    description,
    role,
    tags: tags.split(',').map(t => t.trim()),
    techStack: techStack.split(',').map(t => t.trim()),
    image
  });
  res.redirect('/projects');
});

// Delete project
router.post('/:id/delete', async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.redirect('/projects');
});

module.exports = router;