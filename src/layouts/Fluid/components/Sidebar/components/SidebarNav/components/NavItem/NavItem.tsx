import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Logo from '@components/atoms/Logo';
import Button from '@mui/material/Button';
import fancyId from '@utils/fancyId';
import { Link } from '@mui/material';

interface Props {
	title?: string;
	items: Array<PageItem>;
}

const NavItem = ({ items }: Props): JSX.Element => {
	const theme = useTheme();
	const [activeLink, setActiveLink] = useState('');
	useEffect(() => {
		setActiveLink(window && window.location ? window.location.pathname : '');
	}, []);

	return (
		<Box>
			<Logo displayText />
			{items.map((item, i) => (
				<Box key={i} marginBottom={2} marginTop={3}>
					<Typography
						variant="h5"
						color="primary"
						gutterBottom
						sx={{
							fontWeight: 600,
							display: 'block',
						}}
					>
						{item.groupTitle}
					</Typography>
					<Box display="block">
						{item.pages.map((p) => (
							<Box marginTop={1} key={fancyId()}>
								<Link href={p.href}>
									<Button
										sx={{
											fontWeight: 400,
											fontSize: 18,
											color:
												activeLink === p.href ? 'primary' : 'text.primary',
											textDecoration: 'none',
											'&:hover': {
												color: theme.palette.primary.dark,
											},
										}}
										variant="text"
										size="large"
									>
										{p.title}
									</Button>
								</Link>
							</Box>
						))}
					</Box>
				</Box>
			))}
		</Box>
	);
};

export default NavItem;
