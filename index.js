var natural = require('natural'),
	request=require('request'),
	express=require('express'),
	bodyParser=require('body-parser'),
	Tokenizer=require('sentence-tokenizer'),
	app=express(),
	stemmer=natural.PorterStemmer,
	tokenizer=new Tokenizer('Chuck'),
	port=process.env.PORT || 3000,
	queryRoute=require('./routes/queryRoute'),
	objRoute=require('./routes/objRoute')

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(queryRoute);
app.use(objRoute);




app.listen(port,function(err){
	if(err)
		console.log(err);
	else
		console.log("Server running on port "+port);
})