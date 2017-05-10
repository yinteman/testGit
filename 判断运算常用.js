if([0]){ // if(Boolean([0])) == if(true)
  console.log([0] == true); //false
  console.log(!![0]);
}


if("potato"){
  console.log("potato" == false)
  console.log("op" == true);
}

/**
 * Conditionals 判断
 * 在JavaScript中，所有条件语句和运算符都遵循相同的强制转换模式。 （js，三元运算符）
 * if(expression)声明将会强制将expression的结果变成Boolean型
 * Boolean()转型函数。任何值都可以转成Boolean类型，即true or false
 * 那么什么时候是true 什么时候是false呢？
 * 数据类型	转换为true的值	转换为false的值
Boolean	 true	          false
String	任何非空字符串	  “” ,str.length =0
Number	任何非0数值	   0和NaN +0 -0
Object　	任何对象	     null ,
Undefined	 	          undefined
*那么当if语句里面没有表达式，只是某个值时 如 if (expression)
* 它会自动执行Boolean(expression)操作，
*即 if(expression) = if(Boolean(expression))
 */


var truTheyTest = function(expr) {
  return expr ? "truethey" :"falsey"
}
truTheyTest({}) ; //truethey ,因为Object永远都是true
truTheyTest(false)  ;// falsey
truTheyTest(new Boolean(false)) ;//truethey ,因为new Boolean(...)是一个对象
truTheyTest(""); //falsey
truTheyTest(new String("")); //truthey (因为new String("") 是一个对象 )
truTheyTest(NaN); //falsey
truTheyTest(new Number(NaN)); //truthey (因为new Number(NaN) 是一个对象 )
/**
 * The Equals Operator (==)
 * 《Truth, Equality and JavaScript》的作者罗列了几条规则，但是不是全部，常用防止踩坑
 * Type(x)	       Type(y)	  Result
   x and y are the same type	See Strict Equality (===) Algorithm
   null	           Undefined	 true
Undefined	         null	       true
Number	          String	      x == toNumber(y)
String	          Number	      toNumber(x) == y
Boolean	          (any)	       toNumber(x) == y
(any)	           Boolean	        x == toNumber(y)
String or Number	Object	      x == toPrimitive(y)
Object	    String or Number	     toPrimitive(x) == y
otherwise…	false
  */

 /**
  * toNumber
  * Argument Type	                Result
     Undefined	                   NaN
    Null	                          +0
    Boolean	                     The result is 1 if the argument is true.
                                 The result is +0 if the argument is false.
   Number	                       The result equals the input argument (no conversion).
  String	                      In effect evaluates Number(string)
                                 “abc” -> NaN
                                   “123” -> 123
   Object	                          Apply the following steps:
                                   1. Let primValue be ToPrimitive(input argument, hint Number).
                                   2. Return ToNumber(primValue).
  */
 /**ToPrimitive 主要使用于Object
 *Argument Type                          	Result
   Object	                         (in the case of equality operator coercion)
                                    if valueOf returns a primitive, return it.
                                    Otherwise if toString returns a primitive return it.
                                     Otherwise throw an error
otherwise…	                       The result equals the input argument (no conversion).
  *
  */

//test1
 [0] == true
 //分析如下:
 //convert Boolean using toNumber true.toNumber() = 1 ;
 [0] == 1 ;
 //convert object using toPrimitive
 // [0].valueOf() => [0]
 // [0].toString() ->"0"
 // "0" == 1 ? "0".toNumber => 0
 0 == 1 ; //false

//test2 ;false
"prot" == false ;
//convert boolean using toNumber false.toNumber = 0
"prot" == 0 ;
//convert string using toNumber "prot".toNumber = NaN
NaN == 0 ; //false


//Object with valueOf
var obj = new Number(1) ;
obj.toString = function() {
  return "2"
}
console.log(obj.toString())
obj == 1;//true
//分析如下
//1.convert object using toPrimitive
//2.先使用valueOf,因为object的valueOf 等于 1 ，因此obj == 1
//obj.valueOf() -> 1 == 1;true



//object with toString
var cbj = {
  toString:function(){
    return "2"
  }
}

cbj == 1 ;
//convert object using toPrimitive
//cbj.valueOf() 返回值是一个对象，不是一基本数据类型，因此调用toString()
"2" == 1 ;
//convert string using toNumber
2 == 1 ; //false
