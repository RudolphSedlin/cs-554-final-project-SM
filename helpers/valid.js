import { ObjectId } from 'mongodb';

export const validString = (string, options) => {
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
			throw `${string} is too short; minimum length is ${options.min}`;
		if (options.max && string.length > options.max)
			throw `${string} is too long; maximum length is ${options.max}`;
		if (options.regex && !options.regex.test(string))
			throw `${string} does not match requirements`;
		if (options.objectId && !ObjectId.isValid(string))
			throw `${string} is not a valid MongoDB ObjectId`;
	}

	return string;
};

export const validNumber = (number, options) => {
	if (number === null || number == undefined) throw 'No number provided';
	if (typeof number !== 'number') throw `${number} is not a number`;

	if (options) {
		if (options.min && number < options.min)
			throw `${number} is too low; minimum is ${options.min}`;
		if (options.max && number > options.max)
			throw `${number} is too high; maximum is ${options.max}`;
	}

	return number;
};

export const validObjectId = (objectId) => {
	objectId = validString(objectId);
	if (!ObjectId.isValid(objectId)) throw `Invalid ObjectId`;
	return objectId;
};

const _isLeapYear = (year) => {
	year = parseInt(year);
	return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
};

export const validDate = (date, options) => {
	if (!date) throw 'No date provided';
	date = validString(date, {
		regex: /^(0?[1-9]|1[012])\/(0?[1-9]|[12][0-9]|3[01])\/\d{4}$/
	});
	let [month, day, year] = date.split('/');
	month = parseInt(month);
	day = parseInt(day);
	year = parseInt(year);

	switch (month) {
		case 2:
			if (_isLeapYear(year)) {
				if (day > 29) throw `Invalid date: ${date}`;
			} else {
				if (day > 28) throw `Invalid date: ${date}`;
			}
			break;
		case 4:
		case 6:
		case 9:
		case 11:
			if (day > 30) throw `Invalid date: ${date}`;
			break;
		default:
			if (day > 31) throw `Invalid date: ${date}`;
	}

	if (options) {
		if (options.min) {
			options.min = validDate(options.min);
			const minDate = new Date(options.min);
			const checkDate = new Date(date);
			if (checkDate < minDate)
				throw `${checkDate.toString()} is before the earliest date allowed (${minDate.toString()})`;
		}
		if (options.max) {
			options.max = validDate(options.max);
			const maxDate = new Date(options.max);
			const checkDate = new Date(date);
			if (checkDate > maxDate)
				throw `${checkDate.toString()} is after the latest date allowed (${maxDate.toString()})`;
		}
		if (options.past) {
			const today = new Date();
			const checkDate = new Date(date);
			if (today <= checkDate)
				throw `${checkDate.toString()} is in the future`;
		}
	}

	return date;
};

export const validName = (name, max) => {
	if (!name) throw 'No name provided';
	name = validString(name, { max: max, regex: /^[A-Za-z ]+$/ });

	return name;
};
