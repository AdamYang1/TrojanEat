// app.js
import request from './pages/request/request'
// let app = getApp();
App({
  async onLaunch() {
    let that = this;
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    wx.login({
      success: async res => {
        let code = res.code;
        let result = await request('/getOpenId', { code });
        that.globalData.openid = result;
        // 获取用户openid后需要看是否第一次登陆
        let customerInfo = await request(`/personal/openid/${that.globalData.openid}`,{});
        that.globalData.isFirst = customerInfo.length == 0 ? true : false;
        // that.globalData.isFirst = customerInfo.length == 0 ? true : false;
        // 若不是，获取用户喜好并跳转页面
        if(!that.globalData.isFirst){
          let temp = await request(`/personal/openid/${that.globalData.openid}`, {}, 'GET');
          let tempUserInfo = JSON.parse(JSON.stringify(temp[0]));
          for (let i in tempUserInfo) {
            if (tempUserInfo[i] == 1) {
              let index = that.globalData.typesEng.indexOf(i);
              let type = that.globalData.types[index];
              that.globalData.selecedArr[index] = 1;
              that.globalData.userPreference.push(type);
              that.globalData.userPreferenceEng.push(i);
            }
          }
        }
        // 若是第一次登陆，跳转到欢迎界面
        else{
          wx.redirectTo({
            url: '/pages/welcome/welcome',
          })
        }
        // console.log(that.globalData.userPreference)
      }
    })
  },
  globalData: {
    isFirst: false,
    userInfo: {},
    openid: 0,
    userPreference: [],
    userPreferenceEng: [],
    types: ['鸡肉', '蛋类', '乳制品', '牛肉', '鱼类', '豆制品', '猪肉', '贝类','谷物类','坚果','花生', '芝麻'],
    typesEng: ['chicken', 'eggs', 'dairy', 'beef', 'fish', 'soy', 'pork', 'shellfish',
    'wheat_gluten', 'tree_nuts', 'peanuts', 'sesame'],
    selecedArr: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  }
})
