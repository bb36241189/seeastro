var _class, _temp;

import { Block, View, Text, Button } from "@tarojs/components-rn";
import React from 'react';
let DownloadPromptTmpl = (_temp = _class = class DownloadPromptTmpl extends React.Component {
  render() {
    const {
      data: {
        windowWidth: windowWidth,
        windowHeight: windowHeight,
        downloadPromptText: downloadPromptText
      }
    } = this.props;
    return <Block>
        <View className="downloadPrompt" style={'width: ' + windowWidth + 'px; height: ' + windowHeight + 'px'}>
          <View className="promptBox">
            <View className="text">
              <Text>
                {downloadPromptText ? downloadPromptText : '需要下载生日管家才能体验此功能是否下载？'}
              </Text>
            </View>
            <View className="buttonBox">
              <View onClick={this.cancel} className="item left">
                取消
              </View>
              <View onClick={this.cancel} className="item right">
                <Text>确定</Text>
                <Button onClick={this.statisticalClickDown} openType="contact" sendMessageImg="https://static.shengri.cn/uploads/QA_mp/downloadShengriApp1.jpg" sendMessagePath="/pages/index/index" sendMessageTitle="\下\载\生\日\管\家APP" showMessageCard="true" />
              </View>
            </View>
          </View>
        </View>
      </Block>;
  }

}, _class.options = {
  addGlobalClass: true
}, _temp);
export { DownloadPromptTmpl as default };