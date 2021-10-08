import { Device } from '@modules/device/interfaces';

export interface DeviceManagementProps {
	// devices: Device[];
	isLoading: boolean;
}

export interface DeviceManagementState {
	isEditMode: boolean;
	devices: any;
	isDeleteModalOpen: boolean;
	showDeviceModal: boolean;
	isFormModalOpen: boolean;
	deviceId: string;
	deviceToEdit: string;
	selectedDevice: string;
}
