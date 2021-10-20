import { useState, createContext, SyntheticEvent, MouseEvent } from 'react';
import { ComponentContextProps, ComponentContextState } from './interfaces';

const selectedIndex = JSON.parse(
	window.localStorage.getItem('selectedIndex') as string,
);

const ComponentContext = createContext({
	isMenuOpen: false,
	selectedIndex: selectedIndex || 0,
	isSelectDeviceModalOpen: false,
	isActivityDrawerOpen: false,
	isChangeRoleDialogOpen: false,
	activityLogsViewed: false,
	setMenuOpen: (_open: boolean) => {},
	setSelectedIndex: (_selectedIndex: number) => {},
	setDeviceModalOpen: (_open: boolean) => {},
	handleSelectDeviceModal: () => {},
	handleCloseDeviceModal: () => {},
	toggleActivityDrawer: (
		_isActivityDrawerOpen: boolean,
		_activityLogsViewed: boolean,
	) => {},
	toggleRoleChangeDialog: () => {},
	setSnackMessage: (_message: string) => {},
	setOpenSnack: (_open: boolean) => {},
	handleCloseSnack: (e: any) => {},
	snackMessage: '',
	isSnackOpen: false,
});

const ComponentProvider = ({
	children,
	...props
}: ComponentContextProps): JSX.Element => {
	const [state, setState] = useState<ComponentContextState>({
		isOpen: false,
		isMenuOpen: false,
		selectedIndex:
			JSON.parse(window.localStorage.getItem('selectedIndex') as string) || 0,
		isSelectDeviceModalOpen: false,
		isActivityDrawerOpen: false,
		isChangeRoleDialogOpen: false,
		activityLogsViewed: false,
		isSnackOpen: false,
		snackMessage: '',
	});

	const setMenuOpen = (isOpen: boolean) =>
		setState((prevState) => ({ ...prevState, isMenuOpen: isOpen }));

	const setOpenSnack = (isOpen: boolean) =>
		setState((prevState) => ({ ...prevState, isSnackOpen: isOpen }));

	const setSnackMessage = (message: string) =>
		setState((prevState) => ({ ...prevState, snackMessage: message }));

	const setSelectedIndex = (selectedIndex: number) => {
		setState((prevState) => ({ ...prevState, selectedIndex }));
		window.localStorage.setItem(
			'selectedIndex',
			JSON.stringify(selectedIndex),
		);
	};

	const setDeviceModalOpen = (isModalOpen: boolean) => {
		setState((prevState) => ({
			...prevState,
			isSelectDeviceModalOpen: isModalOpen,
		}));
	};

	const toggleActivityDrawer = (
		isActivityDrawerOpen: boolean,
		activityLogsViewed: boolean,
	) => {
		setState((prevState) => ({
			...prevState,
			isActivityDrawerOpen,
			activityLogsViewed,
		}));
	};

	const toggleRoleChangeDialog = () => {
		setState((prevState) => ({
			...prevState,
			isChangeRoleDialogOpen: !prevState.isChangeRoleDialogOpen,
			anchorEl: null,
		}));
	};

	const handleSelectDeviceModal = () => {
		setState((prevState) => ({
			...prevState,
			isSelectDeviceModalOpen: !prevState.isSelectDeviceModalOpen,
		}));
	};

	const handleCloseDeviceModal = () => {
		setState((prevState) => ({
			...prevState,
			isSelectDeviceModalOpen: !prevState.isSelectDeviceModalOpen,
		}));
	};

	const handleCloseSnack = (
		event: SyntheticEvent | MouseEvent,
		reason?: string,
	) => {
		if (reason === 'clickaway') {
			return;
		}
		setState((prevState) => ({ ...prevState, isSnackOpen: false }));
	};

	const {
		// eslint-disable-next-line no-shadow
		selectedIndex,
		isMenuOpen,
		isSelectDeviceModalOpen,
		isActivityDrawerOpen,
		isChangeRoleDialogOpen,
		activityLogsViewed,
		isSnackOpen,
		snackMessage,
	} = state;

	return (
		<ComponentContext.Provider
			value={{
				isMenuOpen,
				selectedIndex,
				isSelectDeviceModalOpen,
				isActivityDrawerOpen,
				isChangeRoleDialogOpen,
				activityLogsViewed,
				setSelectedIndex,
				setMenuOpen,
				setDeviceModalOpen,
				handleSelectDeviceModal,
				handleCloseDeviceModal,
				toggleActivityDrawer,
				toggleRoleChangeDialog,
				setSnackMessage,
				handleCloseSnack,
				setOpenSnack,
				isSnackOpen,
				snackMessage,
				...props,
			}}
		>
			{children}
		</ComponentContext.Provider>
	);
};

export { ComponentContext, ComponentProvider };
