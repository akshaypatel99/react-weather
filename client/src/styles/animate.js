export const container = {
	hidden: { opacity: 1, scale: 0 },
	visible: {
		opacity: 1,
		scale: 1,
		transition: {
			delayChildren: 0.3,
			staggerChildren: 0.25,
		},
	},
};

export const fadeUp = {
	hidden: { y: 30, opacity: 0 },
	visible: {
		y: 0,
		opacity: 1,
	},
};

export const fadeIn = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			delay: 1.5,
			duration: 1.5,
			ease: 'easeOut',
		},
	},
};

export const lineFade = {
	hidden: { x: -50, opacity: 0 },
	visible: {
		x: 0,
		opacity: 1,
		transition: {
			delay: 1.5,
			duration: 0.5,
			ease: 'easeOut',
		},
	},
};

export const fadeInRight = {
	hidden: { x: 200, opacity: 0 },
	visible: {
		x: 0,
		opacity: 1,
		transition: {
			delay: 1,
			duration: 1.5,
			ease: 'easeOut',
		},
	},
};
