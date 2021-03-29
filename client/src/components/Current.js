import { useSelector } from 'react-redux';
import { formatTime } from '../utils/convertUnixTime';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import convertIcon from '../utils/convertIcon';
import convertWindDirection from '../utils/convertWindDirection';
import { Sunrise, Sunset, Wind, Umbrella, Sun, Cloud } from 'react-feather';
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
						<motion.div className='current__city'>
							<motion.h1>{city ? city : address}</motion.h1>
						</motion.div>

						<div className='current__main'>
							<motion.div className='current__left'>
								<motion.div className='current__desc'>
									<motion.h2>{current.weather[0].description}</motion.h2>
								</motion.div>

								<motion.div className='current__weather'>
									<motion.h1>
										<motion.span>{current.temp.toFixed(0)}</motion.span>&#176;C
									</motion.h1>
									<motion.img
										src={convertIcon(current.weather[0].icon)}
										alt={current.weather[0].main}
									/>
								</motion.div>

								<div className='current__info'>
									<motion.div className='feels__like'>
										<motion.p>Feels like </motion.p>
										<motion.h4>
											{current.feels_like.toFixed(0)}&#176;C
										</motion.h4>
									</motion.div>

									<motion.div className='high__low'>
										<motion.p>High: </motion.p>
										<motion.h4>{daily[0].temp.max.toFixed(0)}&#176;C</motion.h4>
										<motion.p>Low: </motion.p>
										<motion.h4>{daily[0].temp.min.toFixed(0)}&#176;C</motion.h4>
									</motion.div>
								</div>
							</motion.div>

							<motion.div className='current__right'>
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

									<motion.div className='uvIndex'>
										<Sun />
										<motion.p>UV Index: {current.uvi}</motion.p>
									</motion.div>
									<motion.div className='cloud'>
										<Cloud />
										<motion.p>{current.clouds}% cloudy</motion.p>
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
									<motion.div className='por'>
										<Umbrella />
										<motion.p>
											{(daily[0].pop * 100).toFixed(0)}% chance of rain
										</motion.p>
									</motion.div>
								</motion.div>
							</motion.div>
						</div>
					</CurrentContainer>
				</StyledCurrent>
			)}
		</>
	);
};

const StyledCurrent = styled(motion.div)`
	margin: 2rem 0rem 4rem 0rem;

	.currently__title {
		margin-bottom: 2rem;

		.line {
			width: 5rem;
			height: 5px;
			margin-top: 0.5rem;
			background: hsl(191, 81%, 54%);
		}
	}

	@media (max-width: 768px) {
		.currently__title {
			.line {
				width: 3rem;
			}
		}
	}

	@media (max-width: 500px) {
		margin-bottom: 2rem;
	}
`;

const CurrentContainer = styled(motion.div)`
	border: 2px solid hsl(191, 81%, 54%);
	border-radius: 1rem;
	padding: 2rem;
	min-height: 10rem;
	width: 90%;
	margin: 0 auto;
	box-shadow: 0 20px 40px hsl(0, 0%, 0%, 0.2);

	.current__city {
		margin-bottom: 2rem;
		text-transform: capitalize;
	}

	.current__main {
		display: flex;
		justify-content: space-between;
		margin-top: 2rem;
	}

	h4,
	p {
		font-size: 1.2rem;
	}

	.current__left {
		/* display: grid;
		grid-template-columns: repeat(auto-fit, minmax(192px, 1fr));
		grid-template-rows: repeat(auto-fit, minmax(128px, 1fr));
		align-items: center;
		margin-bottom: 2rem; */
		display: flex;
		flex-direction: column;
		align-items: space-between;
	}

	.current__weather {
		display: flex;
		align-items: center;

		h1 {
			font-size: 6rem;
			font-weight: 600;
			margin-right: 2rem;
		}

		img {
			height: 20rem;
			width: 20rem;
		}
	}

	.current__desc h2 {
		text-transform: capitalize;
		font-weight: 500;
		font-size: 28px;
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
	}

	.current__right {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		flex: 1;
		margin-left: 6rem;
	}

	.current__extra {
		/* display: grid;
		grid-template-columns: repeat(auto-fit, minmax(256px, 1fr));
		grid-template-rows: repeat(auto-fit, minmax(64px, 1fr));
		grid-column-gap: 1rem;
		grid-row-gap: 2rem;
		align-items: center;
		justify-content: center; */
		display: flex;
		flex-wrap: wrap;

		& > * {
			flex: 1 1 192px;
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
		.visibility {
			display: flex;
			height: 72px;
			margin-top: 1rem;
		}

		.wind {
			flex-direction: column;
		}

		.wind__main {
			display: flex;
		}
	}

	@media (max-width: 1400px) {
		width: 100%;

		.current__main {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}

		.current__right {
			margin-left: 0;
			padding: 1rem;
		}

		.current__extra {
			& > * {
				flex: 1 1 160px;
			}
		}
	}

	@media (max-width: 768px) {
		padding: 1rem;

		h1 {
			font-size: 1.5rem;
		}

		h4,
		p {
			font-size: 1rem;
		}

		.current__weather {
			h1 {
				font-size: 4rem;
			}

			img {
				height: 8rem;
				width: 8rem;
			}
		}

		.current__extra {
			& > * {
				flex: 1 1 128px;
			}
		}
	}

	@media (max-width: 500px) {
		h1 {
			font-size: 1.2rem;
		}

		h4,
		p {
			font-size: 0.9rem;
		}

		.current__weather {
			h1 {
				font-size: 3rem;
			}

			img {
				height: 6rem;
				width: 6rem;
			}
		}

		.current__extra {
			& > * {
				flex: 1 1 96px;
			}
		}
	}
`;

export default Current;
