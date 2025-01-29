import Home from '@features/home/Home';
import Layout from '@features/layout/Layout';
import { createBrowserRouter } from 'react-router';

export const router = createBrowserRouter([
	{
		element: <Layout />,
		children: [
			{
				path: '/',
				element: <Home />,
			},
		],
	},
]);
