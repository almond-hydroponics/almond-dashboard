import Link from 'next/link';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import { Stack, Divider } from '@mui/material';
import dayjs from '@utils/dayjsTime';

const MostViewedArticles = ({ posts }): JSX.Element => {
	const theme = useTheme();

	console.log(
		'Class: , Function: MostViewedArticles, Line 16 posts():',
		posts,
	);

	return (
		<Box>
			<Grid container spacing={4}>
				{posts.map((item, i) => {
					const { title, featuredImage, date, author, excerpt, tags, slug } =
						item?.node;

					const fullName =
						`${author.node.firstName} ${author.node.lastName}` ??
						author.node.name;
					const formattedDate = dayjs(date).fromNow();
					const tag = tags.edges[0]?.node?.name ?? '';

					return (
						<Grid item xs={12} key={i}>
							<Box
								component={Card}
								width={1}
								height={1}
								borderRadius={0}
								boxShadow={0}
								display={'flex'}
								flexDirection={{ xs: 'column', md: 'row' }}
								sx={{ backgroundImage: 'none', bgcolor: 'transparent' }}
								paddingTop={2}
							>
								<Link href={`/blog/${slug}`}>
									<Box
										sx={{
											width: { xs: 1, md: '30%' },
											'& .lazy-load-image-loaded': {
												height: 1,
												display: 'flex !important',
											},
										}}
									>
										<Box
											component={LazyLoadImage}
											height={1}
											width={{ xs: 1, md: 0.8 }}
											src={featuredImage.node.sourceUrl}
											alt="..."
											effect="blur"
											sx={{
												borderRadius: 1,
												objectFit: 'cover',
												height: 150,
												cursor: 'pointer',
												filter:
													theme.palette.mode === 'dark'
														? 'brightness(0.7)'
														: 'none',
											}}
										/>
									</Box>
								</Link>
								<CardContent
									sx={{
										width: { xs: 1, md: '70%' },
										display: 'flex',
										flexDirection: 'column',
										justifyContent: 'center',
										padding: { xs: 0, md: 1 },
									}}
								>
									<Link href={`/blog/${slug}`}>
										<Typography
											fontWeight={700}
											marginTop={{ xs: 1, md: 0 }}
											sx={{ cursor: 'pointer' }}
											variant={'h4'}
										>
											{title}
										</Typography>
									</Link>
									<Box marginY={1}>
										<Stack
											direction="row"
											justifyContent="space-between"
											alignItems="center"
											spacing={2}
										>
											<div>
												<Typography
													variant={'caption'}
													color={'text.secondary'}
													// component={'i'}
												>
													{fullName} - {formattedDate}
												</Typography>
												<Chip
													component={'a'}
													href={''}
													label={tag}
													clickable
													sx={{ margin: 0.5, fontSize: 12 }}
													size={'small'}
												/>
											</div>
										</Stack>
									</Box>
									<Typography
										color="text.secondary"
										dangerouslySetInnerHTML={{ __html: excerpt }}
									/>
								</CardContent>
							</Box>
							<Box paddingBottom={2}>
								<Divider />
							</Box>
						</Grid>
					);
				})}
			</Grid>
		</Box>
	);
};

export default MostViewedArticles;
