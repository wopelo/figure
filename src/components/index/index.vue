<template>
	<div>
		<div id="message">
			已选择{{number}}张，总大小{{size}}KB
		</div>

		<div id="upload">
			<div class="uploadOption" v-on:click="upload()">
				<span class="icon-upload"></span>
				<span>上传</span>
			</div>
			<div class="uploadOption">
				<label for="fileInput">
					<span class="icon-add"></span>
					<span>添加</span>
				</label>
			</div>
		</div>

		<div id="uploadControl">
			<input type="file" multiple="multiple" accept="image/*" id="fileInput" v-on:change="fileChnage($event)">
		</div>

		<div id="uploadCanvas">
			<div class="uploadItem" v-for="item in imageArray">
				<div class="itemPreview" v-bind:style="{backgroundImage:'url('+item+')'}">
					<span class="icon-remove remove"></span>
				</div>
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
				imageArray:[],
				upmpImage:new FormData(),
				isClick:false
			}
		},
		methods:{
			upload(){
				console.log(this.imageArray);
			},
			fileChnage(event){
				let file=event.target.files;
				for(let n=0;n<file.length;n++){
					console.log(file[n]);
					//防止用户强行选择其他文件
					if(file[n].type.split("/")[0]!="image"){
						alert("请选择图片类型文件");
						break;
					}else{
						//以key:value形式，将图片存到FormData中
						this.number++;
						this.size+=((file[n].size/1024).toFixed(2)-0);
						this.upmpImage.append(file[n].name.split(".")[0],file[n]);
						//生成预览
						this.preview(file[n]);
					}
				}
			},
			preview(file){
				let reader=new FileReader();
				reader.onloadend=()=>{
				    let dataURL=reader.result;
					this.imageArray.push(dataURL);
					console.log(this.imageArray);
				};
				reader.readAsDataURL(file); // 读出 base64
			}
		}
	}
</script>

<style type="text/css">
	@import '../../common/css/style.css';
	@import './index.css';
</style>