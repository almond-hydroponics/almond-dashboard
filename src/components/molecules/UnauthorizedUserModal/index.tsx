// react
import { connect } from 'react-redux';
// components
import Modal from '@components/atoms/Modal';
// thunk action creators
import { logoutUser } from '@modules/user';
// interfaces
import { UnauthorizedUserModalProps } from '@components/molecules/UnauthorizedUserModal/interfaces';

export const UnauthorizedUserModal = ({
	isModalOpen = false,
	user,
}: UnauthorizedUserModalProps): JSX.Element => {
	/**
	 * Logs the user out and reloads the page to refresh the app
	 * @returns {void}
	 */
	const logoutAndRedirectUser = (): void => {
		logoutUser();
		localStorage.removeItem('triedToAuthenticate');
		window.location.reload();
	};

	return (
		<Modal
			isModalOpen={isModalOpen}
			renderHeader={`Welcome, ${user?.firstName ?? 'User'}`}
			renderDialogText="You are currently not authorised to access Almond. Please contact almond.froyo@gmail.com for more details."
			submitButtonName="OK"
			onSubmit={logoutAndRedirectUser}
			onDismiss={logoutAndRedirectUser}
			onClose={() => {}}
		/>
	);
};

export const mapStateToProps = (state) => ({
	user: state.user,
});

export const mapDispatchToProps = (dispatch) => ({
	logoutUser: () => dispatch(logoutUser()),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(UnauthorizedUserModal);
