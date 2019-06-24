//使字符串反转,the first function not good.
console.log('example of 字符串反转');
function strReverse1(str){
  var res='';
  for(var i=str.length-1;i>=0;i--){
    res+=str.charAt(i);
  }
  return res;
}
//
var str='hello world';
console.log(str+','+strReverse1(str))
function strReverse2(str){
  return str.split('').reverse().join('');
}
console.log(str+','+strReverse2(str));
//strReverse1和strReverse2就是命令式代码和声明式代码的区别了
// 命令式代码的意思就是，我们通过编写一条又一条指令去让计算机执行一些动作，这其中一般都会涉及到很多繁杂的细节，
// 会引入一些转瞬即逝的中间变量。
// 而声明式就要优雅很多了，我们通过写表达式的方式来声明我们想干什么，而不是通过一步一步的指示。

//去除数组中所有特定值的项
console.log('\n example of 去除数组中所有特定值的项')
var arr=['a','b','c','b','d'];
for(var i=arr.length-1;i>=0;i--){
  if(arr[i]==='b'){
    arr.splice(i,1);
  }
}
//not right if i begins from 0 to arr.length-1
console.log(arr);
var arr1=['a','b','c','b','d'];
arr1=arr1.filter(function(i){return i!='b';})
console.log(arr1);

// once wrong
console.log('\n example of 曾经出错')
var a={};
a.c=[1,2,3];
var b=a.c;
b=b.filter(function(i){return i<3;});
console.log(b,a.c); //warning:b=[1,2];a.c=[1,2,3]

//array method of "add,delete,replace"
console.log('\n example of 数组的splice()用法')
var arr=['a','b','c'];
arr.splice(1,0,'a1','a2');
console.log(arr);
arr.splice(1,2);
console.log(arr);
arr.splice(1,2,'a1','a2','a3');
console.log(arr);

//
console.log('\n add or change a property of an object');
//mySetObj({a:1,b:{b1:2}},{b:{b1:3,b2:4}})={a:1,b:{b1:2,b2:4}}
function mySetObj(obj,sorce){
	Object.keys(obj).map(name=>{
	  if(sorce[name]===undefined||Object.getPrototypeOf(obj[name])!==Object.prototype){
	    sorce[name]=obj[name];
	  }else{
	    mySetObj(obj[name],sorce[name]);
	  }
	})   
	return sorce;
}
console.log(mySetObj({a:1,b:{b1:2},c:[1]},{b:{b1:3,b2:4},c:{c1:1}}));

















