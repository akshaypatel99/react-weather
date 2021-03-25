import asyncHandler from 'express-async-handler';
import axios from 'axios';

export const getCoordsWeather = asyncHandler(async (req, res) => {
	const { lat, lon } = req.body;
	let weather = {};
	const response = await axios.get(
		`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.REACT_OPENWEATHER_APP_ID}`
	);

	const address = await fetchAddress(lat, lon);

	weather = {
		timezone: response.data.timezone.split('/'),
		timezoneOffset: response.data.timezone_offset,
		address: address,
		// current = Object
		current: response.data.current,
		// daily && hourly && minutely = Array
		daily: response.data.daily,
		hourly: response.data.hourly,
		minutely: response.data.minutely,
	};

	console.log(weather);

	res.status(200).json(weather);
});

const fetchAddress = async (lat, lon) => {
	let address = '';

	const response = await axios.get(
		`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${process.env.REACT_OPENCAGE_KEY}`
	);

	address = response.data.results[0].formatted;
	if (address.length > 3) {
		const formattedAddress = address.split(', ').slice(-3).join(', ');
		return formattedAddress;
	} else {
		return address;
	}
};

export const getCityWeather = asyncHandler(async (req, res) => {
	const { city } = req.body;

	let weather = {};
	const encodedCity = encodeURI(city);
	const { lat, lon } = await fetchLatlong(encodedCity);
	const response = await axios.get(
		`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.REACT_OPENWEATHER_APP_ID}`
	);

	weather = {
		timezone: response.data.timezone.split('/'),
		timezoneOffset: response.data.timezone_offset,
		// current = Object
		current: response.data.current,
		// daily && hourly && minutely = Array
		daily: response.data.daily,
		hourly: response.data.hourly,
		minutely: response.data.minutely,
	};

	console.log(weather);

	res.status(200).json(weather);
});

const fetchLatlong = async (city) => {
	let lat = '';
	let lng = '';

	const response = await axios.get(
		`https://api.opencagedata.com/geocode/v1/json?q=${city}&limit=1&key=${process.env.REACT_OPENCAGE_KEY}`
	);

	lat = response.data.results[0].geometry.lat;
	lng = response.data.results[0].geometry.lng;

	console.log(lat, lng);

	return {
		lat: lat.toString(),
		lon: lng.toString(),
	};
};
