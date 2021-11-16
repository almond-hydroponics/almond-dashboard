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
	Stack,
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
import { alpha, useTheme } from '@mui/material/styles';
import {
	ArrowBack,
	ArrowForward,
	KeyboardArrowLeft,
	KeyboardArrowRight,
} from '@mui/icons-material';
import { useRouter } from 'next/router';
import { requestPermission } from '@utils/Firebase/firebaseMessaging';

export const EnterDeviceContext = createContext({ handleNext: () => {} });

const steps = ['Add new device', 'Configure connectivity', 'Go to dashboard'];

const EnterDeviceIdView = (): JSX.Element => {
	const router = useRouter();
	const theme = useTheme();
	const isSm = useMediaQuery(theme.breakpoints.down('sm'), {
		defaultMatches: true,
	});

	const [value, setValue] = useState(0);

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
					<Grid
						container
						direction={{ xs: 'column', md: 'row' }}
						justifyContent="space-evenly"
						alignItems="center"
						spacing={3}
					>
						<Grid item xs maxHeight={{ xs: 200, md: 'unset' }}>
							<AddDeviceIllustration />
						</Grid>
						<Grid item xs>
							<Box maxWidth={500}>
								<Typography variant={'body2'} color={'text.secondary'}>
									The device ID will help you to control your purchased device
									from Almond. Kindly enter the 8 digit provided on purchase.
								</Typography>
							</Box>
							<Box paddingY={{ xs: 3, md: 4 }}>
								<Divider />
							</Box>
							<Box width={1} maxWidth={500}>
								<Form />
							</Box>
						</Grid>
					</Grid>
				);
			case 1:
				return (
					<Grid
						container
						direction={{ xs: 'column', md: 'row' }}
						justifyContent="space-evenly"
						alignItems="center"
						spacing={3}
					>
						<Grid item xs maxHeight={{ xs: 200, md: 'unset' }}>
							<AddDeviceIllustration1 />
						</Grid>
						<Grid item xs>
							<Box maxWidth={500}>
								<Typography variant={'body2'} color={'text.secondary'}>
									Setup your WIFI configuration for the device. Make sure your
									device is powered on to complete this step.
								</Typography>
							</Box>
							<Box paddingY={{ xs: 3, md: 4 }}>
								<Divider />
							</Box>
							<Box height={1} width={1} maxWidth={500} paddingBottom={5}>
								<ConnectionForm />
							</Box>
						</Grid>
					</Grid>
				);
			case 2:
				return (
					<Grid
						container
						direction={{ xs: 'column', md: 'row' }}
						justifyContent="space-evenly"
						alignItems="center"
						spacing={3}
					>
						<Grid item xs maxHeight={{ xs: 200, md: 'unset' }}>
							<AddDeviceIllustration3 />
						</Grid>
						<Grid item xs>
							<Box height={1} width={1} maxWidth={500}>
								<Grid container>
									<Grid item xs={12}>
										<Typography variant="h6" gutterBottom>
											Notifications and alerts
										</Typography>
										<Typography variant={'body2'} color={'text.secondary'}>
											Your device has been setup successfully. Below are some
											of the default notification settings to receive from your
											device.
										</Typography>
										<Box>
											<Box>
												<FormControlLabel
													control={<Checkbox color="primary" />}
													label="Push notifications"
													onChange={requestPermission}
												/>
											</Box>
											<Box>
												<FormControlLabel
													control={<Checkbox color="primary" />}
													label="E-mail alerts"
												/>
											</Box>
											<Box>
												<FormControlLabel
													control={<Checkbox color="primary" />}
													label="Text messages"
												/>
											</Box>
										</Box>
										<Grid
											item
											container
											justifyContent="flex-start"
											xs={12}
											paddingBottom={5}
										>
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
						</Grid>
					</Grid>
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
		<Box sx={{ minWidth: 500 }}>
			<Paper
				sx={{
					position: { xs: 'fixed' },
					bottom: 0,
					left: 0,
					right: 0,
					background: theme.palette.alternate.main,
					paddingY: 1,
					// borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
				}}
				elevation={0}
			>
				<Stack
					direction="row"
					justifyContent="space-around"
					alignItems="center"
					spacing={2}
				>
					<Button
						variant="outlined"
						onClick={handleBack}
						disabled={activeStep === 0}
						startIcon={
							theme.direction === 'rtl' ? (
								<KeyboardArrowRight />
							) : (
								<KeyboardArrowLeft />
							)
						}
					>
						Back
					</Button>
					<Button
						variant="outlined"
						onClick={handleNext}
						endIcon={
							theme.direction === 'rtl' ? (
								<KeyboardArrowLeft />
							) : (
								<KeyboardArrowRight />
							)
						}
					>
						{activeStep === steps.length - 1
							? 'Finish'
							: isStepOptional(activeStep)
							? 'Skip'
							: 'Next'}
					</Button>
				</Stack>
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
					// height={1}
				>
					<Container maxWidth={{ sm: 720, md: 960 }}>
						<Grid container>
							<Grid
								item
								container
								justifyContent={'center'}
								xs={12}
								paddingBottom={4}
							>
								<Box
									height={1}
									width={1}
									maxWidth={700}
									paddingBottom={{ xs: 0, md: 6 }}
								>
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
							</Grid>

							{activeStep === steps.length ? (
								<Grid
									container
									direction={{ xs: 'column', md: 'row' }}
									justifyContent="space-evenly"
									alignItems="center"
									spacing={3}
								>
									<Grid item xs maxHeight={{ xs: 200, md: 'unset' }}>
										<AddDeviceIllustration2 />
									</Grid>
									<Grid item xs>
										<Typography
											variant={'body1'}
											color={'text.secondary'}
											sx={{ mt: 2, mb: 1 }}
										>
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
									</Grid>
								</Grid>
							) : (
								<>{activePage(activeStep)}</>
							)}
						</Grid>
						{renderBottomNavigation()}
					</Container>
				</Box>
			</Minimal>
		</EnterDeviceContext.Provider>
	);
};

export default EnterDeviceIdView;
