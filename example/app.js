
/**
 * LOGGER
 */

var print = {
	write: function(context, text){
		var ele = document.getElementById(context);

		var div = document.createElement('div');
		div.innerHTML = ' -> '+text;

		ele.appendChild( div );
		print.log(text);
	},
	log: function(text){
		var ele = document.getElementById('main-log');
		ele.innerHTML = ' -> '+text + '<br />' + ele.innerHTML;
	}
};
