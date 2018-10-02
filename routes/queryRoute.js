var natural = require('natural'),
	
	express=require('express'),
	request=require('request'),
	Tokenizer=require('sentence-tokenizer'),
	qs=require('querystring'),
	stemmer=natural.PorterStemmer,
	tokenizer=new Tokenizer('Chuck'),
	router=express.Router(),
	axios=require('axios')
	
	


var stopwords=['alexa','i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', 'you', "you're", "you've", "you'll", "you'd", 'your', 'yours', 'yourself', 'yourselves', 'he', 'him', 'his', 'himself', 'she', "she's", 'her', 'hers', 'herself', 'it', "it's", 'its', 'itself', 'they', 'them', 'their', 'theirs', 'themselves', 'what', 'which', 'who', 'whom', 'this', 'that', "that'll", 'these', 'those', 'am', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'having', 'do', 'does', 'did', 'doing', 'a', 'an', 'the', 'and', 'but', 'if', 'or', 'because', 'as', 'until', 'while', 'of', 'at', 'by', 'for', 'with', 'about', 'against', 'between', 'into', 'through', 'during', 'before', 'after', 'above', 'below', 'to', 'from', 'up', 'down', 'in', 'out', 'on', 'off', 'over', 'under', 'again', 'further', 'then', 'once', 'here', 'there', 'when', 'where', 'why', 'how', 'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 's', 't', 'can', 'will', 'just', 'don', "don't", 'should', "should've", 'now', 'd', 'll', 'm', 'o', 're', 've', 'y', 'ain', 'aren', "aren't", 'couldn', "couldn't", 'didn', "didn't", 'doesn', "doesn't", 'hadn', "hadn't", 'hasn', "hasn't", 'haven', "haven't", 'isn', "isn't", 'ma', 'mightn', "mightn't", 'mustn', "mustn't", 'needn', "needn't", 'shan', "shan't", 'shouldn', "shouldn't", 'wasn', "wasn't", 'weren', "weren't", 'won', "won't", 'wouldn', "wouldn't"];

var cleanQuery=function(sent)
{
	tokenizer.setEntry(sent);
	tokenizer.getSentences();
	var query_words=tokenizer.getTokens();
	var clean=[];
	query_words.forEach(function(token){
		if(stopwords.indexOf(token.toLowerCase())==-1)
			clean.push(token);
	})
	//console.log(clean);
	return stemmer.stem(clean[0])

}
//console.log(cleanQuery("Alexa Where are my catting"));
router.get("/",function(req,res){
	res.send("What")
})
router.post("/query",function(req,res){
	//res.send(req.body)
	var query=req.body.obj;
	var query_word=cleanQuery(query);
	var ob={name:'angad',obj:query_word};
	var url="http://159.89.173.191:3000/user/find";
	console.log(ob);
	request.post({
		url,
		body:ob,
		json:true
	},(err,resp,body)=>{
		res.send(body)
	})
		
	});
	
	







router.post("/test",(req,res)=>{
	res.json(req.body);
});


module.exports=router;