'use strict';

import utils from './../utilities';
module.exports = function xmlHttpRequest(httpOption) {

	if ( httpOption.isValid() ) {
		let xmlHttp = window.XMLHttpRequest ? (new XMLHttpRequest()) : (new ActiveXObject('Microsoft.XMLHTTP'));

		// httpOption.data = httpOption.data || false;

		xmlHttp.open(httpOption.method, httpOption.getUrl(), true);



		httpOption
		.getHeaders()
		.forEach(function(header){
			xmlHttp.setRequestHeader(header.key, header.value);
		});

		xmlHttp.send(httpOption.getData());

		// xmlHttp.send(utils.toQueryString(httpOption.data));

		if (httpOption.tag) {
			xmlHttp['tag'] = httpOption.tag;
		}

		return xmlHttp;
	}

	return null;
};
