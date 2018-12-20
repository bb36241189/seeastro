var _dec, _class, _class2, _temp2;

import Taro from '@tarojs/taro-rn';
import { View, Image, Text } from "@tarojs/components-rn";
import React from 'react';

import withWeapp from '@tarojs/with-weapp';
import indexStyleSheet from "./index_styles";
var _styleSheet = indexStyleSheet;
require('./../../utils/api.js');

Taro.getApp();

let _C = (_dec = withWeapp('Page'), _dec(_class = (_temp2 = _class2 = class _C extends React.Component {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.state = {
      windowWidth: 0,
      windowHeight: 0
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
    this.fetchData();
  }

  render() {
    const { windowWidth: windowWidth, windowHeight: windowHeight } = this.state;
    return <View style={_styleSheet["page"]}>
        <View style={[_styleSheet["pageBg"], 'width: ' + windowWidth + 'px; height: ' + windowHeight + 'px']}>
          <Image mode="widthFix" src="https://static.shengri.cn/uploads/QA_mp/zhanxingshaiziBg@3x.png" />
        </View>
        <View style={_styleSheet["pageCont"]}>
          <View style={_styleSheet["item"]}>
            <View style={_styleSheet["title"]}>什么是占星骰子</View>
            <View style={_styleSheet["subTitle"]}>
              东方卜卦信命理，西方则有卜卦占星、塔罗牌、占星骰子三种，占星骰子是最好上手的一种。由三颗骰子（每一颗代表不同元素）的排列组合给出相应的暗示。
            </View>
            <View style={_styleSheet["lable"]}>
              <View style={_styleSheet["top"]}>
                <Image mode="widthFix" src="https://static.shengri.cn/uploads/QA_mp/biaoji@3x.png" />
                <Text>行星</Text>
              </View>
              <View style={_styleSheet["bottom"]}>此时你所拥有的力量</View>
            </View>
            <View style={_styleSheet["lable"]}>
              <View style={_styleSheet["top"]}>
                <Image mode="widthFix" src="https://static.shengri.cn/uploads/QA_mp/biaoji@3x.png" />
                <Text>星座</Text>
              </View>
              <View style={_styleSheet["bottom"]}>
                此时你可以用什么方式来使用行星的力量
              </View>
            </View>
            <View style={_styleSheet["lable"]}>
              <View style={_styleSheet["top"]}>
                <Image mode="widthFix" src="https://static.shengri.cn/uploads/QA_mp/biaoji@3x.png" />
                <Text>宫位</Text>
              </View>
              <View style={_styleSheet["bottom"]}>
                此时行星的力量会作用在你生活的哪个领域
              </View>
            </View>
          </View>
          <View style={_styleSheet["item"]}>
            <View style={[_styleSheet["title"], { color: '#7232F4', backgroundImage: 'url("https://static.shengri.cn/uploads/QA_mp/bishua2@3x.png")' }]}>
              提问技巧
            </View>
            <View style={_styleSheet["subTitle"]}>
              占星骰子不会给出像“是”或“否”的简单答案，所以建议您将问题设计成收集信息的形式。
            </View>
            <View style={_styleSheet["lable"]}>
              <View style={_styleSheet["top"]}>
                <Image mode="widthFix" src="https://static.shengri.cn/uploads/QA_mp/biaoji@3x.png" />
                <Text>不恰当的问法</Text>
              </View>
              <View style={_styleSheet["bottom"]}>我该不该接受这份工作？</View>
            </View>
            <View style={_styleSheet["lable"]}>
              <View style={_styleSheet["top"]}>
                <Image mode="widthFix" src="https://static.shengri.cn/uploads/QA_mp/biaoji@3x.png" />
                <Text>推荐您这样问</Text>
              </View>
              <View style={_styleSheet["bottom"]}>
                如果我接受了这份工作，会对我以后带来什么样的影响？
              </View>
            </View>
          </View>
          <View style={_styleSheet["item"]}>
            <View style={[_styleSheet["title"], { color: '#FFBB7F', backgroundImage: 'url("https://static.shengri.cn/uploads/QA_mp/bishua3@3x.png")' }]}>
              问答提问实例
            </View>
            <View style={_styleSheet["lable"]}>
              <View style={_styleSheet["top"]}>
                <Image mode="widthFix" src="https://static.shengri.cn/uploads/QA_mp/biaoji@3x.png" />
                <Text>问</Text>
              </View>
              <View style={_styleSheet["bottom"]}>
                我和我的男朋友吵架了，他还会理我吗？【火星、巨蟹、6】
              </View>
            </View>
            <View style={_styleSheet["lable"]}>
              <View style={_styleSheet["top"]}>
                <Image mode="widthFix" src="https://static.shengri.cn/uploads/QA_mp/biaoji@3x.png" />
                <Text>答</Text>
              </View>
              <View style={_styleSheet["bottom"]}>
                问的是感情关系，火星就是紧张，双方的对立，互相坚持自己的观点，不肯为对方让步。巨蟹是一种依赖感，互相都在对方那里取得安全感，还离不开这段关系。6宫是双方的责任感，既然发展为男女朋友关系了，就该为这段感情负责任，争取往结婚的方向发展，抱着这种想法，综合起来看，肯定还会理你的。但是因为火星当前情况紧张，至少需要有一方为对方妥协谦让，你可以主动去道歉说和。
              </View>
            </View>
          </View>
        </View>
      </View>;
  }
}, _class2.config = {
  navigationBarTitleText: '占星骰子',
  navigationBarTextStyle: 'black',
  navigationBarBackgroundColor: '#FFF',
  enablePullDownRefresh: false
}, _temp2)) || _class);

export default _C;