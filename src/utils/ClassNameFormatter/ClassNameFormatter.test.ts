// components
import classNameFormatter from './index';

describe('ClassNameFormatter function', () => {
	it('should return classes matching conditions', () => {
		let className = classNameFormatter({
			'form-group': true,
			'form-group--hidden': true,
		});

		expect(className).toEqual('form-group form-group--hidden');

		className = classNameFormatter({
			'form-group': true,
			'form-group--hidden': false,
			'input-group': true,
		});

		expect(className).toEqual('form-group input-group');
	});

	it('should return classes matching conditions and add otherClasses if provided', () => {
		let className = classNameFormatter({ 'form-group': true }, 'input');

		expect(className).toEqual('form-group input');

		className = classNameFormatter(
			{
				'form-group': true,
				'form-group--hidden': false,
			},
			'input',
		);

		expect(className).toEqual('form-group input');
	});
});
