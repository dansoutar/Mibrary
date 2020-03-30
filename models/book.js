// IMPORTS
const mongoose = require('mongoose');
const path = require('path');


// Path to where cover images are stored
const coverImageBasePath = 'uploads/bookCovers';


// MODEL SCHEMA
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    publishDate: {
        type: Date,
        required: true
    },
    pageCount: {
        type: Number,
        required: true
    },
    createdAt: {
        type: String,
        required: true,
        default: Date.now
    },
    coverImageName: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Author'
    }
});


//virtual property add
bookSchema.virtual('coverImagePath').get( function() {

    if (this.coverImageName != null) {
        return path.join('/', coverImageBasePath, this.coverImageName);  
    }
});

module.exports = mongoose.model('Book', bookSchema);
module.exports.coverImageBasePath = coverImageBasePath;

