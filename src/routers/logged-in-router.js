import FileManager from 'pages/FileManager/FileManager';
import { Fragment } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Nav from '_components/Nav';

const clientRoutes = [
	{
		path: '/',
		component: <FileManager />
	},
	{
		path: '*',
		component: <Navigate to="/" replace />
	}
];

export const LoggedInRouter = () => {
	return (
		<Fragment>
			<Nav />
			<main>
				<Routes>
					{clientRoutes.map(route => (
						<Route path={route.path} exact key={route.path} element={route.component} />
					))}
				</Routes>
			</main>
		</Fragment>
	);
};
