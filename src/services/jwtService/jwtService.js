import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { TOKEN_ENV, baseUrl } from 'constants';
import { autoLogin, setUser, setUserLoggedOut, store, userLoggedOut } from '_store';
import { fetchWrapper } from '_helpers';

class JwtService {
	register = model => {
		return new Promise((resolve, reject) => {
			fetchWrapper
				.post(`${baseUrl}/auth/register`, model)
				.then(response => {
					if (response.user) {
						this.setSession(response);
						resolve(response);
					} else {
						reject(response.error);
					}
				});			
		});
	};

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

	signInWithEmailAndPassword = ({ username, password }) => {
		return new Promise((resolve, reject) => {
			fetchWrapper
				.post(`${baseUrl}/auth/signin`, {
					username,
					password
				})
				.then(response => {
					if (response.user) {
						//this.setSession(response);
						resolve(response);
					} else {
						reject(response.error);
					}
				}).catch(error => {					
					reject([{"type":"server","message":"El servidor ha rechazado la conexión"}]);
				});
		});
	};

	signInWithToken = () => {
		return new Promise((resolve, reject) => {
			fetchWrapper
				.post(`${baseUrl}/auth/access-token`, {
					token: this.getAccessToken()
				})
				.then(response => {
					if (response.user) {
						resolve(response);
					} else {
						reject([{"type":"server","message":"El servidor ha rechazado la conexión"}]);
					}
				})
				.catch(error => {
					reject([{"type":"server","message":"El servidor ha rechazado la conexión"}]);
				});
		});
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

	getTokenInfo = async () => {
		const token = this.getAccessToken();

		if (!token) {
			return false;
		}

		const decoded = await jwtDecode(token);
		return decoded;
	};

	getAccessToken = () => {
		return localStorage.getItem(TOKEN_ENV);
	};
}

const instance = new JwtService();

export default instance;
