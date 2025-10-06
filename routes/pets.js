const express = require('express');
const router = express.Router();
const { pets } = require('../data/mockdata');
const verifyToken = require('../utils/verifytoken');

router.get('/', verifyToken, (req, res) => {
    const userPets = pets.filter(p => p.ownerId === req.user.id);
    res.json(userPets);
});

module.exports = router;
