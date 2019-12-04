'use strict'

// Asenna ensin mysql driver 
// npm install mysql --save

var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',  // HUOM! Älä käytä root:n tunnusta tuotantokoneella!!!!
  password : 'ruutti',
  database : 'laskutustietokanta',
   port     : '3307'

});

module.exports = 
{

fetchLaskut: function (req, res) {  

	let params = req.query;		
			    console.log(params);	

	if(params.id==undefined){
params.id="";
}
	
	let sql = ("SELECT * FROM laskut where LaskuID LIKE '"+params.id +"%'" )	
		    console.log(sql);	

	
      connection.query(sql, function(error, results, fields){	  
        if ( error )
		{
          console.log("Virhe, syy: " + error);
          res.send({"status": 500, "error": error, "response": null}); 
        }
          res.json(results);        
    });
},//fetchLaskut
	
fetchOsoitteet: function (req, res) {  

	let params = req.query;		
			    console.log(params);	

	if(params.id==undefined){
params.id="";
}
	
	let sql = ("SELECT * FROM osoite" )	
		    console.log(sql);	

	
      connection.query(sql, function(error, results, fields){	  
        if ( error )
		{
          console.log("Virhe, syy: " + error);
          res.send({"status": 500, "error": error, "response": null}); 
        }
          res.json(results);        
    });
},//fetchOsoitteet

fetchNumerot: function (req, res) {  

	let params = req.query;		
			    console.log(params);	

	
	let sql = ("SELECT * FROM numerot" )	
		    console.log(sql);	

	
      connection.query(sql, function(error, results, fields){	  
        if ( error )
		{
          console.log("Virhe, syy: " + error);
          res.send({"status": 500, "error": error, "response": null}); 
        }
          res.json(results);        
    });
},//fetchNumerot

fetchEmail: function (req, res) {  

	let params = req.query;		
			    console.log(params);	

	if(params.id==undefined){
params.id="";
}
	
	let sql = ("SELECT * FROM email" )	
		    console.log(sql);	

	
      connection.query(sql, function(error, results, fields){	  
        if ( error )
		{
          console.log("Virhe, syy: " + error);
          res.send({"status": 500, "error": error, "response": null}); 
        }
          res.json(results);        
    });
},//fetchEmail

	
 createLasku: function (req, res) {  
	console.log("Body = " + JSON.stringify(req.body));
    console.log("Params = " + JSON.stringify(req.params));		
	let params = req.query;		
	    console.log(params);		

	let sql = ("INSERT INTO laskut (Työnkuva,Toimitettu,Määrä,ALV,Hinta,Viitenro,Viitteenne,Asiakas_idAsiakas,Eräpäivä,Maksettu) VALUES ('"+params.Työnkuva+"','"+ params.Toimitettu+"','" +params.Määrä+"','"+ params.ALV+"','"+ params.Hinta+"','"+ params.Viitenro+"','"+ params.Viitteenne+"','"+ params.Asiakas_idAsiakas+"','"+ params.Eräpäivä+"','"+ params.Maksettu+"')");	
     
	 connection.query(sql, function(error, results, fields){	  
        if ( error )
		{
          console.log("Virhe, syy: " + error);
          res.send({"status": 500, "error": error, "response": null}); 
        }
          res.json(results);       
    });

 },//createLasku	

fetchYritykset: function (req, res) {  	
	let sql = ("SELECT * FROM yritykset" )	
	console.log(sql);		
      connection.query(sql, function(error, results, fields){	  
        if ( error )
		{
          console.log("Virhe, syy: " + error);
          res.send({"status": 500, "error": error, "response": null}); 
        }
          res.json(results);        
    });
},//fetchyr

	
 createYritykset: function (req, res) {  
		
	let params = req.query;		
	    console.log(params);		

	let sql = ("INSERT INTO yritykset (Ytunnus, Nimi, Osoite_idOsoite, Numerot_idNumerot, Email_EmailID) VALUES ('"+params.Ytunnus+"','"+ params.Nimi+"','" +params.Osoite_idOsoite+"','"+ params.Numerot_idNumerot+"','"+ params.Email_EmailID+"')");	
     
	 connection.query(sql, function(error, results, fields){	  
        if ( error )
		{
          console.log("Virhe, syy: " + error);
          res.send({"status": 500, "error": error, "response": null}); 
        }
          res.json(results);       
    });

 },//createyr



 createOsoite: function (req, res) {  
	console.log("Body = " + JSON.stringify(req.body));
    console.log("Params = " + JSON.stringify(req.params));		
	let params = req.query;		
	    console.log(params);		

	let sql = ("INSERT INTO osoite (Katu,Postinumero,Paikkakunta) VALUES ('"+params.Katu+"','"+ params.Postinumero+"','" +params.Paikkakunta+"')");	
     
	 connection.query(sql, function(error, results, fields){	  
        if ( error )
		{
          console.log("Virhe, syy: " + error);
          res.send({"status": 500, "error": error, "response": null}); 
        }
          res.json(results);       
    });

 },//createOsoite
 
  createEmail: function (req, res) {  
	console.log("Body = " + JSON.stringify(req.body));
    console.log("Params = " + JSON.stringify(req.params));		
	let params = req.query;		
	    console.log(params);		

	let sql = ("INSERT INTO email (sposti) VALUES ('"+params.sposti+"')");	
     
	 connection.query(sql, function(error, results, fields){	  
        if ( error )
		{
          console.log("Virhe, syy: " + error);
          res.send({"status": 500, "error": error, "response": null}); 
        }
          res.json(results);       
    });

 },//createEmail
 
   createNumerot: function (req, res) {  
	console.log("Body = " + JSON.stringify(req.body));
    console.log("Params = " + JSON.stringify(req.params));		
	let params = req.query;		
	    console.log(params);		

	if(params.Pnumero==undefined){
params.Pnumero="";
}
	if(params.Ynumero==undefined){
params.Ynumero="";
}
	let sql = ("INSERT INTO Numerot (Pnumero, Ynumero) VALUES ('"+params.Pnumero+"','"+ params.Ynumero+"')");	
     
	 connection.query(sql, function(error, results, fields){	  
        if ( error )
		{
          console.log("Virhe, syy: " + error);
          res.send({"status": 500, "error": error, "response": null}); 
        }
          res.json(results);       
    });

 },//createNumerot
	
createAsiakas: function (req, res) {  
	console.log("Body = " + JSON.stringify(req.body));
	let params = req.query;	
	if(params.Ytunnus==undefined){
	params.Ytunnus=null;
	}else{
	params.Ytunnus=("'"+params.Ytunnus+"'");
	}

	
	let sql = ("INSERT INTO asiakas (Etunimi,Sukunimi,käytössä,Numerot_idNumerot,Yritykset_Ytunnus,Osoite_idOsoite,Email_EmailID) VALUES ('"+params.Etunimi+"','" +params.Sukunimi+"','"+ params.käytössä+"','"+ params.Numerot_idNumerot+"',"+ params.Ytunnus+",'"+ params.Osoite_idOsoite+"','"+ params.Email_EmailID+"')");	
	    console.log(sql);

      connection.query(sql, function(error, results, fields){	  
        if ( error )
		{
          console.log("Virhe, syy: " + error);
          res.send({"status": 500, "error": error, "response": null}); 
        }
          res.json(results);        
    });
},//createAsiakas	
	
fetchAsiakkaat: function () {  

        return new Promise((resolve, reject) => {


	let sql = ("SELECT * FROM ASIAKAS" )	
	
      connection.query(sql, function(error, results, fields){	  
            if ( error ){
              console.log("Virhe haettaessa dataa , syy: " + error);
              reject("Virhe haettaessa dataa, syy: " + error);
            }
            else
            {
			console.log("kaikki asiakkaat haettu");
              resolve(results);
            }    
        })
      })
    },//fetchAsiakkaat
	
	fetchAsiakas: function (req, res) {  
	let params = req.query;		
	let sql = ("SELECT * FROM ASIAKAS " )
	
	if(req.params.avain != "all"){
	sql = ("SELECT * FROM ASIAKAS where idAsiakas = '"+req.params.avain +"'" )		
	}		

		console.log(sql);

      connection.query(sql, function(error, results, fields){	  
        if ( error )
		{
          console.log("Virhe, syy: " + error);
          res.send({"status": 500, "error": error, "response": null}); 
        }
          res.json(results)
     
      })
    },//fetchAsiakas
	
fetchKLaskut: function () {  

        return new Promise((resolve, reject) => {


	let sql = ("SELECT LaskuID,`Työnkuva`,`Määrä`,ALV,Hinta,Viitenro,Toimitettu,`Eräpäivä`,Maksettu,a.Etunimi AS 'Kenelle' FROM laskut l INNER JOIN asiakas a ON l.Asiakas_idAsiakas = a.idAsiakas" );	
	
      connection.query(sql, function(error, results, fields){	  
            if ( error ){
              console.log("Virhe haettaessa dataa , syy: " + error);
              reject("Virhe haettaessa dataa, syy: " + error);
            }
            else
            {

              resolve(results);
            }    
        })
      })
    },//fetchKLaskut	
	
UpdateActive: function (req, res) {  
	console.log("update active");

	let params = req.query;
		console.log(params);

	let sql = ("UPDATE ASIAKAS SET käytössä ='"+params.arvo +"' where idAsiakas = '"+req.params.id +"'");
	console.log(sql);

      connection.query(sql, function(error, results, fields){	  
        if ( error )
		{
          console.log("Virhe, syy: " + error);
          res.send({"status": 500, "error": error, "response": null}); 
        }
		console.log("meni lapi");
          res.json(results); 
		  
    });
},//UpdateActive

UpdateLasku: function (req, res) {  
	console.log("update active");

	let params = req.query;
		console.log(params);

	let sql = ("UPDATE laskut SET Maksettu ='"+params.arvo +"' where LaskuID = '"+req.params.id +"'");
	console.log(sql);

      connection.query(sql, function(error, results, fields){	  
        if ( error )
		{
          console.log("Virhe, syy: " + error);
          res.send({"status": 500, "error": error, "response": null}); 
        }
		
          res.json(results);     
    });
},//UpdateLasku

    delete: function (req, res) {
        // Client lähettää DELETE method:n
        console.log("kutsuttiin delete");
     
		
		let sql = ("DELETE FROM asiakas WHERE idAsiakas = '"+req.params.avain +"'" ); 
		        console.log(sql);

		connection.query(sql,function(error, results, fields){
			if ( error ){
			console.log("Virhe, syy: " + error);
			res.send({"status": 500, "error": error, "response": null}); 
			}
			else
			{
			console.log("Data = " + JSON.stringify(results));	
			res.json(results);
		}});
    },//delete
	
updateAsiakas: function (req, res) {  
	console.log("update asiakas");
	let params = req.query;
					console.log(params);
					
	if(params.Yritykset_Ytunnus==undefined){
		params.Yritykset_Ytunnus=null;
	}

	let sql = ("UPDATE ASIAKAS SET Etunimi ='"+params.Etunimi+"',Sukunimi='" +params.Sukunimi+"',käytössä='"+ params.käytössä+"',Yritykset_Ytunnus="+ params.Yritykset_Ytunnus+",Numerot_idNumerot='"+ params.Numerot_idNumerot+"',Osoite_idOsoite='"+ params.Osoite_idOsoite+"',Email_EmailID='"+ params.Email_EmailID+"' where idAsiakas = '"+params.idAsiakas +"'");
				console.log(sql);

      connection.query(sql, function(error, results, fields){	  
        if ( error )
		{
          console.log("Virhe, syy: " + error);
          res.send({"status": 500, "error": error, "response": null}); 
        }

          res.json(results);     
    });
}//updateAsiakas	
	

}//module

console.log('Connected');

