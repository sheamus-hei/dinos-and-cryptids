// Mounted at '/dinos' (so leave out /dinos in the methods below)
const express = require('express');
const router = express.Router();
const fs = require('fs');

// Index - Get
router.get('/', (req, res) => {
    // TODO get all dinos, pass to page
    let allDinos = fs.readFileSync('./dinosaurs.json');
    console.log(allDinos);
    res.render('dinos/index', { dinos: [] } );
});

// New - Get
router.get('/new', (req, res) => {
    // res.send('Shows all dinos');
    res.render('dinos/new');
});
    
// Create - Post
    
// Show - Get
router.get('/:id', (req, res) => {
    // res.send('SHOWS 1 DINO AT ID', req.params.id);
    res.render('dinos/show', { dino: { id: req.params.id} });
});

// Edit - Get
router.get('/edit/:id', (req, res) => {
    res.render('dinos/edit', { dino: { id: req.params.id} });
});

// Update - Put

// Destroy - Delete


module.exports = router;