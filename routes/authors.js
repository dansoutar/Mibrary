// IMPORTS
const express = require('express');
const router = express.Router();
const Author = require('../models/author');

// ROUTES
// authors index route
router.get('/',  async (req, res) => {
    let searchOptions = {}
    if (req.query.name != null && req.query.name !== '') {
       searchOptions.name = new RegExp(req.query.name, 'i');

    }
    try {
        const authors = await Author.find(searchOptions);
        res.render('authors/index', { 
            authors: authors,
            searchOptions: req.query
         });
    } catch {
        res.redirect('/');
    }
    
});

// new authors
router.get('/new', (req, res)=>{
    res.render('authors/new', { author: new Author() });
});

// create new author
router.post('/', async (req, res)=>{
    // create a new author
    const author = new Author({
        name: req.body.name
    });
    try { 
        const newAuthor = await author.save();
        //res.redirect(`authors/${newAuthor.id}`);
         res.redirect('authors');  
    } catch {
        res.render('authors/new', {
            author: author,
            errorMessage: 'Error creating Author'
        });
    }
});




module.exports = router;


