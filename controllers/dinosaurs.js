const { EDESTADDRREQ } = require('constants')
const express = require('express')
const router = express.Router()
const fs = require('fs')

// index route
router.get('/', (req, res)=>{
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    res.render('dinosaurs/index.ejs', {
        myDinos: dinoData
    })
})

// get new dino form
router.get('/new', (req, res)=>{
    res.render('dinosaurs/new.ejs')
})

router.get('/edit/:idx', (req, res)=>{
    // get dinosaur data from json file
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)

    // get array index from url parameter
    let dinoIndex = req.params.idx

    res.render('dinosaurs/edit.ejs', {
        myDino: dinoData[dinoIndex], 
        dinoIdx: dinoIndex
    })
})

// show route
router.get('/:idx', (req, res)=>{
    // get dinosaur data from json file
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)

    // get array index from url parameter
    let dinoIndex = req.params.idx

    // render page with data of the specified animal
    res.render('dinosaurs/show.ejs', {myDino: dinoData[dinoIndex]})
})

// post route
router.post('/', (req, res)=>{
    // read the dinosaurs json file
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)

    // add new dino to the array
    dinoData.push(req.body)

    // save new dinosaurs array to the json file (convert back to json first)
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))

    // redirect to the GET /dinosaurs route (index)
    res.redirect('/dinosaurs')
})

router.delete('/:idx', (req, res)=>{
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    dinoData = JSON.parse(dinosaurs)

    // remove the deleted dinosaur from the dinosaurs array
    dinoData.splice(req.params.idx, 1)

    // save the new dinosaurs to the data.json file
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))

    // redirect back to same page so we see the updated list of dinos
    res.redirect('/dinosaurs')
})

router.put('/:idx', (req, res)=>{
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)

    dinoData[req.params.idx].name = req.body.name
    dinoData[req.params.idx].type = req.body.type

    // save the editted dinosaurs to the json file
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))

    res.redirect('/dinosaurs')
})

module.exports = router