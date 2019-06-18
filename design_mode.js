//发布-订阅模式
//售楼处salesOffice负责发布房子消息salesOffice.trigger(houseArea,price),
//买房者订阅这个消息salesOffice.listen(function(houseArea,price){...}）
var salesOffice = {};
salesOffice.clients=[];
salesOffice.listen=function(fn){
  this.clients.push(fn);
};
salesOffice.trigger=function(houseArea,price){
  for(var i = 0;i<this.clients.length;i++){
    //this.clients[i](houseArea,price);
    // 或者不限参数个数：
    this.clients[i].apply(this,arguments);
  }
}
salesOffice.listen(function(){
  console.log('Jim listens with houseArea:'+arguments[0]+',price:'+arguments[1]);
})
salesOffice.listen(function(){
  console.log('Lily listens with houseArea:'+arguments[0]+',price:'+arguments[1]);
})
salesOffice.trigger(100,1000000);
salesOffice.trigger(90,900000);

//上述问题：订阅者订阅了所有的消息，改进：通过key限制只订阅特定大小面积的房子
console.log('start example 2.')
 
var salesOffice2 = {};
salesOffice2.clients={};
salesOffice2.listen=function(key,fn){
  if(!this.clients[key]){
    this.clients[key]=[];
  }
  this.clients[key].push(fn);
};
salesOffice2.trigger=function(){
  //var arr = this.clients[arguments[0]];//not right for later arguments
  var arr = this.clients[Array.prototype.shift.call(arguments)];
  for(var i = 0;i<arr.length;i++){
    arr[i].apply(this,arguments);
  }
}
salesOffice2.listen(100,function(){
  console.log('Jim listens with houseArea:'+100+',price:'+arguments[0]);
})
salesOffice2.listen(90,function(){
  console.log('Lily listens with houseArea:'+90+',price:'+arguments[0]);
})
salesOffice2.trigger(100,1000000);
salesOffice2.trigger(90,900000);