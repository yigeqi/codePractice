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
console.log('\nstart example 2.')
 
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

//下面通过一个通用函数installEvent(obj)给任何obj添加.listen(key,fn)和.trigger(key,...),
//并添加一个取消订阅的函数.remove(key,fn)
console.log('\nexample 3: installEvent()');
function installEvent(obj){
  obj.clients = {};
  obj.listen = function(key,fn){
    if(!this.clients[key]){
      this.clients[key]=[];
    }
    this.clients[key].push(fn);
  }
  obj.remove = function(key,fn){
    var clients = this.clients[key];
    if(clients && !fn){
      delete this.clients[key];
    }
    console.log(clients.length)
    if(clients&&fn){
      clients = clients.filter(function(item){
        return item!=fn;
      })
    }
    console.log(clients.length + ','+ this.clients[key].length+'remove'+key)
  }
  obj.trigger = function(key){
    var clients = this.clients[key];
    console.log(clients.length+'trigger'+key)
    args = [].slice.call(arguments);
    args.shift();
    if(clients){
      for(var i = 0;i< clients.length;i++){
        clients[i].apply(null,args);
      }
    }
  }
  return obj;
}
var salesOffice3=installEvent({});
salesOffice3.listen(100,function(p,n){
  console.log('Jim3 listens with houseArea:'+100+',price:'+p+',name:'+n);
})
var Jim3area90 = function(p,n){
  console.log('Jim3 listens with houseArea:'+90+',price:'+p+',name:'+n);
};
salesOffice3.listen(90,Jim3area90);
salesOffice3.listen(90,function(){
  console.log('Lily3 listens with houseArea:'+90+',price:'+arguments[0]);
})
salesOffice3.trigger(100,1000000,'a');
salesOffice3.trigger(90,900000,'b');
salesOffice3.remove(90,Jim3area90);
salesOffice3.trigger(90,900000,'b');

 /*
观察者模式在现实中的运用：
用户登录模块login，当登录成功后需要调用其他与用户信息相关的模块来更新信息，
如header模块，nav模块
login.succ(data=>{
  
})
这种方式麻烦的地方在于：
改成使用观察者模式后：
 */

/*
现实中买房者并不是到房产公司订阅消息，而是由房产中介保存客户列表和发布消息，
如此客户想订阅多个房产公司的消息时不需要具体知道是salesOffice1.listen()还是salesOffice2.listen(),
中介就相当于一个全局的订阅-发布对象。
 */
 console.log('\n example4 of 全局的订阅-发布对象')
 var Event = {
  clients:{},
  listen:function(key,fn){

  },
  remove:function(key,fn){

  },
  trigger:function(key,p){
    
  }
 }
Event.listen(100,example4Fn = p=>console.log('J 100 with price:'+p));
Event.trigger(100,10000);
Event.remove(100,example4Fn);
Event.trigger(100,10000);

 









