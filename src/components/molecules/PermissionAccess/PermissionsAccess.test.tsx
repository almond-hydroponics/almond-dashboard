// react libraries
import { render, screen } from '@testing-library/react';
// components
import PermissionAccess from '@components/molecules/PermissionAccess/index';

describe('PermissionAccess', () => {
	let props;

	props = {
		resources: [
			{
				_id: '5db373875e38b20ae991710d',
				name: 'Roles',
			},
		],
		permissions: [
			{ _id: '5e439ed9fd05da507ca0161c', type: 'Full Access' },
			{ _id: '5e44f86b2eeeee195403efcb', type: 'View' },
			{ _id: '5e439f32fd05da507ca0161e', type: 'Add' },
			{ _id: '5e456d694df0c437590ebc3e', type: 'Edit' },
			{ _id: '5e45bc5228c0d70f4a9363a3', type: 'Delete' },
		],
		getResources: jest.fn(),
	};
	const { asFragment } = render(<PermissionAccess {...props} />);

	it('should render the component without error', () => {
		expect(asFragment()).toMatchSnapshot();
	});

	// it('should set the state of resources and permissions with props passed to component', () => {
	//   expect(wrapper.state().resources).toEqual(props.resources);
	//   expect(wrapper.state().permissions).toEqual(props.permissions);
	// });
	//
	// it('should render each permission per checkbox for a single resource', () => {
	//   expect(wrapper.find('input[type="checkbox"]').length).toEqual(5);
	// });
	//
	// it.skip('should check view checkbox for Roles when checked', () => {
	//   expect(wrapper.find('mdc-checkbox').length).toBe(0);
	//   wrapper.find('input[type="checkbox"]').at(0).simulate('click');
	//   // expect(props.getResources).toHaveBeenCalled();
	//   expect(wrapper.find('Checkbox div').at(1).props().className).toBe('mdc-checkbox--selected');
	//   expect(wrapper.state().resources[0].permissionIds.length).toBe(1);
	//   expect(wrapper.state().resources[0].permissionIds).toContain('5e44f86b2eeeee195403efcb');
	// });
	//
	// it.skip('should uncheck view permission for Roles resource when unchecked', () => {
	//   wrapper.find('input[type="checkbox"]').at(1).simulate('click');
	//   expect(wrapper.find('Checkbox div').at(1).props().className).toBe('mdc-checkbox--selected');
	//   expect(wrapper.state().resources[0].permissionIds.length).toBe(0);
	// });
	//
	// it('should check all checkboxes for a resource when "Full Access" is checked ', () => {
	//   wrapper.find('input[type="checkbox"]').at(0).simulate('click');
	//   expect(wrapper.find('checkbox-container__checkbox-unchecked').length).toBe(0);
	// });
	//
	// it('should uncheck all checkboxes for a resource when "Full Access" is unchecked ', () => {
	//   wrapper.find('input[type="checkbox"]').at(0).simulate('click');
	//   expect(wrapper.find('checkbox-container__checkbox-checked').length).toBe(0);
	// });
	//
	// it.skip('should uncheck "Edit" and "Full access" when edit checkbox is unchecked', () => {
	//   wrapper.find('input[type="checkbox"]').at(0).simulate('click');
	//   wrapper.find('input[type="checkbox"]').at(3).simulate('click');
	//   expect(wrapper.find('.checkbox-container__checkbox-unchecked').length).toBe(2);
	//   expect(wrapper.find('CheckBox div').at(0).props().className).toBe('checkbox-container__checkbox-unchecked');
	//   expect(wrapper.find('CheckBox div').at(3).props().className).toBe('checkbox-container__checkbox-unchecked');
	//   expect(wrapper.find('.checkbox-container__checkbox-checked').length).toBe(3);
	// });
});
