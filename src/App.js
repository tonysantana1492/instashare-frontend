import { LoggedOutRouter } from 'routers/logged-out-router';
import { LoggedInRouter } from 'routers/logged-in-router';

export const App = () => {

	const isLogin = false;
	
	return isLogin ? <LoggedInRouter /> : <LoggedOutRouter />;
};
