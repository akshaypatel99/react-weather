const convertWindDirection = (degrees) => {
	if (degrees >= 0 && degrees <= 22.5) {
		return 'Northerly';
	} else if (degrees > 22.5 && degrees <= 67.5) {
		return 'North Easterly';
	} else if (degrees > 67.5 && degrees <= 112.5) {
		return 'Easterly';
	} else if (degrees > 112.5 && degrees <= 157.5) {
		return 'South Easterly';
	} else if (degrees > 157.5 && degrees <= 202.5) {
		return 'Southerly';
	} else if (degrees > 202.5 && degrees <= 247.5) {
		return 'South Westerly';
	} else if (degrees > 247.5 && degrees <= 292.5) {
		return 'Westerly';
	} else if (degrees > 292.5 && degrees <= 337.5) {
		return 'North Westerly';
	} else if (degrees > 337.5 && degrees < 360) {
		return 'Northerly';
	}
};

export default convertWindDirection;
