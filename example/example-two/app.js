

/**
 * LOGGER
 */

var print = {
	write: function(context, text){
		var ele = document.getElementById(context);

		var div = document.createElement('div');
		div.innerHTML = (new Date()).getTime()+' -> '+text;

		ele.appendChild( div );

		//console.log('w:', text);
	},
	log: function(text){
		var ele = document.getElementById('log');

		var div = document.createElement('div');
		div.innerHTML = (new Date()).getTime()+' -> '+text;

		ele.appendChild( div );

		//console.log('l:', text);
	}
};




/**
 * nersah config
 */
nersah.setDefault(
	{
		urlBase: 'http://localhost:8000',
		urlPrefix: '/api',
		urlSuffix: '',

		timeout: 3000,

		dataType: 'json',

		headers: function(headers){

			console.log( headers );

			return {
				'content-type': 'application/json'
			};
		}
	},
	{
	200: function(http){
		print.log('GLOBAL::200 ');
		print.write('simple-ajax','------ GLOBAL:200 ------');
	},
	400: function(http){
		print.log('GLOBAL::400 ');
	},
	500: function(http){
		print.log('GLOBAL::500 ');
	}
});



nersah.setTag('tag2')
.get('https://httpbin.org/uuid')
.then(function(response){
	console.log('R1');
});

nersah.setTag('tag2')
.post({
	url: 'https://httpbin.org/post',
	headers: {'Authorization':'123123'},
	data: JSON.stringify({
		mail: 'admin',
		password: 'admin'
	})
})
.then(function(response){
	console.log('R2');
});

nersah.setTag('login')
.patch({
	url: 'https://httpbin.org/patch',
	headers: function(headers){
		headers['Kalam'] = 'ABC';
		return headers;
	},
	data: JSON.stringify({
		mail: 'admin',
		password: 'admin'
	})
})
.then(function(response){
	console.log('R3');
});


nersah
.tag(['tag2','login']) 
.then(function(promises){
	console.log( '-------------', promises );
},function(promises){
});