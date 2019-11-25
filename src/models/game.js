const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
    'title': String,
    'description': String,
    'gender': String,
    'created_at': Date,
    'updated_at': Date
});

module.exports = mongoose.model('game', GameSchema);
