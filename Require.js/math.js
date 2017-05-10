define(['num'],function (num) {
  return{
    getRadom:function () {
      console.log(num);
      return parseInt(Math.random() * num)
    }
  }
})
