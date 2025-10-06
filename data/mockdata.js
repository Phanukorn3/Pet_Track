module.exports = {
    users: [
        { id: 1, username: 'alice', password: '1234' },
        { id: 2, username: 'bob', password: 'abcd' }
    ],
    pets: [
        { id: 1, name: 'Lucky', ownerId: 1, lat: 13.7563, lng: 100.5018 }
    ],
    safeZones: [
        // ตัวอย่าง: petId=1, safe zone เป็นรูปสี่เหลี่ยม (lat/lng min-max)
        { petId: 1, latMin: 13.7500, latMax: 13.7600, lngMin: 100.5000, lngMax: 100.5100 }
    ],
    alerts: [] // เก็บ alert ที่เกิดขึ้น
};
