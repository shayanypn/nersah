'use strict';

import callbackHandler from './../helpers/callbackHandler';

/**
 * Promise Function
 * @param {Function} fn             [description]
 * @param {Object}   defaultHandler [description]
 * @param {Object}   _httpResponse    [description]
 */
let Promise = function (fn, defaultHandler, _httpResponse) {
	let state = 'pending',
	value,
	deferred = null,
	httpResponse = _httpResponse ? _httpResponse : {},
	responseHandler;

	function resolve(newValue, _httpResponse) {

		if (_httpResponse) {
			httpResponse = _httpResponse;
		}

		setTimeout(function() {
			try {
				if (newValue && typeof newValue.then === 'function') {
					newValue.then(resolve, reject);
					return;
				}
				state = 'resolved';
				value = newValue;

				if (deferred) {
					handle(deferred);
				}
			} catch (e) {
				reject(e, httpResponse);
			}
		},1);
	}

	function reject(reason, _httpResponse) {
		state = 'rejected';
		value = reason;

		if (_httpResponse) {
			httpResponse = _httpResponse;
		}

		setTimeout(function() {
			if (deferred) {
				handle(deferred);
			}
		},1);
	}

	function handle(handler) {
		if (state === 'pending') {
			deferred = handler;
			return;
		}

		if (responseHandler) {
			setTimeout(function() {
				callbackHandler(httpResponse, defaultHandler, responseHandler);
			}, 1);
		}

		let handlerCallback;

		if (state === 'resolved') {
			handlerCallback = handler.onResolved;
		} else {
			handlerCallback = handler.onRejected;
		}

		if (!handlerCallback) {
			if (state === 'resolved') {
				handler.resolve(value, httpResponse);
			} else {
				handler.reject(value, httpResponse);
			}

			return;
		}

		let ret;
		try {
			ret = handlerCallback(value, httpResponse);
			handler.resolve(ret, httpResponse);
		} catch (e) {
			handler.reject(e, httpResponse);
		}
	}

	function updater(_httpResponse, _callHandler) {

		if (_httpResponse) {
			httpResponse = _httpResponse;
		}

		if (_callHandler) {
			setTimeout(function() {
				callbackHandler(httpResponse, defaultHandler);
			}, 1);
		}
	}

	this.then = function (onResolved, onRejected) {
		return new Promise(function (resolve, reject) {
			handle({
				onResolved: onResolved,
				onRejected: onRejected,
				resolve: resolve,
				reject: reject
			});
		}, defaultHandler, httpResponse);
	};

	this.handler = function(onHandler, onResolved, onRejected) {

		responseHandler = onHandler;

		return new Promise(function (resolve, reject) {
			handle({
				onResolved: onResolved,
				onRejected: onRejected,
				resolve: resolve,
				reject: reject
			});
		}, defaultHandler, httpResponse);
	};

	fn(resolve, reject, updater);
};

module.exports = Promise;
