import HighchartsReact from 'highcharts-react-official';

export interface AreaChartDisplayProps extends HighchartsReact.Props {
	chartData: any[];
	chartColor: string;
	backgroundColor: string;
	labels: string[] | any;
	duration?: number;
}
