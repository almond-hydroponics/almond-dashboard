import { Grid } from '@mui/material';
import { DashboardCard } from '@components/molecules';
import { DonutDisplay } from '@components/organisms';
import { shallowEqual, useSelector } from 'react-redux';
import { IRootState } from '../../store/rootReducer';

const EnvironmentControlView = (): JSX.Element => {
	const { humidity, temperature } = useSelector(
		(globalState: IRootState) => globalState.sensorData?.sensorData,
		shallowEqual,
	);

	const firstColumn = () => (
		<Grid item lg={3} md={6} xs={6}>
			<DashboardCard
				heading="Humidity"
				body={
					<DonutDisplay
						data={humidity}
						color={'#D9E9BA'}
						width={150}
						height={150}
					/>
				}
			/>
			<DashboardCard
				heading="Temperature"
				body={
					<DonutDisplay
						data={temperature}
						color={'#BFD7DF'}
						width={150}
						height={150}
					/>
				}
			/>
		</Grid>
	);

	return (
		<div data-testid="environment-page">
			<Grid container spacing={1}>
				{firstColumn()}
			</Grid>
		</div>
	);
};

export default EnvironmentControlView;
