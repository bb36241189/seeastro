var _dec, _class, _class2, _temp2;

import Taro from '@tarojs/taro-rn';
import { Block, View, Input } from "@tarojs/components-rn";
import React from 'react';

import withWeapp from '@tarojs/with-weapp';
import loginStyleSheet from "./login_styles";
var _styleSheet = loginStyleSheet;

function _getClassName() {
  var className = [];
  var args = arguments[0];
  var type = Object.prototype.toString.call(args).slice(8, -1).toLowerCase();

  if (type === 'string') {
    args = args.trim();
    args && className.push(args);
  } else if (type === 'array') {
    args.forEach(function (cls) {
      cls = _getClassName(cls).trim();
      cls && className.push(cls);
    });
  } else if (type === 'object') {
    for (var k in args) {
      k = k.trim();

      if (k && args.hasOwnProperty(k) && args[k]) {
        className.push(k);
      }
    }
  }

  return className.join(' ').trim();
}

function _getStyle(classNameExpression) {
  var className = _getClassName(classNameExpression);

  var classNameArr = className.split(/\s+/);
  var style = [];

  if (classNameArr.length === 1) {
    style.push(_styleSheet[classNameArr[0].trim()]);
  } else {
    classNameArr.forEach(function (cls) {
      style.push(_styleSheet[cls.trim()]);
    });
  }

  return style;
}

var api = require('../../utils/api.js');

var app = Taro.getApp();

let _C = (_dec = withWeapp('Page'), _dec(_class = (_temp2 = _class2 = class _C extends React.Component {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.state = {
      viewHeight: 0,
      seconds: 60,
      phone: '',
      ticket: '',
      code: '',
      codeDesc: '获取验证码',
      hasGetCode: false,
      redirect: false
    }, this.login = callback => {
      var req = this;
      if (req.data.hasGetCode && req.data.code) {
        var isPhone = req.data.phone;
        var ticket = req.data.ticket;
        var scriptCode = req.data.code;
        var redirect = req.data.redirect;
        app.getUserInfo(function (userInfo) {
          var data = {
            phone: isPhone,
            ticket: ticket,
            code: scriptCode
          };
          if ('unionId' in userInfo) {
            /** @type {number} */
            data.typeId = 66;
            data.udid = userInfo.unionId;
          } else {
            /** @type {number} */
            data.typeId = 72;
            data.udid = userInfo.openId;
          }
          /** @type {string} */
          var id = api.baseUrl + 'account/ease_login';
          api.fetchPost(id, data).then(function (user) {
            if (app.setUserInfo(user), api.setToken(user.tok), redirect) {
              if ('index' == redirect) {
                Taro.switchTab({
                  url: '../index/index'
                });
              } else {
                if ('myQuestion' == redirect) {
                  Taro.switchTab({
                    url: '../myQuestion/index'
                  });
                } else {
                  /** @type {string} */
                  var reqUrl = decodeURIComponent(redirect);
                  Taro.redirectTo({
                    url: reqUrl
                  });
                }
              }
            } else {
              Taro.navigateBack({
                delta: 1
              });
            }
          }).catch(function (canCreateDiscussions) {});
        });
      }
    }, this.settime = t => {
      var allTraps = this;
      if (t <= 0) {
        this.setData({
          codeDesc: '获取验证码'
        });
      } else {
        /** @type {number} */
        t = t - 1;
        this.setData({
          codeDesc: t
        });
        setTimeout(function () {
          allTraps.settime(t);
        }, 1e3);
      }
    }, this.bindKeyInput = e => {
      this.setData({
        phone: e.detail.value
      });
    }, this.bindCodeInput = p => {
      this.setData({
        code: p.detail.value
      });
    }, this.getCode = () => {
      var lambdaEvent = this;
      if ('获取验证码' == lambdaEvent.data.codeDesc) {
        var phone = lambdaEvent.data.phone;
        if (/^1[3|4|5|6|7|8|9][0-9]{9}$/.test(phone)) {
          this.sendCode(phone);
          this.settime(60);
        }
      }
    }, this.sendCode = type => {
      var res = this;
      var data = {
        phone: type,
        type: 5
        /** @type {string} */
      };var id = api.baseUrl + 'account/send_verify_code';
      api.fetchPost(id, data).then(function (project) {
        res.setData({
          hasGetCode: true,
          ticket: project.ticket
        });
      }).catch(function (canCreateDiscussions) {});
    }, this.showLoading = () => {
      Taro.showToast({
        title: '加载...',
        icon: 'loading',
        duration: 200
      });
    }, this.bindGetUserInfo = () => {}, _temp;
  }

  componentDidShow() {
    var mockDndService = this;
    if (!app.globalData.isAllow) {
      Taro.navigateTo({
        url: '../authorization/authorization'
      });
    }
    Taro.getSystemInfo({
      success: function (data) {
        mockDndService.setData({
          viewHeight: data.windowHeight
        });
      }
    });
  }

  componentWillMount(data) {
    if (data) {
      this.setData(data);
    }
  }

  render() {
    const {
      codeDesc: codeDesc,
      hasGetCode: hasGetCode,
      code: code,
      opacity: opacity
    } = this.state;
    return <Block>
        <View style={_styleSheet["login"]}>
          <View style={[_styleSheet["phone-item"], { paddingRight: 0 }]}>
            <View style={_styleSheet["labels"]}>手机号</View>
            <Input onNput={this.bindKeyInput} maxlength="11" placeholder="\输\入\手\机\号" placeholderClass="placeholder" type="number" style={_styleSheet["input"]} />
            <View disabled onClick={this.getCode} style={_styleSheet["get-code"]}>
              {codeDesc}
            </View>
          </View>
          <View style={_styleSheet["code-item"]}>
            <View style={_styleSheet["labels"]}>验证码</View>
            <Input onNput={this.bindCodeInput} placeholder="\输\入\验\证\码" placeholderClass="placeholder" type="number" style={_styleSheet["input"]} />
          </View>
          <View style={_styleSheet["tips"]}>
            根据国家政策，首次注册的用户需完成绑定手机号操作，下次进入可直接通过微信授权自动登录。
          </View>
        </View>
        <View onClick={this.login} style={[_getStyle(hasGetCode && code.length > 0 ? 'button' : 'button1'), 'opacity: ' + opacity]}>
          绑 定
        </View>
      </Block>;
  }
}, _class2.config = {
  navigationBarTitleText: '手机号验证',
  navigationBarTextStyle: 'black',
  navigationBarBackgroundColor: '#FFF',
  enablePullDownRefresh: false
}, _temp2)) || _class);

export default _C;