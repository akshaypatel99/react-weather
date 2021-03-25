import { useSelector } from 'react-redux';
import { formatTime, formatDayDate } from '../utils/convertUnixTime';
import convertIcon from '../utils/convertIcon';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const DailyDetail = () => {
	const isLoading = useSelector((state) => state.isLoading);
	const { daily, timezoneOffset } = useSelector((state) => state.weather);

	// Exit Detail
	const exitDetailHandler = (e) => {
		const element = e.target;
		if (element.classList.contains('shadow')) {
			document.body.style.overflow = 'auto';
			// history.push('/');
		}
	};

	return (
		<>
			{!isLoading && (
				<div className='daily'>
					<CardShadow
						className='shadow'
						onClick={exitDetailHandler}
					></CardShadow>
					{daily &&
						daily.map((dp) => (
							<DailySummary className='dailyDP' key={dp.dt}>
								<h2>Day:</h2>
								<h3>{formatDayDate(dp.dt, timezoneOffset)}</h3>
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
								<p>Day: {dp.feels_like.day.toFixed(1)}&#176;C</p>
								<p>Eve: {dp.feels_like.eve.toFixed(1)}&#176;C</p>
								<p>Morn: {dp.feels_like.morn.toFixed(1)}&#176;C</p>
								<p>Night: {dp.feels_like.night.toFixed(1)}&#176;C</p>
								<h3>Humidity:</h3>
								<p>{dp.humidity}%</p>
								<h3>Probability of Rain:</h3>
								<p>{(dp.pop * 100).toFixed(0)}%</p>
								<h3>Pressure:</h3>
								<p>{dp.pressure} hPa</p>
								<h3>Sunrise:</h3>
								<p>{formatTime(dp.sunrise, timezoneOffset)}</p>
								<h3>Sunset:</h3>
								<p>{formatTime(dp.sunset, timezoneOffset)}</p>
								<h3>Temperature:</h3>
								<p>Day: {dp.temp.day.toFixed(1)}&#176;C</p>
								<p>Eve: {dp.temp.eve.toFixed(1)}&#176;C</p>
								<p>Max: {dp.temp.max.toFixed(1)}&#176;C</p>
								<p>Min: {dp.temp.min.toFixed(1)}&#176;C</p>
								<p>Morn: {dp.temp.morn.toFixed(1)}&#176;C</p>
								<p>Night: {dp.temp.night.toFixed(1)}&#176;C</p>
								<h3>UV Index:</h3>
								<p>{dp.uvi}</p>
								<h3>Visibility:</h3>
								<p>{dp.visibility} metres</p>
								<h3>Wind direction:</h3>
								<p>{dp.wind_deg} metres</p>
								<h3>Wind speed:</h3>
								<p>{Math.round(dp.wind_speed * 2.237).toFixed(0)} mph</p>
							</DailySummary>
						))}
				</div>
			)}
		</>
	);
};

const CardShadow = styled(motion.div)`
	width: 100%;
	min-height: 100vh;
	overflow-y: scroll;
	background: rgba(0, 0, 0, 0.5);
	position: fixed;
	top: 0;
	left: 0;
	z-index: 5;
`;

const DailySummary = styled(motion.div)``;

export default DailyDetail;
