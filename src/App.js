import { useEffect } from 'react';
import { LoggedOutRouter } from 'routers/logged-out-router';
import { LoggedInRouter } from 'routers/logged-in-router';
import { useSelector } from 'react-redux';
import jwtService from 'services/jwtService';

export const App = () => {

	const isLogin = useSelector(state => state.userReducer.isLogin);
	
	useEffect(() => {		
		jwtService.handleAuthentication()
	}, []);

	return isLogin ? <LoggedInRouter /> : <LoggedOutRouter />;
};
