import dayjs from 'dayjs';
// interfaces
import { ActivityLogCardProps } from './interfaces';
import { Card, CardContent, Typography } from '@mui/material';

const ActivityLogCard = ({
	log,
	date,
	type,
}: ActivityLogCardProps): JSX.Element => {
	return (
		<Card variant="outlined">
			<CardContent>
				<Typography variant="body2" data-testid="header">
					{log}
				</Typography>
				<Typography
					variant="caption"
					style={{ fontWeight: 600 }}
					data-testid="details"
				>
					{`${dayjs(date).format('HH:mm:ss')}`}
				</Typography>
			</CardContent>
		</Card>
	);
};

export default ActivityLogCard;
