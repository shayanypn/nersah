'use strict';

import httpStatusCode from './../helpers/httpStatusCode';
import utils from './../utilities';
import xhrAdapter from './../adapters/xhr';
import HttpOption from './../core/httpOption';
import Promise from './../helpers/promise';

const TagPromiseStore = [];
export default function NERSAH() {
	let defaultHandler = httpStatusCode,
	promises = [],
	defaultConfig,
	nersahTagName,
	nersahTagSequence,
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
	handleMultiPromise = promises => {
		return new Promise(function (resolve, reject, handler) {

			let successPromises = [],
			failPromises = [],
			mapRequests = function () {
				return promises.map(function (item) { return item.promise; });
			},
			didRequestSuccess = function (item) {
				if (successPromises.indexOf(item) === -1) {
					successPromises.push(item);
					if (successPromises.length === promises.length) {
						setTimeout(function () {
							resolve(mapRequests());
						}, 10);
					}
				}
			},
			didRequestFail = item => {
				if (failPromises.indexOf(item) === -1) {
					failPromises.push(item);
					if (
						failPromises.length !== 0 &&
						(failPromises.length + successPromises.length) === promises.length
						) {
						setTimeout(function () {
							reject(mapRequests());
						}, 10);
					}
				}
			};

			promises.forEach(function (promiseObj, index) {
				promiseObj.xhr.onload = function () {
					if (promiseObj.xhr.status >= 200 && promiseObj.xhr.status < 300) {
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
	handlePromise = _promise => {
		promises.push(_promise);
	},

	defaultHttpHandler = promise => {
		promise.xhr.onload = function () {
			let statusCode = promise.xhr.status,
			callbackHandler = defaultHandler[ statusCode ];

			if (callbackHandler && typeof callbackHandler.callback === 'function') {
				callbackHandler.callback();
			}
		};
	},

	storeRequest = (tag, request) => {
		const uuid = (new Date()).getTime();

		const isExist = TagPromiseStore.find( x => x.tag === tag);
		if (!isExist) {
			TagPromiseStore.push({
				tag: tag,
				promises: {}
			});
		}

		// [1,2,3,4,5].reduce((a,b)=>{
		// 	console.log(a,b);

		// 	return a+b;
		// })




		TagPromiseStore.map(x => {
			if (x.tag === tag) {
				x.promises[uuid] = request;
			}
			return x;
		})
	},
	HandleTagPromises = (tags, initial) =>{
		return new Promise( (resolve, reject, handler) => {
			ObserveTagPromise(tags, initial, resolve, reject, handler);
		});
	},
	ObserveTagPromise = (tags, initial, resolve, reject, handler) => {

		const OnPromiseLoaded = () => {
			if (promiseStatic.total === promiseStatic.success)
				resolve();
			else if (promiseStatic.total === promiseStatic.success + promiseStatic.fail )
				reject();
		},
		promiseStatic = {
			success: 0,
			fail: 0,
			pending: 0,
			total: 0,
		},
		tagPromiseStore = TagPromiseStore.filter(x => tags.indexOf(x.tag) !== -1 );

		nersahTagSequence = !initial ? nersahTagSequence : 0;

		if (!tagPromiseStore && tagPromiseStore.length) {
			return false;
		}

		tagPromiseStore.forEach( promise => {
			Object.keys(promise.promises).forEach( uuid => {
				promiseStatic.total++;
				promise.promises[uuid].xhr.onload = function (xhr) {
					
					const statusCode = xhr.originalTarget.status;

					if (statusCode == 0) 
						promiseStatic.pending++;
					else if (statusCode >= 200 && statusCode < 300) 
						promiseStatic.success++;
					else 
						promiseStatic.fail++;

					OnPromiseLoaded();
				};
			});
		});


		if (nersahTagSequence > 10) { return; }
		nersahTagSequence++;
		setTimeout(function(){
			ObserveTagPromise(tags, false, resolve, reject, handler);
		}, 1000);
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
			if (!utils.isArray(tag) && !utils.isString(tag)) {return null;}

			let tags = utils.isArray(tag) ? tag : tag.split(',');

			return HandleTagPromises(tags, true);
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

			if (nersahTagName) {
				storeRequest(nersahTagName, xhrObj);
			}

			defaultHttpHandler(xhrObj);

			handlePromise(xhrObj);

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

			handlePromise(xhrObj);
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

			handlePromise(xhrObj);
			return xhrObj.promise;
		}

	};
};
