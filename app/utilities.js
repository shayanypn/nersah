'use stric';

/**
 * Determine if a varaieble is an Array
 *
 * @param {Object} obj The value to test
 * @returns {boolean} True if obj is an Array, otherwise false
 */
function isArray(obj) {
	return (obj instanceof Array);
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

function isObject(val) {
  return typeof val === 'object';
}

/**
 * Determine if a value exist in an array or not
 *
 * @param {Array} arr The value to test
 * @param {String} str The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function includeArray(arr, str) {
  return (arr.indexOf(str) !== -1);
}

/**
 * Create a clone of an object
 *
 * @param {Object} obj The object that need to be clone
 * @returns {Object} True clone of given object
 */
function clone(obj) {
    if (obj === null || typeof obj !== 'object' || 'isActiveClone' in obj) {
        return obj;
    }
    let temp = (obj instanceof Date || obj instanceof XMLHttpRequest) ? (new obj.constructor()) : obj.constructor();

    for (let key in obj) {
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
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
 );
}

/**
 * Convert object|array to query string
 *
 * @param {Object|Array} val The value to test
 * @returns {String} True if value is a Number, otherwise false
 */
function toQueryString(data) {
  var query = '', i,
  push = function (key, value) {
    query += encodeURIComponent(key) + '=' + encodeURIComponent(value) + '&';
  }, key, value;

  for (key in data) {
    if (!Object.hasOwnProperty.call(data, key)) {continue;}
    value = data[key];
    if ((typeof data === 'object') && (data instanceof Array)) {
      for (i = 0; i < value.length; i++) { push(key, value[i]);}
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
  Object.keys(options).forEach(code => {
    if (obj.hasOwnProperty(code)) {
      if (typeof obj[ code ] === 'object' && typeof options[ code ] === 'function') {
        obj[ code ]['callback'] = options[ code ];
      } else if (typeof obj[ code ] === 'object' && typeof options[ code ] === 'object') {
        if (typeof options[ code ].status === 'string') {
          obj[ code ]['status'] = options[ code ].status;
        }
        if (typeof options[ code ].callback) {
          obj[ code ]['callback'] = options[ code ].callback;
        }
      }
    } else if (code === 'function') {
      obj[ 'default' ]['callback'] = options[ code ];
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

  let thisp = fun;

  for (let i = 0; i < len; i++) {
    if (i in ary) {
      let val = ary[i]; // in case fun mutates ary

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
  isObject: isObject,
  includeArray: includeArray,
  clone: clone,
  filter: filter,
  extendCallback: extendCallback,
  toQueryString: toQueryString,
  isStandardBrowserEnv: isStandardBrowserEnv
};
