<template>
	<div>
		<div id="message">
			已选择{{number}}张，总大小{{size}}/{{max}}KB
		</div>

		<div id="upload">
			<div class="uploadOption" v-on:click="upload()">
				<label>
					<span class="icon-upload"></span>
					<span>上传</span>
				</label>
			</div>
			<div class="uploadOption">
				<label for="fileInput">
					<span class="icon-add"></span>
					<span>添加</span>
				</label>
			</div>
		</div>

		<div id="uploadControl">
			<input type="file" multiple="multiple" accept="image/*" id="fileInput" v-on:change="fileChange($event)">
		</div>

		<div id="uploadCanvas">
			<div class="uploadItem" v-for="item in imageArray">
				<div class="itemPreview" v-bind:style="{backgroundImage:'url('+item.dataURL+')'}">
					<span class="icon-remove remove" v-on:click="remove(item.id)"></span>
				</div>
			</div>
		</div>

		<div id="curtain" v-show="isError">
			
		</div>

		<div id="waring" v-show="isError">
			<div id="waringTitle">
				<span class="icon-remove" v-on:click="isError=false"></span>
			</div>
			<div id="waringContent">
				<p>
					{{title}}
				</p>
				<p>
					{{waring}}
				</p>
				<button v-on:click="isError=false" id="iKnow">知道啦</button>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
	export default {
		data(){
			return {
				number:0,
				size:0,
				max:10240,
				imageArray:[],
				isClick:false,
				waring:"警告信息",
				isError:false,
				title:"",
				fileInput:""
			}
		},
		methods:{
			upload(){
				console.log(this.imageArray.length);
				this.isError = true;
				if(this.imageArray.length == 0){
					this.title = "哦豁，出错了";
					this.waring = "至少选择一张图片";
				}else{
					this.$axios({
						method:"post",
						url:"/api/save",
						data:{
							image:this.imageArray
						}
					}).then((res)=>{
						this.title = "上传成功";
						this.waring = "共上传"+this.number+"张照片";
						this.imageArray = [];
						this.clear();
					}).catch((err)=>{
						this.title = "上传失败";
						this.waring = "发生了错误，上传失败";
						this.imageArray = [];
						this.clear();
					})
				}
			},
			fileChange(event){
				let file = event.target.files;
				this.fileInput = event.target;
				for(let n=0;n<file.length;n++){
					console.log(file[n]);
					//防止用户强行选择其他文件
					if(file[n].type.split("/")[0]!="image"){
						this.isError = true;
						this.title = "哦豁，出错了";
						this.waring = "请选择图片类型文件";
						break;
					}else{
						//以key:value形式，将图片存到FormData中
						this.number++;
						let itemSize = parseInt((file[n].size/1024));
						this.size+=itemSize;
						//设置最大上传大小
						if(this.size>parseInt(this.max)){
							this.isError = true;
							this.title = "哦豁，出错了";
							this.waring = "超过容量上限";
							this.size-=itemSize;
							break;
						}
						//生成预览
						this.preview(file[n]);
					}
				}
				this.clear();
			},
			preview(file){
				let reader = new FileReader();
				let id = file.name.split(".")[0];
				reader.onloadend=()=>{
				    let dataURL=reader.result;
					this.imageArray.push({"dataURL":dataURL,"id":id,"size":parseInt((file.size/1024))});
					console.log(this.imageArray);
				};
				reader.readAsDataURL(file); // 读出 base64
			},
			remove(id){
				console.log(id);
				for(let n=0;n<this.imageArray.length;n++){
					if(this.imageArray[n].id == id){
						this.size-=this.imageArray[n].size;
						this.imageArray.splice(n,1);
					}
				}
				this.clear();
			},
			//允许重复选择相同的文件
			clear(){
				this.fileInput.value = "";
			}
		}
	}
</script>

<style type="text/css">
	@import '../../common/css/style.css';
	@import './index.css';
</style>