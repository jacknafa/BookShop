//2024-04-11 김준서
const express = require('express');
const router = express.Router();
const {
    allCategory
} = require('../controller/CategoryController');

router.use(express.json());

router.get('/', allCategory);


module.exports = router


