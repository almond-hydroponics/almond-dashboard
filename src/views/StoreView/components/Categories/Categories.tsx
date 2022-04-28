/* eslint-disable react/no-unescaped-entities */
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import { ArrowForward } from '@mui/icons-material';

const mock = [
	{
		title: 'Hydroponics',
		icon: (
			<svg
				height={48}
				width={48}
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="currentColor"
			>
				<path d="M8.66 13.07c.15 0 .29-.01.43-.03C9.56 14.19 10.69 15 12 15s2.44-.81 2.91-1.96c.14.02.29.03.43.03 1.73 0 3.14-1.41 3.14-3.14 0-.71-.25-1.39-.67-1.93.43-.54.67-1.22.67-1.93 0-1.73-1.41-3.14-3.14-3.14-.15 0-.29.01-.43.03C14.44 1.81 13.31 1 12 1s-2.44.81-2.91 1.96c-.14-.02-.29-.03-.43-.03-1.73 0-3.14 1.41-3.14 3.14 0 .71.25 1.39.67 1.93-.43.54-.68 1.22-.68 1.93 0 1.73 1.41 3.14 3.15 3.14zM12 13c-.62 0-1.12-.49-1.14-1.1l.12-1.09c.32.12.66.19 1.02.19s.71-.07 1.03-.19l.11 1.09c-.02.61-.52 1.1-1.14 1.1zm3.34-1.93c-.24 0-.46-.07-.64-.2l-.81-.57c.55-.45.94-1.09 1.06-1.83l.88.42c.4.19.66.59.66 1.03 0 .64-.52 1.15-1.15 1.15zm-.65-5.94c.2-.13.42-.2.65-.2.63 0 1.14.51 1.14 1.14 0 .44-.25.83-.66 1.03l-.88.42c-.12-.74-.51-1.38-1.07-1.83l.82-.56zM12 3c.62 0 1.12.49 1.14 1.1l-.11 1.09C12.71 5.07 12.36 5 12 5s-.7.07-1.02.19l-.12-1.09c.02-.61.52-1.1 1.14-1.1zM8.66 4.93c.24 0 .46.07.64.2l.81.56c-.55.45-.94 1.09-1.06 1.83l-.88-.42c-.4-.2-.66-.59-.66-1.03 0-.63.52-1.14 1.15-1.14zM8.17 8.9l.88-.42c.12.74.51 1.38 1.07 1.83l-.81.55c-.2.13-.42.2-.65.2-.63 0-1.14-.51-1.14-1.14-.01-.43.25-.82.65-1.02zM12 22c4.97 0 9-4.03 9-9-4.97 0-9 4.03-9 9zm2.44-2.44c.71-1.9 2.22-3.42 4.12-4.12-.71 1.9-2.22 3.41-4.12 4.12zM3 13c0 4.97 4.03 9 9 9 0-4.97-4.03-9-9-9zm2.44 2.44c1.9.71 3.42 2.22 4.12 4.12-1.9-.71-3.41-2.22-4.12-4.12z" />
			</svg>
		),
	},
	{
		title: 'Nutrients',
		icon: (
			<svg
				height={48}
				width={48}
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="currentColor"
			>
				<path d="M17.66 8L12 2.35 6.34 8C4.78 9.56 4 11.64 4 13.64s.78 4.11 2.34 5.67 3.61 2.35 5.66 2.35 4.1-.79 5.66-2.35S20 15.64 20 13.64 19.22 9.56 17.66 8zM6 14c.01-2 .62-3.27 1.76-4.4L12 5.27l4.24 4.38C17.38 10.77 17.99 12 18 14H6z" />
			</svg>
		),
	},
	{
		title: 'Sensors',
		icon: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				height={48}
				width={48}
				viewBox="0 0 24 24"
				fill="currentColor"
			>
				<path d="M14,12l-2,2l-2-2l2-2L14,12z M12,6l2.12,2.12l2.5-2.5L12,1L7.38,5.62l2.5,2.5L12,6z M6,12l2.12-2.12l-2.5-2.5L1,12 l4.62,4.62l2.5-2.5L6,12z M18,12l-2.12,2.12l2.5,2.5L23,12l-4.62-4.62l-2.5,2.5L18,12z M12,18l-2.12-2.12l-2.5,2.5L12,23l4.62-4.62 l-2.5-2.5L12,18z" />
			</svg>
			// <svg
			// 	height={48}
			// 	width={48}
			// 	xmlns="http://www.w3.org/2000/svg"
			// 	viewBox="0 0 20 20"
			// 	fill="currentColor"
			// >
			// 	<path
			// 		fillRule="evenodd"
			// 		d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z"
			// 		clipRule="evenodd"
			// 	/>
			// </svg>
		),
	},
	{
		title: 'Pots & Trays',
		icon: (
			<svg
				height={48}
				width={48}
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="currentColor"
			>
				<path d="M21.5,9l-2.25-4h-3.31l-1.69-3h-4.5L8.06,5H4.75L2.5,9l1.69,3L2.5,15l2.25,4h3.31l1.69,3h4.5l1.69-3h3.31l2.25-4l-1.69-3 L21.5,9z M19.21,9l-1.12,2h-2.14l-1.12-2l1.12-2h2.14L19.21,9z M10.94,14l-1.12-2l1.12-2h2.12l1.12,2l-1.12,2H10.94z M13.08,4 l1.12,1.98L13.06,8h-2.12L9.8,5.98L10.92,4H13.08z M5.92,7h2.14l1.12,2l-1.12,2H5.92L4.79,9L5.92,7z M4.79,15l1.12-2h2.14l1.12,2 l-1.12,2H5.92L4.79,15z M10.92,20L9.8,18.02L10.94,16h2.12l1.13,2.02L13.08,20H10.92z M18.08,17h-2.14l-1.12-2l1.12-2h2.14l1.12,2 L18.08,17z" />
			</svg>
		),
	},
	{
		title: 'Propagation',
		icon: (
			<svg
				height={48}
				width={48}
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 20 20"
				fill="currentColor"
			>
				<path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
			</svg>
		),
	},
	{
		title: 'Controls',
		icon: (
			<svg
				height={48}
				width={48}
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="currentColor"
			>
				<path d="M13 5.08c3.06.44 5.48 2.86 5.92 5.92h3.03c-.47-4.72-4.23-8.48-8.95-8.95v3.03zM18.92 13c-.44 3.06-2.86 5.48-5.92 5.92v3.03c4.72-.47 8.48-4.23 8.95-8.95h-3.03zM11 18.92c-3.39-.49-6-3.4-6-6.92s2.61-6.43 6-6.92V2.05c-5.05.5-9 4.76-9 9.95 0 5.19 3.95 9.45 9 9.95v-3.03z" />
			</svg>
		),
	},
];

const Categories = (): JSX.Element => {
	const theme = useTheme();
	return (
		<Box>
			<Box marginBottom={4}>
				{/*<Typography*/}
				{/*	sx={{*/}
				{/*		textTransform: 'uppercase',*/}
				{/*		fontWeight: 'medium',*/}
				{/*	}}*/}
				{/*	gutterBottom*/}
				{/*	color={'secondary'}*/}
				{/*	align={'center'}*/}
				{/*>*/}
				{/*	Categories*/}
				{/*</Typography>*/}
				<Typography
					variant="h4"
					align={'center'}
					data-aos={'fade-up'}
					gutterBottom
					sx={{
						fontWeight: 700,
					}}
				>
					Choose your product by categories
				</Typography>
				<Typography
					variant="h6"
					align={'center'}
					color={'text.secondary'}
					data-aos={'fade-up'}
				>
					Purchase Hydroponics products & accessories online:
				</Typography>
				<Box marginTop={2} display={'flex'} justifyContent={'center'}>
					<Button
						variant="contained"
						color="primary"
						size="large"
						endIcon={<ArrowForward />}
					>
						See all categories
					</Button>
				</Box>
			</Box>
			<Box>
				<Grid container spacing={4}>
					{mock.map((item, i) => (
						<Grid item xs={6} md={2} key={i}>
							<Box
								display={'block'}
								width={1}
								height={1}
								sx={{
									textDecoration: 'none',
									transition: 'all .2s ease-in-out',
									'&:hover': {
										transform: 'translateY(-4px)',
									},
								}}
							>
								<Box
									component={Card}
									padding={4}
									borderRadius={4}
									width={1}
									height={1}
									bgcolor={'alternate.main'}
									data-aos={'fade-up'}
									data-aos-delay={i * 100}
								>
									<Box
										position={'relative'}
										display={'flex'}
										justifyContent={'center'}
									>
										<Box
											width={50}
											height={50}
											bgcolor={'secondary.main'}
											borderRadius={'100%'}
											sx={{
												transform: `translate(${theme.spacing(
													2,
												)}, ${theme.spacing(-2)})`,
												marginTop: 2,
											}}
										/>
										<Box
											sx={{
												color: 'primary.main',
												position: 'absolute',
												bottom: 0,
											}}
										>
											{item.icon}
										</Box>
									</Box>
									<Typography
										variant={'subtitle1'}
										align={'center'}
										sx={{ fontWeight: 500, marginTop: 2 }}
									>
										{item.title}
									</Typography>
								</Box>
							</Box>
						</Grid>
					))}
				</Grid>
			</Box>
		</Box>
	);
};

export default Categories;
