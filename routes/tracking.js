const express = require('express');
const router = express.Router();
const { safeZones, alerts, pets } = require('../data/mockdata');

let waitingClients = [];

router.get('/:petId', (req, res) => {
    const pet = pets.find(p => p.id == req.params.petId);
    if (!pet) return res.status(404).json({ error: 'Pet not found' });
    res.json({ location: { lat: pet.lat, lng: pet.lng } });
});

router.get('/updates/:petId', (req, res) => {
    const petId = req.params.petId;
    const timer = setTimeout(() => res.json({ timeout: true }), 30000);
    waitingClients.push({ petId, res, timer });
});

router.post('/update-location/:petId', (req, res) => {
    const petId = req.params.petId;
    const { lat, lng } = req.body;
    const pet = pets.find(p => p.id == petId);
    if (!pet) return res.status(404).json({ error: 'Pet not found' });

    pet.lat = lat;
    pet.lng = lng;

    // 🔹 ตรวจ safe zone
    const zone = safeZones.find(z => z.petId == petId);
    if (zone) {
        if (lat < zone.latMin || lat > zone.latMax || lng < zone.lngMin || lng > zone.lngMax) {
            // สร้าง alert
            alerts.push({ petId, message: `${pet.name} ออกจาก Safe Zone!`, time: new Date() });
        }
    }

    // 🔹 แจ้ง Long Polling client
    waitingClients.forEach(client => {
        if (client.petId == petId) {
            clearTimeout(client.timer);
            client.res.json({ location: { lat, lng } });
        }
    });
    waitingClients = waitingClients.filter(c => c.petId != petId);

    res.json({ status: 'updated' });
});

module.exports = router;
