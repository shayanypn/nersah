
/**
 * LOGGER
 */

var print = {
	write: function(context, text){
		var ele = document.getElementById(context);

		var div = document.createElement('div');
		div.innerHTML = ' -> '+text;

		ele.appendChild( div );

		//console.log('w:', text);
	},
	log: function(text){
		var ele = document.getElementById('log');

		var div = document.createElement('div');
		div.innerHTML = ' -> '+text;

		ele.appendChild( div );

		//console.log('l:', text);
	}
};
