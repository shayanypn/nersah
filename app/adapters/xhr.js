'use strict';

import Promise from './../helpers/promise';
import xmlHttpRequest from './../helpers/xmlHttpRequest';
import httpHandler from './../helpers/httpHandler';

/**
 * XHR Adapter
 * @param  {Object} config         Ajax configs
 * @param  {Object} defaultHandler Http defeault ajax handler
 * @return {Object}                Request Xhr and promise
 */
module.exports = function xhrAdapter(config, defaultHandler) {
	const xmlHttp = xmlHttpRequest(config);

	return {
		'xhr': xmlHttp,
		'promise': new Promise(function (resolve, reject, updater) {
			/**
			 * [onResolve description]
			 * @type {[type]}
			 */
			httpHandler(xmlHttp, config, defaultHandler, {
				onResolve: resolve,
				onReject: reject,
				onUpdater: updater
			});
		}, defaultHandler)
	};
};
