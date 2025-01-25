import cssnano from 'cssnano';

const isDev = process.env.NODE_ENV === 'development';

export default {
	plugins: [
		'@tailwindcss/postcss',
		!isDev
			? cssnano({
					preset: 'default',
				})
			: {},
	],
};
