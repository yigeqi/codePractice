//使字符串反转,the first function not good.
console.log('example of 字符串反转');
function strReverse(str){
  var res='';
  for(var i=str.length-1;i>=0;i--){
    res+=str.charAt(i);
  }
  return res;
}
//
var str='hello world';
console.log(str+','+strReverse(str))
function strReverse2(str){
  return str.split('').reverse().join('');
}
console.log(str+','+strReverse2(str));

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

console.log('\n example of special "let"')
