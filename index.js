var express = require('express' );
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();

app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());

app.use(function(req, res, next){
 res.setHeader("Access-Control-Allow-Origin", "*");
 res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
 res.setHeader("Access-Control-Allow-Headers", "content-type");
 res.setHeader("Content-Type", "application/json");
 res.setHeader("Access-Control-Allow-Credentials", true);
 next();
});

var server = app.listen(process.env.PORT || 1025, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});
 
app.get('/api', function(req, res){
    fs.readFile('dados.json', 'utf8', function(err, data){
      if (err) {
        var response = {status: 'falha', resultado: err};
        res.json(response);
      } else {
        var obj = JSON.parse(data);
        var result = 'Nenhuma informação foi encontrada';
    
        obj.info.forEach(function(info) {
          if (info != null) {
            result = '';
            if (info.info_id == req.query.info_id) {
              result = result + info;
            }
          }
        });
    
        //var response = {status: 'sucesso', resultado: result};
        //res.json(response);
        res.json([result]);
      }
    });
   });