import { useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { formatTime, formatDayDate } from '../utils/convertUnixTime';
import convertIcon from '../utils/convertIcon';
import convertWindDirection from '../utils/convertWindDirection';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import {
	Sunrise,
	Sunset,
	Wind,
	Umbrella,
	Sun,
	Cloud,
	Droplet,
	LifeBuoy,
	ChevronsLeft,
	ChevronsRight,
	X,
} from 'react-feather';

const DailyDetail = ({ pathId }) => {
	const isLoading = useSelector((state) => state.isLoading);
	const { timezoneOffset } = useSelector((state) => state.weather);
	const history = useHistory();

	// Exit Detail
	const exitDetailHandler = (e) => {
		const element = e.target;
		if (element.classList.contains('shadow')) {
			document.body.style.overflow = 'auto';
			history.push('/');
		}
	};

	const day = useSelector(
		(state) =>
			state.weather.daily.filter(
				(day) => day.dt.toString() === pathId.toString()
			)[0]
	);
	const index = useSelector((state) =>
		state.weather.daily.findIndex(
			(day) => day.dt.toString() === pathId.toString()
		)
	);

	return (
		<>
			{!isLoading && (
				<CardShadow className='shadow' onClick={exitDetailHandler}>
					{day && (
						<DayDetail>
							<div className='dailydtl__title'>
								<h1>{formatDayDate(day.dt, timezoneOffset)}</h1>
								<div className='line'></div>
							</div>

							<div className='dailydtl__close'>
								<X onClick={() => history.push('/')} />
							</div>

							<div className='dailydtl'>
								<div className='dailydtl__left'>
									<div className='dailydtl__left__weather'>
										<h3>{day.weather[0].description}</h3>
										<img
											src={convertIcon(day.weather[0].icon)}
											alt={day.weather[0].main}
										/>
									</div>

									<div className='dailydtl__left__temp'>
										<h1>{day.temp.max.toFixed(0)}&#176;C</h1>
										<h2>{day.temp.min.toFixed(0)}&#176;C</h2>
									</div>
								</div>
								<div className='dailydtl__right'>
									<div className='dailydtl__right__icons'>
										<div className='sunrise'>
											<Sunrise />
											<p>{formatTime(day.sunrise, timezoneOffset)}</p>
										</div>
										<div className='sunset'>
											<Sunset />
											<p>{formatTime(day.sunset, timezoneOffset)}</p>
										</div>
										<div className='uvIndex'>
											<Sun />
											<p>UV Index: {day.uvi}</p>
										</div>

										<div className='cloud'>
											<Cloud />
											<p>{day.clouds}% cloudy</p>
										</div>

										<div className='por'>
											<Umbrella />
											<p>{(day.pop * 100).toFixed(0)}% chance of rain</p>
										</div>

										<div className='humidity'>
											<Droplet />
											<p>{day.humidity}% humidity</p>
										</div>

										<div className='pressure'>
											<LifeBuoy />
											<p>Pressure: {day.pressure} hPa</p>
										</div>

										<div className='wind'>
											<div className='wind__main'>
												<Wind />
												<p>
													{Math.round(day.wind_speed * 2.237).toFixed(0)} mph
												</p>
											</div>
											<div className='wind__dir'>
												<p>{convertWindDirection(day.wind_deg)}</p>
											</div>
										</div>

										<div className='temp__feel'>
											<div className='temperatures'>
												<h3>Temperature:</h3>
												<p>Day: {day.temp.day.toFixed(1)}&#176;C</p>
												<p>Eve: {day.temp.eve.toFixed(1)}&#176;C</p>
												<p>Morn: {day.temp.morn.toFixed(1)}&#176;C</p>
												<p>Night: {day.temp.night.toFixed(1)}&#176;C</p>
											</div>
											<div className='feels'>
												<h3>Feels Like:</h3>
												<p>Day: {day.feels_like.day.toFixed(1)}&#176;C</p>
												<p>Eve: {day.feels_like.eve.toFixed(1)}&#176;C</p>
												<p>Morn: {day.feels_like.morn.toFixed(1)}&#176;C</p>
												<p>Night: {day.feels_like.night.toFixed(1)}&#176;C</p>
											</div>
										</div>
									</div>
								</div>
							</div>

							<div className='dailydtl__nav__prev'>
								{index > 0 && (
									<Link to={`/daily/${day.dt - 86400}`}>
										<ChevronsLeft />
									</Link>
								)}
							</div>
							<div className='dailydtl__nav__next'>
								{index < 7 && (
									<Link to={`/daily/${day.dt + 86400}`}>
										<ChevronsRight />
									</Link>
								)}
							</div>
						</DayDetail>
					)}
				</CardShadow>
			)}
		</>
	);
};

const CardShadow = styled(motion.div)`
	width: 100%;
	height: 100%;
	overflow-y: scroll;
	background: rgba(0, 0, 0, 0.4);
	position: fixed;
	top: 0;
	left: 0;
	z-index: 5;

	::-webkit-scrollbar {
		display: none;
	}
`;

const DayDetail = styled(motion.div)`
	width: 80%;
	min-height: 80vh;
	border-radius: 1rem;
	padding: 2rem 10rem;
	background: white;
	position: absolute;
	top: 5%;
	left: 10%;
	z-index: 10;
	border: 3px solid hsl(191, 81%, 54%);

	.dailydtl__title {
		h1 {
			font-weight: 700;
		}

		.line {
			width: 5rem;
			height: 5px;
			margin-top: 0.5rem;
			background: hsl(191, 81%, 54%);
		}
	}

	.dailydtl__close {
		position: absolute;
		top: 2rem;
		right: 2rem;
		cursor: pointer;
	}

	.dailydtl {
		display: flex;
		justify-content: space-between;
		margin-top: 2rem;
	}

	.dailydtl__left {
		display: flex;
		flex-direction: column;
		align-items: space-between;
		flex: 0.4;

		&__weather {
			display: flex;
			flex-direction: column;

			h3 {
				text-transform: capitalize;
				font-weight: 500;
				font-size: 1.75rem;
			}

			img {
				height: 20rem;
				width: 20rem;
			}
		}

		&__temp {
			display: flex;
			flex-direction: column;

			h1 {
				font-size: 4rem;
				font-weight: 600;
			}

			h2 {
				font-size: 3rem;
				font-weight: 400;
			}
		}
	}

	.dailydtl__right {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		flex: 1;
		margin-left: 2rem;
	}

	.dailydtl__right__icons {
		display: flex;
		flex-wrap: wrap;

		& > * {
			flex: 1 1 160px;
			margin: 0.25rem;
		}

		svg,
		p {
			margin-right: 0.75rem;
		}

		.sunrise,
		.sunset,
		.wind,
		.uvIndex,
		.cloud,
		.por,
		.humidity,
		.pressure {
			display: flex;
			height: 80px;
		}

		.wind {
			flex-direction: column;
		}

		.wind__main {
			display: flex;
		}

		.temp__feel {
			display: flex;
			width: 100%;
			justify-content: space-around;
			padding: 0.5rem 0rem;

			.temperatures,
			.feels {
				min-width: 160px;
			}
		}
	}

	.dailydtl__nav__prev {
		position: absolute;
		bottom: 1rem;
		left: 2rem;
	}

	.dailydtl__nav__next {
		position: absolute;
		bottom: 1rem;
		right: 2rem;
	}

	@media (max-width: 1400px) {
		padding: 2rem 4rem;

		.dailydtl__right__icons {
			& > * {
				flex: 1 1 144px;
			}
		}

		.dailydtl__left {
			&__weather {
				img {
					height: 15rem;
					width: 15rem;
				}
			}
		}
	}

	@media (max-width: 1024px) {
		padding: 2rem;

		.dailydtl {
			flex-direction: column;
			align-items: center;
		}

		.dailydtl__left {
			width: 100%;
			flex-direction: row;
			justify-content: space-around;

			&__weather {
				h3 {
					font-size: 1.3rem;
				}

				img {
					height: 10rem;
					width: 10rem;
				}
			}
		}

		.dailydtl__right {
			margin-left: 0rem;
		}

		.dailydtl__right__icons {
			margin-top: 1rem;
			& > * {
				flex: 1 1 128px;
			}

			.sunrise,
			.sunset,
			.wind,
			.uvIndex,
			.cloud,
			.por,
			.humidity,
			.pressure {
				height: 80px;
			}

			.temperatures,
			.feels {
				h3,
				p {
					font-size: 0.9rem;
				}
			}
		}
	}

	@media (max-width: 768px) {
		.dailydtl__left {
			&__weather {
				img {
					height: 8rem;
					width: 8rem;
				}
			}

			&__temp {
				h1 {
					font-size: 3rem;
				}

				h2 {
					font-size: 2rem;
				}
			}
		}

		.dailydtl__right__icons {
			& > * {
				flex: 1 1 104px;
			}

			.sunrise,
			.sunset,
			.wind,
			.uvIndex,
			.cloud,
			.por,
			.humidity,
			.pressure {
				height: 60px;

				p {
					font-size: 0.9rem;
				}
			}
		}
	}
`;

export default DailyDetail;
