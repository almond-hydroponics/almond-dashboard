import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

const authService: any = {
	saveToken(token: string | string[]) {
		return Cookies.set('jwt-token', token);
	},
	getToken() {
		return Cookies.get('jwt-token');
	},
	decodeToken() {
		return jwtDecode(<string>this.getToken());
	},
	isAuthenticated() {
		return !!this.getToken();
	},
	isExpired() {
		const currentDate = Date.now() / 1000;
		const decodedToken: any = this.decodeToken();

		return decodedToken.exp < currentDate;
	},
	getUser() {
		return this.getToken() ? this.decodeToken() : {};
	},
	logoutUser() {
		Cookies.remove('jwt-token', { path: '/' });
	},
	redirectUser() {
		const referrer = window.location.pathname;
		this.logoutUser();
		localStorage.setItem(
			'sessionError',
			'Your session has expired, please log in to continue.',
		);
		localStorage.setItem('locationReferrer', referrer);
		window.location.replace('/');
	},
};

export default authService;
