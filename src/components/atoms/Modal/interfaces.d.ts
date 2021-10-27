import { ReactNode } from 'react';

export interface ModalProps {
	isModalOpen: boolean;
	isRequesting?: boolean;
	loadingText?: string;
	renderHeader: ReactNode | string | null;
	renderContent?: ReactNode;
	renderDialogText?: ReactNode;
	fullScreen?: boolean;
	onClose: (e?) => void;
	submitButtonName?: string;
	disabled?: boolean;
	onSubmit?: (e?) => void;
	onDismiss?: (e?) => void;
	innerRef?: any;
	maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}
