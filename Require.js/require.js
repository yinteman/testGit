/*
*自定义模块加载器
 */

//利用闭包创建局部作用域
(function(){
   //缓存所有模块
   var moduleCache ={};
   function require(deps,callback){
     var name =  document.currentScript && document.currentScript.id || 'REQUIRE_MAIN';
        var depCount = 0 ;//模块的依赖数

    var params=[];//params是回调函数callback的参数

         //如果没有依赖，则直接保存或者执行模块
     if( !deps || deps.length < 1 ){
           setTimeout(function(){
              saveModule(name,null,callback)
       },0)
     }else{
       deps.forEach(function(dep,index) {
          //使用闭包解决问题？为什么？
          (function(i){
              depCount++;
            loadScript(dep,function(param){
              depCount--;//加载一个，计数器减一
              params[i] = param;
                if(depCount == 0){ //当计数器为0说明已经全部加载完毕
                    saveModule(name , params ,callback)
              }
            })

          })(index)
       })
     }
   }

/**
 * 为js文件添加文件后缀
 * @param  {[type]} name [依赖项]
 * @return {[type]}      [description]
 */
   function getURL(name){
     if(name.indexOf('.js') < 0){
       return name + '.js'
     }
   }

/**
 * 加载模块，如果模块被加载过在执行回调函数，使用dom的方法加载新的模块
 * @param  {[type]}   name     [依赖项]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
   function loadScript(name,callback){
       var mod = moduleCache[name];
     if(mod){
       if(mod.status == 'loaded'){
         //已经加载完毕，直接执行回调函
      //   console.log(mod);
  setTimeout( callback(this.params),0)
             }else{
         //正在加载，将回调函数存起来
         mod.onload.push(callback)
       }
     }else{
       //该模块未被加载过，定义并且利用dom加载
    mod=  moduleCache[name] = {
        status:'loading',
        export:null,
        onload:[callback]
      }
    //  console.log(name)
      var url = getURL(name),
      el = document.createElement('script');
      el.src=url;
      el.id=name;
      el.type='text/javascript';
      el.async=true;
    document.body.appendChild(el);
     }
   }

/**
 * 保存或者执行模块
 * @param  {[type]}   name     [模块]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
   function saveModule(name,params,callback){

  if(moduleCache.hasOwnProperty(name)){
             var mod = moduleCache[name],fn;
       mod.status = 'loaded' ;//将模块的状态设置为加载完毕
      mod.export = callback ? callback(params) : null;//执行模块的回调函数，将结果放在export的当中
       while(fn = mod.onload.pop()){ //执行上一级模块的回调函数
          fn(mod.export)
       }

     }else{
       //如果该模块为定义，直接执行返回结果，对应的是require(deps,callback)的情况
       callback &&  callback.apply(window ,params)
     }
   };

   window.define = require;
   window.require = require
})()
