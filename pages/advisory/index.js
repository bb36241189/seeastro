var _dec, _class, _class2, _temp2;

import Taro from '@tarojs/taro-rn';
import { Block, View } from "@tarojs/components-rn";
import React from 'react';

import withWeapp from '@tarojs/with-weapp';
import DownloadPromptTmpl from '../../imports/DownloadPromptTmpl.js';
import indexStyleSheet from "./index_styles";
var _styleSheet = indexStyleSheet;
require('./../../utils/api.js');

Taro.getApp();

let _C = (_dec = withWeapp('Page'), _dec(_class = (_temp2 = _class2 = class _C extends React.Component {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.state = {
      windowWidth: 0,
      windowHeight: 0,
      showDownloadPrompt: false
    }, this.onReachBottom = () => {}, this.promptDownload = () => {
      this.setData({
        showDownloadPrompt: true
      });
    }, this.cancel = () => {
      this.setData({
        showDownloadPrompt: false
      });
    }, this.statisticalClickDown = () => {
      console.log('------');
    }, _temp;
  }

  componentWillMount(hashComponent) {}

  componentDidShow() {
    var tools = this;
    Taro.getSystemInfo({
      success: function (res) {
        tools.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        });
      }
    });
    this.setData({
      page: 0
    });
  }

  componentDidMount() {}

  componentDidHide() {}

  componentWillUnmount() {}

  render() {
    const {
      windowWidth: windowWidth,
      windowHeight: windowHeight,
      showDownloadPrompt: showDownloadPrompt
    } = this.state;
    return <Block>
        <View style={_styleSheet["pageCont"]}>
          <Image onClick={this.promptDownload} mode="widthFix" src="https://static.shengri.cn/uploads/QA_mp/advisoryBanner1@3x.png?imageslim" />
          <Image onClick={this.promptDownload} mode="widthFix" src="https://static.shengri.cn/uploads/QA_mp/advisoryBanner2@3x.png?imageslim" />
          <Image onClick={this.promptDownload} mode="widthFix" src="https://static.shengri.cn/uploads/QA_mp/advisoryBanner3@3x.png?imageslim" />
        </View>
        <DownloadPromptTmpl data={{
        windowWidth: (windowWidth, windowHeight)
      }} />
      </Block>;
  }
}, _class2.config = {
  navigationBarTitleText: '连麦咨询',
  navigationBarTextStyle: 'black',
  navigationBarBackgroundColor: '#FFF',
  enablePullDownRefresh: false
}, _temp2)) || _class);

export default _C;