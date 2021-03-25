import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { formatTime } from '../utils/convertUnixTime';
import convertIcon from '../utils/convertIcon';
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import { lineFade, container, fadeInRight } from '../styles/animate';

const Hourly = () => {
	const isLoading = useSelector((state) => state.isLoading);
	const { hourly, timezoneOffset } = useSelector((state) => state.weather);

	return (
		<>
			{!isLoading && (
				<StyledHourly>
					<div className='hourly__title'>
						<h1>Next 48 Hours</h1>
						<motion.div
							className='line'
							variants={lineFade}
							initial='hidden'
							animate='visible'
						></motion.div>
					</div>

					<HourlyContainer
						variants={container}
						initial='hidden'
						animate='visible'
					>
						{hourly &&
							hourly.map((dp) => (
								<HourlySummary
									key={dp.dt}
									newDay={dp.dt}
									variants={fadeInRight}
								>
									<Link to={`/hourly/${dp.dt}`}>
										<h3>{dp.temp.toFixed(1)}&#176;C</h3>
										<img
											src={convertIcon(dp.weather[0].icon)}
											alt={dp.weather[0].main}
										/>
										<h3>{formatTime(dp.dt, timezoneOffset)}</h3>
									</Link>
								</HourlySummary>
							))}
					</HourlyContainer>
				</StyledHourly>
			)}
		</>
	);
};

const StyledHourly = styled(motion.div)`
	margin-bottom: 2rem;

	.hourly__title {
		margin-bottom: 2rem;

		.line {
			width: 5rem;
			height: 5px;
			margin-top: 0.5rem;
			background: hsl(191, 81%, 54%);
		}
	}
`;

const HourlyContainer = styled(motion.div)`
	display: flex;
	overflow-y: hidden;
	overflow-x: scroll;
	width: 90%;
	margin: 0 auto;
	padding: 2rem;

	/* ::-webkit-scrollbar {
		width: 0.5rem;
	} */
`;

const HourlySummary = styled(motion.div)`
	border: 1px solid hsl(210, 16%, 76%);
	border-radius: 1rem;
	padding: 1.5rem;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	object-fit: contain;
	width: 85%;
	height: 160px;
	margin-right: 10px;
	transition: transform 0.2s ease-out;
	cursor: pointer;

	a {
		text-decoration: none;
	}

	/* Give yellow border on HourlySummary that reads 00:00 / 86400 seconds in a day */
	${(props) => {
		props.newDay % 86400 === 0 &&
			css`
				border: 2px solid hsl(39, 91%, 74%);
			`;
	}}

	:hover {
		transform: scale(1.15);
		border-top: 5px solid hsl(191, 81%, 54%);
		box-shadow: 0 5px 10px hsl(0, 0%, 0%, 0.15);
	}
`;

export default Hourly;
