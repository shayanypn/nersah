'use strict';

/**
 * HTTP Response Object
 */
let httpResponse = function () {
	/**
	 * XHR state
	 * @jqXHR.readyState
	 * 0   UNSENT  : The request is not initialized | (uninitialized) or (request not initialized)
	 * 1   OPENED  : The request has been set up | (loading) or (server connection established)
	 * 2   HEADERS_RECEIVED : The request has been sent | (loaded) or (request received)
	 * 3   LOADING : The request is in process | (interactive) or (processing request)
	 * 4   DONE    : The request is complete | (complete) or (request finished and response is ready)
	*/
	this.readyState;

	/*
	* Get http request, response in to wanted format
	* "success", "notmodified", "nocontent", "error", "timeout", "abort", "parsererror"
	*/
	this.status;

	/**
	 * Http detail
	 */
	this.statusCode;
	this.statusText;

	this.rawResponse;
	this.response;
};

/**
 * set response
 */
httpResponse.prototype.setResponse = function () {
	let httpRequest = arguments[1],
	httpOption = arguments[0];

	this.rawResponse = httpRequest.response;
	if (httpOption.dataType === 'html') {
		this.response = httpRequest.responseText;
		this.status = 'success';
		return;
	}
	if (httpOption.dataType === 'xml') {
		this.response = httpRequest.responseXML;
		this.status = 'success';
		return;
	}
	if (httpOption.dataType === 'json') {
		try {
			this.response = window.JSON.parse(httpRequest.responseText);
			this.status = 'success';
		} catch (e) {
			this.response = null;
			this.status = 'parsererror';
		}
	}
};

/**
 * Return if response status is SUCCESS or Not
 * @return {Boolean}
 */
httpResponse.prototype.isSuccess = function () {
	return (this.statusCode >= 200 && this.statusCode < 300);
};

module.exports = httpResponse;
