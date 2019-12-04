
// Asenna ensin express npm install express --save

var express = require('express');
var app=express();


var fs = require("fs");

let cookieParser = require('cookie-parser'); 

app.use(cookieParser()); 


var bodyParser = require('body-parser');
var customerController = require('./customerController');

const http = require('http');
const url = require('url');

const hostname = '127.0.0.1';
const port = process.env.PORT || 3002;

let users = {
userName : "Testi",
loginTime : Date.now(),
sessionId : 1234
}


app.use(express.static(__dirname + '/public'));


//CORS middleware
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
 //   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
 //   res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

app.use(allowCrossDomain);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Staattiset filut
app.use(express.static('public'));

// REST API Asiakas
app.route('/Types')
    .get(customerController.fetchTypes);


app.route('/Asiakas')
    .get(customerController.fetchAll)
    .post(customerController.create)
	    .put(customerController.update);


app.route('/Asiakas/:avain')
    .put(customerController.update)
	.get(customerController.fetchSingle)
    .delete(customerController.delete);
	
	
app.route('/Asiakas/update')
	 .put(customerController.update);

//

app.get('/login',(req, res) => {
    res.cookie("userData", users);
    res.end("Kirjautuminen onnistunut");

});

app.get('/getuser',(req, res) => {
			  		 
    res.send(req.cookies)
});

app.get('/logout',(req, res) => {
    res.clearCookie("userData");
    res.send("Kayttaja poistettu")
});



app.get('/', function(request, response){
	var id=null;
	try{
	var id=  request.cookies['userData'];
	id = id['sessionId'];
	}
	catch{
		
	}
	if(id != null){
		

    fs.readFile("index.html", function(err, data){
        response.writeHead(200, {'Content-Type' : 'text/html'});
        response.write(data);
        response.end();    
    });
}
else{

    fs.readFile("loginpage.html", function(err, data){
        response.writeHead(200, {'Content-Type' : 'text/html'});
        response.write(data);
        response.end();    
    });
}
});


app.route('/task')
    .get(function(request, response){
        response.statusCode = 200;
        response.setHeader('Content-Type', 'text/plain');
        response.end("Taskeja pukkaa");     
    });

app.listen(port, hostname, () => {
  console.log(`Server running AT http://${hostname}:${port}/`);
});

/*
app.listen(port, () => {
    console.log(`Server running AT http://${port}/`);
  });
*/  