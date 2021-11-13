import { Line } from 'react-chartjs-2';
import { AreaChartDisplayProps } from '@components/organisms/AreaChartDisplay/interfaces';
import 'chartjs-adapter-luxon';
import 'chartjs-plugin-streaming';
import { Grid } from '@material-ui/core';
import Chart from 'chart.js';

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

const AreaChardDisplay = ({
	chartData,
	backgroundColor,
	chartColor,
	labels,
	duration = 4 * 60 * 60 * 1000, // 4 hours
}: AreaChartDisplayProps): JSX.Element => {
	const data = {
		labels,
		datasets: [
			{
				// label: 'Temperature',
				fill: true,
				lineTension: 0.8,
				showLine: false,
				backgroundColor,
				borderColor: chartColor,
				borderCapStyle: 'round',
				borderJoinStyle: 'round',
				// borderWidth: 1,
				maintainAspectRatio: false,
				// pointBorderColor: chartColor,
				// pointBackgroundColor: '#fff',
				pointBorderWidth: 0,
				pointHoverRadius: 1,
				pointHoverBackgroundColor: chartColor,
				pointHoverBorderColor: 'rgba(220,220,220,1)',
				pointHoverBorderWidth: 0.8,
				pointRadius: 0.5,
				// pointHitRadius: 10,
				// tension: 0.5,
				data: chartData,
				// bezierCurve: false,
			},
		],
		options: {
			// elements: {
			// 	line: {
			// 		tension: 0,
			// 	},
			// },
			responsive: true,
			plugins: {
				legend: {
					display: false,
				},
				// animations: false,
				animations: {
					tension: {
						duration: 1000,
						easing: 'linear',
						from: 1,
						to: 0,
						loop: true,
					},
				},
			},
			// showXLabels: 5,
			scales: {
				x: {
					// type: 'time',
					ticks: {
						// callback: function (val, index) {
						// 	// Hide the label of every 2nd dataset
						// 	return index % 2 === 0 ? this.getLabelForValue(val) : '';
						// },
						autoSkip: true,
						maxTicksLimit: 5,
						maxRotation: 0,
						minRotation: 0,
					},
				},
				// x: {
				// 	// type: 'realtime',
				// 	realtime: {
				// 		duration, // data in the past 20000 ms will be displayed
				// 		refresh: 5000, // onRefresh callback will be called every 60,000 ms -> 1 min
				// 		delay: 1000, // delay of 1000 ms, so upcoming values are known before plotting a line
				// 		// pause: false, // chart is not paused
				// 		// ttl: undefined, // data will be automatically deleted as it disappears off the chart
				// 		onRefresh: (chart) => {
				// 			const xhr = new XMLHttpRequest();
				// 			xhr.open(
				// 				'GET',
				// 				'http://localhost:8081/api/range-data?start=-1d&measurement=temperature&type=window&window=10h',
				// 			);
				// 			xhr.onload = () => {
				// 				if (xhr.readyState === 4 && xhr.status === 200) {
				// 					// assume the response is an array of {x: timestamp, y: value} objects
				// 					const resData = JSON.parse(xhr.responseText);
				// 					const chartResData = resData.data.map((element) => ({
				// 						x: element._time,
				// 						y: element._value,
				// 					}));
				// 					// append the new data array to the existing chart data
				// 					Array.prototype.push.apply(
				// 						chart.data.datasets[0].data,
				// 						chartResData.length !== 0 ? chartResData : chartData,
				// 					);
				// 					// update chart datasets without animation
				// 					chart.update('none');
				// 				}
				// 			};
				// 			xhr.send();
				// 		},
				// 		// onRefresh(chart) {
				// 		// 	// query your data source and get the array of {x: timestamp, y: value} objects
				// 		// 	// var data = getLatestData();
				//
				// 		// 	// append the new data array to the existing chart data
				// 		// 	console.log(
				// 		// 		'Class: realtime, Function: onRefresh, Line 122 chartData():',
				// 		// 		chartData,
				// 		// 	);
				// 		// 	Array.prototype.push.apply(
				// 		// 		chart.data.datasets[0].data,
				// 		// 		chartData,
				// 		// 	);
				// 		// },
				// 		// onRefresh: (chart: { data: { datasets: any[] } }) => {
				// 		// 	chart.data.datasets.forEach((dataset) => {
				// 		// 		dataset.data.push({
				// 		// 			x: Date.now(),
				// 		// 			y: Math.random(),
				// 		// 		});
				// 		// 	});
				// 		// },
				// 	},
				// },
				y: {
					suggestedMin: 20,
					suggestedMax: 30,
					title: {
						display: false,
						// text: 'Temperature',
					},
					// min: 20,
					// max: 30,
				},
			},
			interaction: {
				intersect: false,
			},
			layout: {
				padding: {
					left: 0,
					right: 0,
					top: 0,
					bottom: 0,
				},
			},
		},
	};

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	return <Line data={data} options={data.options} />;
};

export default AreaChardDisplay;

// import HighchartsReact from 'highcharts-react-official';
// import Highcharts from 'highcharts';
// import HighchartsExporting from 'highcharts/modules/exporting';
// import { AreaChartDisplayProps } from '@components/organisms/AreaChartDisplay/interfaces';
// import 'chartjs-adapter-luxon';
// import 'chartjs-plugin-streaming';
// // import { useState } from 'react';
//
// // const onRefresh = (chart) => {
// // 	const xhr = new XMLHttpRequest();
// // 	xhr.open(
// // 		'GET',
// // 		'http://localhost:8081/api/range-data?start=-1d&measurement=temperature&type=window&window=1h',
// // 	);
// // 	xhr.onload = () => {
// // 		if (xhr.readyState === 4 && xhr.status === 200) {
// // 			// assume the response is an array of {x: timestamp, y: value} objects
// // 			const resData = JSON.parse(xhr.responseText);
// // 			const data = resData.data.map((element) => ({
// // 				x: element._time,
// // 				y: element._value,
// // 			}));
// // 			console.log('Class: , Function: onload, Line 19 data():', data);
// // 			// append the new data array to the existing chart data
// // 			Array.prototype.push.apply(chart.data.datasets[0].data, data);
// // 			// update chart datasets without animation
// // 			chart.update('none');
// // 		}
// // 	};
// // 	xhr.send();
// // };
//
// if (typeof Highcharts === 'object') {
// 	HighchartsExporting(Highcharts);
// }
//
// const AreaChardDisplay = ({
// 	chartData,
// 	backgroundColor,
// 	chartColor,
// 	labels,
// 	duration = 4 * 60 * 60 * 1000, // 4 hours
// }: AreaChartDisplayProps): JSX.Element => {
// 	// const [hoverData, setHoverData] = useState(null);
// 	// const [chartOptions, setChartOptions] = useState({
// 	// 	xAxis: {
// 	// 		categories: labels,
// 	// 	},
// 	// 	series: [{ data: [1, 2, 5, 8, 3] }],
// 	// 	// plotOptions: {
// 	// 	// 	series: {
// 	// 	// 		point: {
// 	// 	// 			events: {
// 	// 	// 				mouseOver(e){
// 	// 	// 					setHoverData(e.target.category)
// 	// 	// 				}
// 	// 	// 			}
// 	// 	// 		}
// 	// 	// 	}
// 	// 	// },
// 	// 	title: null
// 	// });
//
// 	const options: Highcharts.Options = {
// 		colors: [chartColor],
// 		chart: {
// 			// backgroundColor: {
// 			// 	linearGradient: [0, 600, 0, 0],
// 			// 	stops: [
// 			// 		[0, 'rgb(255, 255, 255)'],
// 			// 		[1, 'rgb(161, 210, 206)'],
// 			// 	],
// 			// },
// 			// plotBackgroundColor: backgroundColor,
// 			// plotBorderWidth: null,
// 			// plotShadow: false,
// 			type: 'spline',
// 		},
// 		xAxis: {
// 			type: 'datetime',
// 			title: {
// 				text: null,
// 			},
// 			categories: labels,
// 			labels: {
// 				autoRotation: [0],
// 				formatter: function () {
// 					return Highcharts.dateFormat('%k.%M', this.value);
// 				},
// 				// formatter: function () {
// 				// 	if (this.isLast || this.isFirst) {
// 				// 		return Highcharts.dateFormat('%k.%M', this.value);
// 				// 	}
// 				// },
// 			},
// 		},
// 		yAxis: {
// 			title: {
// 				text: 'Temperature (\u00b0C)',
// 			},
// 		},
// 		plotOptions: {
// 			series: {
// 				turboThreshold: 2000,
// 				marker: {
// 					enabled: false,
// 				},
// 			},
// 		},
// 		series: [
// 			{
// 				data: chartData,
// 				// pointStart: 1,
// 				// pointInterval: 3600 * 1000,
// 				label: {
// 					enabled: false,
// 				},
// 				type: 'spline',
// 			},
// 		],
// 		credits: {
// 			enabled: false,
// 		},
// 		exporting: {
// 			enabled: false,
// 		},
// 		title: null,
// 		tooltip: {
// 			enabled: false,
// 		},
// 		// chart: {
// 		// 	style: {
// 		// 		fontFamily: 'Google Sans, Roboto, Helvetica Neue, sans-serif',
// 		// 	},
// 		// },
// 		// title: null,
// 		// tooltip: {
// 		// 	enabled: false,
// 		// },
// 		// xAxis: {
// 		// 	categories: labels,
// 		// },
// 		// series: [{ data: [1, 2, 5, 8, 3] }],
// 		// credits: {
// 		// 	enabled: false,
// 		// },
// 		// exporting: {
// 		// 	enabled: false,
// 		// },
// 		// plotOptions: {
// 		// 	series: {
// 		// 		point: {
// 		// 			events: {
// 		// 				mouseOver(e){
// 		// 					setHoverData(e.target.category)
// 		// 				}
// 		// 			}
// 		// 		}
// 		// 	}
// 		// },
// 	};
//
// 	return (
// 		<>
// 			<HighchartsReact highcharts={Highcharts} options={options} />
// 		</>
// 	);
// };
//
// export default AreaChardDisplay;
