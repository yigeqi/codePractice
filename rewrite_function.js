//自实现bind(),curry()

//////////////////////////////////////
//自实现bind函数
console.log('example of bind()')
Function.prototype.myBind=function(context){
  var fn = this;
  var args = [].slice.apply(arguments);
  args.shift();
  return function(){
    fn.apply(context,[].concat.apply(args, arguments));
  }
}
function test(m,n,l){
  console.log(this.a+m+n+l);
}
test.myBind({a:11111},'s','b')(2); //'11111sb2'
//函数柯里化
console.log('example of curry() ')
//add0(1)(2)=3;
function add0(num){
  return function(i){
    return num+i;
  }
}
/*
实现一个add方法，使计算结果能够满足如下预期
add(1,2)=3：
add(1,2)(3) = 6
add(1)(2)(3) = 6
add(1)(2)(3)(4) = 10
*/
function add(){
  var argsArr = [].slice.call(arguments);
  var adder = function(){
    var _add = function(){
      //argsArr.push.apply(null,arguments); //error!!!
      //[].push.apply(argsArr,arguments);
      //argsArr = argsArr.concat(arguments) // error, get [1,2,3,{}]
      //argsArr = argsArr.concat([].slice.call(arguments));
      //argsArr = [].concat.apply(argsArr,arguments);   
      argsArr = [].concat.apply(argsArr,arguments); // right
      return _add;
    }
    _add.toString=function(){
      return argsArr.reduce(function(c,p){return c+p;})
    }
    return _add;
  }
  return adder();
}
console.log(add(3,3)(9)(9));

function fn(){
  return  [].slice.call(arguments).reduce(function(c,p){return c+p;})
}
//实现myCurry函数把一个函数变成柯里化函数
function myCurry(fn){
  var argsArr = [].slice.call( arguments);
  argsArr.shift();
  var f = function(){
    var _f = function(){
      [].push.apply(argsArr,arguments);
      return _f;
    }
    _f.toString=function(){
      //return fn(argsArr); // error!!!!!
      return fn.apply(null,argsArr);
    }
    return _f;
  }
  return f();
}
console.log(myCurry(fn,1,2)(1)(9)(1),myCurry(fn)(9)(1));

  