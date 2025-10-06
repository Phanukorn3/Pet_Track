const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const petRoutes = require('./routes/pets');
const trackingRoutes = require('./routes/tracking');
const safezoneRoutes = require('./routes/safezone');
const alertRoutes = require('./routes/alert');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/pets', petRoutes);
app.use('/track', trackingRoutes);
app.use('/safezone', safezoneRoutes);
app.use('/alert', alertRoutes);

app.listen(3000, () => console.log('Server running on port 3000'));
