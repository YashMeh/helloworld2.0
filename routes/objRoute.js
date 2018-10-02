var express=require('express'),
	Clarifai=require('clarifai'),
	request=require('request'),
	app = new Clarifai.App({apiKey: '4ef96334b1c54817b0a20091a28d3ffa'}),
	router=express.Router(),
	multer=require('multer'),
	path=require('path'),
	fs=require('fs')


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'Uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now()+".jpg")
  }
});
 
var upload = multer({ storage: storage }).single('photo');

var commonItems=["key","bottle","telephone","phone","cellular phone","medicine","pill","drug","capsule","purse","bag","backpack","luggage"];

function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}
var detected_ob
var confidence=0;
function giveObj(encoded_img)

{
	//console.log(encoded_img);
	app.models.predict(Clarifai.GENERAL_MODEL, {base64: encoded_img}).then(
  function(response) {
    // do something with response
    response.outputs[0].data.concepts.forEach(function(entity){
    	if(commonItems.indexOf(entity.name)>0){
    		if(confidence<entity.value){
    		detected_ob=entity.name;
    		confidence=entity.value;
    		//console.log("saagd");	
    	}
    		
    		
    	}
    })
  },
  function(err) {
    // there was an error
    console.log("error occured in giveObj")
  }
);
}

router.post('/profile', function (req, res) {
  upload(req, res, function (err) {
  	console.log(req.file);
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.

    } else {
      // An unknown error occurred when uploading.
    }
 	
 	var base64img=base64_encode(req.file.path);
 	//console.log(base64img);
 	giveObj(base64img);
 	
 	//console.log("sdgf");
 	
    // Everything went fine.
    // res.json({
    // 	success:true,
    // 	message:"Done",
    	
    // });
    
  })
  setTimeout(function(){
  	req.body["obj"]=detected_ob;
  	request.post({
  	url:"http://159.89.173.191:3000/user/query",
  	json:true,
  	body:{
  		name:req.body.name,
  		loc:req.body.loc,
  		timestamp:req.body.timestamp,
  		obj:req.body.obj
  	}
  },function(err,resp,body){
  	res.json(body);
  })
    

  },5000);
  confidence=0;
  detected_ob="";

})







module.exports=router;