import { useSelector } from 'react-redux';
import { formatTime } from '../utils/convertUnixTime';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import convertIcon from '../utils/convertIcon';
import convertWindDirection from '../utils/convertWindDirection';
import {
	Sunrise,
	Sunset,
	Wind,
	Umbrella,
	Sun,
	Eye,
	Cloud,
	Droplet,
} from 'react-feather';
import { fadeIn, lineFade } from '../styles/animate';

const Current = ({ city }) => {
	const isLoading = useSelector((state) => state.isLoading);
	const { current, daily, address, timezoneOffset } = useSelector(
		(state) => state.weather
	);

	return (
		<>
			{!isLoading && (
				<StyledCurrent>
					<motion.div className='currently__title'>
						<motion.h1>Currently</motion.h1>
						<motion.div
							className='line'
							variants={lineFade}
							initial='hidden'
							animate='visible'
						></motion.div>
					</motion.div>

					<CurrentContainer>
						<motion.div className='city__name'>
							<motion.h1>{city ? city : address}</motion.h1>
						</motion.div>
						<motion.div className='current__main'>
							<motion.div className='large__temp'>
								<motion.h1>
									<motion.span>{current.temp.toFixed(1)}</motion.span> &#176;C
								</motion.h1>
							</motion.div>
							<motion.div className='large__icon'>
								<motion.img
									src={convertIcon(current.weather[0].icon)}
									alt={current.weather[0].main}
								/>
							</motion.div>
							<motion.div className='current__info'>
								<motion.div className='feels__like'>
									<motion.p>Feels like </motion.p>
									<motion.h4>{current.feels_like.toFixed(1)} &#176;C</motion.h4>
								</motion.div>
								<motion.div className='high__low'>
									<motion.p>High: </motion.p>
									<motion.h4>{daily[0].temp.max.toFixed(1)}&#176;C</motion.h4>
									<motion.p>Low: </motion.p>
									<motion.h4>{daily[0].temp.min.toFixed(1)}&#176;C</motion.h4>
								</motion.div>
								<motion.div className='description'>
									<motion.p>Currently: </motion.p>
									<motion.h4>{current.weather[0].description}</motion.h4>
								</motion.div>
							</motion.div>
						</motion.div>
						<motion.div
							className='current__extra'
							variants={fadeIn}
							initial='hidden'
							animate='visible'
						>
							<motion.div className='sunrise'>
								<Sunrise />
								<motion.p>
									{formatTime(current.sunrise, timezoneOffset)}
								</motion.p>
							</motion.div>
							<motion.div className='sunset'>
								<Sunset />
								<motion.p>
									{formatTime(current.sunset, timezoneOffset)}
								</motion.p>
							</motion.div>
							<motion.div className='wind'>
								<motion.div className='wind__main'>
									<Wind />
									<motion.p>
										{Math.round(current.wind_speed * 2.237).toFixed(0)} mph
									</motion.p>
								</motion.div>
								<motion.div className='wind__dir'>
									<motion.p>
										{convertWindDirection(current.wind_deg)} wind
									</motion.p>
								</motion.div>
							</motion.div>
							<motion.div className='uvIndex'>
								<Sun />
								<motion.p>UV Index: {current.uvi}</motion.p>
							</motion.div>

							<motion.div className='cloud'>
								<Cloud />
								<motion.p>{current.clouds}% cloudy</motion.p>
							</motion.div>
							<motion.div className='por'>
								<Umbrella />
								<motion.p>
									{(daily[0].pop * 100).toFixed(0)}% chance of rain
								</motion.p>
							</motion.div>
							<motion.div className='humidity'>
								<Droplet />
								<motion.p>{current.humidity}% humidity</motion.p>
							</motion.div>
							<motion.div className='visibility'>
								<Eye />
								<motion.p>Visibility: {current.visibility} metres</motion.p>
							</motion.div>
						</motion.div>
					</CurrentContainer>
				</StyledCurrent>
			)}
		</>
	);
};

const StyledCurrent = styled(motion.div)`
	margin-bottom: 4rem;

	.currently__title {
		margin-bottom: 2rem;

		.line {
			width: 5rem;
			height: 5px;
			margin-top: 0.5rem;
			background: hsl(191, 81%, 54%);
		}
	}
`;

const CurrentContainer = styled(motion.div)`
	border: 2px solid hsl(191, 81%, 54%);
	border-radius: 1rem;
	padding: 2rem;
	min-height: 10rem;
	max-height: fit-content;
	width: 90%;
	margin: 0 auto;
	box-shadow: 0 20px 40px hsl(0, 0%, 0%, 0.2);

	h4,
	p {
		font-size: 1.2rem;
	}

	.city__name {
		margin-bottom: 2rem;
		text-transform: capitalize;
	}

	.current__main {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(192px, 1fr));
		grid-template-rows: repeat(auto-fit, minmax(128px, 1fr));
		align-items: center;
		margin-bottom: 2rem;

		.large__temp {
			font-size: 32px;
		}

		.large__icon {
			img {
				height: 10rem;
				width: 10rem;
			}
		}

		.current__info {
			display: flex;
			flex-direction: column;
			justify-content: center;

			h4,
			p {
				margin-right: 0.5rem;
			}

			.feels__like,
			.high__low,
			.description {
				margin-bottom: 1rem;
				display: flex;
			}

			.description {
				text-transform: capitalize;
			}
		}
	}

	.current__extra {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(256px, 1fr));
		grid-template-rows: repeat(auto-fit, minmax(64px, 1fr));
		grid-column-gap: 1rem;
		grid-row-gap: 2rem;
		align-items: center;
		justify-content: center;

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
		.visibility {
			display: flex;
		}

		.wind {
			flex-direction: column;
		}

		.wind__main {
			display: flex;
		}
	}
`;

export default Current;
