'use strict';

import HttpResponse from './../core/httpResponse';

/**
 * [statusText description]
 * @param  {[type]} httpReturn [description]
 * @param  {[type]} _handler   [description]
 * @return {[type]}            [description]
 */
let statusText = function (httpReturn, _handler) {

	let text = '';

	if (parseInt(httpReturn.statusCode) === httpReturn.statusCode && httpReturn.statusCode !== 0) {
		text = _handler[ httpReturn.statusCode ].statusCode;
	} else if (parseInt(httpReturn.statusCode) === httpReturn.statusCode && httpReturn.statusCode === 0) {
		if (httpReturn.readyState === 1) {
			text = 'loading';
		}
	}
	return text;
};

module.exports = function httpHandler(httpRequest, httpOption, defaultHandler, promise) {

	if (!httpRequest) {return;}

	let httpResponse = new HttpResponse();

	httpRequest.onreadystatechange = function () {

		/*   xmlHttp.readyState
			0 (uninitialized) or (request not initialized)
			1 (loading) or (server connection established)
			2 (loaded) or (request received)
			3 (interactive) or (processing request)
			4 (complete) or (request finished and response is ready)
			----------------------------------------------------------
			@jqXHR.readyState
			0   UNSENT  : The request is not initialized
			1   OPENED  : The request has been set up
			2   HEADERS_RECEIVED : The request has been sent
			3   LOADING : The request is in process
			4   DONE    : The request is complete
		*/
		httpResponse.readyState = httpRequest.readyState;

		/*
		* Grab http request status code
		*
		*/
		httpResponse.statusCode = httpRequest.status;
		httpResponse.statusText = statusText(httpResponse, defaultHandler);

		/*
		* Get http request, response in to wanted format
		* "success", "notmodified", "nocontent", "error", "timeout", "abort", "parsererror"
		*/
		httpResponse.setResponse(httpOption, httpRequest);

		promise.onUpdater(httpResponse, false);
	};

	/*
		httpRequest.onabort
		httpRequest.onerror
		httpRequest.onload
		httpRequest.onloadend
		httpRequest.onloadstart
		httpRequest.onprogress
		httpRequest.ontimeout
	*/

	httpRequest.onloadend = function () {
		if (httpRequest.readyState === XMLHttpRequest.DONE) {

			promise.onUpdater(httpResponse, true);

			setTimeout(()=>{
				if (httpResponse.isSuccess()) {
					promise.onResolve(httpResponse.response, httpResponse);
				} else {
					promise.onReject(httpResponse.response, httpResponse);
				}
			}, 1);
		}
	};
};
