'use strict';

import httpStatusCode from './../helpers/httpStatusCode';
import utils from './../utilities';
import xhrAdapter from './../adapters/xhr';
import HttpOption from './../core/httpOption';
import Promise from './../helpers/promise';

export default function NERSAH() {
	let defaultHandler = httpStatusCode,
	promises = [],
	defaultConfig,
	nersahTagName,
	/**
	 * [buildHttpOption description]
	 * @param  {[type]} method      [description]
	 * @param  {[type]} config      [description]
	 * @param  {[type]} use_default [description]
	 * @return {[type]}             [description]
	 */
	buildHttpOption = function (method, config, useDefault) {
		let option = new HttpOption();

		if (nersahTagName) {
			defaultConfig['tag'] = nersahTagName;
		}

		if (useDefault !== false) {
			option.setDefault(defaultConfig);
		}

		option.method = method;
		option.extend(config);

		return option;
	},
	/**
	 * Multi Promise Handler
	 * @param  {Promise-Array} _promises
	 * @return {Promise}       [description]
	 */
	handleMultiPromise = function (_promises) {
		return new Promise(function (resolve, reject, handler) {

			let successItem = [],
			failItem = [];

			function didRequestSuccess(item) {
				if (successItem.indexOf(item) === -1) {
					successItem.push(item);
					if (successItem.length === _promises.length) {
						resolve(_promises.map(function (item) { return item.promise; }));
					}
				}
			}
			function didRequestFail(item) {
				if (failItem.indexOf(item) === -1) {
					failItem.push(item);
					if (failItem.length !== 0 && (failItem.length + successItem.length) === _promises.length) {
						reject(_promises.map(function (item) { return item.promise; }));
					}
				}
			}

			_promises.forEach(function (_promiseObj, index) {
				_promiseObj.xhr.onload = function () {
					if (_promiseObj.xhr.status >= 200 && _promiseObj.xhr.status < 300) {
						didRequestSuccess(index);
					} else {
						didRequestFail(index);
					}
				};
			});
		});
	},
	/**
	 * Promise Collector
	 * @param  {Promise} _promise [description]
	 */
	handlePromise = function (_promise) {
		promises.push(_promise);
	},

	handleDefault = function (promise) {

		promise.xhr.onload = function() {

			var statusCode = promise.xhr.status,
			callbackHandler = defaultHandler[ statusCode ];

			if (callbackHandler && typeof callbackHandler.callback === 'function') {
				callbackHandler.callback();
			}
		};
	};

	return {

		/**
		 * specify the http request to a tag
		 * @param  {String} 	tag name
		 * @return {this}
		 */
		setTag: function (tag) {
			nersahTagName = tag;
			return this;
		},

		/**
		 * get all http request with specify tag
		 * @param  {String|Array} 	tag name or array of tags
		 * @return {promise}     	promise of http calls with specify tag name
		 */
		tag: function (tag) {
			var _promises;

			if (!utils.isArray(tag) && !utils.isString(tag)) {return null;}

			let tags = utils.isArray(tag) ? tag : tag.split(',');

			_promises = utils.filter(promises, function (xhrObj) {
				return utils.includeArray(tags, xhrObj.xhr.tag);
			});

			return (_promises.length) ? handleMultiPromise(_promises) : null;
		},
		/**
		 * set default setting for ajax request
		 * @param  {Object} options	 	HTTP Request Options
		 * @param  {Object} hanlders 	HTTP Handler Option
		 */
		setDefault: function (options, hanlders) {

			if (options) {
				defaultConfig = options;
			}

			if (hanlders) {
				if (typeof hanlders === 'object') {
					defaultHandler = utils.extendCallback(defaultHandler, hanlders);
				} else if (typeof hanlders === 'function') {
					defaultHandler['default']['callback'] = hanlders;
				} else {
					console.error('Wrong ajax callback!');
				}
			}
		},

		/**
		 * HTTP GET Request
		 * @param  {Object} 	HTTP Request Options
		 * @return {Promise}
		 */
		get: function (config, useDefault) {
			let xhrObj = xhrAdapter(
				buildHttpOption('GET', config, useDefault),
				defaultHandler
			);

			handlePromise(xhrObj);

			handleDefault(xhrObj);

			return xhrObj.promise;
		},

		/**
		 * HTTP POST Request
		 * @param  {Object} 	HTTP Request Options
		 * @return {Promise}
		 */
		post: function (config, useDefault) {
			let xhrObj = xhrAdapter(
				buildHttpOption('POST', config, useDefault),
				defaultHandler
			);

			handlePromise(xhrObj);
			return xhrObj.promise;
		}

	};
};
