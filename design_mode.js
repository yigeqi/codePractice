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
    if(clients&&fn){
      this.clients[key] = clients.filter(function(item){
        return item!=fn;
      })
    }
    console.log('after remove(), the clients length is :'+ this.clients[key].length)
  }
  obj.trigger = function(key){
    var clients = this.clients[key];
    args = [].slice.call(arguments);
    args.shift();
    if(clients){
      for(var i = 0;i< clients.length;i++){
        clients[i].apply(this,args);
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
  header.setAvatar(data);
  nav.refresh(data);
})
这种方式麻烦的地方在于：login模块负责人需要知道调用其他模块的函数方法，
当需要添加新业务逻辑时，也需要在login模块里添加相应的新方法。
改成使用观察者模式后：
login.succ(data=>{
  login.trigger('loginSucc',data);
})
var header = (function(){
  login.listen('loginSucc',data=>header.setAvatar(data))
  return {
  setAvatar: data=>{...}
  }
})()
 */

/*
现实中买房者并不是到房产公司订阅消息，而是由房产中介保存客户列表和发布消息，
如此客户想订阅多个房产公司的消息时不需要具体知道消息来源是salesOffice1.listen()还是salesOffice2.listen(),
中介就相当于一个全局的订阅-发布对象。
 */
 console.log('\n example4 of 全局的订阅-发布对象')
 var Event = {
  clients:{},
  listen:function(key,fn){
    if(!this.clients[key]){
      this.clients[key]=[];
    }
    this.clients[key].push(fn);
  },
  remove:function(key,fn){
    var c = this.clients[key];
    if(c&&fn){
      for(var i=c.length;i>=0;i--){
         this.clients[key][i]===fn&&this.clients[key].splice(i,1)
      }
    }
    if(c&&!fn){
      delete this.clients[key]
    }
  },
  trigger:function(key,p){
    if(!this.clients[key])
      return false;
    var args = [].slice.call(arguments);
    args.shift();
    this.clients[key].forEach(function(item){
      item.apply(this,args);
    })
  }
 }
Event.listen(100,example4Fn = p=>console.log('J 100 with price:'+p));
Event.trigger(100,10000);
Event.remove(100,example4Fn);
Event.trigger(100,10000);
/*上述写法依然可以在外边调用Event.clients,若是想对外隐藏clients，可以改写成：
var Event = (function(){
  var clients={};
  var listen = function(){};
  ......
  return {
  listen:listen,
  remove:remove,
  trigger:trigger
  }
})()
*/

console.log('\nexample of 实现可以先发布在订阅 和 创建事件名的命名空间。')
/*
1：上述观察者模式都是必须先订阅再发布才能收到消息，现实中可能是trigger()之后才listen()。
比如请求响应返回的很快，立即运行了listen()，这时listen()相关的代码还没有加载好。
2：由于全局共用对象Event中只有一个clients来保存事件名key，很容易导致事件名冲突，
为此：为事件名创建命名空间，使调用变成
Event.create('namespace1').listen();
Event.create('namespace1').trigger();
*/
Event = (function(){
  var clients={}; //{namespace1:{key1:[fn1_1,fn1_2],key2:[]},}
  var donekeys={};//{namespace1:{key1:[arg1_1,arg1_2],key2:[]},}
  var ns; //current namespace
  var create = function(namespace){
    ns = namespace;
    return this;
  };
  var listen = function(key, fn){
    // add fn to clients
    if(!clients[ns]){
      clients[ns]={};
      clients[ns][key]=[fn]
    }
    else if(clients[ns]&&!clients[ns][key]){
      clients[ns][key]=[fn];
    }
    else if(clients[ns]&&clients[ns][key]){
      clients[ns][key].push(fn);
    }
    //check if key has been triggered before
    if(donekeys[ns]&&donekeys[ns][key]){
      donekeys[ns][key].forEach(function(item){
        fn.apply(this,item);
      })     
    }
  };
  var remove = function(key,fn){
    var c = clients[ns][key];
    if(c&&fn){
      for(var i=c.length;i>=0;i--){
         clients[ns][key][i]===fn&&clients[ns][key].splice(i,1)
      }
    }
    if(c&&!fn){
      delete clients[ns][key]
    }
  }; 
  var trigger = function(key){
    var args = [].slice.call(arguments);
    args.shift();
    // add key and args to donekeys
    if(!donekeys[ns]){
      donekeys[ns]={};
      donekeys[ns][key]=[args];
    }
    else if(donekeys[ns]&&!donekeys[ns][key]){
      donekeys[ns][key]=[args];
    }
    else if(donekeys[ns]&&donekeys[ns][key]){
      donekeys[ns][key].push(args);
    }
     
    if(!clients[ns]||!clients[ns][key])
      return false;
    clients[ns][key].forEach(function(item){
      item.apply(this,args);
    })
  };
  return {
  create:create,
  listen:listen,
  remove:remove,
  trigger:trigger
  }
})()
Event.create('namespace1').listen('key2',a=>console.log('the key2 params is:'+a));
Event.create('namespace1').trigger('key2','aaa');
Event.create('namespace1').trigger('key1','a');
Event.create('namespace1').trigger('key1','b');
Event.create('namespace1').listen('key1', fna=function(a){console.log('the key1 params is:'+a)});
Event.create('namespace1').listen('key1', function(a){console.log('thsssssse key1 params is:'+a)});
Event.create('namespace1').remove('key1',fna);
Event.create('namespace1').trigger('key1','a');

/*above is not right, 也可以不用命名空间，直接：Event.listen()，总体思路：
用namespaceCache={namespace1:{listen,remove,trigger}}，不使用create是相对于执行了create('default'),
每个namespace里:cache={key:[fn...]},offlineStack=[fn...]保存需要以后listen时再执行（即trigger）offlineStack(离线事件)，
如果listen时在某个namespace的key上执行过离线事件，则设置offlineStack=null,这样再次trigger此事件时不再
保存该离线事件。listen时若执行过某个key上的离线事件后，下次再listen相同的key时也会保存进cache，但不会被再次自动trigger。
*/
console.log('\nexample of  实现可以先发布在订阅 和 创建事件名的命名空间。')
// to be done


