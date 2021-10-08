import { ReactNode } from 'react';
import { useTheme } from '@mui/material/styles';

interface DividerWithTextProps {
	children: string | ReactNode;
}

const DividerWithText = ({ children }: DividerWithTextProps): JSX.Element => {
	const theme = useTheme();

	return (
		<div style={{ display: 'flex', alignItems: 'center' }}>
			<div style={{ borderBottom: '2px solid lightgray', width: '100%' }} />
			{typeof children === 'string' || children instanceof String ? (
				<span
					style={{
						paddingTop: theme.spacing(0.5),
						paddingBottom: theme.spacing(0.5),
						paddingRight: theme.spacing(2),
						paddingLeft: theme.spacing(2),
						fontWeight: 500,
						fontSize: 22,
						color: 'lightgray',
					}}
				>
					{children}
				</span>
			) : (
				children
			)}
			<div
				style={{
					borderBottom: '2px solid lightgray',
					width: '100%',
				}}
			/>
		</div>
	);
};
export default DividerWithText;
