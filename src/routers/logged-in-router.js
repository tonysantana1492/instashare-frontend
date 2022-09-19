import { Fragment } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

const clientRoutes = [
	
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
