//继承方式
console.log('\n继承方式：原型链');
function Person1(name){
  this.name=name;
  this.age=[10,20,30];
}
Person1.prototype.sayName=function(){
  console.log(this.name);
}

function Worker1(name){
  this.name = name; 
}
Worker1.prototype = new Person1();
Worker1.prototype.sayName = function(){
  console.log(this.name + ' is a Worker.');
}
var w1 = new Worker1('w1');
w1.age.push(50);
console.log(w1.age);
var w2=new Worker1('w2');
console.log(w2.age);
/*原型链的问题:1,无法向父类构造函数传参数，如子类的name属性需要重新定义；
2，所有子类实例共享父类的引用类型的属性，互相影响，如w1和w2的age属性。
借用构造函数方式可以解决上述问题
*/
console.log('\n最常用继承方式：组合继承=借用构造函数+原型链');
function Person(name){
  this.name=name;
  this.age=[10,20,30];
}
Person.prototype.sayName0=function(){
  console.log(this.name);
}

function Worker(name){
  Person.call(this,name)
}
Worker.prototype = new Person();
Worker.prototype.sayName = function(){
  console.log(this.name + ' is a Worker.');
}
var w1 = new Worker('w1');
w1.age.push(50);
console.log(w1.age);
var w2=new Worker('w2');
console.log(w2.age);
w2.sayName();
w2.sayName0();
//如上所示：Work.prototype = new Person()时会创建一次实例属性name和age,
//Person.call(this,name)又会创建一次，屏蔽了之前创建的共享属性

console.log('\n原型式继承');
//适用于在不必大费周章的预先定义构造函数的情况下实现继承，
//问题是：原对象的引用类型属性依然会被新对象们共享。
function create(obj){
  function F(){}
  F.prototype=obj;
  return new F();
}
var obj={p1:1,p2:[2,3]};
var obj1=create(obj);
obj.p2.push(4);
var obj2=create(obj);
obj2.p2.push(5);
console.log(obj.p2,obj1.p2,obj2.p2);
//ECMAScript5的Object.create(obj,peropertyDescriptionObj)实现与上述create()函数
//同样的功能，且能接受第二个参数，可以覆盖原对象上的同名属性
var obj3=Object.create(obj,{p1:{value:'1'}});
console.log(obj3.p1,obj3.p2)

console.log('\n寄生式继承');
//寄生式继承与原型式继承类似，只是返回了一个增强对象
function createAnother(obj){
  var o = create(obj); //通过调用函数创建一个新对象，不局限于create()函数
  o.sayName=function(){console.log('my name is '+this.name);} //以某种方式增强这个对象
  return o;
}
var jssObj={name:'jim'};
var jssObj1=createAnother(jssObj);
jssObj1.sayName();
//寄生式继承的问题与构造函数模式相同，无法做到函数复用

console.log('\n寄生组合式继承(引用类型最理想的继承范式)')
//避免两次调用super()创建不必要的属性;
function inheritPrototype(Sub,Super){
  var prototype = create(Super.prototype);
  prototype.constructor = Sub;
  Sub.prototype=prototype;//这里重写了原型会失去默认的constructor,所以要加上上句。
}
function Super(name){
  this.name=name;
  this.color=['red'];
}
Super.prototype.f1=function(){
  console.log(this.color)
}
function Sub(b){
  this.b=b;
  Super.call(this,'jim')
}

inheritPrototype(Sub,Super);
var sub1=new Sub('sub1');
sub1.f1();
sub1.color.push('blue');
var sub2=new Sub('sub2');
sub2.f1();





