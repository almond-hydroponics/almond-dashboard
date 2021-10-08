export const dateSelectOptions: string[][] = [
	[
		'30 second window',
		'1 minutes window',
		'5 minute window',
		'30 minutes window',
		'1 hour window',
		'All time',
	],
	[
		'Today',
		'Week to date',
		'Month to date',
		'Year to date',
		'Yesterday',
		'Previous week',
		'Previous month',
	],
	[
		'Last 15 minutes',
		'Last 60 minutes',
		'Last 4 hours',
		'Last 24 hours',
		'Last 7 days',
		'Last 30 days',
	],
	['Pick a date'],
];

const dateValueRangeOptions: string[] = [
	'30s',
	'1m',
	'5m',
	'30m',
	'1h',
	'-6d',
	'-7d',
	'-8d',
	'-9d',
	'-10d',
	'-11d',
	'-12d',
	'-13d',
	'-15m',
	'-60m',
	'-4h',
	'-24h',
	'-7d',
	'-30d',
	'Pick a date',
];

const timeRange: number[] = [
	30 * 1000,
	60 * 1000,
	5 * 60 * 1000,
	30 * 60 * 1000,
	60 * 60 * 1000,
	6 * 60 * 60 * 1000,
	6 * 60 * 60 * 1000,
	6 * 60 * 60 * 1000,
	6 * 60 * 60 * 1000,
	6 * 60 * 60 * 1000,
	6 * 60 * 60 * 1000,
	6 * 60 * 60 * 1000,
	6 * 60 * 60 * 1000,
	6 * 60 * 60 * 1000,
	6 * 60 * 60 * 1000,
	6 * 60 * 60 * 1000,
	6 * 60 * 60 * 1000,
	6 * 60 * 60 * 1000,
	6 * 60 * 60 * 1000,
	6 * 60 * 60 * 1000,
	6 * 60 * 60 * 1000,
];

export const dateObjectValues = dateSelectOptions
	.flat()
	.reduce((o, k, i) => ({ ...o, [k]: dateValueRangeOptions[i] }), {});

export const timeWindowRange = dateSelectOptions
	.flat()
	.reduce((o, k, i) => ({ ...o, [k]: timeRange[i] }), {});
