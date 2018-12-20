var _dec, _class, _class2, _temp2;

import Taro from '@tarojs/taro-rn';
import { View, Image, Text, Button } from "@tarojs/components-rn";
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

var self = require('./../../utils/api.js');

var app = Taro.getApp();

/** @type {boolean} */
var o = true;

var fs = undefined;

var _takingTooLongTimeout = undefined;

let _C = (_dec = withWeapp('Page'), _dec(_class = (_temp2 = _class2 = class _C extends React.Component {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.state = {
      windowHeight: 0,
      windowWidth: 0,
      userInfo: {},
      list: [],
      showFreeAsk: false,
      showPrompt: false,
      guideFlag: false,
      promptAnim: '',
      canGetCoupon: false,
      hasCoupon: false,
      receive: false,
      isShare: false,
      seeSuccess: false,
      isLogin: true,
      helpCount: 0
    }, this.onShareAppMessage = () => {
      var req = this;
      return req.data.isLogin && req.data.canGetCoupon && (req.setData({
        showPrompt: false,
        isShare: true
      }), req.getCouponFn()), {
        title: '送你一张免费问答券',
        path: '/pages/index/index',
        imageUrl: 'https://static.shengri.cn/uploads/QA_mp/shareImageUrl.png'
      };
    }, this.onReachBottom = () => {
      var model = this;
      var files = model.data.list;
      var params = {
        limit: 10,
        min_id: files[files.length - 1].post_id
      };
      Taro.showToast({
        title: '加载中...',
        icon: 'loading',
        duration: 1e4
      });
      self.fetchGet(self.baseUrl + 'ask/latestList', params).then(function (options) {
        Taro.hideToast();
        model.setData({
          list: files.concat(options.items)
        });
      });
    }, this.onPullDownRefresh = () => {
      this.fetchData();
    }, this.couponData = () => {
      var mockDndService = this;
      self.fetchGet(self.baseUrl + 'ask/coupon/check_user_coupon').then(function (jptResponseObj) {
        self.fetchPost(self.baseUrl + 'ask/posts_price', {
          type: 'dice'
        }).then(function (res) {
          /** @type {boolean} */
          var n = false;
          res.prices.forEach(function (query, canCreateDiscussions) {
            if (query.coupon_id) {
              /** @type {boolean} */
              n = true;
            }
          });
          mockDndService.setData({
            canGetCoupon: !!jptResponseObj.result,
            hasCoupon: n,
            isLogin: true
          });
        });
      });
    }, this.redDotData = () => {
      var mockDndService = this;
      self.fetchGet(self.baseUrl + 'ask/assistance/count').then(function (asyncsRunning) {
        mockDndService.setData({
          helpCount: asyncsRunning.count
        });
      });
    }, this.fetchData = () => {
      var _self = this;
      var results = _self.data.list;
      var params = {};
      if (0 == results.length) {
        params = {
          limit: 5
        };
        Taro.showToast({
          title: '加载中...',
          icon: 'loading',
          duration: 1e4
        });
      } else {
        params = {
          limit: 5,
          max_id: results[0].post_id
        };
      }
      self.fetchGet(self.baseUrl + 'ask/newestList', params).then(function (s) {
        Taro.stopPullDownRefresh();
        if (0 == results.length) {
          Taro.hideToast();
          _self.setData({
            list: s.items
          });
          if (!Taro.getStorageSync('ShowGuide')) {
            setTimeout(function () {
              _self.setData({
                guideFlag: true
              });
              setTimeout(function () {
                if (_self.data.windowHeight > 667 && _self.data.windowWidth <= 375) {
                  _self.setData({
                    promptAnim: 'promptBgAnim1'
                  });
                } else {
                  _self.setData({
                    promptAnim: 'promptBgAnim2'
                  });
                }
              }, 400);
            }, 2e3);
          }
        } else {
          fs = s.items;
          _self.addData();
        }
      });
    }, this.addData = () => {
      var that = this;
      var _list = that.data.list;
      setTimeout(function () {
        if (fs.length > 0) {
          var item = fs.splice(fs.length - 1, 1)[0];
          _list.unshift(item);
          that.setData({
            list: _list
          });
          that.addData();
        } else {
          if ('pages/index/index' == Taro.getCurrentPages()[0].route && o) {
            /** @type {boolean} */
            o = false;
            /** @type {number} */
            _takingTooLongTimeout = setTimeout(function () {
              /** @type {boolean} */
              o = true;
              that.fetchData();
              console.log('延时器执行中');
            }, 1e4);
          }
        }
      }, 1500);
    }, this.showPromptFn = () => {
      var file = this;
      var o = app.isLogin();
      var receive = file.data.receive;
      var a = file.data.seeSuccess;
      if (o) {
        if (receive) {
          /** @type {boolean} */
          a = false;
        }
        file.setData({
          showPrompt: !this.data.showPrompt,
          seeSuccess: a
        });
      } else {
        if (app.getAllow()) {
          Taro.navigateTo({
            url: '../login/login?redirect=index'
          });
        } else {
          Taro.navigateTo({
            url: '../authorization/authorization?redirect=index'
          });
        }
      }
    }, this.getCouponFn = () => {
      var mockDndService = this;
      self.fetchPost(self.baseUrl + 'ask/mini_share', {}).then(function (testsStatus) {
        if (!testsStatus.status) {
          self.fetchPost(self.baseUrl + 'ask/free_coupon', {}).then(function (testsStatus) {
            if (testsStatus.status) {
              mockDndService.setData({
                showPrompt: true
              });
            } else {
              mockDndService.setData({
                receive: true,
                hasCoupon: true,
                showPrompt: true,
                seeSuccess: true
              });
            }
          });
        }
      });
    }, this.jump = event => {
      var tgtPath = event.currentTarget.dataset.path;
      var requestOrUrl = undefined;
      if (1 == tgtPath) {
        /** @type {string} */
        requestOrUrl = '../diceGame/index';
      } else {
        if (2 == tgtPath) {
          /** @type {string} */
          requestOrUrl = '../tarotGame/index';
        } else {
          if (3 == tgtPath) {
            /** @type {string} */
            requestOrUrl = '../myQuestion/index';
          }
        }
      }
      Taro.navigateTo({
        url: requestOrUrl
      });
      if (this.data.receive) {
        this.setData({
          seeSuccess: true,
          showPrompt: false
        });
      } else {
        this.setData({
          showPrompt: false
        });
      }
    }, this.freeAskFn = () => {
      Taro.navigateTo({
        url: '../tarotGame/index?source=freeAsk'
      });
    }, this.noClose = () => {}, this.goDetail = event => {
      var postid = event.currentTarget.dataset.postid;
      Taro.navigateTo({
        url: '../detail/index?postId=' + postid
      });
    }, this.guideFn = () => {
      Taro.setStorageSync('ShowGuide', true);
      this.setData({
        guideFlag: false
      });
    }, this.promptDownload = () => {
      Taro.showModal({
        title: '提示',
        content: '下载生日管家APP，体验优质占卜服务',
        showCancel: false,
        confirmColor: '#ff3939',
        success: function (backdata) {}
      });
    }, this.statisticalClickDown = () => {
      console.log('------');
    }, this.showFreeAskFn = () => {
      var mockDndService = this;
      /** @type {string} */
      var url = self.baseUrl + 'store/weapp/share';
      self.fetchGet(url, {
        noTip: true
      }).then(function (canCreateDiscussions) {
        mockDndService.setData({
          showFreeAsk: canCreateDiscussions.showTimeLine
        });
      });
    }, _temp;
  }

  componentWillMount(data) {
    var newsView = this;
    console.log('options----' + JSON.stringify(data));
    if (data && 'chn' in data) {
      self.setChannel(data.chn);
    } else {
      if (data.scene) {
        console.log('options.scene------' + data.scene);
        self.setChannel(data.scene);
      } else {
        if (data.postId) {
          Taro.navigateTo({
            url: '../detail/index?postId=' + data.postId
          });
        } else {
          if (data.assisPostId) {
            Taro.navigateTo({
              url: '../tarotGame/index?source=freeAsk&assisPostId=' + data.assisPostId
            });
          }
        }
      }
    }
    newsView.fetchData();
    setTimeout(function () {
      newsView.fetchData();
    }, 1e4);
  }

  componentDidShow() {
    var tools = this;
    var that = this;
    /** @type {!Array} */
    fs = [];
    Taro.getSystemInfo({
      success: function (res) {
        tools.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        });
      }
    });
    that.setData({
      userInfo: app.globalData.wxInfo
    });
    that.showFreeAskFn();
    if (that.data.list.length > 0) {
      that.fetchData();
    }
    /** @type {boolean} */
    o = true;
    setTimeout(function () {
      var conv_reverse_sort = app.isLogin();
      console.log(conv_reverse_sort);
      if (conv_reverse_sort) {
        that.couponData();
        that.redDotData();
      } else {
        that.setData({
          isLogin: false
        });
      }
    }, 400);
  }

  componentDidHide() {
    clearTimeout(_takingTooLongTimeout);
    console.log(111111111);
  }

  componentWillUnmount() {
    clearTimeout(_takingTooLongTimeout);
    console.log(222222222);
  }

  render() {
    const {
      userInfo: userInfo,
      helpCount: helpCount,
      showFreeAsk: showFreeAsk,
      canGetCoupon: canGetCoupon,
      hasCoupon: hasCoupon,
      isLogin: isLogin,
      list: list,
      showPrompt: showPrompt,
      receive: receive,
      isShare: isShare,
      seeSuccess: seeSuccess,
      guideFlag: guideFlag,
      promptAnim: promptAnim
    } = this.state;
    return <View style={_styleSheet["page"]}>
        <View style={_styleSheet["userInfo"]}>
          <View style={_styleSheet["userInfoBox"]}>
            <View style={_styleSheet["left"]}>
              <Image mode="widthFix" src={userInfo.avatarUrl} />
              <View style={[_styleSheet["text"], _styleSheet["ellipsis"]]}>{userInfo.nickName}</View>
            </View>
            <View onClick={this.jump} data-path="3" style={_styleSheet["right"]}>
              <View style={_styleSheet["text"]}>
                <Text>我的提问</Text>
                {helpCount && <View style={_styleSheet["redDot"]}>{helpCount}</View>}
              </View>
            </View>
          </View>
          {showFreeAsk && <Image onClick={this.freeAskFn} mode="widthFix" src="https://static.shengri.cn/uploads/QA_mp/freeAskbanner1.jpg?imageslim" style={_styleSheet["freeAsk"]} />}
        </View>
        {(canGetCoupon || !canGetCoupon && hasCoupon || !isLogin) && <View style={_styleSheet["banner"]}>
            <Image onClick={this.showPromptFn} mode="widthFix" src="https://static.shengri.cn/uploads/QA_mp/shareBanner@3x.png?slimimage" />
          </View>}
        <View style={_styleSheet["header"]}>
          <View onClick={this.jump} data-path="1" style={_styleSheet["item"]}>
            <Image mode="widthFix" src="https://static.shengri.cn/uploads/QA_mp/shouye-shaizi@3x.png" />
            <View style={_styleSheet["title"]}>占星骰子</View>
            <View style={_styleSheet["subTitle"]}>四千多年历史的神秘占卜术</View>
            <View style={_styleSheet["button"]}>提问</View>
          </View>
          <View onClick={this.jump} data-path="2" style={_styleSheet["item"]}>
            <Image mode="widthFix" src="https://static.shengri.cn/uploads/QA_mp/shouye-taluo@3x.png" />
            <View style={_styleSheet["title"]}>塔罗占卜</View>
            <View style={_styleSheet["subTitle"]}>得到来自阿卡那的神秘指引</View>
            <View style={_styleSheet["button"]}>提问</View>
          </View>
        </View>
        <View style={_styleSheet["msgList"]}>
          {list.map((item, index) => {
          return <View onClick={this.goDetail} data-postid={item.post_id} style={_styleSheet["itemMsg"]}>
                <View style={_styleSheet["top"]}>
                  <View style={_styleSheet["left"]}>
                    <Image mode="widthFix" src={item.image} />
                    <Text>{item.category}</Text>
                  </View>
                  <Text style={_styleSheet["right"]}>
                    <Text style={_styleSheet["money"]}>￥</Text>
                    {item.price / 100}
                  </Text>
                </View>
                <View style={_styleSheet["center"]}>{item.content}</View>
                <View style={_styleSheet["bottom"]}>
                  <Text>{item.created_at_hm}</Text>
                  {item.replyTimes == 0 ? <Text>{item.replyTimes + '人回答'}</Text> : <Text style={{ color: '#D5AE4E' }}>
                      {item.replyTimes + '人回答'}
                    </Text>}
                </View>
              </View>;
        })}
        </View>
        {showPrompt && <View onClick={this.noClose} style={_styleSheet["prompt"]}>
            <Image onClick={this.showPromptFn} mode="widthFix" src="https://static.shengri.cn/uploads/QA_mp/shareimgClose@3x.png" style={_styleSheet["close"]} />
            {canGetCoupon && !hasCoupon && !receive && !isShare && <View style={_styleSheet["content"]}>
                <Image mode="widthFix" src="https://static.shengri.cn/uploads/QA_mp/shareimg1@3x.png" style={_styleSheet["topImg"]} />
                <View style={_styleSheet["bottom"]}>
                  <View style={_styleSheet["info1"]}>
                    <Text>分享小程序到微信群</Text>
                    <Text>即可获得免费问答券</Text>
                  </View>
                  <View style={_styleSheet["info2"]}>每日限量，手慢无！</View>
                  <View style={_styleSheet["btnBox"]}>
                    <Image mode="widthFix" src="https://static.shengri.cn/uploads/QA_mp/shareimg4@3x.png" />
                    <Text>去分享</Text>
                    <Button openType="share" />
                  </View>
                </View>
              </View>}
            {!canGetCoupon && receive && isShare && seeSuccess && <View style={_styleSheet["content"]}>
                <Image mode="widthFix" src="https://static.shengri.cn/uploads/QA_mp/shareimg1@3x.png" style={_styleSheet["topImg"]} />
                <View style={_styleSheet["bottom"]}>
                  <View style={_styleSheet["info1"]}>
                    <Text>恭喜你</Text>
                    <Text>抢到骰子免费提问券!</Text>
                  </View>
                  <View style={[_styleSheet["info2"], { color: '#FFFFFF' }]}>
                    免费券有效期<Text style={{ color: '#FF3939' }}>24h</Text>
                    ，现在就去使用吧
                  </View>
                  <View onClick={this.jump} data-path="1" style={_styleSheet["btnBox"]}>
                    <Text>去提问</Text>
                  </View>
                </View>
              </View>}
            {canGetCoupon && !hasCoupon && !receive && isShare && <View style={_styleSheet["content"]}>
                <Image mode="widthFix" src="https://static.shengri.cn/uploads/QA_mp/shareimg3@3x.png" style={_styleSheet["topImg"]} />
                <View style={_styleSheet["bottom"]}>
                  <View style={[_styleSheet["info1"], { color: '#ffffff' }]}>
                    <Text>今日已抢光！</Text>
                  </View>
                  <View style={[_styleSheet["info2"], { color: '#FFFFFF' }]}>
                    免费券每日限量，明天早点来哦
                  </View>
                  <View onClick={this.jump} data-path="1" style={[_styleSheet["btnBox"], { marginTop: '80rpx' }]}>
                    <Text>没有券也要问</Text>
                  </View>
                </View>
              </View>}
            {!canGetCoupon && hasCoupon && !seeSuccess && <View style={_styleSheet["content"]}>
                <Image mode="widthFix" src="https://static.shengri.cn/uploads/QA_mp/shareimg2@3x.png" style={_styleSheet["topImg"]} />
                <View style={_styleSheet["bottom"]}>
                  <View style={[_styleSheet["info1"], { color: '#FFFFFF' }]}>
                    <Text>您已经领取过！</Text>
                  </View>
                  <View style={[_styleSheet["info2"], { color: '#FFFFFF' }]}>
                    免费券有效期<Text style={{ color: '#FF3939' }}>24h</Text>
                    ，现在就去使用吧
                  </View>
                  <View onClick={this.jump} data-path="1" style={[_styleSheet["btnBox"], { marginTop: '76rpx' }]}>
                    <Text>去提问</Text>
                  </View>
                </View>
              </View>}
          </View>}
        {guideFlag && <View onClick={this.guideFn} style={_styleSheet["prompt"]}>
            <View style={_getStyle('promptBg ' + promptAnim)}>
              一键添加，获每日塔罗指引
            </View>
          </View>}
      </View>;
  }
}, _class2.config = {
  navigationBarTitleText: '心语问答',
  navigationBarTextStyle: 'black',
  navigationBarBackgroundColor: '#FFF',
  enablePullDownRefresh: true
}, _temp2)) || _class);

export default _C;