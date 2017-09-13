'use strict';

import utils from './../utilities';

/**
 * [callHandler description]
 * @param  {[type]} httpReturn     [description]
 * @param  {[type]} defaultHandler [description]
 * @param  {[type]} customHandler  [description]
 */
module.exports = function callHandler(httpReturn, defaultHandler, customHandler) {
	let callBack;

	if (customHandler) {
		if (typeof customHandler === 'function') {
			callBack = customHandler;
		} else if (typeof customHandler === 'object') {
			defaultHandler = utils.extendCallback(defaultHandler, customHandler);
		}
	}

	if (!callBack) {
		let statusCallback = defaultHandler[httpReturn.status];

		if (typeof statusCallback === 'object' && statusCallback.callback) {
			callBack = statusCallback.callback;
		}
	}

	/**
	 * Call CallBack if exist
	 * @param  {Function} callBack function
	 */
	if (callBack) {
		callBack(httpReturn);
	}
};
