const express = require('express');
const router = express.Router();

router.get('/jobs', (req, res)=>{
    res.send("works");
});

module.exports = router;