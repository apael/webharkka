// npm install express
// npm install handlebars
// npm install consolidate

var express = require('express');
var cons = require('consolidate');
var app = express();
var path = require('path');
var metodit = require('./metodit');
var fs = require("fs");
var bodyParser = require('body-parser');


let cookieParser = require('cookie-parser'); 
app.use(cookieParser()); 

const http = require('http');
const url = require('url');
const hostname = '127.0.0.1';
const port = process.env.PORT || 3002;


app.use(express.static(__dirname + '/public'));


//CORS middleware
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    next();
}

app.use(allowCrossDomain);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Staattiset filut
app.engine('html', cons.handlebars);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

// REST API Asiakas
app.route('/Laskut')
    .get(metodit.fetchLaskut)
	.post(metodit.createLasku);

	
app.route('/Laskut/:id')
    .put(metodit.fetchLaskut);

app.route('/Numerot')
    .get(metodit.fetchNumerot)
    .post(metodit.createNumerot);
	
app.route('/Osoitteet')
    .get(metodit.fetchOsoitteet)
    .post(metodit.createOsoite);
	
app.route('/Email')
    .get(metodit.fetchEmail)
    .post(metodit.createEmail);

app.route('/Yritykset')
    .get(metodit.fetchYritykset)
    .post(metodit.createYritykset);


app.route('/Asiakas')
    .get(metodit.fetchAsiakkaat)
    .post(metodit.createAsiakas);


app.route('/Asiakas/:avain')
	.delete(metodit.delete)
	.get(metodit.fetchAsiakas);
	
	
app.route('/Asiakas/update')
	 .put(metodit.updateAsiakas);
	 
 app.route('/Asiakas/update/:id')
	 .put(metodit.UpdateActive);

 app.route('/Laskut/update/:id')
	 .put(metodit.UpdateLasku);


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



app.get('/', function(req, res) {
  res.render('index', {
  });
});


app.get('/Asiakkaat', function(req, res) {

    metodit.fetchAsiakkaat().then(function(data){
         return data;
 
    })
    .then((as) => {
        return as;
    })
    .catch(function(msg){
        console.log("Virhettä pukkaa " + msg);
    })
    .then((as) => {
        res.render('Asiakkaat', {
            as:as,
        });        
    });
});

app.get('/KaikkiLaskut', function(req, res) {

    metodit.fetchKLaskut().then(function(data){
         return data;
 
    })
    .then((laskut) => {
        return laskut;
    })
    .catch(function(msg){
        console.log("Virhettä pukkaa " + msg);
    })
    .then((laskut) => {
        res.render('Laskut', {
            laskut:laskut,
        });        
    });
});


app.listen(port, hostname, () => {
  console.log(`Server running AT http://${hostname}:${port}/`);
});

