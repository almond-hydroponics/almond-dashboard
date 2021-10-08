import { useContext } from 'react';
import { UserContext } from '@context/UserContext';
import AdminSupportView from './AdminSupportView';
import UserSupportView from './UserSupportView';

export const SupportView = (): JSX.Element => {
	const { isAdmin } = useContext(UserContext);

	return isAdmin ? <AdminSupportView /> : <UserSupportView />;
};

export default SupportView;
