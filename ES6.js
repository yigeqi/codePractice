
/*Promise 对象
1. Promise 有几种状态？Promise 的特点是什么，分别有什么优缺点？
2. Promise 构造函数是同步还是异步执行？then 呢？Promise 如何实现 then 处理？
3. Promise 和 setTimeout 的区别？
4. 如何实现 Promise.all() ？all() 的用法？
5. 如何实现 Promise.prototype.finally() ？
*/
console.log('\n example of Promise 新建后就会立即执行。')
 var p = new Promise(resolve=>{
	console.log('start a Promise instance.')
	resolve('start resolve().')
	console.log('aaaa')
})
p.then(str=>console.log(str));
console.log('after p;');
//then方法指定的回调函数，将在当前脚本所有同步任务执行完才会执行，
/////////////
console.log('\n example of 使用promise调用ajax');
function getJSON(url){
	return new Promise((resolve,reject)=>{
		const xhr = new XMLHttpRequest();
		xhr.onreadystatechange=function(){
			if(xhr.readyState==4){
				if((xhr.status>=200&&xhr.status<300)||xhr.status==304){
				  resolve(xhr.responseText);
				}else{
				  reject(new Error(`request failed with status code:${xhr.status}`));
				}
			}
		}
		xhr.responseType='json';
		xhr.open('get',url,true);
		xhr.send(null);
	})
}
/*
getJSON('').then(res=>console.log(res),err=>console.log(err));

getJSON('').then(res1=>getJSON(res1.url)).then(res2=>getJSON(res2.url)).catch(e=>{...})
*/
//串行执行多个异步操作
var p1=function(n){
	return new Promise((resolve,reject)=>{
		setTimeout(()=>{console.log(`n=${n}`);resolve(n);},2000)
	})
}
var p_multi=function(n){
	return new Promise((resolve,reject)=>{
		setTimeout(()=>{console.log(`n*n=${n*n}`);resolve(n*n);},1000)
	})
}
var p_add=function(n){
	return new Promise((resolve,reject)=>{
		setTimeout(()=>{console.log(`n+n=${n+n}`);resolve(n+n);},3000)
	})
}
p1(3)
.then(n=>p_multi(n))
.then(n=>p_add(n))
.catch(e=>console.log(e))
//并行执行异步任务
Promise.all([p1(1),p_multi(2),p_add(3)])
 .then(([a,b,c])=>console.log(a,b,c));
//多个异步任务里，只取最快得到结果的，剩下的任务继续执行但不返回结果
Promise.race([p1(1),p_multi(3),p_add(2)])
 .then(a=>console.log(a));
//Promise.race()可用于设置请求某个时间内没成功返回就放弃使用
Promise.race([p_add(1),new Promise((resolve,reject)=>{
	setTimeout(resolve,2000);
})]).then(a=>console.log(a));  //undefined

//自实现Promise.all
const test_myall=function(){
  return new Promise((resolve,reject)=>{
    var a=[];
    p1(1).then(i=>a[0]=i);  
    p_multi(2).then(i=>a[1]=i);  
    p_add(3).then(i=>a[2]=i);  
    console.log(a);
    resolve(a);
  })
}
test_myall(p1)
 .then(([a,b,c])=>console.log(a,b,c)); //[undefined,undefined,undefined]

Promise.myall=function(ps){
  return new Promise((resolve,reject)=>{
    var a=[],resolvedNum=0;
    ps.forEach((p,i)=>{
    	Promise.resolve(p).then(res=>{ //Promise.resolve()用于防止传入的参数不是Promise实例
    	  a[i]=res;
    	  resolvedNum++;
    	  resolvedNum==ps.length&&resolve(a);
    	},err=>reject(err));
    })
  })
}
Promise.myall([p1(1),p2(2),p_add(3)])
 .then(([a,b,c])=>console.log(a,b,c)).catch(err=>console.log(err));  
//
 
/*类、继承和模块化
1. import 和 export？
2. ES6 中的 class 和 ES5 的类有什么区别？
3. ECMAScript6 怎么写 class 么？为什么会出现 class 这种东西?
4. 原型如何实现继承？Class 如何实现继承？Class 本质是什么？
*/