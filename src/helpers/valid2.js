export const validStringNoId = (string, options, type) => {
	if (options && options.optional) {
		if (!string) {
			return string;
		}
	} else {
		if (!string) throw `No string provided`;
	}
	if (typeof string !== 'string')
		throw `Expected string, got ${typeof string}`;
	string = string.trim();
	if (string.length === 0) throw 'String cannot be only spaces';

	if (options) {
		if (options.min && string.length < options.min)
			throw `${type} is too short; minimum length is ${options.min}`;
		if (options.max && string.length > options.max)
			throw `${type} is too long; maximum length is ${options.max}`;
		if (options.regex && !options.regex.test(string))
			throw `${type} does not match requirements`;
		/* if (options.objectId && !ObjectId.isValid(string))
			throw `${type} is not a valid MongoDB ObjectId`; */
	}

	return string;
};