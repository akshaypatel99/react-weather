import { useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { formatTime } from '../utils/convertUnixTime';
import convertIcon from '../utils/convertIcon';
import convertWindDirection from '../utils/convertWindDirection';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import {
	Wind,
	Sun,
	Eye,
	Thermometer,
	Umbrella,
	Cloud,
	Droplet,
	LifeBuoy,
	ChevronsLeft,
	ChevronsRight,
	X,
} from 'react-feather';

const HourlyDetail = ({ pathId }) => {
	const isLoading = useSelector((state) => state.isLoading);
	const { hourly, timezoneOffset } = useSelector((state) => state.weather);
	const detail = hourly.filter(
		(hour) => hour.dt.toString() === pathId.toString()
	)[0];
	const index = hourly.findIndex(
		(hour) => hour.dt.toString() === pathId.toString()
	);
	const history = useHistory();

	// Exit Detail
	const exitDetailHandler = (e) => {
		const element = e.target;
		if (element.classList.contains('shadow')) {
			document.body.style.overflow = 'auto';
			history.push('/');
		}
	};

	return (
		<>
			{!isLoading && detail && (
				<CardShadow className='shadow' onClick={exitDetailHandler}>
					<HourDetail>
						<div className='hourlydtl__title'>
							<h1>{formatTime(detail.dt, timezoneOffset)}</h1>
							<div className='line'></div>
						</div>

						<div className='hourlydtl__close'>
							<X onClick={() => history.push('/')} />
						</div>

						<div className='hourlydtl'>
							<div className='hourlydtl__left'>
								<div className='hourlydtl__left__desc'>
									<h3>{detail.weather[0].description}</h3>
								</div>

								<div className='hourlydtl__left__weather'>
									<img
										src={convertIcon(detail.weather[0].icon)}
										alt={detail.weather[0].main}
									/>
									<h1>{detail.temp.toFixed(0)}&#176;C</h1>
								</div>
							</div>
							<div className='hourlydtl__right'>
								<div className='hourlydtl__right__icons'>
									<div className='feels'>
										<Thermometer />
										<p>Feels like: {detail.feels_like.toFixed(0)}&#176;C</p>
									</div>
									<div className='cloud'>
										<Cloud />
										<p>{detail.clouds}% cloudy</p>
									</div>

									<div className='por'>
										<Umbrella />
										<p>{(detail.pop * 100).toFixed(0)}% chance of rain</p>
									</div>

									<div className='uvIndex'>
										<Sun />
										<p>UV Index: {detail.uvi}</p>
									</div>

									<div className='humidity'>
										<Droplet />
										<p>{detail.humidity}% humidity</p>
									</div>

									<div className='pressure'>
										<LifeBuoy />
										<p>Pressure: {detail.pressure} hPa</p>
									</div>

									<div className='visibility'>
										<Eye />
										<p>Visibility: {detail.visibility} metres</p>
									</div>

									<div className='wind'>
										<div className='wind__main'>
											<Wind />
											<p>
												{Math.round(detail.wind_speed * 2.237).toFixed(0)} mph
											</p>
										</div>
										<div className='wind__dir'>
											<p>{convertWindDirection(detail.wind_deg)}</p>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className='hourlydtl__nav__prev'>
							{index > 0 && (
								<Link to={`/hourly/${detail.dt - 3600}`}>
									<ChevronsLeft />
								</Link>
							)}
						</div>
						<div className='hourlydtl__nav__next'>
							{index < 47 && (
								<Link to={`/hourly/${detail.dt + 3600}`}>
									<ChevronsRight />
								</Link>
							)}
						</div>
					</HourDetail>
				</CardShadow>
			)}
		</>
	);
};

const CardShadow = styled(motion.div)`
	width: 100%;
	min-height: 100vh;
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

const HourDetail = styled(motion.div)`
	width: 84%;
	min-height: 60vh;
	margin: 0 auto;
	border-radius: 1rem;
	padding: 2rem 10rem;
	background: white;
	position: absolute;
	top: 4%;
	left: 0;
	right: 0;
	bottom: 4%;
	z-index: 10;
	border: 3px solid hsl(191, 81%, 54%);

	.hourlydtl__title {
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

	.hourlydtl__close {
		position: absolute;
		top: 2rem;
		right: 2rem;
		cursor: pointer;
	}

	.hourlydtl {
		display: flex;
		justify-content: space-between;
		margin-top: 2rem;
	}

	.hourlydtl__left {
		display: flex;
		flex-direction: column;
		flex: 0.4;

		&__desc {
			width: 100%;

			h3 {
				text-transform: capitalize;
				font-weight: 500;
				font-size: 1.5rem;
			}
		}

		&__weather {
			display: flex;
			flex-direction: row;
			justify-content: space-around;
			align-items: center;

			img {
				height: 18rem;
				width: 18rem;
			}

			h1 {
				font-size: 5rem;
				font-weight: 600;
			}
		}
	}

	.hourlydtl__right {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		flex: 1;
		margin-left: 4rem;
	}

	.hourlydtl__right__icons {
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

		.wind,
		.uvIndex,
		.cloud,
		.por,
		.humidity,
		.pressure,
		.visibility,
		.feels {
			display: flex;
			height: 80px;
		}

		.wind {
			flex-direction: column;
		}

		.wind__main {
			display: flex;
		}
	}

	.hourlydtl__nav__prev {
		position: absolute;
		bottom: 1rem;
		left: 1rem;
	}

	.hourlydtl__nav__next {
		position: absolute;
		bottom: 1rem;
		right: 1rem;
	}

	@media (max-width: 1400px) {
		padding: 2rem 4rem;

		.hourlydtl__left {
			&__weather {
				img {
					height: 15rem;
					width: 15rem;
				}
			}
		}

		.hourlydtl__right__icons {
			margin-top: 1rem;
			& > * {
				flex: 1 1 128px;
			}

			.wind,
			.uvIndex,
			.cloud,
			.por,
			.humidity,
			.pressure,
			.visibility,
			.feels {
				height: 80px;
			}
		}
	}

	@media (max-width: 1200px) {
		.hourlydtl {
			flex-direction: column;
			align-items: center;
		}
	}

	@media (max-width: 1024px) {
		padding: 2rem;

		.hourlydtl__left {
			width: 100%;

			&__desc {
				h3 {
					font-size: 1.3rem;
				}
			}

			&__weather {
				width: 60%;
				margin: 0 auto;
				flex-direction: row;
				justify-content: space-around;
				align-items: center;

				img {
					height: 12rem;
					width: 12rem;
				}
			}
		}

		.hourlydtl__right {
			margin-left: 0rem;
		}
	}

	@media (max-width: 768px) {
		.hourlydtl__left {
			min-height: 10rem;

			&__weather {
				width: 100%;

				img {
					height: 8rem;
					width: 8rem;
				}

				h1 {
					font-size: 3.5rem;
				}
			}
		}

		.hourlydtl__right__icons {
			margin-top: 1rem;
			& > * {
				flex: 1 1 104px;
			}

			.wind,
			.uvIndex,
			.cloud,
			.por,
			.humidity,
			.pressure,
			.visibility,
			.feels {
				height: 64px;

				p {
					font-size: 0.9rem;
				}
			}
		}
	}

	@media (max-width: 500px) {
		.hourlydtl__right__icons {
			.wind,
			.uvIndex,
			.cloud,
			.por,
			.humidity,
			.pressure,
			.visibility,
			.feels {
				height: 48px;

				p {
					font-size: 0.8rem;
				}
			}
		}
	}
`;

export default HourlyDetail;
