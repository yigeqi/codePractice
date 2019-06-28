
console.log('\n理解什么是“在捕获/冒泡阶段调用事件处理程序”')
document.getElementById('inner').addEventListener('click',function(e){
  console.log('hello '+e.currentTarget.id);
  //e.stopPropagation(); // 加上这一句会导致什么呢
},true);
document.getElementById('innermost').addEventListener('click',function(e){
  console.log('hello '+e.currentTarget.id);
});
document.getElementById('outer').addEventListener('click',function(e){
  console.log('hello '+e.currentTarget.id);
});

(function(){
	//模块间通信
	//a模块负责trigger，并传参：记录点击次数
	var a =(function(){
		var i=0;
		document.getElementById('btn-a').addEventListener('click',function(){
			i++;
			Event.trigger('btn-a-click',i)
		},false);
	})()
	//b模块负责listen，并执行回调函数：显示点击次数
	var b=(function(){
		Event.listen('btn-a-click',function(i){
			var show_count = document.getElementById('show-count');
			show_count.replaceChild(document.createTextNode(i+''),show_count.firstChild);
		})
	})()

	/////////////////
	console.log('\n example of 使用promise异步加载图片。')
	function asyncLoadImg(url){
	  return new Promise((resolve,reject)=>{
	    var img = new Image();
	    img.onload=()=>resolve(img);
	    img.onerror=(msg)=>reject(new Error(`failed to load img:${msg}`));
	    img.src=url;
	  })
	}
	var imgurl1='https://img.alicdn.com/tfs/TB11CSkaMFY.1VjSZFnXXcFHXXa-990-550.jpg_1080x1800Q90s50.jpg';
	asyncLoadImg(imgurl1)
	.then(img=>{console.log(img);document.getElementById('imgContainer1').appendChild(img);},b=>console.log(b));
	console.log('do sth befor img loader.');

})()