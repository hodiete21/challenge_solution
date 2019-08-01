var express = require('express'), 
	request = require('request'),
	app= express(),
	fs =require('fs'), 
	productData = fs.readFileSync(__dirname +'/json/products.json'), //JSON data for products in roster
	snackersData = fs.readFileSync(__dirname +'/json/snackers.json'), // JSON data for snacks and their emails
	products= JSON.parse(productData),
	snackers= JSON.parse(snackersData),
	totalSnack=0,
	totalCost=0,
	port =  process.env.PORT||3000;

app.set ('view engine', 'ejs'); 
app.use(function(req, res, next){
  res.locals.totalSnack= totalSnack;// globally access snacks
  res.locals.totalCost=totalCost;   //globally access cost
  next();
})

// //Getting JSON data via url 
// app.get("/", function (req, res){
// 	request("https://s3.amazonaws.com/misc-file-snack/MOCK_SNACKER_DATA.json", function (err, response, body){
//     // console.log('error:', error); // Print the error if one occurred
//    	if (!err && response.statusCode==200){
//      var data= JSON.parse(body);
//      res.render("index", {data: data});
//     }else{
//      console.log(err);
//     }

//     }); 
// });

//ROUTES
app.get("/", function(req, res){
	res.render("index", {data:snackers});
});

app.get("/shop", function (req, res){
	res.render("shop", {product:products, snackers:snackers});
});

app.get("/:id", function(req, res){

	res.send("Sorry Page doesn't exist");
})

app.listen(port, function (req, res){

	console.log("Server is Working");
})