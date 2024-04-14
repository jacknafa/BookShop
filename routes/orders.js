const express = require('express');
const router = express.Router();

router.use(express.json());

router.post('/', (req, res) => {
    res.json('회원가입')
});

router.get('/', (req, res) => {
    res.json('회원가입')
});

router.get('/:id', (req, res) => {
    res.json('회원가입')
});


module.exports = router