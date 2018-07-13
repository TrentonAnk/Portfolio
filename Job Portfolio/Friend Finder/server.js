var express = require("express");
var bodyParser = require("body-parser");
var path = require('path');



var app = express(); 
var PORT = process.env.PORT || 8000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());

require("./routes/apiRoutes.js")(app);
require("./routes/htmlRoutes.js")(app);



app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});


