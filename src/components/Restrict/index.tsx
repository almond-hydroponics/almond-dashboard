// helpers
import authorize from '@utils/authorize';
// interfaces
import { RestrictProps } from './interface';

const Restrict = (props: RestrictProps): JSX.Element => {
	const { fallback = null, strict = false } = props;
	return authorize(props.authorize, { strict })
		? props.children
		: (fallback as JSX.Element);
};

export default Restrict;
