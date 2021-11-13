import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

export const useTableStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			'& .MuiDataGrid-columnSeparator': {
				display: 'none !important',
			},
			'& .MuiDataGridCell:focusWithin': {
				// outline: 'solid #1967D2 0.8px',
				outlineOffset: '-1px',
				outline: 'none',
			},
			// '& .MuiDataGrid-colCell, .MuiDataGrid-cell': {
			// 	paddingLeft: 2,
			// 	paddingRight: 2,
			// },
			'& .MuiPaginationItemRoot': {
				borderRadius: 0,
			},
			'& .MuiDataGrid-columnHeaderTitleContainer': {
				padding: '0 !important',
			},
			'& .MuiDataGrid-columnHeaderTitle': {
				color: theme.palette.primary.main,
				// fontWeight: 500,
			},
			'& .tableCell': {
				fontWeight: 500,
				fontSize: 20,
			},
			'& .MuiDataGridCell': {
				[theme.breakpoints.down('sm')]: {
					fontSize: 12,
				},
			},
		},
	}),
);
