import { LoggedOutRouter } from 'routers/logged-out-router';
import { LoggedInRouter } from 'routers/logged-in-router';
import { useSelector } from 'react-redux';

export const App = () => {

	const isLogin = useSelector(state => state.userReducer.isLogin);
	
	return isLogin ? <LoggedInRouter /> : <LoggedOutRouter />;
};
