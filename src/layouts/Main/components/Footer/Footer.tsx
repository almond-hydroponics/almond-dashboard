import Link from 'next/link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Logo from '@components/atoms/Logo';

const Footer = (): JSX.Element => {
	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<Box
					display={'flex'}
					justifyContent={'space-between'}
					alignItems={'center'}
					width={1}
					flexDirection={{ xs: 'column', sm: 'row' }}
				>
					<Logo displayText />
					<Box display="flex" flexWrap={'wrap'} alignItems={'center'}>
						<Box marginLeft={3}>
							<Link href="/" passHref>
								<Button sx={{ color: '#2d3748' }} variant="text" size="small">
									Home
								</Button>
							</Link>
						</Box>

						<Box marginLeft={3}>
							<Link href="/resources" passHref>
								<Button sx={{ color: '#2d3748' }} variant="text" size="small">
									Resources
								</Button>
							</Link>
						</Box>

						<Box marginLeft={3}>
							<Link href="/store" passHref>
								<Button variant="outlined" size="small">
									Store
								</Button>
							</Link>
						</Box>
					</Box>
				</Box>
			</Grid>
			<Grid item xs={12}>
				<Typography
					align={'center'}
					variant={'subtitle2'}
					color="text.secondary"
					gutterBottom
				>
					&copy; almond. 2022. All rights reserved
				</Typography>
				<Typography
					align={'center'}
					variant={'caption'}
					color="text.secondary"
					component={'p'}
				>
					When you visit or interact with our sites, services or tools, we or
					our authorised service providers may use cookies for storing
					information to help provide you with a better, faster and safer
					experience and for marketing purposes.
				</Typography>
			</Grid>
		</Grid>
	);
};

export default Footer;
