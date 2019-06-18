//使字符串反转,the first function not good.
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
console.log(str+','+strReverse2(str))