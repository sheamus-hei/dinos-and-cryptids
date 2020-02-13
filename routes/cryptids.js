// Mounted at '/cryptids'
const express = require('express');
const router = express.Router();
const fs = require('fs');

// Index - get
router.get('/', (req, res) => {
    let allCryptids = fs.readFileSync('./cryptids.json');
    allCryptids = JSON.parse(allCryptids);
    res.render('cryptids/index', { cryptids: allCryptids});
});

// New:show form for making new cryptid - get
router.get('/new', (req, res) => {
    res.render('cryptids/new');
});

// Show - get
router.get('/:id', (req, res) => {
    let cryptids = fs.readFileSync('./cryptids.json');
    cryptids = JSON.parse(cryptids);
    let crypIndex = parseInt(req.params.id);
    let oneCryptid = cryptids[crypIndex];
    console.log(oneCryptid);
    oneCryptid.id = crypIndex;
    res.render('cryptids/show', { cryptid: oneCryptid});
});

// Create/add - post
router.post('/', (req, res) => {
    let cryptids = fs.readFileSync('./cryptids.json');
    cryptids = JSON.parse(cryptids);
    cryptids.push(req.body);
    let newCryptids = JSON.stringify(cryptids);
    fs.writeFileSync('./cryptids.json', newCryptids);
    res.redirect(`/cryptids/${cryptids.length-1}`);
});


// show form for editing a cryptid - get
router.get('/edit/:id', (req, res) => {
    let cryptids = fs.readFileSync('./cryptids.json');
    cryptids = JSON.parse(cryptids);
    let crypIndex = parseInt(req.params.id);
    let oneCryptid = cryptids[crypIndex];
    oneCryptid.id = crypIndex;
    res.render('cryptids/edit', { cryptid: oneCryptid });
});

// update -put
router.put('/:id', (req, res) => {
    console.log(req.body);
    let cryptids = fs.readFileSync('./cryptids.json');
    // json parse the cryptids
    cryptids = JSON.parse(cryptids);
    // change the name and type of dino at index
    cryptids[parseInt(req.params.id)] = req.body;
    fs.writeFileSync('./cryptids.json', JSON.stringify(cryptids));
    res.redirect(`/cryptids/${req.params.id}`);
})

// Destroy - Delete
router.delete('/:id', (req, res) => {
    let cryptid = fs.readFileSync('./cryptids.json')
    cryptid = JSON.parse(cryptid);
    let deadCryptid = cryptid.splice(req.params.id, 1);
    fs.writeFileSync('./cryptids.json', JSON.stringify(cryptid));
    console.log("press f to pay respects to", deadCryptid[0].name);
    res.redirect('/cryptids');
});

module.exports = router;