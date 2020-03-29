
// IMPORTS

const express = require('express');
const router = express.Router();


// ROUTES

// index route
router.get('/', (req, res) => {
    res.render('index');
});



module.exports = router;




