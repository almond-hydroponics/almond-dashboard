import { SensorData } from '@modules/sensorData/interfaces';
import { StatsData } from '@modules/analytics/interfaces';

export interface AnalyticsPageProps {
	match: {
		url: string;
	};
	sensorData: SensorData;
	analyticsData: StatsData;
}

export interface RegularUserAnalyticsProps {
	sensorData: SensorData;
}

export interface AdminUserAnalyticsProps {
	analyticsData: StatsData;
}
