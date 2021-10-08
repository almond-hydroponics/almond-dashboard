import { useContext, useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
// components
import { ComponentContext } from '@context/ComponentContext';
import { AnalyticsCard } from '@components/molecules';
import { getAdminStatistics } from '@modules/analytics';
import { IRootState } from '../../store/rootReducer';
import { Grid } from '@mui/material';
import {
	AccountBalanceTwoTone,
	AllOutTwoTone,
	DeviceHubTwoTone,
	GroupTwoTone,
	LibraryBooksTwoTone,
	ScheduleTwoTone,
} from '@mui/icons-material';

const AdminAnalytics = (): JSX.Element => {
	const dispatch = useDispatch();
	const { users, devices } = useSelector(
		(globalState: IRootState) => globalState.analytics.data,
		shallowEqual,
	);

	useEffect(() => {
		dispatch(getAdminStatistics());
	}, []);

	const { setSelectedIndex } = useContext(ComponentContext);
	const handleCardClick = (index: number) => () => setSelectedIndex(index);

	return (
		<div data-testid="admin-analytics-page">
			<Grid container item xs={12} spacing={1}>
				<AnalyticsCard
					onClick={handleCardClick(1)}
					colorClass="blueCard"
					icon={<AllOutTwoTone fontSize="large" />}
					mainInfo="Devices"
					subInfo={devices}
				/>
				<AnalyticsCard
					onClick={handleCardClick(1)}
					colorClass="yellowCard"
					icon={<GroupTwoTone fontSize="large" />}
					mainInfo="People"
					subInfo={users}
				/>
				<AnalyticsCard
					onClick={handleCardClick(1)}
					colorClass="purpleCard"
					icon={<ScheduleTwoTone fontSize="large" />}
					mainInfo="Requests"
					subInfo="30"
				/>
				<AnalyticsCard
					onClick={handleCardClick(1)}
					colorClass="redCard"
					icon={<AccountBalanceTwoTone fontSize="large" />}
					mainInfo="Sales"
					subInfo="4,000"
				/>
				<AnalyticsCard
					onClick={handleCardClick(2)}
					colorClass="greenCard"
					icon={<DeviceHubTwoTone fontSize="large" />}
					mainInfo="Units"
					subInfo="23"
				/>
				<AnalyticsCard
					onClick={handleCardClick(3)}
					colorClass="brownCard"
					icon={<LibraryBooksTwoTone fontSize="large" />}
					mainInfo="Orders"
					subInfo="3"
				/>
			</Grid>
		</div>
	);
};

export default AdminAnalytics;
