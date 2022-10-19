const mongoose = require('mongoose')

//Make A Schema
const logSchema = new mongoose.Schema({
    title: { type: String, required: true},
    entry: { type: String, required: true},
    shipIsBroken: {type:Boolean, default:true}
})


// Make A Model From The Schema

const Log = mongoose.model('Log', logSchema)
//Export The Model For Use In The App

module.exports = Log