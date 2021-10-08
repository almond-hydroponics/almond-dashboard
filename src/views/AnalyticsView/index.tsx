import { useContext } from 'react';
import { UserContext } from '@context/UserContext';
import AdminAnalytics from './AdminAnalytics';
import RegularUserAnalytics from './RegularUserAnalytics';

export const AnalyticsView = (): JSX.Element => {
	const { isAdmin } = useContext(UserContext);

	return isAdmin ? <AdminAnalytics /> : <RegularUserAnalytics />;
};

export default AnalyticsView;
