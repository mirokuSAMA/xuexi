const myaudio = wx.createInnerAudioContext();
const mybgm = wx.createInnerAudioContext();
const jkl = getApp();
// pages/hero/hero.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    logo_url:'https://game.gtimg.cn/images/lol/logo/big.png',
    logo_url1:'https://game.gtimg.cn/images/lol/logo/middle-white.png',
    logo_url2:'https://game.gtimg.cn/images/lol/logo/big.png',
    logobol:true,
    heroaudio:'',
    /**
     * 英雄json
     *  herourl:'https://game.gtimg.cn/images/lol/act/img/js/heroList/hero_list.js',
     * 皮肤json
     * skinurl:'https://game.gtimg.cn/images/lol/act/img/js/cuSkinList/cuskin_list.js'
     */
  
    herolist:null
  },
  //点击logo
  logo_tap(){
    console.log(456);
    if(this.data.logobol == true){
      this.setData({logo_url:this.data.logo_url1,logobol:false})
      mybgm.src = 'https://api.oick.cn/wyy/api.php?id=31311706'
      mybgm.play();
    }else if(this.data.logobol == false){
      this.setData({logo_url:this.data.logo_url2,logobol:true})
      mybgm.pause();
    }

  },
  //图片点击
  clickhero(e){
    //播放hero语音
    this.setData({heroaudio:e.currentTarget.dataset.hero})
    console.log(e.currentTarget.dataset);
    const tiaoid = e.currentTarget.dataset.hero;
    const tiaoname = e.currentTarget.dataset.id;
    myaudio.src = `https://game.gtimg.cn/images/lol/act/img/vo/choose/${this.data.heroaudio}.ogg`
    myaudio.play();
    wx.navigateTo({
      url: '../more/more?id=' + tiaoid + '&' + 'name=' + tiaoname ,
    })


    // wx.showModal({
    //   title:'你好啊   '+ e.currentTarget.dataset.id
    // })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.request({
      url: 'https://game.gtimg.cn/images/lol/act/img/js/heroList/hero_list.js', 
      data: {
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      //hero列表
      success:(res) => {

        this.setData({herolist:res.data.hero})
        jkl.data = res.data.hero
        console.log(res.data.hero)
      },
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})