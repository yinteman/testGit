/**
 * Created by Thinkpad on 2017/3/1.函数的科里化
 */
//最简单的改变传递参数的个数，作用参数复用
var currying = function(fn){
    var args =[].prototype.slice.call(arguments,1);
    return function (){
        var argu = args.concat([].slice.call(arguments));
        return fn.apply(null,argu)
    }
}

/****
 * 1.参数的复用2.提前返回3.延迟计算运行
 * ***/

//2.提前返回（惰性载入函数）
var addEvent = (function(){
    if(window.addEventListener){
        return function(el,type,fn,capture){
            el.addEventListener(type,function(e){
                fn.call(el,e)
            },(capture))
        }
    }else if(window.attachEvent){
        return function(el,type,fn,capture){
            el.attachEvent('on'+type,function(e){
                return fn.call(el,e)
            })
        }
    }
})();

//3.延迟计算（科里化的复用）
var curryweight = function(fn){
    var _first =[];
    return function(){
        if(arguments.length === 0){
            return fn.apply(null,_first)
        }else{
            _first = _first.concat([].slice.call(arguments));
        }
    }
}

