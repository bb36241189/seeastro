var _dec, _class, _class2, _temp2;

import Taro from '@tarojs/taro-rn';
import { Block, View, Image, Text, Form, Button } from "@tarojs/components-rn";
import React from 'react';

import withWeapp from '@tarojs/with-weapp';
import indexStyleSheet from "./index_styles";
var _styleSheet = indexStyleSheet;

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

var res = require('./../../utils/api.js');

var app = Taro.getApp();

/** @type {boolean} */var d = true;

let _C = (_dec = withWeapp('Page'), _dec(_class = (_temp2 = _class2 = class _C extends React.Component {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.state = {
      windowWidth: 0,
      windowHeight: 0,
      options: {},
      pageShow: true,
      clickIndex: -1,
      showEntranceAnimBox: false,
      showStartInterface: false,
      showShuffleDeckAnim: false,
      showOperatingArea: false,
      showReadyFont: true,
      tarotData: [{
        hidden: false
      }, {
        hidden: false
      }, {
        hidden: false
      }, {
        hidden: false
      }, {
        hidden: false
      }, {
        hidden: false
      }, {
        hidden: false
      }, {
        hidden: false
      }, {
        hidden: false
      }, {
        hidden: false
      }, {
        hidden: false
      }, {
        hidden: false
      }, {
        hidden: false
      }, {
        hidden: false
      }, {
        hidden: false
      }, {
        hidden: false
      }, {
        hidden: false
      }, {
        hidden: false
      }, {
        hidden: false
      }, {
        hidden: false
      }, {
        hidden: false
      }, {
        hidden: false
      }, {
        hidden: false
      }, {
        hidden: false
      }, {
        hidden: false
      }, {
        hidden: false
      }, {
        hidden: false
      }, {
        hidden: false
      }, {
        hidden: false
      }, {
        hidden: false
      }, {
        hidden: false
      }, {
        hidden: false
      }, {
        hidden: false
      }, {
        hidden: false
      }, {
        hidden: false
      }, {
        hidden: false
      }, {
        hidden: false
      }, {
        hidden: false
      }, {
        hidden: false
      }, {
        hidden: false
      }, {
        hidden: false
      }, {
        hidden: false
      }, {
        hidden: false
      }, {
        hidden: false
      }, {
        hidden: false
      }, {
        hidden: false
      }, {
        hidden: false
      }, {
        hidden: false
      }, {
        hidden: false
      }, {
        hidden: false
      }, {
        hidden: false
      }, {
        hidden: false
      }, {
        hidden: false
      }, {
        hidden: false
      }, {
        hidden: false
      }, {
        hidden: false
      }, {
        hidden: false
      }, {
        hidden: false
      }, {
        hidden: false
      }, {
        hidden: false
      }, {
        hidden: false
      }, {
        hidden: false
      }, {
        hidden: false
      }, {
        hidden: false
      }, {
        hidden: false
      }, {
        hidden: false
      }, {
        hidden: false
      }, {
        hidden: false
      }, {
        hidden: false
      }, {
        hidden: false
      }, {
        hidden: false
      }, {
        hidden: false
      }, {
        hidden: false
      }, {
        hidden: false
      }, {
        hidden: false
      }, {
        hidden: false
      }, {
        hidden: false
      }],
      chooseTarot: [],
      showChooseTarot: [{
        text: '过去',
        name: ''
      }, {
        text: '现在',
        name: ''
      }, {
        text: '未来',
        name: ''
      }],
      tarotResultData: [],
      showAnmition: false
    }, this.shuffleDeckFn = event => {
      var Setting = this;
      if (Setting.checkLoginStatus()) {
        var id = event.detail.formId;
        var openid = app.globalData.wxInfo.openId;
        console.log(id);
        res.fetchPost(res.baseUrl + 'wechat/saveformdata', {
          open_id: openid,
          form_id: id,
          context: {
            type: 1
          },
          noTip: true
        }).then(function (canCreateDiscussions) {});
        Setting.setData({
          showShuffleDeckAnim: true,
          showEntranceAnimBox: false
        });
        setTimeout(function () {
          Setting.setData({
            showOperatingArea: true
          });
        }, 9950);
      }
    }, this.checkLoginStatus = () => {
      if (app.isLogin()) {
        return true;
      }
      if (app.getAllow()) {
        Taro.navigateTo({
          url: '../login/login'
        });
      } else {
        Taro.navigateTo({
          url: '../authorization/authorization'
        });
      }
    }, this.fetchData = () => {
      var mockDndService = this;
      /** @type {string} */var url = res.baseUrl + 'brapi/tarot/result';
      res.fetchGet(url).then(function (jptResponseObj) {
        mockDndService.setData({
          tarotResultData: jptResponseObj.result
        });
      });
    }, this.submitFormid2 = event => {
      var messageTypes = this.data.chooseTarot;
      var id = event.detail.formId;
      var openid = app.globalData.wxInfo.openId;
      if (messageTypes.length > 2) {
        console.log('---------------');
        console.log(id);
        res.fetchPost(res.baseUrl + 'wechat/saveformdata', {
          open_id: openid,
          form_id: id,
          context: {
            type: 1
          },
          noTip: true
        }).then(function (canCreateDiscussions) {});
      }
    }, this.choose = event => {
      var _this = this;
      var famousMod = _this.data.tarotData;
      var i = event.currentTarget.dataset.index;
      var res = _this.data.chooseTarot;
      var types = _this.data.tarotResultData;
      /** @type {*} */var aggregatesArray = JSON.parse(JSON.stringify(_this.data.showChooseTarot));
      if (d && 3 != res.length) {
        /** @type {boolean} */
        d = false;
        _this.setData({
          clickIndex: i,
          showReadyFont: false
        });
        /** @type {string} */famousMod[i].trans = 'removeAnim';
        res.push({
          anim: 'chooseTarotItemAnim' + res.length,
          res: types[res.length]
        });
        _this.setData({
          tarotData: famousMod,
          chooseTarot: res
        });
        setTimeout(function () {
          aggregatesArray[res.length - 1].name = types[res.length - 1].name;
          _this.setData({
            showChooseTarot: aggregatesArray
          });
          if (3 == res.length) {
            Taro.setStorageSync('tarotResultData', types);
            _this.setData({
              pageShow: false
            });
            setTimeout(function () {
              if (_this.data.options.source && 'freeAsk' == _this.data.options.source) {
                if (_this.data.options.assisPostId) {
                  Taro.redirectTo({
                    url: '../tarotGamePay/index?source=' + _this.data.options.source + '&assisPostId=' + _this.data.options.assisPostId
                  });
                } else {
                  Taro.redirectTo({
                    url: '../tarotGamePay/index?source=' + _this.data.options.source
                  });
                }
              } else {
                Taro.redirectTo({
                  url: '../tarotGamePay/index'
                });
              }
            }, 250);
          }
        }, 4e3);
        setTimeout(function () {
          /** @type {boolean} */
          d = true;
        }, 4100);
      } else {
        console.log('不能点击了');
      }
    }, _temp;
  }

  componentWillMount(options) {
    this.setData({
      options: options
    });
    this.fetchData();
  }

  componentDidShow() {
    var tools = this;
    var mockDndService = this;
    var i = res.header['OI-WXAPP-SESSION'];
    /** @type {boolean} */d = true;
    if (!i) {
      Taro.navigateTo({
        url: '../authorization/authorization'
      });
    }
    Taro.getSystemInfo({
      success: function (res) {
        tools.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        });
      }
    });
    setTimeout(function () {
      mockDndService.setData({
        showEntranceAnimBox: true
      });
    }, 200);
    setTimeout(function () {
      mockDndService.setData({
        showStartInterface: true
      });
    }, 1700);
  }

  render() {
    const {
      windowWidth: windowWidth,
      windowHeight: windowHeight,
      pageShow: pageShow,
      showEntranceAnimBox: showEntranceAnimBox,
      showStartInterface: showStartInterface,
      showOperatingArea: showOperatingArea,
      showShuffleDeckAnim: showShuffleDeckAnim,
      clickIndex: clickIndex,
      tarotData: tarotData,
      chooseTarot: chooseTarot,
      showReadyFont: showReadyFont,
      showChooseTarot: showChooseTarot
    } = this.state;
    return pageShow && <View style={[_styleSheet["page"], 'width: ' + windowWidth + 'px; height: ' + windowHeight + 'px']}>
          <Image mode="widthFix" src="https://static.shengri.cn/uploads/QA_mp/ic_toubuwenzi@3x.png" style={_styleSheet["headerImg"]} />
          {showEntranceAnimBox && <View style={_styleSheet["entranceAnimBox"]}>
              {5 .map((item, index) => {
          return <Image mode="widthFix" src="https://static.shengri.cn/uploads/QA_mp/ic_arrow_Card@3x.png" style={_getStyle('entranceImg entranceImg' + index + ' entranceAnimImg' + index)} />;
        })}
            </View>}
          {showStartInterface && !showOperatingArea && <View style={_styleSheet["startInterface"]}>
              {11 .map((item, index) => {
          return <View style={_styleSheet["shuffleDeckBox"]}>
                    {showShuffleDeckAnim && <Block>
                        {11 .map((item, index) => {
                return <View style={[_styleSheet["shuffleDeckItem"], 'animation-delay: ' + index * 0.45 + 's;']}>
                              <Image mode="widthFix" src="https://static.shengri.cn/uploads/QA_mp/ic_arrow_Card@3x.png" style={'animation-iteration-count: ' + (index + 11)} />
                            </View>;
              })}
                      </Block>}
                    {showShuffleDeckAnim && <View style={_styleSheet["shuffleDeckPrompt"]}>正在洗牌 . . .</View>}
                    {!showShuffleDeckAnim && <View style={_styleSheet["instructionsBox"]}>
                        <View style={_styleSheet["icoBox"]}>
                          <Image mode="widthFix" src="https://static.shengri.cn/uploads/QA_mp/ic_fangxing_left@2x.png" />
                        </View>
                        <View style={_styleSheet["center"]}>
                          <Text>来到这里，心中大概有些困惑吧</Text>
                          <Text>或许，这里有你的答案</Text>
                          <Text style="margin-top: 20rpx;">
                            带着你的困惑，点击“开始”
                          </Text>
                        </View>
                        <View style={_styleSheet["icoBox"]}>
                          <Image mode="widthFix" src="https://static.shengri.cn/uploads/QA_mp/ic_fangxing_left@2x.png" style="float: right;" />
                        </View>
                      </View>}
                    {!showShuffleDeckAnim && <View style={_styleSheet["startBtnBox"]}>
                        <Form onUbmit={this.shuffleDeckFn} reportSubmit="true">
                          <Button formType="submit" style={_styleSheet["openFormid1"]} />
                        </Form>
                        <View style={_styleSheet["startBtn"]}>开始</View>
                      </View>}
                  </View>;
        })}
            </View>}
          {showOperatingArea && <View style={_styleSheet["operatingAreaBox"]}>
              <View style={_styleSheet["operatingArea"]}>
                <Form onUbmit={this.submitFormid2} reportSubmit="true">
                  <Button formType="submit" style={_styleSheet["openFormid2"]}>
                    {tarotData.map((item, index) => {
                return <View style={[_getStyle('itemBox itemBoxLocation' + index + ' ' + (clickIndex == index ? '' : 'itemBoxAnim') + ' ' + item.trans), 'animation-delay: ' + (clickIndex == index ? 0 : (index + 1) * 0.03) + 's;']}>
                          <Image onClick={this.choose} data-index={index} mode="widthFix" src="https://static.shengri.cn/uploads/QA_mp/ic_arrow_Card_heng@3x.png" style={_styleSheet["itemImg"]} />
                        </View>;
              })}
                    {chooseTarot.map((item, index) => {
                return <Image mode="widthFix" src={item.res.image} style={_getStyle('chooseTarotItem ' + item.anim)} />;
              })}
                  </Button>
                </Form>
              </View>
              {showReadyFont && <View style={[_styleSheet["readyFont"], _styleSheet["clearfix"]]}>
                  <View style={_styleSheet["icoBox"]}>
                    <Image mode="widthFix" src="https://static.shengri.cn/uploads/QA_mp/ic_fangxing_left@2x.png" />
                  </View>
                  <View style={_styleSheet["center"]}>
                    <Text>此刻，</Text>
                    <Text>请深吸一口气，</Text>
                    <Text>凭直觉选取3张神秘塔罗</Text>
                  </View>
                  <View style={_styleSheet["icoBox"]}>
                    <Image mode="widthFix" src="https://static.shengri.cn/uploads/QA_mp/ic_fangxing_right@2x.png" />
                  </View>
                </View>}
              {!showReadyFont && <View style={[_styleSheet["showTarot"], _styleSheet["clearfix"]]}>
                  <Image mode="widthFix" src="https://static.shengri.cn/uploads/QA_mp/ic_rectangle@3x.png" style={_styleSheet["leftIco"]} />
                  <Image mode="widthFix" src="https://static.shengri.cn/uploads/QA_mp/ic_rectangle@3x.png" style={_styleSheet["rightIco"]} />
                  {showChooseTarot.map((item, index) => {
            return <View style={_styleSheet["tarotItemBox"]}>
                        <View style={_styleSheet["chooseTarotBox"]}>{item.text}</View>
                        <Text>{item.name}</Text>
                      </View>;
          })}
                </View>}
            </View>}
        </View>;
  }
}, _class2.config = {
  navigationBarTitleText: '塔罗解惑',
  navigationBarTextStyle: 'black',
  navigationBarBackgroundColor: '#FFF',
  enablePullDownRefresh: false
}, _temp2)) || _class);

export default _C;