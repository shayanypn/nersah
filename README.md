

Nersah
===================
Advance promise based HTTP client for the browser.
**Nersah** is powerfull, simple and strong


----------
## Features

- Make [XMLHttpRequests](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) from the browser
- Make [http](http://nodejs.org/api/http.html) requests from node.js
- Supports the Promise API
- Intercept request and response
- Transform request and response data
- Automatic transforms for JSON data
- Powerfull request handler
- Taging Request
- Powerfull bulk request handling

## Installing


## Example
Performing a `GET` request

    nersah
	.get('/user')
	.then(function(response, httpResponse){
        // handle success
	}, function(){
        // handle error
	})
	.then(function(){
		// handle after response
	})


    nersah
	.get('/user', {
	   parans:{
	      key: 'value'
	   }
	})
	.then(function(response, httpResponse){
        // handle success
	}, function(){
        // handle error
	})
	.then(function(){
		// handle after response
	})



## Nersah API


### Request method aliases

For convenience aliases have been provided for all supported request methods.

##### nersah.request(config)

##### nersah.get(url[, config])

##### nersah.delete(url[, config])

##### nersah.head(url[, config])

##### nersah.options(url[, config])

##### nersah.post(url[, data[, config]])

##### nersah.put(url[, data[, config]])

##### nersah.patch(url[, data[, config]])



## Request Config
These are the available config options for making requests. Only the `url` is required. Requests will default to `GET` if `method` is not specified.

    {

	// `url` is the server URL that will be used for the request
	this.url = '';

	// `method` is the request method to be used 
	// when making the request
	// GET, DELETE, POST, PUT, PATCH, HEAD
	this.method = 'GET';

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

	// `params` are the URL parameters 
	// to be sent with the request
	// Must be a plain object or a URLSearchParams object
	this.params = {};

}


## Hanlder Config



## Response Schema
The response for a request contains the following information.

    {
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
    }



## License

MIT