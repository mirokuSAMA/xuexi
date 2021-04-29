const myaudio = wx.createInnerAudioContext();
const jkl = getApp();

// pages/one/one.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    figter:[]

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
    this.setData({figter:jkl.data})
    console.log(jkl);

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