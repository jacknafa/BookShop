const express = require('express');
const router = express.Router();

router.use(express.json());

router.post('/:id', (req, res) => {
    res.json('회원가입')
});

router.delete('/:id', (req, res) => {
    res.json('회원가입')
});


module.exports = router