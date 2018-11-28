var express = require('express');
var app = express();
var port=process.env.PORT||3001;
var morgan = require('morgan');
var mongoose= require('mongoose');
var bodyParser= require('body-parser');
var router= express.Router();
var path = require('path');
var appRoutes= require('./app/routes/api')(router);
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+'/public'));
app.use('/api',appRoutes);

mongoose.connect('mongodb://jacklouis:jack123@ds151943.mlab.com:51943/jacklouis', function(err,db){
	if(err){
		console.log("not conneted to mongodb"+ err);
	}
	else
	{
		console.log("conneted to mongodb");
	}
	 // var cursor = db.collection('blogs').find();

  //   cursor.each(function(err, doc) {

  //       console.log(doc);

  //   });
});
app.get('*', function(req,res){
	res.sendFile(path.join(__dirname+'/public/app/views/index.html'));
});
app.listen(port, function(){
console.log('server is running on port' + port);
});
module.exports.variableName = "cursor";
module.exports.variableName = "doc";