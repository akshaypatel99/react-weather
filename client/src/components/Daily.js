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
												<motion.h2>{Math.round(dp.temp.max)}&#176;C</motion.h2>
												<motion.h3>{Math.round(dp.temp.min)}&#176;C</motion.h3>
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
		margin-bottom: 1rem;

		.line {
			width: 5rem;
			height: 5px;
			margin-top: 0.5rem;
			background: hsl(191, 81%, 54%);
		}
	}

	@media (max-width: 768px) {
		.daily__title {
			.line {
				width: 3rem;
			}
		}
	}

	@media (max-width: 500px) {
		margin-bottom: 2rem;
	}
`;

const DailyContainer = styled(motion.div)`
	display: flex;
	overflow-y: hidden;
	overflow-x: scroll;
	width: 100%;
	margin: 0 auto;
	padding: 2rem;

	@media (max-width: 500px) {
		::-webkit-scrollbar {
			display: none;
		}
	}
`;

const DailySummary = styled(motion.div)`
	border: 1px solid hsl(210, 16%, 76%);
	border-radius: 1rem;
	box-shadow: 0 1px 2px hsl(0, 0%, 0%, 0.15);
	padding: 1.1rem;
	min-width: 278px;
	min-height: 192px;
	margin-right: 1rem;
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
		transform: translateY(20px);
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

	@media (max-width: 768px) {
		min-width: 256px;
		min-height: 176px;
	}

	@media (max-width: 500px) {
		box-shadow: 0 5px 15px hsl(0, 0%, 0%, 0.2);
	}
`;

export default Daily;
