// Mounted at '/dinos' (so leave out /dinos in the methods below)
const express = require('express');
const router = express.Router();
const fs = require('fs');

// Index - Get
router.get('/', (req, res) => {
    // TODO get all dinos, pass to page
    let allDinos = fs.readFileSync('./dinosaurs.json');
    let dinoData = JSON.parse(allDinos);
    // console.log(dinoData);
    res.render('dinos/index', { dinos: dinoData } );
});

// New - Get
router.get('/new', (req, res) => {
    // res.send('Shows all dinos');
    res.render('dinos/new');
});
    
// Create - Post
router.post('/', (req, res) => {
    console.log('🦖', req.body);
    // Read Dinos
    let dinos = fs.readFileSync('./dinosaurs.json');
    // JSON parse dinos
    let dinoData = JSON.parse(dinos);
    // Add req.body to the end of dinos
    dinoData.push(req.body);
    // JSON stringify dinos
    let newDinos = JSON.stringify(dinoData);
    // write dinos
    fs.writeFileSync('./dinosaurs.json', newDinos);
    // TODO redirect to show page for new dino
    res.redirect(`/dinos/${dinoData.length-1}`);
})
    
// Show - Get
router.get('/:id', (req, res) => {
    // res.send('SHOWS 1 DINO AT ID', req.params.id);
    let dinos = fs.readFileSync('./dinosaurs.json');
    let dinoData = JSON.parse(dinos);
    let dinoIndex = parseInt(req.params.id);
    let oneDino = dinoData[dinoIndex];
    oneDino.id = dinoIndex;
    res.render('dinos/show', { dino: oneDino });
});

// Edit - Get
router.get('/edit/:id', (req, res) => {
    let dinos = fs.readFileSync('./dinosaurs.json');
    dinos = JSON.parse(dinos);
    let dinoIndex = parseInt(req.params.id);
    let oneDino = dinos[dinoIndex];
    oneDino.id = dinoIndex;
    res.render('dinos/edit', { dino: oneDino });
});

// Update - Put
router.put('/:id', (req, res) => {
    console.log(req.body);
    // read the file
    let dinos = fs.readFileSync('./dinosaurs.json');
    // json parse the dinos
    dinos = JSON.parse(dinos);
    // change the name and type of dino at index
    dinos[parseInt(req.params.id)] = req.body;
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinos));
    res.redirect(`/dinos/${req.params.id}`);
})

// Destroy - Delete
router.delete('/:id', (req, res) => {
    // console.log(`Deleting dino at ${req.params.id}`);
    // read dinos
    let dinos = fs.readFileSync('./dinosaurs.json')
    // json parse dinos
    dinos = JSON.parse(dinos);
    // remove dino from array at index
    let deadDino = dinos.splice(req.params.id, 1);
    // write JSON stringified version of dinos
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinos));
    console.log("press f to pay respects to", deadDino[0].name);
    res.redirect('/dinos');
});


module.exports = router;