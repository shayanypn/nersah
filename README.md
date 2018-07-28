
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





## Request Config



## Hanlder Config



## Response Schema




## License

MIT