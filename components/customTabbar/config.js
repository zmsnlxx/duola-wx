module.exports={
  tabStyle:{
    activeColor:'#FE494C',//触发时文字颜色
    inactiveColor:'#353535',//未触发时文字的颜色
  },
  tabs:[
    {
      "content":"首页",//显示的文字
      "activeImg":"../../public/image/tabbar/home-active.png",//触发时的图片
      "inactiveImg":"../../public/image/tabbar/home.png",//未触发的图片
      "path":"/pages/index/index"//按钮对应的路径
    },
    {
      "content": "我的",
      "activeImg": "../../public/image/tabbar/personal-active.png",
      "inactiveImg": "../../public/image/tabbar/personal.png",
      "path": "/pages/personal/personal"
    }
  ]
}
