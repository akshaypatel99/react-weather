import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { formatDayDate } from '../utils/convertUnixTime';
import convertIcon from '../utils/convertIcon';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Wind, Umbrella } from 'react-feather';
import { container, fadeUp, lineFade } from '../styles/animate';

const Daily = () => {
	const isLoading = useSelector((state) => state.isLoading);
	const { daily, timezoneOffset } = useSelector((state) => state.weather);

	return (
		<>
			{!isLoading && (
				<StyledDaily>
					<motion.div className='daily__title'>
						<motion.h1>Week Ahead</motion.h1>
						<motion.div
							className='line'
							variants={lineFade}
							initial='hidden'
							animate='visible'
						></motion.div>
					</motion.div>

					<DailyContainer
						variants={container}
						initial='hidden'
						animate='visible'
					>
						{daily &&
							daily.map((dp) => (
								<DailySummary key={dp.dt} variants={fadeUp}>
									<Link to={`/daily/${dp.dt}`}>
										<motion.div className='daily__top'>
											<motion.div className='daily__main'>
												<motion.h3>
													{formatDayDate(dp.dt, timezoneOffset)}
												</motion.h3>
												<motion.p>{dp.weather[0].description}</motion.p>
											</motion.div>
											<motion.div className='daily__icon'>
												<motion.img
													src={convertIcon(dp.weather[0].icon)}
													alt={dp.weather[0].main}
												/>
											</motion.div>
										</motion.div>
										<motion.div className='daily__bottom'>
											<motion.div className='daily__small'>
												<motion.div className='daily__wind'>
													<Wind />
													<motion.p>
														{Math.round(dp.wind_speed * 2.237).toFixed(0)} mph
													</motion.p>
												</motion.div>
												<motion.div className='daily__por'>
													<Umbrella />
													<motion.p>{(dp.pop * 100).toFixed(0)}%</motion.p>
												</motion.div>
											</motion.div>
											<motion.div className='daily__temp'>
												<motion.h2>{dp.temp.max.toFixed(1)}&#176;C</motion.h2>
												<motion.h3>{dp.temp.min.toFixed(1)}&#176;C</motion.h3>
											</motion.div>
										</motion.div>
									</Link>
								</DailySummary>
							))}
					</DailyContainer>
				</StyledDaily>
			)}
		</>
	);
};

const StyledDaily = styled(motion.div)`
	margin-bottom: 4rem;

	.daily__title {
		margin-bottom: 2rem;

		.line {
			width: 5rem;
			height: 5px;
			margin-top: 0.5rem;
			background: hsl(191, 81%, 54%);
		}
	}
`;

const DailyContainer = styled(motion.div)`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(272px, 1fr));
	grid-template-rows: repeat(auto-fit, minmax(196px, 1fr));
	grid-gap: 1rem;
	padding: 2rem;
	justify-content: center;
	align-items: center;
`;

const DailySummary = styled(motion.div)`
	border: 1px solid hsl(210, 16%, 76%);
	border-radius: 1rem;
	box-shadow: 0 1px 2px hsl(0, 0%, 0%, 0.15);
	padding: 1.1rem;
	max-width: 288px;
	max-height: 196px;
	margin-top: 1rem;
	display: flex;
	flex-direction: column;
	transition: all 0.2s ease-out;
	cursor: pointer;

	a {
		text-decoration: none;
	}

	:hover {
		border-top: 5px solid hsl(191, 81%, 54%);
		box-shadow: 0 5px 15px hsl(0, 0%, 0%, 0.2);
		transform: translateY(10px);
	}

	.daily__top {
		display: flex;
		justify-content: space-between;
	}

	.daily__bottom {
		display: flex;
		justify-content: space-between;

		svg,
		p {
			margin-right: 0.5rem;
		}
	}

	.daily__main {
		p {
			text-transform: capitalize;
			padding-top: 0.5rem;
		}
	}

	.daily__icon {
		img {
			height: 5rem;
			width: 5rem;
		}
	}

	.daily__small {
		display: flex;
		flex-direction: column;
	}

	.daily__wind {
		display: flex;
		padding-bottom: 1rem;
	}

	.daily__por {
		display: flex;
	}

	.daily__temp {
		h2 {
			padding-bottom: 0.5rem;
		}
	}
`;

export default Daily;
