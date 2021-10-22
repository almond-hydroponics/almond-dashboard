import { ReactNode } from 'react';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	IconButton,
	styled,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { ModalProps } from '@components/atoms/Modal/interfaces';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
	'& .MuDialogContent-root': {
		padding: theme.spacing(2),
	},
	'& .MuDialogActions-root': {
		padding: theme.spacing(1),
	},
	'& .MuiDialog-paper': {
		borderRadius: 12,
	},
}));

export interface DialogTitleProps {
	id: string;
	children?: ReactNode;
	onClose: () => void;
}

const BootstrapDialogTitle = ({
	children,
	onClose,
	...other
}: DialogTitleProps) => (
	<DialogTitle
		sx={{
			m: 0,
			p: 2,
			backgroundColor: 'rgba(66, 133, 244, 0.15)',
			color: (theme) => theme.palette.primary.main,
			fontSize: 16,
		}}
		{...other}
	>
		{children}
		{onClose ? (
			<IconButton
				aria-label="close"
				onClick={onClose}
				sx={{
					position: 'absolute',
					right: 8,
					top: 8,
					color: (theme) => theme.palette.grey[500],
				}}
			>
				<Close />
			</IconButton>
		) : null}
	</DialogTitle>
);

const Modal = ({
	isModalOpen,
	renderContent,
	fullScreen,
	onClose,
	renderHeader,
	submitButtonName,
	onSubmit,
	onDismiss,
	disabled = false,
	renderDialogText,
	isRequesting,
	loadingText = 'Loading...',
}: ModalProps): JSX.Element => {
	return (
		<BootstrapDialog
			onClose={onClose}
			aria-labelledby="customized-dialog-title"
			open={isModalOpen}
			fullScreen={fullScreen}
			maxWidth="xs"
		>
			<BootstrapDialogTitle id="customized-dialog-title" onClose={onClose}>
				{renderHeader}
			</BootstrapDialogTitle>
			<DialogContent sx={{ fontSize: 14 }}>
				<DialogContentText sx={{ paddingY: 2, fontSize: 14 }} gutterBottom>
					{renderDialogText}
				</DialogContentText>
				{renderContent}
			</DialogContent>
			<DialogActions>
				<Button variant="text" color="primary" onClick={onDismiss}>
					Dismiss
				</Button>
				{submitButtonName ? (
					<LoadingButton
						autoFocus
						variant="contained"
						color="primary"
						onClick={onSubmit}
						disabled={disabled}
						loading={isRequesting}
						loadingIndicator={loadingText}
					>
						{submitButtonName}
					</LoadingButton>
				) : null}
			</DialogActions>
		</BootstrapDialog>
	);
};

export default Modal;
