import { DependencyList, useEffect } from 'react';

const useEffectAsync = (effect: any, inputs: DependencyList | undefined) => {
	useEffect(() => {
		effect();
	}, inputs);
};

export default useEffectAsync;
