'use strict';

/**
 * HTTP Option Object
 */
let httpOptionBase = function() {

	// // `transformRequest` allows changes to the request data before it is sent to the server
	// // This is only applicable for request methods 'PUT', 'POST', and 'PATCH'
	// // The last function in the array must return a string or an instance of Buffer, ArrayBuffer,
	// // FormData or Stream
	// // You may modify the headers object.
	// transformRequest: [function (data, headers) {
	// // Do whatever you want to transform the data

	// return data;
	// }],

	// // `transformResponse` allows changes to the response data to be made before
	// // it is passed to then/catch
	// transformResponse: [function (data) {
	// // Do whatever you want to transform the data

	// return data;
	// }],

	// // `params` are the URL parameters to be sent with the request
	// // Must be a plain object or a URLSearchParams object
	// params: {
	// ID: 12345
	// },

	// // `paramsSerializer` is an optional function in charge of serializing `params`
	// // (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
	// paramsSerializer: function(params) {
	// return Qs.stringify(params, {arrayFormat: 'brackets'})
	// },

	// // `data` is the data to be sent as the request body
	// // Only applicable for request methods 'PUT', 'POST', and 'PATCH'
	// // When no `transformRequest` is set, must be of one of the following types:
	// // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
	// // - Browser only: FormData, File, Blob
	// // - Node only: Stream, Buffer
	// data: {
	// firstName: 'Fred'
	// },

	// // `timeout` specifies the number of milliseconds before the request times out.
	// // If the request takes longer than `timeout`, the request will be aborted.
	// timeout: 1000,

	// // `withCredentials` indicates whether or not cross-site Access-Control requests
	// // should be made using credentials
	// withCredentials: false, // default

	// // `adapter` allows custom handling of requests which makes testing easier.
	// // Return a promise and supply a valid response (see lib/adapters/README.md).
	// adapter: function (config) {
	// /* ... */
	// },

	// // `auth` indicates that HTTP Basic auth should be used, and supplies credentials.
	// // This will set an `Authorization` header, overwriting any existing
	// // `Authorization` custom headers you have set using `headers`.
	// auth: {
	// username: 'janedoe',
	// password: 's00pers3cret'
	// },

	// // `responseType` indicates the type of data that the server will respond with
	// // options are 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
	// responseType: 'json', // default

	// // `xsrfCookieName` is the name of the cookie to use as a value for xsrf token
	// xsrfCookieName: 'XSRF-TOKEN', // default

	// // `xsrfHeaderName` is the name of the http header that carries the xsrf token value
	// xsrfHeaderName: 'X-XSRF-TOKEN', // default

	// // `onUploadProgress` allows handling of progress events for uploads
	// onUploadProgress: function (progressEvent) {
	// // Do whatever you want with the native progress event
	// },

	// // `onDownloadProgress` allows handling of progress events for downloads
	// onDownloadProgress: function (progressEvent) {
	// // Do whatever you want with the native progress event
	// },

	// // `maxContentLength` defines the max size of the http response content allowed
	// maxContentLength: 2000,

	// // `validateStatus` defines whether to resolve or reject the promise for a given
	// // HTTP response status code. If `validateStatus` returns `true` (or is set to `null`
	// // or `undefined`), the promise will be resolved; otherwise, the promise will be
	// // rejected.
	// validateStatus: function (status) {
	// return status >= 200 && status < 300; // default
	// },

	// // `maxRedirects` defines the maximum number of redirects to follow in node.js.
	// // If set to 0, no redirects will be followed.
	// maxRedirects: 5, // default

	// // `httpAgent` and `httpsAgent` define a custom agent to be used when performing http
	// // and https requests, respectively, in node.js. This allows options to be added like
	// // `keepAlive` that are not enabled by default.
	// // httpAgent: new http.Agent({ keepAlive: true }),
	// // httpsAgent: new https.Agent({ keepAlive: true }),

	// // 'proxy' defines the hostname and port of the proxy server
	// // Use `false` to disable proxies, ignoring environment variables.
	// // `auth` indicates that HTTP Basic auth should be used to connect to the proxy, and
	// // supplies credentials.
	// // This will set an `Proxy-Authorization` header, overwriting any existing
	// // `Proxy-Authorization` custom headers you have set using `headers`.
	// proxy: {
	// host: '127.0.0.1',
	// port: 9000,
	// auth: {
	//   username: 'mikeymike',
	//   password: 'rapunz3l'
	// }
	// },

	// // `cancelToken` specifies a cancel token that can be used to cancel the request
	// // (see Cancellation section below for details)
	// // cancelToken: new CancelToken(function (cancel) {
	// // })
};

let httpOption = function() {

	// `url` is the server URL that will be used for the request
	this.url = '';

	// `method` is the request method to be used when making the request
	this.method = 'GET'; //'GET', 'DELETE', 'POST', 'PUT', 'PATCH', 'HEAD'

	// `baseURL` will be prepended to `url` unless `url` is absolute.
	// It can be convenient to set `baseURL` for an instance of axios to pass relative URLs
	// to methods of that instance.
	this.urlBase = '';

	this.urlPrefix = '';

	this.urlSuffix = '';


	this.async = true;

	this.dataType = 'html';

	this.tag = null;

	// `headers` are custom headers to be sent
	this.headers = {};

};

httpOption.prototype.setDefault = function () {
	
	if (typeof arguments['0'] === 'object') {
		let _this = this,
		options = arguments['0'],
		stringProps = ['urlBase', 'urlPrefix', 'urlSuffix', 'method', 'dataType', 'tag'];

		stringProps.forEach(function(props) {
			if ( typeof options[props] === 'string' ) {
				_this[props] = options[props];
			}
		});
	} else {

	}
};

httpOption.prototype.extend = function () {
	let _this = this,
	options;

	if (typeof arguments['0'] === 'string') {
		options = {
			url: arguments['0']
		};
	} else if (typeof arguments['0'] === 'object') {
		options = arguments['0'];
	} else {
		return;
	}

	['url', 'method', 'dataType', 'data', 'tag']
	.forEach(function(prop) {
		if (typeof options[prop] !== 'undefined' ) {
			_this[prop] = options[prop];
		}
	});

	if (typeof options.headers === 'object' && Object.keys(options.headers).length > 0) {
		Object.keys(options.headers)
		.forEach(function(name){
			_this.headers[name] = options.headers[name]
		});
	}
};

httpOption.prototype.isValid = function () {
	return true;
};
httpOption.prototype.getUrl = function () {
	return this.urlBase + this.urlPrefix + this.url + this.urlSuffix;
};
httpOption.prototype.getData = function () {
	if (this.method === 'GET') {
		return null;
	} else {
		return this.data;
	}
};
httpOption.prototype.getHeaders = function () {
	let _this = this;
	return Object.keys(this.headers).map(function(key){
		return {
			key: key,
			value: _this.headers[key]
		};
	});
};
module.exports = httpOption;
