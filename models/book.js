// IMPORTS
const mongoose = require('mongoose');


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
    coverImage: {
        type: Buffer,
        required: true
    },
    coverImageType: {
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

    if (this.coverImage != null && this.coverImageType != null) {   
        return `data:${this.coverImageType};charset=UF-8;base64,${this.coverImage.toString('base64')}`;  
    }
});

module.exports = mongoose.model('Book', bookSchema);


