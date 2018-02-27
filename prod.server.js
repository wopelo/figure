let express=require("express");
let bodyParser=require("body-parser");
let app=express();

//定义static目录
app.use(express.static("./dist"));

//启动express
module.exports=app.listen(81, function (err) {
	if(err){
		console.log(err);
		return
	}
	console.log('Listening at http://localhost:'+81+'\n');
});