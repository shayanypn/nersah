/* global ActiveXObject */
'use strict';

module.exports = function xmlHttpRequest(httpOption) {

	if (httpOption.isValid()) {
		const xmlHttp = window.XMLHttpRequest ? (new XMLHttpRequest()) : (new ActiveXObject('Microsoft.XMLHTTP'));

		xmlHttp.open(httpOption.method, httpOption.getUrl(), true);

		httpOption
		.getHeaders()
		.forEach(function (header) {
			xmlHttp.setRequestHeader(header.key, header.value);
		});

		/**
		 * Set request body
		 */
		xmlHttp.send(httpOption.getData());

		if (httpOption.tag) {
			xmlHttp['tag'] = httpOption.tag;
		}

		return xmlHttp;
	}

	return null;
};
