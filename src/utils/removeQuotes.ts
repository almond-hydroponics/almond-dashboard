/**
 * This function remove the double quotes from a string variable
 * @returns string
 */
const removeQuotes = (str: string): string => {
	if (str.charAt(0) === '"' && str.charAt(str.length - 1) === '"') {
		str = str.replace(/["']/g, '');
		return str;
	}
	return str;
};

export default removeQuotes;
