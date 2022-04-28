/* eslint-disable react/no-unescaped-entities */
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

const Content = ({ content, avatar, fullName, date }): JSX.Element => {
	return (
		<Box>
			<Box paddingX={{ xs: 0, sm: 4, md: 6 }}>
				<Typography
					variant={'body1'}
					dangerouslySetInnerHTML={{ __html: content }}
				/>
			</Box>
			<Box paddingY={4}>
				<Divider />
			</Box>
			<Box
				display={'flex'}
				alignItems={'center'}
				justifyContent={'space-between'}
				flexWrap={'wrap'}
			>
				<Box display={'flex'} alignItems={'center'}>
					<Avatar
						sx={{ width: 50, height: 50, marginRight: 2 }}
						src={avatar}
					/>
					<Box>
						<Typography fontWeight={600}>{fullName}</Typography>
						<Typography color={'text.secondary'}>{date}</Typography>
					</Box>
				</Box>
				<Box display={'flex'} alignItems={'center'}>
					<Typography color={'text.secondary'}>Share:</Typography>
					<Box marginLeft={0.5}>
						<IconButton aria-label="Facebook">
							<FacebookIcon />
						</IconButton>
						<IconButton aria-label="Instagram">
							<InstagramIcon />
						</IconButton>
						<IconButton aria-label="Twitter">
							<TwitterIcon />
						</IconButton>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default Content;
