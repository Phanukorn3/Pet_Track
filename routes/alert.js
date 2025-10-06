const express = require('express');
const router = express.Router();
const { alerts } = require('../data/mockdata');
const verifyToken = require('../utils/verifytoken');

router.get('/', verifyToken, (req, res) => {
    res.json(alerts);
});

module.exports = router;
