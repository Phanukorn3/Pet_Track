const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();
const { users } = require('../data/mockdata');
const SECRET = 'mysecret';
const { pool } = require("../db.js");

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const result = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
        if (result.rows.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const user = result.rows[0];
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id, username: user.username }, SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});


router.post("/signup", async (req, res) => {
    const { username, password, email } = req.body;

    try {
        // เช็คว่า username ซ้ำหรือยัง
        const existing = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
        if (existing.rows.length > 0) {
            return res.status(400).json({ message: "Username already exists" });
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // สร้าง user ใหม่
        const insertQuery = `
            INSERT INTO users (username, email, password)
            VALUES ($1, $2, $3)
            RETURNING id, username
        `;
        const result = await pool.query(insertQuery, [username, email, hashedPassword]);
        const newUser = result.rows[0];

        // สร้าง JWT token
        const token = jwt.sign({ id: newUser.id, username: newUser.username }, SECRET, { expiresIn: "1h" });

        res.status(201).json({ token, message: "User registered successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});



module.exports = router;
