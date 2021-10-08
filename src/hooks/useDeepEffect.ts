import { dequal as deepEqual } from 'dequal';
import { useEffect, useRef } from 'react';

type UseEffectParams = Parameters<typeof useEffect>;
type EffectCallback = UseEffectParams[0];
type DependencyList = UseEffectParams[1];
type UseEffectReturn = ReturnType<typeof useEffect>;

const checkDeps = (deps: DependencyList) => {
	if (!deps || !deps.length) {
		throw new Error(
			'useDeepCompareEffect should not be used with no dependencies. Use React.useEffect instead.',
		);
	}
	if (deps.every(isPrimitive)) {
		throw new Error(
			'useDeepCompareEffect should not be used with dependencies that are all primitive values. Use React.useEffect instead.',
		);
	}
};

const isPrimitive = (val: unknown) => val == null || /^[sbn]/.test(typeof val);

const useDeepCompareMemoize = (value: DependencyList) => {
	const ref = useRef<DependencyList>();
	const signalRef = useRef<number>(0);

	if (!deepEqual(value, ref.current)) {
		ref.current = value;
		signalRef.current += 1;
	}

	return [signalRef.current];
};

const useDeepCompareEffect = (
	callback: EffectCallback,
	dependencies: DependencyList,
): UseEffectReturn => {
	if (process.env.NODE_ENV !== 'production') {
		checkDeps(dependencies);
	}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	return useEffect(callback, useDeepCompareMemoize(dependencies));
};

export const useDeepCompareEffectNoCheck = (
	callback: EffectCallback,
	dependencies: DependencyList,
): UseEffectReturn => {
	// eslint-disable-next-line react-hooks/exhaustive-deps
	return useEffect(callback, useDeepCompareMemoize(dependencies));
};

export default useDeepCompareEffect;
