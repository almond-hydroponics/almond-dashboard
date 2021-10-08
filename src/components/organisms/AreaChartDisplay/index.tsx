import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import HighchartsExporting from 'highcharts/modules/exporting';
import { AreaChartDisplayProps } from '@components/organisms/AreaChartDisplay/interfaces';
import 'chartjs-adapter-luxon';
import 'chartjs-plugin-streaming';
// import { useState } from 'react';

// const onRefresh = (chart) => {
// 	const xhr = new XMLHttpRequest();
// 	xhr.open(
// 		'GET',
// 		'http://localhost:8081/api/range-data?start=-1d&measurement=temperature&type=window&window=1h',
// 	);
// 	xhr.onload = () => {
// 		if (xhr.readyState === 4 && xhr.status === 200) {
// 			// assume the response is an array of {x: timestamp, y: value} objects
// 			const resData = JSON.parse(xhr.responseText);
// 			const data = resData.data.map((element) => ({
// 				x: element._time,
// 				y: element._value,
// 			}));
// 			console.log('Class: , Function: onload, Line 19 data():', data);
// 			// append the new data array to the existing chart data
// 			Array.prototype.push.apply(chart.data.datasets[0].data, data);
// 			// update chart datasets without animation
// 			chart.update('none');
// 		}
// 	};
// 	xhr.send();
// };

if (typeof Highcharts === 'object') {
	HighchartsExporting(Highcharts);
}

const AreaChardDisplay = ({
	chartData,
	backgroundColor,
	chartColor,
	labels,
	duration = 4 * 60 * 60 * 1000, // 4 hours
}: AreaChartDisplayProps): JSX.Element => {
	// const [hoverData, setHoverData] = useState(null);
	// const [chartOptions, setChartOptions] = useState({
	// 	xAxis: {
	// 		categories: labels,
	// 	},
	// 	series: [{ data: [1, 2, 5, 8, 3] }],
	// 	// plotOptions: {
	// 	// 	series: {
	// 	// 		point: {
	// 	// 			events: {
	// 	// 				mouseOver(e){
	// 	// 					setHoverData(e.target.category)
	// 	// 				}
	// 	// 			}
	// 	// 		}
	// 	// 	}
	// 	// },
	// 	title: null
	// });

	const options = {
		chart: {
			style: {
				fontFamily: 'Google Sans, Roboto, Helvetica Neue, sans-serif',
			},
		},
		title: null,
		tooltip: {
			enabled: false,
		},
		xAxis: {
			categories: labels,
		},
		series: [{ data: [1, 2, 5, 8, 3] }],
		credits: {
			enabled: false,
		},
		exporting: {
			enabled: false,
		},
		// plotOptions: {
		// 	series: {
		// 		point: {
		// 			events: {
		// 				mouseOver(e){
		// 					setHoverData(e.target.category)
		// 				}
		// 			}
		// 		}
		// 	}
		// },
	};

	return (
		<>
			<HighchartsReact highcharts={Highcharts} options={options} />
		</>
	);
};

export default AreaChardDisplay;
