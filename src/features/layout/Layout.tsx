import { Link, Outlet } from 'react-router';

const Layout = () => {
	return (
		<div className="bg-slate-300 flex flex-col h-screen">
			<nav className="h-12 flex items-center gap-4 w-screen bg-slate-500 text-slate-100 px-4">
				<Link to="/home">Home</Link>

				<p className="text-sm ml-auto">{`developed by ${process.env.REACT_APP_NAME}`}</p>
			</nav>
			<main className="p-4 grow overflow-hidden">
				<Outlet />
			</main>
		</div>
	);
};

export default Layout;
