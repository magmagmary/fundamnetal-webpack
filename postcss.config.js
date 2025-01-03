const isDev = process.env.NODE_ENV === 'development';

module.exports = {
	plugins: [
		require('tailwindcss'),
		!isDev ? require('autoprefixer') : {},
		!isDev
			? require('cssnano')({
					preset: 'default',
				})
			: {},
	],
};
