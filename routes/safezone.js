const express = require('express');
const router = express.Router();
const { safeZones } = require('../data/mockdata');
const verifyToken = require('../utils/verifytoken');

// GET Safe Zone ของ pet
router.get('/:petId', verifyToken, (req, res) => {
    const zone = safeZones.find(z => z.petId == req.params.petId);
    if (!zone) return res.status(404).json({ error: 'Safe zone not found' });
    res.json(zone);
});

// POST ตั้งค่า Safe Zone
router.post('/:petId', verifyToken, (req, res) => {
    const { latMin, latMax, lngMin, lngMax } = req.body;
    let zone = safeZones.find(z => z.petId == req.params.petId);
    if (zone) {
        // update
        zone.latMin = latMin;
        zone.latMax = latMax;
        zone.lngMin = lngMin;
        zone.lngMax = lngMax;
    } else {
        // create
        safeZones.push({
            petId: parseInt(req.params.petId),
            latMin, latMax, lngMin, lngMax
        });
    }
    res.json({ status: 'safe zone set' });
});

module.exports = router;
