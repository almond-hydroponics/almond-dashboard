import { SelectBox } from '@components/atoms';
import { DateRangePicker, DashboardCard } from '@components/molecules';
import { AreaChartDisplay } from '@components/organisms';
// utils
import dayjs from '@utils/dayjsTime';
// interfaces
import { LineChartCardProps } from '@components/organisms/LineChartCard/intefaces';
import { dateSelectOptions } from '@components/organisms/LineChartCard/fixtures';

const LineChartCard = ({
	heading,
	selectedValue,
	handleDateSelect,
	isDateRangeHidden,
	onDateRangeChange,
	handleDateRangeModal,
	data,
	duration,
}: LineChartCardProps): JSX.Element => {
	const formatTime = () => {
		let rangeLabel: string;

		switch (selectedValue) {
			case 'Today':
				rangeLabel = 'HH';
				break;
			case 'This Week':
				rangeLabel = 'HH';
				break;
			case 'This Month':
				rangeLabel = 'HH';
				break;
			case 'This Year':
				rangeLabel = 'HH';
				break;
			case 'Last 15 minutes':
				rangeLabel = 'HH.mm';
				break;
			case 'Last 60 minutes':
				rangeLabel = 'HH.mm';
				break;
			case 'Last 4 hours':
				rangeLabel = 'HH.mm';
				break;
			case 'Last 24 hours':
				rangeLabel = 'HH.mm';
				break;
			case 'Last 7 days':
				rangeLabel = 'ddd';
				break;
			case 'Last 30 days':
				rangeLabel = 'HH';
				break;
			case 'Last 90 days':
				rangeLabel = 'HH';
				break;
			default:
				return (rangeLabel = 'HH.mm');
		}
		return rangeLabel;
	};

	const labels = data.map((element) => dayjs(element.x).format(formatTime()));
	const chartData = data.map((element) => Number(element.y));

	// const labels = () => {
	//   switch (selectedValue) {
	//     case "Today":
	//       return ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat']
	//     case "This Week":
	//       return ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat']
	//   }
	// }

	return (
		<div>
			<DashboardCard
				heading={heading}
				body={
					<AreaChartDisplay
						backgroundColor="rgba(124, 181, 236, 0.3)"
						chartColor="rgba(124, 181, 236)"
						chartData={chartData}
						labels={labels}
						duration={duration}
					/>
				}
				actionItem={
					<SelectBox
						title="select date"
						selectedValue={selectedValue}
						handleDateSelect={handleDateSelect}
						options={dateSelectOptions}
					/>
				}
			/>
			<DateRangePicker
				isOpen={isDateRangeHidden}
				onChange={onDateRangeChange}
				onClose={handleDateRangeModal}
				onDismiss={handleDateRangeModal}
			/>
		</div>
	);
};

export default LineChartCard;
