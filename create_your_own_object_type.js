

//创建对象的几种方法
//工厂模式
console.log('example of Person:');
function Person(name){
  var o = {};
  o.name=name;
  o.sayName=function(){
    console.log('my name is'+o.name);
  }
  return o;
}
var Lily=Person('Lily');
Lily.sayName();
console.log(Lily.constructor==Person,Lily instanceof Person)
//工厂模式的不足是：无法识别对象类型，为此引入构造函数模式
function Person2(name){
  this.name=name;
  this.sayName= function(){
    console.log('my name is'+this.name);
  }
}
var Jim = new Person2('Jim');
Jim.sayName();
console.log(Jim.constructor===Person2,Jim instanceof Person2)
var James = new Person2('James');
console.log(Jim.sayName==James.sayName);   // false
//构造函数模式的不足是：创建的每个Person2对象都包含了不同的Function实例，
//构造函数里的sayName函数也可以写成：
// this.sayName=new Function("console.log('my name is'+this.name)")
//但实际上没有必要创建两个完成同样任务的Function实例。
//解决办法：把函数定义转移到构造函数外面
console.log('example of Person2_0:');
function Person2_0(name){
  this.name=name;
  this.sayName= sayName;
}
function sayName(){
    console.log('my name is'+this.name);
  }
var Jim_0 = new Person2_0('Jim');
var James_0 = new Person2_0('James');
console.log(Jim_0.sayName==James_0.sayName);   
// 上面的不足是引入了全局变量sayName,并且其实这个sayName只想被Person2_0对象调用的,
//破坏了Person2_0的封装性，
//解决办法是使用原型对象模式：
console.log('example of Person3:');
function Person3(name){
  this.name=name;
}
Person3.prototype.sayName= function(){
    console.log('my name is'+this.name);
  }
var Jim3 = new Person3('Jim3');
Jim3.sayName();
var James3 = new Person3('James3');
//********************
console.log(Jim3.sayName===James3.sayName,Person3.prototype.constructor===Person3);   
console.log(Jim3.__proto__===Person3.prototype,James3.__proto__===Person3.prototype);
console.log(Person3.prototype===Object.getPrototypeOf(Jim3));
console.log(Object.prototype===Object.getPrototypeOf(Jim3));//false
console.log(Person3.prototype.isPrototypeOf(Jim3));
console.log(Object.prototype.isPrototypeOf(Jim3));
//*****************

//自定义实现instanceof
function my_instanceof(ins,cons){
  return cons.prototype.isPrototypeOf(ins);
}
console.log(my_instanceof(Jim3,Person3),my_instanceof(Jim3,Object))
var a=new Date();
console.log(my_instanceof(a,Date),my_instanceof(a,Object))
//
console.log('example of my_instanceof2');
console.log(Jim3.__proto__.__proto__===Person3.prototype.__proto__)
function my_instanceof2(ins,cons){
  var p = ins.__proto__;
  while(true){
    if(p===cons.prototype){
      return true;
    }else{
      if(p){
        p=p.__proto__;
      }else{
        return false;
      }
    }
  }
}
// my_instanceof2中太多if，else，改写：
function my_instanceof3(ins,cons){
  var p = ins.__proto__;
  while(true){
    if(p===cons.prototype){
      return true;
    }
    if(!p){
      return false;
    }
    p=p.__proto__;
  }
}
//obj.__proto__ not supported in IE
console.log(my_instanceof3(Jim3,Person3),my_instanceof3(Jim3,Object))
//var a=new Date();
console.log(my_instanceof3(a,Date),my_instanceof3(a,Object))

//原型对象模式的不足是：原型对象中的属性是被所有实例共享的，
//导致在某个实例上对某个引用类型的属性值的改变会影响所有实例，如下例：
console.log('example of testPerson');
function TestPerson (){
   
};
TestPerson.prototype.friends=['friendA','friendB'];
var testJim=new TestPerson();
var testJames=new TestPerson();
testJim.friends.shift();
console.log(testJim.friends===testJames.friends)

//解决办法是：组合使用构造函数模式和原型模式，这是使用最广泛的创建自定义类型的方法
console.log('example of CombinedPerson');
function CombinedPerson (){
   this.friends=['friendA','friendB'];
};
CombinedPerson.prototype.sayFriends=function(){
  console.log(this.friends);
}
var combJim=new CombinedPerson();
var combJames=new CombinedPerson();
combJim.friends.shift();
combJim.sayFriends();
combJames.sayFriends();








