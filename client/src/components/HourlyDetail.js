import { useSelector } from 'react-redux';
import { formatTime } from '../utils/convertUnixTime';
import convertIcon from '../utils/convertIcon';

const HourlyDetail = () => {
	const isLoading = useSelector((state) => state.isLoading);
	const { hourly, timezoneOffset } = useSelector((state) => state.weather);

	return (
		<>
			{!isLoading && (
				<div className='hourly'>
					<h1>Next 48 Hours:</h1>
					{hourly &&
						hourly.map((dp) => (
							<div className='hourlyDP' key={dp.dt}>
								<h2>Hour:</h2>
								<h3>{formatTime(dp.dt, timezoneOffset)}</h3>
								<h3>Weather:</h3>
								<p>
									{dp.weather[0].main}: {dp.weather[0].description}
								</p>
								<img
									src={convertIcon(dp.weather[0].icon)}
									alt={dp.weather[0].main}
								/>
								<h3>Cloudiness:</h3>
								<p>{dp.clouds}%</p>
								<h3>Feels Like:</h3>
								<p>{dp.feels_like.toFixed(1)}&#176;C</p>
								<h3>Humidity:</h3>
								<p>{dp.humidity}%</p>
								<h3>Probability of Rain:</h3>
								<p>{(dp.pop * 100).toFixed(0)}%</p>
								<h3>Pressure:</h3>
								<p>{dp.pressure} hPa</p>
								<h3>Temperature:</h3>
								<p>{dp.temp.toFixed(1)}&#176;C</p>
								<h3>UV Index:</h3>
								<p>{dp.uvi}</p>
								<h3>Visibility:</h3>
								<p>{dp.visibility} metres</p>
								<h3>Wind direction:</h3>
								<p>{dp.wind_deg} metres</p>
								<h3>Wind speed:</h3>
								<p>{Math.round(dp.wind_speed * 2.237).toFixed(0)} mph</p>
							</div>
						))}
				</div>
			)}
		</>
	);
};

export default HourlyDetail;
