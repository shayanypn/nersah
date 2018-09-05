'use strict';

import utils from './../utilities';
import { GET, POST, PATCH, PUT } from './httpMethod';

/**
 * HTTP Option Object
 */
const httpOption = function () {

	// `url` is the server URL that will be used for the request
	this.url = '';

	// `method` is the request method to be used
	// when making the request
	// GET, DELETE, POST, PUT, PATCH, HEAD
	this.method = GET;

	/**
	 * the base url
	 * @type {String}
	 */
	this.urlBase = '';

	/**
	 * prefix of each url
	 * @type {String}
	 */
	this.urlPrefix = '';

	/**
	 * suffix of each url
	 * @type {String}
	 */
	this.urlSuffix = '';

	this.async = true;

	this.dataType = 'html';

	/**
	 * identifier of each http request
	 * @type {String}
	 */
	this.tag = null;

	/**
	 * `headers` are custom headers to be sent
	 * @type {Object}
	 */
	this.headers = {};

	/**
	 * `headers` are custom headers to be sent
	 * @type {Function}
	 */
	this.headerFn;

	// `params` are the URL parameters
	// to be sent with the request
	// Must be a plain object or a URLSearchParams object
	this.params = {};

};

httpOption.prototype.setDefault = function () {

	if (typeof arguments['0'] === 'object') {
		const _this = this,
		options = arguments['0'],
		stringProps = ['urlBase', 'urlPrefix', 'urlSuffix', 'method', 'dataType', 'tag'];

		stringProps.forEach(function (props) {
			if (typeof options[props] === 'string') {
				_this[props] = options[props];
			}
		});

		/**
		 * get headers
		 */
		if (typeof options.headers === 'object') {
			this.headers = options.headers;
		} else if (typeof options.headers === 'function') {
			this.headerFn = options.headers;
		}

	} else {
		console.error('invalid option');
	}
};

httpOption.prototype.extend = function () {
	const _this = this;
	let options;

	if (typeof arguments['0'] === 'string') {
		options = {
			url: arguments['0']
		};
	} else if (typeof arguments['0'] === 'object') {
		options = arguments['0'];
	} else {
		return;
	}

	['url', 'method', 'dataType', 'data', 'tag']
	.forEach(function (prop) {
		if (typeof options[prop] !== 'undefined') {
			_this[prop] = options[prop];
		}
	});

	/**
	 * set header
	 */
	if (typeof options.headers === 'object' && Object.keys(options.headers).length > 0) {
		Object.keys(options.headers)
		.forEach(function (name) {
			_this.headers[name] = options.headers[name];
		});
	} else if (typeof options.headers === 'function') {
		_this.headers = options.headers;
	}

	/**
	 * Params
	 */
	if (utils.isObject(options.params)) {
		this.params = options.params;
	}

};

httpOption.prototype.isValid = function () {
	return true;
};

httpOption.prototype.getUrl = function () {
	const _this = this;
	const queries = [];
	let url = '';

	if (this.url.split('?').length > 1) {

		this.url.split('?').forEach(x=>{
			const param = x.split('=');

			if (param.length === 2) {queries.push(x);}
		});
	}

	/**
	 * Sepecify the URL
	 */
	if (this.url.indexOf('http') > -1 || this.url.indexOf('//') > -1) {
		url = this.url;
	} else {
		if (this.url.split('')[0] === '~' || this.url.split('')[0] === '/') {
			url = this.urlBase;

			if (this.urlPrefix && this.urlPrefix !== '') {
				url += (this.urlPrefix + '/');
			}

			url += this.url.slice(1, url.length);
			url += this.urlSuffix;
		} else {
			url = this.url;
		}
	}

	const paramKeys = Object.keys(this.params);

	if (paramKeys.length) {
		paramKeys.forEach(x =>{
			queries.push(x + '=' + _this.params[x]);
		});
	}

	if (url.indexOf('?') !== -1) {
		url = url.slice(0, url.indexOf('?'));
	}

	if (queries.length) {
		url += '?' + queries.join('&');
	};

	return url;
};

httpOption.prototype.getData = function () {

	if (this.method === POST ||
		this.method === PATCH ||
		this.method === PUT) {

		if (this.dataType === 'json') {
			return utils.toJSON(this.data);
		}

		return utils.toQueryString(this.data);
	}

	return null;
};

httpOption.prototype.getHeaders = function () {
	let headers;

	if (typeof this.headerFn === 'function') {
		headers = this.headerFn();
	}

	if (typeof this.headers === 'object') {
		headers = Object.assign(headers ? headers : {}, this.headers);
	} else if (typeof this.headers === 'function') {
		headers = this.headers(headers ? headers : {});
	}

	if (typeof headers === 'object') {

		return Object.keys(headers)
			.map(function (key) {
				return {
					'key': key,
					'value': headers[key]
				};
			});
	}

	return [];
};
module.exports = httpOption;
