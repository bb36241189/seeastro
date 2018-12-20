var _dec, _class, _class2, _temp2;

import Taro from '@tarojs/taro-rn';
import { View, Image, Button } from "@tarojs/components-rn";
import React from 'react';

import withWeapp from '@tarojs/with-weapp';
import authorizationStyleSheet from "./authorization_styles";
var _styleSheet = authorizationStyleSheet;
require('../../utils/api.js');

var app = Taro.getApp();

let _C = (_dec = withWeapp('Page'), _dec(_class = (_temp2 = _class2 = class _C extends React.Component {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.state = {}, this.bindGetUserInfo = () => {
      var path = this.data.redirect;
      Taro.getSetting({
        success: function (backdata) {
          if (backdata.authSetting['scope.userInfo']) {
            app.setAllow(1);
            app.getUserInfo(function () {
              /** @type {string} */
              var pathURL = '../login/login';
              if (app.isLogin()) {
                if ('index' == path) {
                  Taro.switchTab({
                    url: '../index/index'
                  });
                } else {
                  Taro.navigateBack({
                    delta: 1
                  });
                }
              } else {
                if (path) {
                  /** @type {string} */
                  pathURL = '../login/login?redirect=' + path;
                }
                Taro.redirectTo({
                  url: pathURL
                });
              }
            });
          }
        }
      });
    }, _temp;
  }

  componentDidShow() {}

  componentWillMount(data) {
    this.setData(data);
  }

  render() {
    return <View style={_styleSheet["page"]}>
        <Image src="https://static.shengri.cn/uploads/QA_mp/icon512-512.png?imageslim" style={_styleSheet["logo"]} />
        <View style={_styleSheet["desc"]}>塔罗吧</View>
        <Image mode="widthFix" src="https://static.shengri.cn/uploads/QA_mp/Tarot.png" style={_styleSheet["cont"]} />
        <View style={_styleSheet["btn"]}>
          <Button onEtuserinfo={this.bindGetUserInfo} openType="getUserInfo" />
        </View>
      </View>;
  }
}, _class2.config = {
  navigationBarTitleText: '授权',
  navigationBarTextStyle: 'black',
  navigationBarBackgroundColor: '#FFF',
  enablePullDownRefresh: false
}, _temp2)) || _class);

export default _C;