import { useSelector } from 'react-redux';
import { rainfall, rainfallKey } from '../utils/rainfall';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { formatTime } from '../utils/convertUnixTime';
import { lineFade } from '../styles/animate';

const Hourly = () => {
	const isLoading = useSelector((state) => state.isLoading);
	const { minutely, timezoneOffset } = useSelector((state) => state.weather);

	return (
		<>
			{!isLoading && (
				<StyledMinutely>
					<div className='minutely__title'>
						<h1>Rainfall Next Hour</h1>
						<motion.div
							className='line'
							variants={lineFade}
							initial='hidden'
							animate='visible'
						></motion.div>
					</div>

					<MinutelyContainer>
						<TopScale>
							<div className='increments'>
								<h3>Now</h3>
							</div>
							<div className='increments'>
								<h3>15</h3>
							</div>
							<div className='increments'>
								<h3>30</h3>
							</div>
							<div className='increments'>
								<h3>45</h3>
							</div>
							<div className='increments'>
								<h3>60</h3>
							</div>
						</TopScale>
						<Chart>
							{minutely &&
								minutely.map((dp, index) => {
									if (dp.precipitation > 0) {
										return (
											<MinutelyDataPoint
												key={dp.dt}
												style={{
													background: `${rainfall(dp.precipitation)}`,
													borderTop: '1px solid hsl(208, 12%, 58%)',
													borderBottom: '1px solid hsl(208, 12%, 58%)',
												}}
											></MinutelyDataPoint>
										);
									} else {
										return (
											<MinutelyDataPoint
												key={dp.dt}
												style={{
													background: 'hsl(189, 87%, 97%)',
													borderTop: '1px solid hsl(208, 12%, 58%)',
													borderBottom: '1px solid hsl(208, 12%, 58%)',
												}}
											></MinutelyDataPoint>
										);
									}
								})}
						</Chart>
						<BottomScale>
							<div className='increments'>
								<h4>{formatTime(minutely[0].dt, timezoneOffset)}</h4>
							</div>
							<div className='increments'>
								<h4>{formatTime(minutely[15].dt, timezoneOffset)}</h4>
							</div>
							<div className='increments'>
								<h4>{formatTime(minutely[30].dt, timezoneOffset)}</h4>
							</div>
							<div className='increments'>
								<h4>{formatTime(minutely[45].dt, timezoneOffset)}</h4>
							</div>
							<div className='increments'>
								<h4>{formatTime(minutely[60].dt, timezoneOffset)}</h4>
							</div>
						</BottomScale>
						<Key>
							<div className='key__title'>
								<h3>Key</h3>
								<p>Rainfall in mm/hr</p>
							</div>

							<KeyContainer>
								{rainfallKey.map((el) => (
									<KeySquare key={el.color}>
										<div
											className='color'
											style={{
												background: `${el.color}`,
											}}
										></div>
										<div className='amount'>
											<p>{el.amount}</p>
										</div>
										<div className='description'>
											<p>{el.description}</p>
										</div>
									</KeySquare>
								))}
							</KeyContainer>
						</Key>
					</MinutelyContainer>
				</StyledMinutely>
			)}
		</>
	);
};

const StyledMinutely = styled(motion.div)`
	margin-bottom: 2rem;

	.minutely__title {
		margin-bottom: 2rem;

		.line {
			width: 5rem;
			height: 5px;
			margin-top: 0.5rem;
			background: hsl(191, 81%, 54%);
		}
	}

	@media (max-width: 768px) {
		.minutely__title {
			.line {
				width: 3rem;
			}
		}
	}
`;

const MinutelyContainer = styled(motion.div)`
	display: flex;
	flex-direction: column;
	padding: 1.5rem;
	border: 1px solid hsl(210, 16%, 76%);
	border-radius: 1rem;
	margin: 0 auto;

	::-webkit-scrollbar {
		display: none;
	}
`;

const MinutelyDataPoint = styled(motion.div)`
	width: 100%;
	min-height: 50px;
	min-width: 5px;
`;

const TopScale = styled(motion.div)`
	display: flex;
	justify-content: space-between;
`;

const BottomScale = styled(motion.div)`
	display: flex;
	justify-content: space-between;
`;

const Chart = styled(motion.div)`
	display: flex;
	overflow-y: hidden;
	overflow-x: scroll;
`;

const Key = styled(motion.div)`
	margin-top: 2rem;

	.key__title,
	h3 {
		margin-bottom: 0.5rem;
	}

	p {
		font-size: 0.9rem;
	}
`;
const KeyContainer = styled(motion.div)`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(96px, 1fr));
`;
const KeySquare = styled(motion.div)`
	.color {
		min-height: 20px;
		min-width: 40px;
	}
`;

export default Hourly;
