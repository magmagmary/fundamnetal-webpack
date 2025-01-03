import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import tailwind from 'tailwindcss';

const isDev = process.env.NODE_ENV === 'development';

export default {
	plugins: [
		tailwind,
		!isDev ? autoprefixer : {},
		!isDev
			? cssnano({
					preset: 'default',
				})
			: {},
	],
};
