var _dec, _class, _class2, _temp2;

import Taro from '@tarojs/taro-rn';
import { Block, View, Image, Text, Form, Button, Textarea, ScrollView, Input } from "@tarojs/components-rn";
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

var exp = require('./../../config.js');

var app = Taro.getApp();

/** @type {boolean} */var e = true;

let _C = (_dec = withWeapp('Page'), _dec(_class = (_temp2 = _class2 = class _C extends React.Component {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.state = {
      windowWidth: 0,
      windowHeight: 0,
      system: '',
      isToast: false,
      toastMsg: '',
      pageBottom: 0,
      gameOperate: true,
      showTextarea: false,
      disabled: false,
      isClick: true,
      booleanFalse: false,
      inputAnimation: {},
      showBagBall: false,
      questionText: '',
      allBallPosition: [{
        anim: 'anim0'
      }, {
        anim: 'anim1'
      }, {
        anim: 'anim2'
      }, {
        anim: 'anim3'
      }, {
        anim: 'anim4'
      }, {
        anim: 'anim5'
      }, {
        anim: 'anim6'
      }],
      showBallPosition: [],
      showParsing: false,
      showPayBox: false,
      showCodeBox: false,
      showPayConfigBox: true,
      payConfigArr: [{
        icon: 'https://brup.shengri.cn/goods/2017/07/FlULSYrDcwIJumMRDYpIps9SPNPd.png',
        name: '微信',
        payType: 9
      }, {
        icon: 'https://brup.shengri.cn/goods/2017/07/FotSXy4BdkO3aGlZcWC85wYXxmaG.png',
        name: '管家钱包',
        payType: 28,
        amount: 0
      }],
      priceArr: [],
      choosePrice: 900,
      walletBalanceText: '余额：',
      postId: 0,
      codeDesc: '再发一次',
      walletParce: 0,
      ticketCode: '',
      orderId: '',
      code: ''
    }, this.isToastFn = () => {
      var _this = this;
      /** @type {string} */var url = res.baseUrl + 'store/weapp/share';
      res.fetchGet(url, {
        noTip: true
      }).then(function (jsonSeed) {
        _this.setData({
          isToast: jsonSeed.showTimeLine,
          toastMsg: jsonSeed.msg
        });
      });
    }, this.noclose = () => {}, this.jump = () => {
      Taro.navigateTo({
        url: '../diceInstructions/index'
      });
    }, this.inputQuestion = p => {
      this.setData({
        questionText: p.detail.value
      });
    }, this.gameOperate = event => {
      var dataSource = this;
      if (dataSource.data.questionText.length < 5) {
        Taro.showToast({
          title: '提问不得少于5个字',
          icon: 'none',
          duration: 800
        });
      } else {
        if (dataSource.data.isClick && dataSource.checkLoginStatus()) {
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
          dataSource.setData({
            isClick: false
          });
          dataSource.fetchData();
        }
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
      var o = this;
      /** @type {string} */var url = res.baseUrl + 'brapi/shaizi/detail';
      res.fetchGet(url).then(function (result) {
        o.bagBallAnimationFn(result.result);
        o.setData({
          showBagBall: true
        });
      });
    }, this.bagBallAnimationFn = wrappersTemplates => {
      var row = this;
      var child_board_ids = row.data.allBallPosition;
      var boards = row.getArrayItems(child_board_ids, 3);
      wrappersTemplates.forEach(function (childTypes, i) {
        /** @type {!Object} */
        boards[i].info = childTypes;
      });
      setTimeout(function () {
        row.setData({
          showBagBall: false,
          showBallPosition: boards,
          disabled: true,
          gameOperate: false
        });
      }, 530);
    }, this.showParsingFn = () => {
      var aStatistic = this;
      aStatistic.setData({
        showParsing: !aStatistic.data.showParsing,
        showTextarea: !aStatistic.data.showTextarea
      });
    }, this.focus = event => {
      var root = Taro.createAnimation({
        transformOrigin: '0 100%',
        duration: 300,
        timingFunction: 'linear',
        delay: 0
      });
      root.bottom(event.detail.height).step();
      this.setData({
        inputAnimation: root.export()
      });
    }, this.blur = () => {
      this.setData({
        pageBottom: 0
      });
    }, this.getArrayItems = (items, groupCount) => {
      /** @type {!Array} */
      var children = new Array();
      var name;
      for (name in items) {
        children.push(items[name]);
      }
      /** @type {!Array} */var hash = new Array();
      /** @type {number} */var i = 0;
      for (; i < groupCount && children.length > 0; i++) {
        /** @type {number} */
        var len = Math.floor(Math.random() * children.length);
        hash[i] = children[len];
        children.splice(len, 1);
      }
      return hash;
    }, this.noClose = () => {}, this.showPayBoxFn = event => {
      var colors = this.data.system;
      var eyesToElbow = this.data.isToast;
      var i = this.data.toastMsg;
      if (!eyesToElbow && colors.indexOf('iOS') > -1) {
        Taro.showModal({
          title: '提示',
          content: i,
          confirmColor: '#F44236',
          showCancel: false,
          success: function (backdata) {}
        });
      } else {
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
        this.setData({
          showPayBox: !this.data.showPayBox
        });
      }
    }, this.priceFn = () => {
      var mockDndService = this;
      var a = this;
      /** @type {number} */var tmpSlug = 0;
      /** @type {string} */var n = '余额：';
      /** @type {boolean} */var i = true;
      res.fetchPost(res.baseUrl + 'ask/posts_price', {
        type: 'dice'
      }).then(function (res) {
        res.prices.forEach(function (val, canCreateDiscussions) {
          if (val.is_default) {
            tmpSlug = val.price;
            if (val.coupon_id) {
              /** @type {string} */
              n = '余额：';
              /** @type {boolean} */i = false;
            }
          }
        });
        mockDndService.setData({
          choosePrice: tmpSlug,
          priceArr: res.prices,
          walletBalanceText: n,
          showPayConfigBox: i
        });
        a.walletAmount();
      });
    }, this.walletAmount = () => {
      var mockDndService = this;
      var geckoTable = this;
      var pipelets = geckoTable.data.priceArr;
      var byAddress = geckoTable.data.payConfigArr;
      var i = geckoTable.data.walletBalanceText;
      /** @type {boolean} */var s = true;
      var num = undefined;
      var max = undefined;
      res.fetchGet(res.baseUrl + 'store/wallet').then(function (cvb) {
        /** @type {number} */
        num = 100 * cvb.balance;
        /** @type {number} */byAddress[1].amount = num;
        pipelets.forEach(function (params, canCreateDiscussions) {
          if (params.is_default) {
            max = params.price;
          }
          if (params.coupon_id && params.is_default) {
            /** @type {boolean} */
            s = false;
          }
        });
        /** @type {string} */i = num - max > 0 ? '余额：' : '余额不足：';
        mockDndService.setData({
          walletParce: cvb.balance,
          payConfigArr: byAddress,
          walletBalanceText: i,
          showPayConfigBox: s
        });
      });
    }, this.choosePriceFn = event => {
      var aStatistic = this;
      var item = event.currentTarget.dataset.index;
      var bids = aStatistic.data.priceArr;
      var pipelets = aStatistic.data.payConfigArr;
      var i = aStatistic.data.walletBalanceText;
      var s = aStatistic.data.showPayConfigBox;
      var val = undefined;
      var price = undefined;
      pipelets.forEach(function (body, canCreateDiscussions) {
        if (28 == body.payType) {
          val = body.amount;
        }
      });
      bids.forEach(function (canCreateDiscussions, i) {
        /** @type {number} */
        bids[i].is_default = item == i ? 1 : 0;
      });
      if (bids[item].coupon_id) {
        price = price = bids[item].price;
        /** @type {string} */i = '余额：';
        /** @type {boolean} */s = false;
      } else {
        /** @type {string} */
        i = bids[item].price < val ? '余额：' : '余额不足：';
        price = bids[item].price;
        /** @type {boolean} */s = true;
      }
      aStatistic.setData({
        choosePrice: price,
        priceArr: bids,
        walletBalanceText: i,
        showPayConfigBox: s
      });
    }, this.choosePayFn = event => {
      var req = this;
      var object_t = event.currentTarget.dataset.type;
      /** @type {!Array} */var img = [];
      var pipelets = req.data.showBallPosition;
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
      pipelets.forEach(function (req, canCreateDiscussions) {
        img.push({
          id: req.info.id,
          url: req.info.url,
          width: req.info.width,
          height: req.info.height,
          orientation: req.info.orientation
        });
      });
      var data = {
        circle_id: 33,
        type: 2,
        content: req.data.questionText,
        images: img,
        is_anonymous: 0,
        from_src: 'taluo',
        price: req.data.choosePrice
      };
      if (Taro.showToast({
        title: '支付中...',
        icon: 'loading',
        duration: 1e4
      }), 9 == object_t) {
        req.wxPay(data);
      } else {
        if (28 == object_t) {
          if ('余额不足：' == req.data.walletBalanceText) {
            return undefined;
          }
          req.walletPay(data);
        } else {
          if (1 == object_t) {
            data.coupon_id = req.data.priceArr[0].coupon_id;
            req.useCouponPay(data);
          }
        }
      }
    }, this.useCouponPay = o => {
      var ds = this;
      res.fetchPost(res.baseUrl + 'ask/posts', o).then(function (params) {
        Taro.hideToast();
        if (!params.status) {
          console.log('支付成功。。。。进入提问详情页面');
          ds.setData({
            postId: params.post_id
          });
          Taro.redirectTo({
            url: '../detail/index?postId=' + ds.data.postId
          });
        }
      }).catch(function (canCreateDiscussions) {
        /** @type {boolean} */
        e = true;
      });
    }, this.wxPay = n => {
      var ds = this;
      res.fetchPost(res.baseUrl + 'ask/posts', n).then(function (post) {
        if (!post.status) {
          ds.setData({
            postId: post.post_id
          });
          var openid = app.getUserWxOpenId();
          var data = {
            order_id: post.order_id,
            app_id: exp.payId,
            type: 24,
            open_id: openid
            /** @type {string} */ };var id = res.baseUrl + 'payment/wxcakepay';
          res.fetchPost(id, data).then(function (data) {
            Taro.hideToast();
            Taro.requestPayment({
              timeStamp: data.timestamp + '',
              nonceStr: data.nonceStr,
              package: data.package,
              signType: data.signType,
              paySign: data.paySign,
              success: function (backdata) {
                console.log('支付成功。。。。进入提问详情页面');
                Taro.redirectTo({
                  url: '../detail/index?postId=' + ds.data.postId
                });
              },
              fail: function (i) {
                Taro.showModal({
                  title: '提示',
                  content: '支付失败~',
                  confirmColor: '#F44236',
                  showCancel: false,
                  success: function (backdata) {}
                });
              }
            });
          }).catch(function (canCreateDiscussions) {});
        }
      }).catch(function (canCreateDiscussions) {
        /** @type {boolean} */
        e = true;
      });
    }, this.walletPay = o => {
      var exports = this;
      res.fetchPost(res.baseUrl + 'ask/posts', o).then(function (response) {
        Taro.hideToast();
        if (!response.status) {
          exports.sendCode();
          exports.setData({
            showPayBox: false,
            showCodeBox: true,
            postId: response.post_id,
            orderId: response.order_id
          });
        }
      }).catch(function (canCreateDiscussions) {
        /** @type {boolean} */
        e = true;
      });
    }, this.sendCode = () => {
      var mockDndService = this;
      var e = this;
      var data = {
        phone: app.getUserPhone(),
        type: 5,
        noTip: true
      };
      res.fetchPost(res.baseUrl + 'account/send_verify_code', data).then(function (data) {
        mockDndService.setData({
          ticketCode: data.ticket
        });
        e.settime(60);
      }).catch(function (event) {
        Taro.showModal({
          title: '提示',
          content: event.data.msg,
          confirmColor: '#cc9e3d',
          showCancel: false,
          success: function (backdata) {}
        });
      });
    }, this.settime = t => {
      var allTraps = this;
      if (t <= 0) {
        this.setData({
          codeDesc: '再发一次'
        });
      } else {
        /** @type {number} */
        t = t - 1;
        this.setData({
          codeDesc: t + 's'
        });
        setTimeout(function () {
          allTraps.settime(t);
        }, 1e3);
      }
    }, this.inputCode = p => {
      this.setData({
        code: p.detail.value
      });
    }, this.showCodeBoxFn = () => {
      this.setData({
        showCodeBox: false
      });
    }, this.againSend = () => {
      var context = this;
      if ('再发一次' == context.data.codeDesc) {
        context.sendCode();
        context.settime(60);
      }
    }, this.onClockPay = () => {
      var req = this;
      var ret = req.data.code;
      if (ret.length < 4) {
        Taro.showModal({
          title: '提示',
          content: '请输入正确验证码',
          confirmColor: '#cc9e3d',
          showCancel: false,
          success: function (backdata) {}
        });
      } else {
        var data = {
          order_id: req.data.orderId,
          code: ret,
          ticket: req.data.ticketCode
        };
        Taro.showToast({
          title: '支付中',
          icon: 'loading',
          duration: 1e4
        });
        res.fetchPost(res.baseUrl + 'payment/wallet', data).then(function (tests) {
          Taro.hideToast();
          if ('success' == tests.result) {
            Taro.redirectTo({
              url: '../detail/index?postId=' + req.data.postId
            });
          } else {
            Taro.showModal({
              title: '提示',
              content: '请输入正确的验证码',
              confirmColor: '#cc9e3d',
              showCancel: false,
              success: function (backdata) {}
            });
          }
        });
      }
    }, this.customFn = () => {
      Taro.showToast({
        title: '敬请期待',
        icon: 'none',
        duration: 800
      });
    }, _temp;
  }

  componentWillMount(hashComponent) {}

  componentDidShow() {
    var _this = this;
    var o = this;
    /** @type {boolean} */e = true;
    Taro.getSystemInfo({
      success: function (res) {
        _this.setData({
          system: res.system,
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        });
      }
    });
    if (app.isLogin()) {
      o.priceFn();
    }
    o.isToastFn();
  }

  render() {
    const {
      windowWidth: windowWidth,
      windowHeight: windowHeight,
      showBallPosition: showBallPosition,
      showBagBall: showBagBall,
      inputAnimation: inputAnimation,
      pageBottom: pageBottom,
      gameOperate: gameOperate,
      booleanFalse: booleanFalse,
      disabled: disabled,
      showTextarea: showTextarea,
      showParsing: showParsing,
      showPayBox: showPayBox,
      scrollX: scrollX,
      priceArr: priceArr,
      showPayConfigBox: showPayConfigBox,
      payConfigArr: payConfigArr,
      walletBalanceText: walletBalanceText,
      showCodeBox: showCodeBox,
      choosePrice: choosePrice,
      walletParce: walletParce,
      codeDesc: codeDesc
    } = this.state;
    return <Block>
        <View style={[_styleSheet["page"], 'width: ' + windowWidth + 'px; height: ' + windowHeight + 'px']}>
          <Image onClick={this.jump} mode="widthFix" src="https://static.shengri.cn/uploads/QA_mp/wenhao@3x.png" style={_styleSheet["instructions"]} />
          <View style={_styleSheet["gameBox1"]}>
            <View style={_styleSheet["gameBox2"]}>
              <View style={_styleSheet["gameBox3"]}>
                <View style={_styleSheet["gameBox4"]}>
                  <View style={_styleSheet["runRange"]}>
                    {showBallPosition.map((item, index) => {
                    return <View style={_getStyle('boll ' + item.anim)}>
                          <Image mode="widthFix" src={item.info.icon} />
                        </View>;
                  })}
                    {showBagBall && <Image mode="widthFix" src="https://static.shengri.cn/uploads/QA_mp/xiaoqiu@3x.png" style={[_styleSheet["bagBall"], _styleSheet["bagBallAnim"]]} />}
                  </View>
                </View>
              </View>
            </View>
          </View>
          {showBallPosition.length && <View style={_styleSheet["msgInfo"]}>
              <View style={_styleSheet["top"]}>
                {'「' + showBallPosition[0].info.s_name + '-' + showBallPosition[1].info.s_name + '-' + showBallPosition[2].info.s_name + '」'}
              </View>
              <View onClick={this.showParsingFn} style={_styleSheet["bottom"]}>
                <Text>ㄧ﹣</Text>查看解释<Text>——</Text>
              </View>
            </View>}
          <View animation={inputAnimation} style={[_styleSheet["pageBottom"], 'bottom:' + pageBottom + 'rpx']}>
            <View style={_styleSheet["contentBox"]}>
              {gameOperate && <Form onUbmit={this.gameOperate} reportSubmit="true">
                  <Button formType="submit" style={_styleSheet["openFormid1"]} />
                </Form>}
              {gameOperate && <Image mode="widthFix" src="https://static.shengri.cn/uploads/QA_mp/toushaiziBtn@3x.png" style={_styleSheet["btn"]} />}
              {!gameOperate && <Form onUbmit={this.showPayBoxFn} reportSubmit="true">
                  <Button formType="submit" style={_styleSheet["openFormid1"]} />
                </Form>}
              {!gameOperate && <Image mode="widthFix" src="https://static.shengri.cn/uploads/QA_mp/zixundarenBth@3x.png" style={_styleSheet["btn"]} />}
              <View style={_styleSheet["inputMsg"]}>
                <Image mode="widthFix" src="https://static.shengri.cn/uploads/QA_mp/qianbi@3x.png" style={_styleSheet["pen"]} />
                <Textarea adjustPosition={booleanFalse} onLur={this.blur} onOcus={this.focus} onNput={this.inputQuestion} disabled={disabled} fixed="true" hidden={showTextarea} placeholder="\先\写\下\你\的\问\题\，\心\诚\则\灵" placeholderStyle="color:#999999" showConfirmBar={booleanFalse} />
              </View>
            </View>
          </View>
        </View>
        {showParsing && <View onClick={this.showParsingFn} style={_styleSheet["parsing"]}>
            <View onClick={this.noclose} style={_styleSheet["content"]}>
              <View style={_styleSheet["title"]}>
                <Image onClick={this.showParsingFn} mode="widthFix" src="https://static.shengri.cn/uploads/QA_mp/close@3x.png" />
                解析
              </View>
              <ScrollView scrollY style={_styleSheet["msg"]}>
                {showBallPosition.map((item, index) => {
              return <View style={_styleSheet["item"]}>
                      <View style={_styleSheet["top"]}>
                        <View style={[_styleSheet["topBg"], 'background: ' + (index == 1 ? '#FFBB7F' : index == 2 ? '#61CAFB' : '#FF7972')]} />
                        {'/  ' + item.info.s_name}
                      </View>
                      <View style={_styleSheet["cont"]}>{item.info.content}</View>
                      <View style={_styleSheet["lable"]}>
                        {item.info.keywords.map((lable, index) => {
                    return <Text>{'#' + lable}</Text>;
                  })}
                      </View>
                    </View>;
            })}
                <View onClick={this.showPayBoxFn} style={_styleSheet["btn"]}>
                  咨询达人
                </View>
                <View style="height: 96rpx" />
              </ScrollView>
            </View>
          </View>}
        {showPayBox && <View onClick={this.showPayBoxFn} style={[_styleSheet["payBoxBg"], 'width: ' + windowWidth + 'px; height: ' + windowHeight + 'px']}>
            <View onClick={this.noClose} style={_styleSheet["payBox"]}>
              <View style={_styleSheet["content"]}>
                <Image onClick={this.showPayBoxFn} mode="widthFix" src="https://static.shengri.cn/uploads/QA_mp/close@3x.png" style={_styleSheet["close"]} />
                <View style={_styleSheet["title"]}>请选择你的赏金</View>
                <ScrollView scrollX={scrollX} style={_styleSheet["priceBox"]}>
                  {priceArr.map((item, index) => {
                return <Block>
                        {item.coupon_id ? <View onClick={this.choosePriceFn} data-index={index} style={_getStyle('priceItem ' + (item.is_default ? 'active' : ''))}>
                            <View style={_styleSheet["custom"]}>免费提问券</View>
                          </View> : <View onClick={this.choosePriceFn} data-index={index} style={_getStyle('priceItem ' + (item.is_default ? 'active' : ''))}>
                            <View style={_styleSheet["price"]}>
                              <Text>￥</Text>
                              {item.price / 100}
                            </View>
                            <View style={_styleSheet["conText"]}>{item.explain}</View>
                            {item.is_recommend && <Image mode="widthFix" src="https://static.shengri.cn/uploads/QA_mp/tuijian@3x.png" />}
                          </View>}
                      </Block>;
              })}
                  <View style={_styleSheet["priceItem"]}>
                    <View onClick={this.customFn} style={_styleSheet["custom"]}>
                      自定义赏金
                    </View>
                  </View>
                </ScrollView>
                {showPayConfigBox ? <Block>
                    {payConfigArr.map((item, index) => {
                return <View style={_styleSheet["payConfigBox"]}>
                          <View style={_styleSheet["payTitle"]}>
                            —————— 选择支付方式 ——————
                          </View>
                          {item.payType != 12 && <Block>
                              {payConfigArr.map((item, index) => {
                      return <View style={_styleSheet["payItem"]}>
                                    <Form onUbmit={this.choosePayFn} data-type={item.payType} reportSubmit="true">
                                      <Button formType="submit" style={_styleSheet["openFormid3"]} />
                                    </Form>
                                    <Image mode="widthFix" src={item.icon} />
                                    <Text style={_styleSheet["lable"]}>{item.name}</Text>
                                    {item.payType == 28 && <Text style="margin-left: 20rpx;color: #999999;">
                                        <Text>{walletBalanceText}</Text>
                                        {'￥' + item.amount / 100}
                                      </Text>}
                                  </View>;
                    })}
                            </Block>}
                        </View>;
              })}
                  </Block> : <View style={_styleSheet["useCoupon"]}>
                    <Form onUbmit={this.choosePayFn} data-type="1" reportSubmit="true">
                      <Button formType="submit" style={_styleSheet["openFormid3"]}>
                        确认使用
                      </Button>
                    </Form>
                  </View>}
                <View style={_styleSheet["instructions"]}>
                  *48小时未获得解答自动退款（不包含提问券）
                </View>
                <View style="height: 80rpx;" />
              </View>
            </View>
          </View>}
        {showCodeBox && <View style={[_styleSheet["payBoxBg"], 'width: ' + windowWidth + 'px; height: ' + windowHeight + 'px']}>
            <View onClick={this.noClose} style={_styleSheet["codeBox"]}>
              <Image onClick={this.showCodeBoxFn} mode="widthFix" src="https://static.shengri.cn/uploads/QA_mp/close@3x.png" />
              <View style={_styleSheet["title"]}>需要支付</View>
              <View style={_styleSheet["parce"]}>
                {choosePrice / 100}
                <Text style="font-size: 36rpx;">元</Text>
              </View>
              <View style={_styleSheet["walletParce"]}>
                {'钱包余额：' + walletParce + '元'}
              </View>
              <View style={_styleSheet["codeNum"]}>
                <Input onNput={this.inputCode} maxlength="4" placeholder="\请\输\入\验\证\码" type="number" />
                <View onClick={this.againSend} style={_styleSheet["btn"]}>
                  {codeDesc}
                </View>
              </View>
              <View onClick={this.onClockPay} style={_styleSheet["pay"]}>
                确定付款
              </View>
            </View>
          </View>}
      </Block>;
  }
}, _class2.config = {
  navigationBarTitleText: '提问',
  navigationBarTextStyle: 'black',
  navigationBarBackgroundColor: '#FFF',
  enablePullDownRefresh: false
}, _temp2)) || _class);

export default _C;