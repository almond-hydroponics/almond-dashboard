// third-party libraries
import axios from 'axios';
import authService from '@utils/auth';

// const token = process.env.GRAFANA_TOKEN;
const token = authService.getToken();

const influxHttp = axios.create({
	baseURL: process.env.DATA_API,
	headers: {
		Authorization: `Bearer ${token}`,
	},
});

export default influxHttp;
