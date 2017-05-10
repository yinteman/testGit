/**
 * Created by Thinkpad on 2017/3/21.手动实现promise
 * 1.初版的手写promise
 */
function Promise(fn){
    this._status = "PENDING";//状态
    this._resolves =[];
    this._rejects=[];
    var value ;
    this._reason = null;
    var vm = this;
    //.then 的链式
    this.then = function(onFulfilled , onRejected ){
        return new Promise(function(resolve,rejected){
            function handle(value){
                var ret = typeof onFulfilled == 'function' && onFulfilled(value) || value;
                if(ret && typeof  ret['then'] == 'function'){
                   ret.then(function(value){
                       resolve(value);
                   },function(reason){
                       rejected(reason);
                   })
                }else{
                    resolve(ret)
                }

            }
            function errback(reason){
                reason = typeof onRejected == 'function' && onRejected(reason) || reason ;
                rejected(reason)
            }

            if(vm._status == "PENDING"){
                vm._resolves.push(handle);
                vm._rejects.push(errback);
             }else if(vm._status == "FULFILLED"){
                handle(value)
            }else{
                console.log(vm._reason)
                errback(vm._reason);
            }
        })
    }

    function resolve(value){
        setTimeout(function(){
            vm._status ='FULFILLED';
            vm._resolves.forEach(function(handle){
                value = handle(value);
            })
        },0)
    };
    function rejected(reason){
        setTimeout(function(){
            vm._status = 'REJECTED';
            vm._rejects.forEach(function(errcb){
                vm._reason = errcb(reason);
            })
        },0)
    }
    fn(resolve,rejected);
}


var getData100 = function(){
    return new Promise(function(resolve,rejected){
        setTimeout(function(){
            resolve(100);
        },100)

    })

};

var getData200 = function(){
    return new Promise(function(resolve,rejected){
        setTimeout(function(){
            resolve(200);
        },200)
    })

}
var getData300 = function(){
  return 3000
}

getData100().then(function(data){
    console.log(data);
    return getData200();
}).then(function(data){
    console.log(data);
    return getData300()
}).then(function(data){
    console.log(data);
});
