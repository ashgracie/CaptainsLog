require('dotenv').config()
const fs = require('fs')
const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const Log = require('./models/log')
//Create our express app
const app = express()

//Configure the app (app.set)
/*Starts Config */
app.use(express.urlencoded({extended: true}))
app.engine('jsx', require('jsx-view-engine').createEngine())
app.set('view engine', 'jsx') // register the jsx view engine
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
mongoose.connection.once('open', () => {
    console.log('connected to MongoCB Atlas')
})

app.use(methodOverride('_method'))

// home route setup
app.get('/',(req,res)=>{
    res.send("hi")
})

app.get('/logs', (req, res) => {
  Log.find({}, (err, foundLogs) => {
    if(err){
      console.error(err)
      res.status(400).send(err)
    } else {
      res.render('Index', {
        logs: foundLogs
      })
    }
  })
})
//new route/webpage/url setup
app.get('/logs/new',(req,res)=>{
  res.render('New')
})

app.get('/logs/:id', (req, res) => {
  Log.findById(req.params.id, (err, found) => {
    if(err){
     console.error(err)
     res.status(400).send(err)
    } else {
     res.render('Show', {
       log: found
     })
    }
  })
 })

// post route from the 'new' form (create)
app.post('/logs',(req,res)=>{
    req.body.shipIsBroken === 'on' ? req.body.shipIsBroken = true : req.body.shipIsBroken = false
    Log.create(req.body, (err, creation) => {
        if(err){
          console.error(err)
          res.status(400).send(err)
        } else {
          res.redirect(`/logs/${creation._id}`)
          //res.send(creation)
        }
      })
})

//EDIT
app.get('/logs/:id/edit', (req,res) =>{
  Log.findById(req.params.id, (err, foundLog) => {
    if(err){
     console.error(err)
     res.status(400).send(err)
    } else {
     res.render('Edit', {
       log: foundLog
     })
    }
  })
})

// DELETE
app.delete('/logs/:id', (req, res) => {
  Log.findByIdAndDelete(req.params.id, (err, deletedLog) => {
    if(err){
      console.error(err)
      res.status(400).send(err)
    } else {
      res.redirect('/logs')
    }
  })
})

//UPDATE
app.put('/logs/:id', (req, res) => {
  req.body.shipIsBroken === 'on' || req.body.shipIsBroken === true ? req.body.shipIsBroken = true : req.body.shipIsBroken = false
  Log.findByIdAndUpdate(req.params.id, req.body, {new: true},(err, updatedLog) => {
    if(err){
      console.error(err)
      res.status(400).send(err)
    } else {
      res.redirect(`/logs/${updatedLog._id}`)
    }
  })
})
app.listen(3000, () => {
    console.log('Listening on Port 3000')
})
