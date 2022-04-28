import { useEffect } from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';

import Container from 'components/Container';

const Hero = ({
	avatar,
	fullName,
	date,
	title,
	featuredImage,
}): JSX.Element => {
	useEffect(() => {
		const jarallaxInit = async () => {
			const jarallaxElems = document.querySelectorAll('.jarallax');
			if (!jarallaxElems || (jarallaxElems && jarallaxElems.length === 0)) {
				return;
			}

			const { jarallax } = await import('jarallax');
			jarallax(jarallaxElems, { speed: 0.2 });
		};

		jarallaxInit();
	});

	return (
		<Box
			className={'jarallax'}
			data-jarallax
			data-speed="0.2"
			position={'relative'}
			minHeight={{ xs: 300, sm: 300, md: 400 }}
			display={'flex'}
			alignItems={'center'}
			id="agency__portfolio-item--js-scroll"
		>
			<Box
				className={'jarallax-img'}
				sx={{
					position: 'absolute',
					objectFit: 'cover',
					/* support for plugin https://github.com/bfred-it/object-fit-images */
					fontFamily: 'object-fit: cover;',
					top: 0,
					left: 0,
					width: '100%',
					height: '100%',
					zIndex: -1,
					backgroundRepeat: 'no-repeat',
					backgroundSize: 'cover',
					backgroundPosition: 'center center',
					backgroundImage: `url(${featuredImage})`,
				}}
			/>
			<Box
				sx={{
					position: 'absolute',
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					width: 1,
					height: 1,
					background: alpha('#161c2d', 0.6),
					zIndex: 1,
				}}
			/>
			<Container position={'relative'} zIndex={2}>
				<Box>
					<Typography
						variant="h3"
						sx={{
							fontWeight: 500,
							color: 'common.white',
							marginBottom: 2,
						}}
					>
						{title}
					</Typography>
					<Box display={'flex'} alignItems={'center'}>
						<Avatar
							sx={{ width: 60, height: 60, marginRight: 2 }}
							src={avatar}
						/>
						<ListItemText
							sx={{ margin: 0 }}
							primary={fullName}
							secondary={date}
							primaryTypographyProps={{
								variant: 'h6',
								sx: { color: 'common.white' },
							}}
							secondaryTypographyProps={{
								sx: { color: alpha('#ffffff', 0.8) },
							}}
						/>
					</Box>
				</Box>
			</Container>
		</Box>
	);
};

export default Hero;
