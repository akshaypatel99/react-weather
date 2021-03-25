const initialState = {
	weather: {},
	isLoading: true,
};

const weatherReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'LOADING_WEATHER':
			return {
				...state,
				isLoading: true,
			};
		case 'COORDS_WEATHER':
			return {
				...state,
				weather: action.payload.weather,
				isLoading: false,
			};
		case 'CITY_WEATHER':
			return {
				...state,
				weather: action.payload.weather,
				isLoading: false,
			};
		default:
			return { ...state };
	}
};

export default weatherReducer;
