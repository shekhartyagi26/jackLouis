var express = require('express');
var app = express();
var port = process.env.PORT || 3002;
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var router = express.Router();
var path = require('path');
var appRoutes = require('./app/routes/api')(router);
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use('/api', appRoutes);
app.use(express.static(path.join(__dirname, '/uploads')))

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 1000000 }));
app.use(bodyParser.json({ limit: '50mb', extended: true }));
mongoose.connect('mongodb://jacklouis:jack123@ds151943.mlab.com:51943/jacklouis', function(err, db) {
    if (err) {
        console.log("not conneted to mongodb" + err);
    } else {
        console.log("conneted to mongodb");
    }
});
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});
app.listen(port, function() {
    console.log('server is running on port' + port);
});
module.exports.variableName = "cursor";
module.exports.variableName = "doc";