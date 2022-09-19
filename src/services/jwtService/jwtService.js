import jwtDecode from 'jwt-decode';
import { TOKEN_ENV } from 'constants';
import { autoLogin, setUser, setUserLoggedOut, store } from '_store';

class JwtService {
	

	setSession = (data) => {

		if (data && data.token) {
			// console.log('create-session');
			localStorage.setItem(TOKEN_ENV, data.token);
			store.dispatch(setUser(data));
		} else {
			// console.log('delete-session');
			localStorage.removeItem(TOKEN_ENV);
			store.dispatch(setUserLoggedOut());
		}
	};

	handleAuthentication = () => {
		const token = this.getAccessToken();

		if (this.isAuthTokenValid(token)) {
			//Actualizo el token
			store.dispatch(autoLogin());
		} else {
			// El token no es valido
			console.log('token no valido');
			this.setSession(null);
		}
	};

	isAuthTokenValid = token => {
		if (!token) {
			return false;
		}
		const decoded = jwtDecode(token);
		const currentTime = Date.now() / 1000;
		if (decoded.exp < currentTime) {
			console.warn('access token expired');
			return false;
		}

		return true;
	};

	getAccessToken = () => {
		return localStorage.getItem(TOKEN_ENV);
	};
}

const instance = new JwtService();

export default instance;
