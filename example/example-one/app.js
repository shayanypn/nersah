

/**
 * LOGGER
 */

var print = {
	write: function(context, text){
		var ele = document.getElementById(context);

		var div = document.createElement('div');
		div.innerHTML = (new Date()).getTime()+' -> '+text;

		ele.appendChild( div );

		console.log('w:', text);
	},
	log: function(text){
		var ele = document.getElementById('log');

		var div = document.createElement('div');
		div.innerHTML = (new Date()).getTime()+' -> '+text;

		ele.appendChild( div );

		console.log('l:', text);
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

		headers: function(){
			if ( TOKEN ) {
				return {
					'Authorization': TOKEN,
					'content-type': 'application/json'
				};
			}else{
				return {
					'content-type': 'application/json'
				};
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



var TOKEN;



/***********************************************
 * SIMPLE AJAX
 */

print.write('simple-ajax','------ start ------');
nersah
.get('/')
.then(function(response, httpResponse){

	print.log('app version:'+ JSON.stringify(response) );

	print.write('simple-ajax','success');
	print.write('simple-ajax','------ end ------');
}, function(){
	print.write('simple-ajax','fail');
	print.write('simple-ajax','------ end ------');	
});



/***********************************************
 * 
 */

print.write('login-ajax','------ start ------');
nersah
.post({
	url: '/token',
	data: JSON.stringify({
		mail: 'admin',
		password: 'admin'
	})
})
.then(function(response){
	
	print.write('login-ajax','------ start ------');
	console.log(response.id);
	TOKEN = response.id;

	getAllTokens();
});






function getAllTokens(){
	nersah
	.get({
		url: '/token',
		headers: ['Authorization:'+TOKEN]
	})
	.then(function(response){
		print.log('tokens::'+ response);
	});
};

// function updateLocation(){
// 	nersah
// 	.setTag('update')
// 	.patch({
// 		url: '/project/7781e3b6-23b5-4494-acce-0472b19e5d4d',
// 		data: JSON.stringify({"name":"Test Location"})
// 	})
// 	.then(function(response){
// 		print.log( 'update:' + response);
// 		token = response;
// 		getProjects();
// 	});
// }



// nersah
// .tag(['version','login']) 
// .then(function(promises){
// 	print.log( 'tags finish with success :: ' + promises);
// },function(promises){
// 	print.log('tags finish with failuare ::' + promises);
// });

