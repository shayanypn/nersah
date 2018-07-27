(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("nersah", [], factory);
	else if(typeof exports === 'object')
		exports["nersah"] = factory();
	else
		root["nersah"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

'use stric';

/**
 * Determine if a varaieble is an Array
 *
 * @param {Object} obj The value to test
 * @returns {boolean} True if obj is an Array, otherwise false
 */

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function isArray(obj) {
  return obj instanceof Array;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} str The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(str) {
  return typeof str === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value exist in an array or not
 *
 * @param {Array} arr The value to test
 * @param {String} str The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function includeArray(arr, str) {
  return arr.indexOf(str) !== -1;
}

/**
 * Create a clone of an object
 *
 * @param {Object} obj The object that need to be clone
 * @returns {Object} True clone of given object
 */
function clone(obj) {
  if (obj === null || (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object' || 'isActiveClone' in obj) {
    return obj;
  }
  var temp = obj instanceof Date || obj instanceof XMLHttpRequest ? new obj.constructor() : obj.constructor();

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      obj['isActiveClone'] = null;
      temp[key] = clone(obj[key]);
      delete obj['isActiveClone'];
    }
  }
  return temp;
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
    return false;
  }
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}

/**
 * Convert object|array to query string
 *
 * @param {Object|Array} val The value to test
 * @returns {String} True if value is a Number, otherwise false
 */
function toQueryString(data) {
  var query = '',
      i,
      push = function push(key, value) {
    query += encodeURIComponent(key) + '=' + encodeURIComponent(value) + '&';
  },
      key,
      value;

  for (key in data) {
    if (!Object.hasOwnProperty.call(data, key)) {
      continue;
    }
    value = data[key];
    if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object' && data instanceof Array) {
      for (i = 0; i < value.length; i++) {
        push(key, value[i]);
      }
    } else {
      push(key, data[key]);
    }
  }
  return query.replace(/&$/, '').replace(/%20/g, '+');
}

/**
 * Determine if a value is a Number
 *
 * @param {Object|Array} val The value to test
 * @returns {String} True if value is a Number, otherwise false
 */
function extendCallback(obj, options) {
  Object.keys(options).forEach(function (code) {
    if (obj.hasOwnProperty(code)) {
      if (_typeof(obj[code]) === 'object' && typeof options[code] === 'function') {
        obj[code]['callback'] = options[code];
      } else if (_typeof(obj[code]) === 'object' && _typeof(options[code]) === 'object') {
        if (typeof options[code].status === 'string') {
          obj[code]['status'] = options[code].status;
        }
        if (_typeof(options[code].callback)) {
          obj[code]['callback'] = options[code].callback;
        }
      }
    } else if (code === 'function') {
      obj['default']['callback'] = options[code];
    }
  });
  return obj;
};

/**
 * create a filter array function
 * @param  {Array}      Array which you want to make filter on it
 * @param  {Function}   Filter function
 * @return {Array}     Filtered Array
 */
function filter(ary, fun) {
  var len = ary.length >>> 0,
      res = [];

  if (typeof fun !== 'function') {
    throw new TypeError();
  }

  var thisp = fun;

  for (var i = 0; i < len; i++) {
    if (i in ary) {
      var val = ary[i]; // in case fun mutates ary

      if (fun.call(thisp, val, i, ary)) {
        res.push(val);
      }
    }
  }
  return res;
}

module.exports = {
  isArray: isArray,
  isString: isString,
  isNumber: isNumber,
  includeArray: includeArray,
  clone: clone,
  filter: filter,
  extendCallback: extendCallback,
  toQueryString: toQueryString,
  isStandardBrowserEnv: isStandardBrowserEnv
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * HTTP Response Object
 */

var httpResponse = function httpResponse() {
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
	var httpRequest = arguments[1],
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
	return this.statusCode >= 200 && this.statusCode < 300;
};

module.exports = httpResponse;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _core = __webpack_require__(3);

var _core2 = _interopRequireDefault(_core);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var myWindow = typeof window !== 'undefined' ? window : {};

myWindow.nersah = new _core2.default();

module.exports = myWindow.nersah;

module.exports.default = myWindow.nersah;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = NERSAH;

var _httpStatusCode = __webpack_require__(4);

var _httpStatusCode2 = _interopRequireDefault(_httpStatusCode);

var _utilities = __webpack_require__(0);

var _utilities2 = _interopRequireDefault(_utilities);

var _xhr = __webpack_require__(5);

var _xhr2 = _interopRequireDefault(_xhr);

var _httpOption = __webpack_require__(10);

var _httpOption2 = _interopRequireDefault(_httpOption);

var _httpResponse = __webpack_require__(1);

var _httpResponse2 = _interopRequireDefault(_httpResponse);

var _TagPromiseHandler = __webpack_require__(11);

var _TagPromiseHandler2 = _interopRequireDefault(_TagPromiseHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function NERSAH() {
	var defaultHandler = _httpStatusCode2.default,
	    defaultConfig = void 0,
	    nersahTagName = void 0,
	    tagPromiseHandler = new _TagPromiseHandler2.default(),

	/**
  * [buildHttpOption description]
  * @param  {[type]} method      [description]
  * @param  {[type]} config      [description]
  * @param  {[type]} use_default [description]
  * @return {[type]}             [description]
  */
	buildHttpOption = function buildHttpOption(method, config, useDefault) {
		var option = new _httpOption2.default();

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
	    defaultHttpHandler = function defaultHttpHandler(promise) {
		promise.xhr.onload = function () {
			var XHR = promise.xhr,
			    response = new _httpResponse2.default(),
			    callbackHandler = defaultHandler[XHR.status];

			response.statusCode = XHR.status;

			tagPromiseHandler.observe(XHR.tag, response.statusCode, response.isSuccess());

			if (callbackHandler && typeof callbackHandler.callback === 'function') {
				callbackHandler.callback();
			}
		};
	};

	return {

		/**
   * specify the http request to a tag
   * @param  {String} 	tag name
   * @return {this}
   */
		setTag: function setTag(tag) {
			nersahTagName = tag;
			return this;
		},

		/**
   * get all http request with specify tag
   * @param  {String|Array} 	tag name or array of tags
   * @return {promise}     	promise of http calls with specify tag name
   */
		tag: function tag(_tag) {
			if (!_utilities2.default.isArray(_tag) && !_utilities2.default.isString(_tag)) {
				return null;
			}
			return tagPromiseHandler.add(_tag);
		},

		/**
   * set default setting for ajax request
   * @param  {Object} options	 	HTTP Request Options
   * @param  {Object} hanlders 	HTTP Handler Option
   */
		setDefault: function setDefault(options, hanlders) {

			if (options) {
				defaultConfig = options;
			}

			if (hanlders) {
				if ((typeof hanlders === 'undefined' ? 'undefined' : _typeof(hanlders)) === 'object') {
					defaultHandler = _utilities2.default.extendCallback(defaultHandler, hanlders);
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
		get: function get(config, useDefault) {
			var xhrObj = (0, _xhr2.default)(buildHttpOption('GET', config, useDefault), defaultHandler);

			// if (nersahTagName) {
			// 	tagPromiseHandler.add(nersahTagName, xhrObj);
			// }

			defaultHttpHandler(xhrObj);

			return xhrObj.promise;
		},

		/**
   * HTTP POST Request
   * @param  {Object} 	HTTP Request Options
   * @return {Promise}
   */
		post: function post(config, useDefault) {
			var xhrObj = (0, _xhr2.default)(buildHttpOption('POST', config, useDefault), defaultHandler);

			// if (nersahTagName) {
			// 	tagPromiseHandler.add(nersahTagName, xhrObj);
			// }

			defaultHttpHandler(xhrObj);

			return xhrObj.promise;
		},

		/**
   * HTTP PATCH Request
   * @param  {Object} 	HTTP Request Options
   * @return {Promise}
   */
		patch: function patch(config, useDefault) {
			var xhrObj = (0, _xhr2.default)(buildHttpOption('PATCH', config, useDefault), defaultHandler);

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
		put: function put(config, useDefault) {
			var xhrObj = (0, _xhr2.default)(buildHttpOption('PUT', config, useDefault), defaultHandler);

			// if (nersahTagName) {
			// 	tagPromiseHandler.add(nersahTagName, xhrObj);
			// }

			defaultHttpHandler(xhrObj);

			return xhrObj.promise;
		}

	};
};
module.exports = exports['default'];

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
	0: { status: '' }, /* loading,error,abort */
	/* SUCCESS */
	200: { status: 'Ok' },
	201: { status: 'Created' },
	202: { status: 'Accepted' },
	203: { status: 'Non-Authoritative Information' },
	204: { status: 'No Contant' },
	205: { status: 'Reset Contant' },
	206: { status: 'Partial Content' },
	207: { status: 'Multi-status' },
	208: { status: 'Already Reported' },
	226: { status: 'IM Used' },
	/* REDIRECT */
	/* CLIENT ERROR */
	400: { status: 'Bad Request' },
	401: { status: 'Unauthorized' },
	402: { status: 'Payment Required' },
	403: { status: 'Forbidden' },
	404: { status: 'Not Found' },
	405: { status: 'Method Not Allowed' },
	406: { status: 'Not Acceptable' },
	407: { status: 'Proxy Authentication Required' },
	408: { status: 'Request Time-out' },
	409: { status: 'Conflict' },
	410: { status: 'Gone' },
	411: { status: 'Length Required' },
	412: { status: 'Precondition Failed' },
	413: { status: 'Payload Too Large' },
	414: { status: 'URI Too Long' },
	415: { status: 'Unsupported Media Type' },
	416: { status: 'Range Not Satisfiable' },
	417: { status: 'Expectation Failed' },
	418: { status: 'I\'m a teapot' },
	422: { status: 'Misdirected Request' },
	423: { status: 'Unprocessable Entity' },
	424: { status: 'Locked' },
	425: { status: 'Failed Dependency' },
	426: { status: 'Upgrade Required' },
	428: { status: 'Precondition Required' },
	429: { status: 'Too Many Requests' },
	431: { status: 'Request Header Fields Too Large' },
	440: { status: 'Login Time-out' },
	444: { status: 'No Response' },
	449: { status: 'Retry With' },
	// 450: ''},
	451: { status: 'Unavailable For Legal Reasons' },
	495: { status: 'SSL Certificate Error' },
	496: { status: 'SSL Certificate Required' },
	497: { status: 'HTTP Request Sent to HTTPS Port' },
	499: { status: 'Client Closed Request' },
	/* SERVER ERROR */
	500: { status: 'Internal Server Error' },
	501: { status: 'Not Implemented' },
	502: { status: 'Bad Gateway' },
	503: { status: 'Service Unavailable' },
	504: { status: 'Gateway Time-out' },
	505: { status: 'HTTP Version Not Supported' },
	506: { status: 'Variant Also Negotiates' },
	507: { status: 'Insufficient Storage' },
	508: { status: 'Loop Detected' },
	// 509: ''},
	510: { status: 'Not Extended' },
	511: { status: 'Network Authentication Required' },
	// 598: },
	// 599: },
	520: { status: 'Unknown Error' },
	521: { status: 'Web Server Is Down' },
	522: { status: 'Connection Timed Out' },
	523: { status: 'Origin Is Unreachable' },
	524: { status: 'A Timeout Occurred' },
	525: { status: 'SSL Handshake Failed' },
	526: { status: 'Invalid SSL Certificate' },
	527: { status: 'Railgun Error' },
	'default': { status: 'Default Handler' },
	'timeout': { status: 'Timeout Handler' },
	'abort': { status: 'Abort Handler' }
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _promise = __webpack_require__(6);

var _promise2 = _interopRequireDefault(_promise);

var _xmlHttpRequest = __webpack_require__(8);

var _xmlHttpRequest2 = _interopRequireDefault(_xmlHttpRequest);

var _httpHandler = __webpack_require__(9);

var _httpHandler2 = _interopRequireDefault(_httpHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * XHR Adapter
 * @param  {Object} config         Ajax configs
 * @param  {Object} defaultHandler Http defeault ajax handler
 * @return {Object}                Request Xhr and promise
 */
module.exports = function xhrAdapter(config, defaultHandler) {
	var xmlHttp = (0, _xmlHttpRequest2.default)(config);

	return {
		'xhr': xmlHttp,
		'promise': new _promise2.default(function (resolve, reject, updater) {
			/**
    * [onResolve description]
    * @type {[type]}
    */
			(0, _httpHandler2.default)(xmlHttp, config, defaultHandler, {
				onResolve: resolve,
				onReject: reject,
				onUpdater: updater
			});
		}, defaultHandler)
	};
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* eslint no-use-before-define: ["error", { "functions": false }]*/


var _callbackHandler = __webpack_require__(7);

var _callbackHandler2 = _interopRequireDefault(_callbackHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Promise Function
 * @param {Function} fn             [description]
 * @param {Object}   defaultHandler [description]
 * @param {Object}   _httpResponse    [description]
 */
var Promise = function Promise(fn, defaultHandler, _httpResponse) {
	var state = 'pending',
	    value = void 0,
	    deferred = null,
	    httpResponse = _httpResponse ? _httpResponse : {},
	    responseHandler = void 0;

	function resolve(newValue, _httpResponse) {

		if (_httpResponse) {
			httpResponse = _httpResponse;
		}

		setTimeout(function () {
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
		}, 1);
	}

	function reject(reason, _httpResponse) {
		state = 'rejected';
		value = reason;

		if (_httpResponse) {
			httpResponse = _httpResponse;
		}

		setTimeout(function () {
			if (deferred) {
				handle(deferred);
			}
		}, 1);
	}

	function handle(handler) {
		if (state === 'pending') {
			deferred = handler;
			return;
		}

		if (responseHandler) {
			setTimeout(function () {
				(0, _callbackHandler2.default)(httpResponse, defaultHandler, responseHandler);
			}, 1);
		}

		var handlerCallback = void 0;

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

		var ret = void 0;

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
			setTimeout(function () {
				(0, _callbackHandler2.default)(httpResponse, defaultHandler);
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

	this.handler = function (onHandler, onResolved, onRejected) {

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

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _utilities = __webpack_require__(0);

var _utilities2 = _interopRequireDefault(_utilities);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * [callHandler description]
 * @param  {[type]} httpReturn     [description]
 * @param  {[type]} defaultHandler [description]
 * @param  {[type]} customHandler  [description]
 */
module.exports = function callHandler(httpReturn, defaultHandler, customHandler) {
	var callBack = void 0;

	if (customHandler) {
		if (typeof customHandler === 'function') {
			callBack = customHandler;
		} else if ((typeof customHandler === 'undefined' ? 'undefined' : _typeof(customHandler)) === 'object') {
			defaultHandler = _utilities2.default.extendCallback(defaultHandler, customHandler);
		}
	}

	if (!callBack) {
		var statusCallback = defaultHandler[httpReturn.status];

		if ((typeof statusCallback === 'undefined' ? 'undefined' : _typeof(statusCallback)) === 'object' && statusCallback.callback) {
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

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* global ActiveXObject */


module.exports = function xmlHttpRequest(httpOption) {

		if (httpOption.isValid()) {
				var xmlHttp = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');

				xmlHttp.open(httpOption.method, httpOption.getUrl(), true);

				httpOption.getHeaders().forEach(function (header) {
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

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _httpResponse = __webpack_require__(1);

var _httpResponse2 = _interopRequireDefault(_httpResponse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * [statusText description]
 * @param  {[type]} httpReturn [description]
 * @param  {[type]} _handler   [description]
 * @return {[type]}            [description]
 */
var statusText = function statusText(httpReturn, _handler) {

	var text = '';

	if (parseInt(httpReturn.statusCode, 10) === httpReturn.statusCode && httpReturn.statusCode !== 0) {
		text = _handler[httpReturn.statusCode].statusCode;
	} else if (parseInt(httpReturn.statusCode, 10) === httpReturn.statusCode && httpReturn.statusCode === 0) {
		if (httpReturn.readyState === 1) {
			text = 'loading';
		}
	}
	return text;
};

module.exports = function httpHandler(httpRequest, httpOption, defaultHandler, promise) {

	if (!httpRequest) {
		return;
	}

	var httpResponse = new _httpResponse2.default();

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

			setTimeout(function () {
				if (httpResponse.isSuccess()) {
					promise.onResolve(httpResponse.response, httpResponse);
				} else {
					promise.onReject(httpResponse.response, httpResponse);
				}
			}, 1);
		}
	};
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * HTTP Option Object
 */
// let httpOptionBase = function () {

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
// paramsSerializer: function (params) {
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
// };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var httpOption = function httpOption() {

	// `url` is the server URL that will be used for the request
	this.url = '';

	// `method` is the request method to be used when making the request
	this.method = 'GET'; // 'GET', 'DELETE', 'POST', 'PUT', 'PATCH', 'HEAD'

	// `baseURL` will be prepended to `url` unless `url` is absolute.
	// It can be convenient to set `baseURL` for an instance of axios to pass relative URLs
	// to methods of that instance.

	/**
  * the base url
  * @type {String}
  */
	this.urlBase = '';

	/**
  * prefix of each url
  * @type {String}
  */
	this.urlPrefix = '';

	/**
  * suffix of each url
  * @type {String}
  */
	this.urlSuffix = '';

	this.async = true;

	this.dataType = 'html';

	/**
  * identifier of each http request
  * @type {String}
  */
	this.tag = null;

	/**
  * `headers` are custom headers to be sent
  * @type {Object}
  */
	this.headers = {};

	/**
  * `headers` are custom headers to be sent
  * @type {Function}
  */
	this.headerFn;
};

httpOption.prototype.setDefault = function () {

	if (_typeof(arguments['0']) === 'object') {
		var _this = this,
		    options = arguments['0'],
		    stringProps = ['urlBase', 'urlPrefix', 'urlSuffix', 'method', 'dataType', 'tag'];

		stringProps.forEach(function (props) {
			if (typeof options[props] === 'string') {
				_this[props] = options[props];
			}
		});

		/**
   * get headers
   */
		if (_typeof(options.headers) === 'object') {
			this.headers = options.headers;
		} else if (typeof options.headers === 'function') {
			this.headerFn = options.headers;
		}
	} else {}
};

httpOption.prototype.extend = function () {
	var _this = this,
	    options = void 0;

	if (typeof arguments['0'] === 'string') {
		options = {
			url: arguments['0']
		};
	} else if (_typeof(arguments['0']) === 'object') {
		options = arguments['0'];
	} else {
		return;
	}

	['url', 'method', 'dataType', 'data', 'tag'].forEach(function (prop) {
		if (typeof options[prop] !== 'undefined') {
			_this[prop] = options[prop];
		}
	});

	/**
  * set header
  */
	if (_typeof(options.headers) === 'object' && Object.keys(options.headers).length > 0) {
		Object.keys(options.headers).forEach(function (name) {
			_this.headers[name] = options.headers[name];
		});
	} else if (typeof options.headers === 'function') {
		_this.headers = options.headers;
	}
};

httpOption.prototype.isValid = function () {
	return true;
};

httpOption.prototype.getUrl = function () {
	return this.url.split('')[0] === '~' ? this.urlBase + (this.urlPrefix && this.urlPrefix !== '' ? this.urlPrefix + '/a' : '') + this.url.slice(1, this.url.length) + this.urlSuffix : this.url;
};

httpOption.prototype.getData = function () {

	return this.method === 'GET' ? null : this.data;
};

httpOption.prototype.getHeaders = function () {
	var headers = void 0;

	if (typeof this.headerFn === 'function') {
		headers = this.headerFn();
	}

	if (_typeof(this.headers) === 'object') {
		headers = Object.assign(headers, this.headers);
	} else if (typeof this.headers === 'function') {
		headers = this.headers(headers);
	}

	if ((typeof headers === 'undefined' ? 'undefined' : _typeof(headers)) === 'object') {

		return Object.keys(headers).map(function (key) {
			return {
				'key': key,
				'value': headers[key]
			};
		});
	}

	return [];
};
module.exports = httpOption;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _utilities = __webpack_require__(0);

var _utilities2 = _interopRequireDefault(_utilities);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * TagPromiseHandler
 * hanle ajax promises which has special tag
 */
var getTag = function getTag(tags) {

	if (_utilities2.default.isString(tags)) {
		return tags.toLowerCase();
	} else if (_utilities2.default.isArray(tags)) {
		return tags.join(',').toLowerCase();
	}

	throw new Error('wrong tag format');
};
var TagPromiseHandler = function TagPromiseHandler() {
	this.store = {};
};

/**
 * [add description]
 * @param {[type]} tag     [description]
 * @param {[type]} request [description]
 */
TagPromiseHandler.prototype.add = function (tags) {
	var _this = this;

	var self = this;
	var tag = getTag(tags);

	if (!this.store[tag]) {
		var _tags = {};

		tag.split(',').map(function (x) {
			_tags[x] = {
				isFinished: false,
				statusCode: 0,
				isSuccess: false
			};
		});

		this.store[tag] = {
			tag: tag,
			tags: _tags,
			resolve: null,
			reject: null
		};
	}

	return {
		then: function then(resolve, reject) {
			self.store[tag].resolve = resolve;
			self.store[tag].reject = reject;
			return _this;
		}
	};
};

/**
 * [observe description]
 * @param  {[type]} tags    [description]
 * @param  {[type]} initial [description]
 * @param  {[type]} resolve [description]
 * @param  {[type]} reject  [description]
 * @param  {[type]} handler [description]
 * @return {[type]}         [description]
 */
TagPromiseHandler.prototype.observe = function (tag, statueCode, isSuccess) {
	var self = this,
	    store = this.store;

	Object.keys(store).forEach(function (x) {
		var storeTag = store[x];

		if (storeTag.tags[tag]) {
			storeTag.tags[tag].statusCode = statueCode;
			storeTag.tags[tag].isSuccess = isSuccess;
			storeTag.tags[tag].isFinished = statueCode !== 0;

			self.handlePromise(storeTag);
		}
	});
};

/**
 * [handlePromise description]
 * @param  {[type]} tags [description]
 * @return {[type]}      [description]
 */
TagPromiseHandler.prototype.handlePromise = function (storeTag) {
	var isSuccess = true;
	var isFinished = true;

	Object.keys(storeTag.tags).forEach(function (x) {
		if (!storeTag.tags[x].isFinished) {
			isFinished = false;
		}
		if (!storeTag.tags[x].isSuccess) {
			isSuccess = false;
		}
	});

	if (isFinished === true) {
		if (isSuccess === true) {
			storeTag.resolve();
		} else {
			storeTag.reject();
		}
	}
};

module.exports = TagPromiseHandler;

/***/ })
/******/ ]);
});
//# sourceMappingURL=nersah.js.map