let fs=require("fs");

let Save=function(data,res){
	changeBack(data).then(()=>{
		backClient(res,{'success':'上传成功'});
	})
}

function changeBack(data){
	let arr = [];
	for(let n in data){
		let target = data[n];
		let name = target.id;
		let base64Data = target.dataURL.replace(/^data:image\/\w+;base64,/, "");
		let type = target.dataURL.split(";",1)[0].split("/")[1];
		let dataBuffer = new Buffer(base64Data, 'base64');
		arr.push(new Promise((resolve,reject)=>{
			fs.writeFile("./image/"+name+"."+type, dataBuffer, function(err) {
				if(err){
				 reject(err);
				}else{
				  resolve("保存成功！");
				}
			});
		}))
	}
	return Promise.all(arr);
}

function backClient(res,result){
	res.statusCode=200;
	res.setHeader("Content-Type","text/plain");
	res.setHeader("Access-Control-Allow-Origin","*");
	res.write(JSON.stringify(result));
	res.end();
}

module.exports = Save;