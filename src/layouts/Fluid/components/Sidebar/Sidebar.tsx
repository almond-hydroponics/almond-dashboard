import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import { SidebarNav } from './components';

interface Props {
	// eslint-disable-next-line @typescript-eslint/ban-types
	onClose: () => void;
	open: boolean;
	variant: 'permanent' | 'persistent' | 'temporary' | undefined;
}

const Sidebar = ({ open, variant, onClose }: Props): JSX.Element => {
	return (
		<Drawer
			anchor="left"
			onClose={() => onClose()}
			open={open}
			variant={variant}
			sx={{
				'& .MuiPaper-root': {
					width: '100%',
					maxWidth: { xs: '100%', sm: 400 },
				},
			}}
		>
			<Box
				sx={{
					height: '100%',
					padding: 1,
				}}
			>
				<SidebarNav onClose={onClose} />
			</Box>
		</Drawer>
	);
};

export default Sidebar;
