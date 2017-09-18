'use strict';

import httpStatusCode from './../helpers/httpStatusCode';
import utils from './../utilities';
import xhr_adapter from './../adapters/xhr';
import httpOption from './../core/httpOption';
import promise from './../helpers/promise';




export default function NERSAH() {
	let defaultHandler = httpStatusCode,
	promises = [],
	defaultConfig,
	nersah_tagname,
	/**
	 * [buildHttpOption description]
	 * @param  {[type]} method      [description]
	 * @param  {[type]} config      [description]
	 * @param  {[type]} use_default [description]
	 * @return {[type]}             [description]
	 */
	buildHttpOption = function(method, config, use_default){
		let option = new httpOption();

		if ( nersah_tagname ) {
			defaultConfig['tag'] = nersah_tagname;
		}

		if ( use_default !== false ) {
			option.setDefault( defaultConfig );
		}

		option.method = method;
		option.extend( config );

		return option;
	},
	/**
	 * Multi Promise Handler
	 * @param  {Promise-Array} _promises 
	 * @return {Promise}       [description]
	 */
	handleMultiPromise = function (_promises){
		return new promise(function (resolve, reject, handler) {
			
			let successItem = [],
			failItem = [];

			function didRequestSuccess(item){
				if (successItem.indexOf(item) === -1) {
					successItem.push(item);
					if (successItem.length === _promises.length) {
						resolve(_promises.map(function(item){ return item.promise; }));
					}
				}
			}
			function didRequestFail(item){
				if (failItem.indexOf(item) === -1) {
					failItem.push(item);
					if (failItem.length !== 0 && (failItem.length + successItem.length) === _promises.length) {
						reject(_promises.map(function(item){ return item.promise; }));
					}
				}
			}

			_promises.forEach(function(_promise_obj, index) {
				_promise_obj.xhr.onload = function(){
					if ( _promise_obj.xhr.status >= 200 && _promise_obj.xhr.status < 300 ){
						didRequestSuccess(index);
					}else{
						didRequestFail(index);
					};
				}
			});
		});
	},
	/**
	 * Promise Collector
	 * @param  {Promise} _promise [description]
	 */
	handlePromise = function(_promise){
		promises.push(_promise);
	};








	return {

		/**
		 * specify the http request to a tag
		 * @param  {String} 	tag name
		 * @return {this}     	
		 */
		setTag: function(tag){
			nersah_tagname = tag
			return this;
		},

		/**
		 * get all http request with specify tag
		 * @param  {String|Array} 	tag name or array of tags
		 * @return {promise}     	promise of http calls with specify tag name
		 */
		tag: function(tag){

			if ( !utils.isArray(tag) && !utils.isString(tag)) {return null;}


			let tags = utils.isArray(tag) ? tag : tag.split(',');



			var _promises = utils.filter(promises, function(xhr_obj){
				return utils.includeArray(tags, xhr_obj.xhr.tag);
			});

			if (_promises.length) {
				return handleMultiPromise(_promises);
			}else{
				return null;
			}
		},
	
		/**
		 * set default setting for ajax request
		 * @param  {Object} options	 	HTTP Request Options  
		 * @param  {Object} hanlders 	HTTP Handler Option
		 */
		setDefault: function (options, hanlders){

			if ( options ) {
				defaultConfig = options;
			}



			if (hanlders) {
				if (typeof hanlders === 'object') {
				
					defaultHandler = utils.extendCallback(defaultHandler, hanlders);
				}else if (typeof hanlders === 'function'){
				
					defaultHandler['default']['callback'] = hanlders;
				}else{
				
					console.error('Wrong ajax callback!');
				}
			}
		},

		/**
		 * HTTP GET Request
		 * @param  {Object} 	HTTP Request Options
		 * @return {Promise} 	
		 */
		get: function (config , use_default){
			let xhr_obj = xhr_adapter(
				buildHttpOption('GET', config, use_default),
				defaultHandler
			);

			handlePromise(xhr_obj);
			return xhr_obj.promise;
		},

		/**
		 * HTTP POST Request
		 * @param  {Object} 	HTTP Request Options
		 * @return {Promise} 	
		 */
		post: function (config, use_default){
			let xhr_obj = xhr_adapter(
				buildHttpOption('POST', config, use_default),
				defaultHandler
			);

			handlePromise(xhr_obj);
			return xhr_obj.promise;
		}

	};
};
