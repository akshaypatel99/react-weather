import express from 'express';
import {
	getCoordsWeather,
	getCityWeather,
} from '../controllers/weatherController.js';

const router = express.Router();

// POST /api/weather/coords
router.post('/coords', getCoordsWeather);

// POST /api/weather/city
router.post('/city', getCityWeather);

export default router;
