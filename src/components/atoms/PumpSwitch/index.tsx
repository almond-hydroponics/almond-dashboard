import * as React from 'react';
import clsx from 'clsx';
import { styled } from '@mui/system';
import { useSwitch, UseSwitchProps } from '@mui/base';

const SwitchRoot = styled('span')(`
  display: inline-block;
  position: relative;
  width: 62px;
  height: 34px;
  padding: 7px;
`);

const SwitchInput = styled('input')(`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0;
  z-index: 1;
  margin: 0;
  cursor: pointer;
`);

const SwitchThumb = styled('span')(
	({ theme }) => `
  position: absolute;
  display: block;
  width: 32px;
  height: 32px;
  border-radius: 16px;
  top: 1px;
  left: 7px;
  transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1);
  background-color: ${theme.palette.mode === 'dark' ? '#003892' : '#001e3c'};

  &:before {
    display: block;
    content: "";
    width: 100%;
    height: 100%;
    background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
			theme.palette.getContrastText(theme.palette.primary.main),
		)}" d="M19,13H5V11H19V13Z" /></svg>') center center no-repeat;
  }

  &.focusVisible {
    background-color: #79B;
  }

  &.checked {
    transform: translateX(16px);
    background-color: ${theme.palette.primary.main};

    &:before {
      background: url('data:image/svg+xml;<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="${encodeURIComponent(
				theme.palette.getContrastText(theme.palette.primary.main),
			)}"><g><rect fill="none" height="24" width="24"/></g><g><path d="M12,2C6.47,2,2,6.47,2,12c0,5.53,4.47,10,10,10s10-4.47,10-10C22,6.47,17.53,2,12,2z M12,20c-4.42,0-8-3.58-8-8 c0-4.42,3.58-8,8-8s8,3.58,8,8C20,16.42,16.42,20,12,20z"/></g></svg>') center center no-repeat;
  }
  }
`,
);

const SwitchTrack = styled('span')(
	({ theme }) => `
  background-color: ${theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be'};
  border-radius: 10px;
  width: 100%;
  height: 100%;
  display: block;

  &.checked {
    background-color: ${theme.palette.primary.main};
  }
`,
);

const PumpSwitch = (props: UseSwitchProps): JSX.Element => {
	const { getInputProps, checked, disabled, focusVisible } = useSwitch(props);

	const stateClasses = {
		checked,
		disabled,
		focusVisible,
	};

	return (
		<SwitchRoot className={clsx(stateClasses)}>
			<SwitchTrack>
				<SwitchThumb className={clsx(stateClasses)} />
			</SwitchTrack>
			<SwitchInput {...getInputProps()} aria-label="Demo switch" />
		</SwitchRoot>
	);
};

export default PumpSwitch;
