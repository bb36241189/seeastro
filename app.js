var _class, _temp2;

import TaroRouter from '@tarojs/taro-router-rn';
import imageCallFillPng from './image/call_Fill.png';
import imageCallPng from './image/call.png';
import imageHomeFillPng from './image/home_Fill.png';
import imageHomePng from './image/home.png';
import imageSignFillPng from './image/sign_Fill.png';
import imageSignPng from './image/sign.png';
import pagesEvaluateIndex from './pages/evaluate/index';
import pagesDetailIndex from './pages/detail/index';
import pagesTarotGamePayIndex from './pages/tarotGamePay/index';
import pagesTarotGameIndex from './pages/tarotGame/index';
import pagesDiceInstructionsIndex from './pages/diceInstructions/index';
import pagesDiceGameIndex from './pages/diceGame/index';
import pagesLoginLogin from './pages/login/login';
import pagesAuthorizationAuthorization from './pages/authorization/authorization';
import pagesMyQuestionIndex from './pages/myQuestion/index';
import pagesAdvisoryIndex from './pages/advisory/index';
import pagesTarotSignInIndex from './pages/tarotSignIn/index';
import pagesIndexIndex from './pages/index/index';
import Taro from '@tarojs/taro-rn';
import "@tarojs/components-rn";
import React from 'react';

import appStyleSheet from "./app_styles";
var _styleSheet = appStyleSheet;
var self = require('./utils/api.js');

var log = require('./config.js');

let App = (_temp2 = _class = class App extends React.Component {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.logout = () => {
      try {
        Taro.removeStorageSync('userInfo');
        app.setToken('');
      } catch (t) {}
      /** @type {null} */this.globalData.userInfo = null;
    }, this.fetchCityId = () => {
      return this.globalData.cityId;
    }, this.setCity = (tag, city) => {
      /** @type {!Array} */
      this.globalData.cityId = tag;
      /** @type {string} */this.globalData.city = city;
    }, this.setChannel = channel => {
      self.setChannel(channel);
      Taro.setStorageSync('channel', channel);
    }, this.setUdid = data => {
      self.setUdid(data);
      Taro.setStorageSync('openId', data);
    }, this.initCity = template => {
      var GeocodeResponse = this;
      Taro.getLocation({
        type: 'gcj02',
        success: function (position) {
          var lat = position.latitude;
          var lng = position.longitude;
          /** @type {string} */var url = self.baseUrl + 'location?lat=' + lat + '&lng=' + lng;
          self.fetchGet(url).then(function (result) {
            GeocodeResponse.globalData.cityId = result.city_code;
            GeocodeResponse.globalData.city = result.city;
            if ('function' == typeof template) {
              template(result);
            }
          }).catch(function (canCreateDiscussions) {
            var value = {
              cityId: 110100,
              city: '北京市'
              /** @type {string} */ };GeocodeResponse.globalData.city = value.city;
            /** @type {number} */GeocodeResponse.globalData.cityId = value.cityId;
            Taro.navigateTo({
              url: '../city/city'
            });
            if ('function' == typeof template) {
              template(value);
            }
          });
        },
        fail: function (i) {
          var value = {
            cityId: 110100,
            city: '北京市'
            /** @type {string} */ };GeocodeResponse.globalData.city = value.city;
          /** @type {number} */GeocodeResponse.globalData.cityId = value.cityId;
          Taro.navigateTo({
            url: '../city/city'
          });
          if ('function' == typeof template) {
            template(value);
          }
        }
      });
    }, this.isLogin = () => {
      var userInfo = this.globalData.userInfo;
      return null != userInfo && 'tok' in userInfo;
    }, this.setUserInfo = data => {
      Taro.setStorageSync('userInfo', data);
      /** @type {string} */this.globalData.userInfo = data;
    }, this.getUserWxOpenId = () => {
      return this.globalData.wxInfo.openId;
    }, this.getUserPhone = () => {
      return this.globalData.userInfo.phone;
    }, this.currentUser = fail => {
      var value = this.globalData.wxInfo;
      if (value && 'function' == typeof fail) {
        fail(value);
      }
    }, this.getUserInfo = (cb, done) => {
      Taro.showToast({
        title: '加载中...',
        icon: 'loading',
        duration: 5e3
      });
      var that = this;
      try {
        Taro.getStorageSync('userInfo');
        var i = Taro.getStorageSync('wxInfo');
        if (i) {
          that.globalData.wxInfo = i;
        }
        Taro.login({
          success: function (data) {
            Taro.getUserInfo({
              success: function (res) {
                /** @type {number} */
                that.globalData.isAllow = 1;
                Taro.setStorageSync('isAllow', that.globalData.isAllow);
                var params = {
                  code: data.code,
                  encrypted_data: res.encryptedData,
                  iv: res.iv
                  /** @type {string} */ };var id = self.baseUrl + 'account/code_login';
                self.fetchPost(id, params).then(function (res) {
                  Taro.hideToast();
                  if ('wxAppSession' in res) {
                    self.setSession(res.wxAppSession);
                    Taro.setStorageSync('wxAppSession', res.wxAppSession);
                  }
                  if ('wxInfo' in res) {
                    Taro.setStorageSync('wxInfo', res.wxInfo);
                    Taro.setStorageSync('openId', res.wxInfo.openId);
                    that.globalData.wxInfo = res.wxInfo;
                    that.setUdid(res.wxInfo.openId);
                    log('identify', res.wxInfo.openId, res.wxInfo.unionId);
                  }
                  if ('userInfo' in res) {
                    Taro.setStorageSync('userInfo', res.userInfo);
                    that.globalData.userInfo = res.userInfo;
                    self.setToken(res.userInfo.tok);
                    if ('function' == typeof cb) {
                      cb(that.globalData.userInfo);
                    }
                  } else {
                    if ('wxInfo' in res && 'function' == typeof cb) {
                      cb(res.wxInfo);
                    }
                  }
                }).catch(function (canCreateDiscussions) {
                  if ('function' == typeof cb) {
                    cb(res);
                  }
                });
              },
              fail: function (i) {
                /** @type {number} */
                that.globalData.isAllow = 0;
                Taro.setStorageSync('isAllow', that.globalData.isAllow);
                Taro.hideToast();
              }
            });
          }
        });
      } catch (t) {}
    }, this.setAllow = data => {
      /** @type {number} */
      this.globalData.isAllow = data;
      Taro.setStorageSync('isAllow', data);
    }, this.getAllow = () => {
      return !!Taro.getStorageSync('isAllow');
    }, this.globalData = {
      channelID: null,
      isAllow: 0,
      userInfo: null,
      tok: '',
      cityId: 110100,
      city: '北京市',
      wxInfo: null
    }, _temp;
  }

  componentWillMount() {
    this.$app.globalData = this.globalData;

    var that = this;
    var user = Taro.getStorageSync('userInfo');
    var data = Taro.getStorageSync('wxInfo');
    var values = Taro.getStorageSync('openId');
    var channel = Taro.getStorageSync('channel');
    var l = Taro.getStorageSync('isAllow');
    var sid = Taro.getStorageSync('wxAppSession');
    if (l) {
      /** @type {number} */
      that.globalData.isAllow = 1;
    }
    if (values) {
      self.setUdid(values);
    }
    if (channel) {
      self.setChannel(channel);
    }
    if (user) {
      that.globalData.userInfo = user;
      that.globalData.tok = user.tok;
      self.setToken(user.tok);
      if (data) {
        that.globalData.wxInfo = data;
        self.setUdid(data.openId);
        log('identify', data.openId, data.unionId);
      }
    }
    if (sid) {
      self.setSession(sid);
    }
  }

  componentDidShow(err) {
    var app = this;
    if (Taro.getStorageSync('userInfo')) {
      Taro.checkSession({
        success: function () {},
        fail: function () {
          app.getUserInfo();
        }
      });
    }
    if (err.referrerInfo.extraData) {
      app.globalData.channelID = err.referrerInfo.extraData.id;
      self.setChannel(err.referrerInfo.extraData.id);
    }
  }

  render() {
    return <RootStack />;
  }
}, _class.config = {
  window: {
    backgroundTextStyle: 'white',
    backgroundColor: '#f5f5f5',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '问答小程序',
    navigationBarTextStyle: 'black',
    enablePullDownRefresh: true
  },
  tabBar: {
    backgroundColor: '#fff',
    borderStyle: '#ccc8c7',
    color: '#333',
    selectedColor: '#ff3939',
    list: [{
      pagePath: 'pages/tarotSignIn/index',
      text: '塔罗日签',
      iconPath: imageSignPng,
      selectedIconPath: imageSignFillPng
    }, {
      pagePath: 'pages/index/index',
      text: '心语问答',
      iconPath: imageHomePng,
      selectedIconPath: imageHomeFillPng
    }, {
      pagePath: 'pages/advisory/index',
      text: '连麦咨询',
      iconPath: imageCallPng,
      selectedIconPath: imageCallFillPng
    }]
  }
}, _temp2);


export default App;
const RootStack = TaroRouter.initRouter([['pages/index/index', pagesIndexIndex], ['pages/tarotSignIn/index', pagesTarotSignInIndex], ['pages/advisory/index', pagesAdvisoryIndex], ['pages/myQuestion/index', pagesMyQuestionIndex], ['pages/authorization/authorization', pagesAuthorizationAuthorization], ['pages/login/login', pagesLoginLogin], ['pages/diceGame/index', pagesDiceGameIndex], ['pages/diceInstructions/index', pagesDiceInstructionsIndex], ['pages/tarotGame/index', pagesTarotGameIndex], ['pages/tarotGamePay/index', pagesTarotGamePayIndex], ['pages/detail/index', pagesDetailIndex], ['pages/evaluate/index', pagesEvaluateIndex]], Taro, App.config);
Taro.initNativeApi(Taro);
Taro.initPxTransform({
  "designWidth": 750,
  "deviceRatio": {
    "640": 1.17,
    "750": 1,
    "828": 0.905
  }
});