'use strict';

import httpStatusCode from './../helpers/httpStatusCode';
import utils from './../utilities';
import xhrAdapter from './../adapters/xhr';
import HttpOption from './../core/httpOption';
import HttpResponse from './httpResponse';
import TagPromiseHandler from './../adapters/TagPromiseHandler';

export default function NERSAH() {
	let defaultHandler = httpStatusCode,
	defaultConfig,
	nersahTagName,
	tagPromiseHandler = new TagPromiseHandler(),
	/**
	 * [buildHttpOption description]
	 * @param  {[type]} method      [description]
	 * @param  {[type]} config      [description]
	 * @param  {[type]} use_default [description]
	 * @return {[type]}             [description]
	 */
	buildHttpOption = function (method, config, useDefault) {
		const option = new HttpOption();

		if (nersahTagName) {
			defaultConfig['tag'] = nersahTagName;
		}

		if (useDefault) {
			option.setDefault(defaultConfig);
		}

		option.method = method;
		option.extend(config);

		return option;
	},

	defaultHttpHandler = promise => {
		promise.xhr.onload = function () {
			const XHR = promise.xhr,
			response = new HttpResponse(),
			callbackHandler = defaultHandler[ XHR.status ];

			response.statusCode = XHR.status;

			tagPromiseHandler.observe(XHR.tag, response.statusCode, response.isSuccess());

			if (callbackHandler && typeof callbackHandler.callback === 'function') {
				callbackHandler.callback();
			}
		};
	};

	return {

		name: 'nersah',

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
			if (!utils.isArray(tag) && !utils.isString(tag)) {return null;}
			return tagPromiseHandler.add(tag);
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
		get: function (url, config, useDefault) {
			config = utils.isObject(config) ? config : {};
			config['url'] = url;

			const xhrObj = xhrAdapter(
				buildHttpOption('GET', config, useDefault),
				defaultHandler
			);

			defaultHttpHandler(xhrObj);

			return xhrObj.promise;
		},

		/**
		 * HTTP POST Request
		 * @param  {Object} 	HTTP Request Options
		 * @return {Promise}
		 */
		post: function (url, config, useDefault) {
			config = utils.isObject(config) ? config : {};
			config['url'] = url;

			const xhrObj = xhrAdapter(
				buildHttpOption('POST', config, useDefault),
				defaultHandler
			);

			defaultHttpHandler(xhrObj);

			return xhrObj.promise;
		},

		/**
		 * HTTP PATCH Request
		 * @param  {Object} 	HTTP Request Options
		 * @return {Promise}
		 */
		patch: function (config, useDefault) {
			let xhrObj = xhrAdapter(
				buildHttpOption('PATCH', config, useDefault),
				defaultHandler
			);

			// if (nersahTagName) {
			// 	tagPromiseHandler.add(nersahTagName, xhrObj);
			// }

			defaultHttpHandler(xhrObj);

			return xhrObj.promise;
		},

		/**
		 * HTTP PUT Request
		 * @param  {Object} 	HTTP Request Options
		 * @return {Promise}
		 */
		put: function (config, useDefault) {
			let xhrObj = xhrAdapter(
				buildHttpOption('PUT', config, useDefault),
				defaultHandler
			);

			// if (nersahTagName) {
			// 	tagPromiseHandler.add(nersahTagName, xhrObj);
			// }

			defaultHttpHandler(xhrObj);

			return xhrObj.promise;
		}

	};
};
