// react
import { useDispatch, useSelector } from 'react-redux';
// components
import Modal from '@components/atoms/Modal';
// thunk action creators
import { logoutUser } from '@modules/user';
// interfaces
import { UnauthorizedUserModalProps } from '@components/molecules/UnauthorizedUserModal/interfaces';
import { IRootState } from '../../../store/rootReducer';

export const UnauthorizedUserModal = ({
	isModalOpen = false,
}: UnauthorizedUserModalProps): JSX.Element => {
	const dispatch = useDispatch();
	const { userDetails } = useSelector(
		(globalState: IRootState) => globalState.user,
	);

	/**
	 * Logs the user out and reloads the page to refresh the app
	 * @returns {void}
	 */
	const logoutAndRedirectUser = (): void => {
		dispatch(logoutUser());
		localStorage.removeItem('triedToAuthenticate');
		window.location.reload();
	};

	return (
		<Modal
			isModalOpen={isModalOpen}
			renderHeader={`Welcome, ${userDetails?.firstName ?? 'User'}`}
			renderDialogText="You are currently not authorised to access the almond dashboard. Please contact almond.froyo@gmail.com for more details."
			submitButtonName="OK"
			onSubmit={logoutAndRedirectUser}
			onDismiss={logoutAndRedirectUser}
			onClose={logoutAndRedirectUser}
		/>
	);
};

export default UnauthorizedUserModal;
