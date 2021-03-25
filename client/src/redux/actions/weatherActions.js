import axios from 'axios';

const config = {
	headers: {
		'Content-Type': 'application/json',
	},
};

export const getCoordsWeather = (lat, lon) => async (dispatch) => {
	dispatch({
		type: 'LOADING_WEATHER',
	});

	const response = await axios.post(
		'/api/weather/coords',
		{ lat, lon },
		config
	);

	dispatch({
		type: 'COORDS_WEATHER',
		payload: {
			weather: response.data,
		},
	});
};

export const getCityWeather = (city) => async (dispatch) => {
	dispatch({
		type: 'LOADING_WEATHER',
	});

	const response = await axios.post('/api/weather/city', { city }, config);

	dispatch({
		type: 'CITY_WEATHER',
		payload: {
			weather: response.data,
		},
	});
};
