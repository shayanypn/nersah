const express = require('express')
const app = express()
const DELAY = 2000;

// app.use(function(req, res, next) {
// 	res.header("Access-Control-Allow-Origin", "*");
// 	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
// 	next();
// });
app.options('/*', function(req, res, next){
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Origin, Content-Length, Accept, X-Requested-With');
	res.header('Access-Control-Allow-Origin', '*');
	res.send(200);
});


app.get('/', (req, res) => {
	res.send({
		status: 200,
		msg: 'Dev server is running!'
	})
});
app.get('/api/', (req, res) => {
	res.send({
		status: 200,
		version: '0.0.1',
		msg: 'Dev server is running!'
	})
});
app.get('/api/get', (req, res) => {

	setTimeout(function(){
		res.send({
			status: 200,
			msg: 'Dev server is running!'
		})
	},DELAY)
})
app.get('/api/post', (req, res) => {

	setTimeout(function(){
		res.send({
			status: 200,
			msg: 'Dev server is running!'
		})
	},DELAY)
});
app.get('/api/put', (req, res) => {
	setTimeout(function(){
		res.send({
			status: 200,
			msg: 'Dev server is running!'
		})
	},DELAY)
});



app.listen(3000, () => console.log('Example app listening on port 3000!'))