import { Minimal } from '../../layouts';
import {
	Box,
	Button,
	Checkbox,
	CssBaseline,
	Divider,
	FormControlLabel,
	Grid,
	Paper,
	Step,
	StepLabel,
	Stepper,
	Typography,
} from '@mui/material';
import { ConnectionForm, Form } from './components';
import Container from '@components/Container';
import {
	AddDeviceIllustration,
	AddDeviceIllustration1,
	AddDeviceIllustration2,
	AddDeviceIllustration3,
} from '../../svg/illustrations';
import { createContext, ReactNode, useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import {
	ArrowForward,
	KeyboardArrowLeft,
	KeyboardArrowRight,
} from '@mui/icons-material';
import { useHistory } from 'react-router-dom';

export const EnterDeviceContext = createContext({ handleNext: () => {} });

const steps = ['Add new device', 'Configure connectivity', 'Go to dashboard'];

export const EnterDeviceIdView = (): JSX.Element => {
	const router = useHistory();
	const theme = useTheme();
	const isSm = useMediaQuery(theme.breakpoints.down('sm'), {
		defaultMatches: true,
	});

	const [activeStep, setActiveStep] = useState<number>(0);
	const [skipped, setSkipped] = useState(new Set<number>());

	const isStepOptional = (step: number) => step === 1;
	const isStepSkipped = (step: number) => skipped.has(step);

	const handleNext = () => {
		let newSkipped = skipped;
		if (isStepSkipped(activeStep)) {
			newSkipped = new Set(newSkipped.values());
			newSkipped.delete(activeStep);
		}

		setActiveStep((prevActiveStep) => prevActiveStep + 1);
		setSkipped(newSkipped);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleSkip = () => {
		if (!isStepOptional(activeStep)) {
			// You probably want to guard against something like this,
			// it should never occur unless someone's actively trying to break something.
			throw new Error("You can't skip a step that isn't optional.");
		}

		setActiveStep((prevActiveStep) => prevActiveStep + 1);
		setSkipped((prevSkipped) => {
			const newSkipped = new Set(prevSkipped.values());
			newSkipped.add(activeStep);
			return newSkipped;
		});
	};

	const activePage = (page: number) => {
		switch (page) {
			case 0:
				return (
					<>
						<Box height={1} width={1} maxWidth={300} paddingBottom={1}>
							<AddDeviceIllustration />
						</Box>
						<Box height={1} width={1} maxWidth={500}>
							<Typography variant={'subtitle2'} color={'text.secondary'}>
								The device ID will help you to control your purchased device
								from Almond. Kindly enter the 8 digit provided on purchase.
							</Typography>
						</Box>
						<Box paddingY={2}>
							<Divider />
						</Box>
						<Box height={1} width={1} maxWidth={500}>
							<Form />
						</Box>
					</>
				);
			case 1:
				return (
					<>
						<Box height={1} width={1} maxWidth={300} paddingBottom={1}>
							<AddDeviceIllustration1 />
						</Box>
						<Box height={1} width={1} maxWidth={500}>
							<Typography variant={'subtitle2'} color={'text.secondary'}>
								Setup your WIFI configuration for the device. Make sure your
								device is powered on to complete this step.
							</Typography>
						</Box>
						<Box paddingY={2}>
							<Divider />
						</Box>
						<Box height={1} width={1} maxWidth={500}>
							<ConnectionForm />
						</Box>
					</>
				);
			case 2:
				return (
					<>
						<Box height={1} width={1} maxWidth={400} paddingBottom={1}>
							<AddDeviceIllustration3 />
						</Box>
						<Box height={1} width={1} maxWidth={500}>
							<Grid container>
								<Grid item xs={12}>
									<Typography variant="h6" gutterBottom>
										Notifications and alerts
									</Typography>
									<Typography variant={'subtitle2'} color={'text.secondary'}>
										Your device has been setup successfully. Below are some of
										the default notification settings to receive from your
										device. Push notifications have been set to default true.
									</Typography>
									<Box>
										<Box>
											<FormControlLabel
												control={
													<Checkbox defaultChecked disabled color="primary" />
												}
												label="Push notifications"
											/>
										</Box>
										<Box>
											<FormControlLabel
												control={<Checkbox defaultChecked color="primary" />}
												label="E-mail alerts"
											/>
										</Box>
										<Box>
											<FormControlLabel
												control={<Checkbox defaultChecked color="primary" />}
												label="Text messages"
											/>
										</Box>
									</Box>
									<Grid item xs={12} paddingY={2}>
										<Divider />
									</Grid>
									<Grid item container justifyContent="flex-start" xs={12}>
										<Button
											fullWidth
											variant="contained"
											type="submit"
											color="primary"
											size="large"
										>
											Save
										</Button>
									</Grid>
								</Grid>
							</Grid>
						</Box>
					</>
				);
			default:
				return (
					<>
						<Box height={1} width={1} maxWidth={300} paddingBottom={1}>
							<AddDeviceIllustration2 />
						</Box>
						<Box height={1} width={1} maxWidth={500}>
							<Typography variant={'subtitle2'} color={'text.secondary'}>
								Setup your WIFI configuration for the device. Make sure your
								device is powered on to complete this step.
							</Typography>
						</Box>
						<Box paddingY={2}>
							<Divider />
						</Box>
					</>
				);
		}
	};

	const renderBottomNavigation = (): JSX.Element => (
		<Box sx={{ pb: 7 }} maxWidth={'700px'}>
			<CssBaseline />
			<Paper
				sx={{
					position: 'fixed',
					bottom: 0,
					left: 0,
					right: 0,
				}}
				elevation={0}
			>
				<Box
					height={1}
					width={1}
					maxWidth={'100%'}
					sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}
				>
					<Button
						color="inherit"
						disabled={activeStep === 0}
						onClick={handleBack}
						sx={{ mr: 1 }}
					>
						{theme.direction === 'rtl' ? (
							<KeyboardArrowRight />
						) : (
							<KeyboardArrowLeft />
						)}
						Back
					</Button>
					<Box sx={{ flex: '1 1 auto' }} />
					{isStepOptional(activeStep) && (
						<Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
							Skip
						</Button>
					)}
					<Button onClick={handleNext}>
						{activeStep === steps.length - 1 ? 'Finish' : 'Next'}
						{theme.direction === 'rtl' ? (
							<KeyboardArrowLeft />
						) : (
							<KeyboardArrowRight />
						)}
					</Button>
				</Box>
			</Paper>
		</Box>
	);

	return (
		<EnterDeviceContext.Provider value={{ handleNext }}>
			<Minimal>
				<Box
					position={'relative'}
					// minHeight={'100vh'}
					display={'flex'}
					alignItems={'center'}
					justifyContent={'center'}
					height={1}
				>
					<Container
						maxWidth={{ sm: 720, md: 960 }}
						paddingTop={'0 !important'}
					>
						<Grid
							container
							direction="column"
							justifyContent="center"
							alignItems="center"
						>
							<Box height={1} width={1} maxWidth={700} paddingBottom={3}>
								<Stepper activeStep={activeStep} alternativeLabel={isSm}>
									{steps.map((label, index) => {
										const stepProps: { completed?: boolean } = {};
										const labelProps: {
											optional?: ReactNode;
										} = {};
										if (isStepOptional(index)) {
											labelProps.optional = (
												<Typography variant="caption">(Optional)</Typography>
											);
										}
										if (isStepSkipped(index)) {
											stepProps.completed = false;
										}
										return (
											<Step key={label} {...stepProps}>
												<StepLabel {...labelProps}>{label}</StepLabel>
											</Step>
										);
									})}
								</Stepper>
							</Box>

							{activeStep === steps.length ? (
								<>
									<Box height={1} width={1} maxWidth={300} paddingBottom={1}>
										<AddDeviceIllustration2 />
									</Box>
									<Typography sx={{ mt: 2, mb: 1 }}>
										Hooray! All steps have completed successfully.
									</Typography>
									<Box maxWidth={400} paddingY={2}>
										<Divider />
									</Box>
									<Box maxWidth={400}>
										<Button
											fullWidth
											variant="contained"
											color="primary"
											size="large"
											onClick={() => router.push('/dashboard')}
											endIcon={<ArrowForward />}
										>
											Go to dashboard
										</Button>
									</Box>
								</>
							) : (
								<>
									{activePage(activeStep)}
									<Box
										height={1}
										width={1}
										// maxWidth={'100%'}
										sx={{
											display: { xs: 'none', md: 'flex' },
											flexDirection: 'row',
											pt: 2,
										}}
									>
										<Button
											color="inherit"
											disabled={activeStep === 0}
											onClick={handleBack}
											sx={{ mr: 1 }}
										>
											{theme.direction === 'rtl' ? (
												<KeyboardArrowRight />
											) : (
												<KeyboardArrowLeft />
											)}
											Back
										</Button>
										<Box sx={{ flex: '1 1 auto' }} />
										{isStepOptional(activeStep) && (
											<Button
												color="inherit"
												onClick={handleSkip}
												sx={{ mr: 1 }}
											>
												Skip
											</Button>
										)}
										<Button onClick={handleNext}>
											{activeStep === steps.length - 1 ? 'Finish' : 'Next'}
											{theme.direction === 'rtl' ? (
												<KeyboardArrowLeft />
											) : (
												<KeyboardArrowRight />
											)}
										</Button>
									</Box>
									{/*{renderBottomNavigation()}*/}
									{isSm && renderBottomNavigation()}
								</>
							)}
						</Grid>
					</Container>
				</Box>
			</Minimal>
		</EnterDeviceContext.Provider>
	);
};

export default EnterDeviceIdView;
