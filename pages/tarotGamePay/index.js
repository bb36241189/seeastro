var _dec, _class, _class2, _temp2;

import Taro from '@tarojs/taro-rn';
import { Block, View, Image, Text, Textarea, ScrollView, Form, Button, Input } from "@tarojs/components-rn";
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

/** @type {boolean} */var a = true;

let _C = (_dec = withWeapp('Page'), _dec(_class = (_temp2 = _class2 = class _C extends React.Component {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.state = {
      windowWidth: 0,
      windowHeight: 0,
      options: {},
      system: '',
      isToast: false,
      toastMsg: '',
      scrollX: true,
      disabled: false,
      showPayBox: false,
      showPayConfigBox: true,
      showSuccessBox: false,
      showCodeBox: false,
      showChooseTarot: [],
      inputAnimation: {},
      pageBottom: 0,
      questionText: '',
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
    }, this.noClose = () => {}, this.focus = event => {
      Taro.createAnimation({
        transformOrigin: '0 100%',
        duration: 300,
        timingFunction: 'linear',
        delay: 0
      }).bottom(event.detail.height).step();
      this.setData({
        pageBottom: 2 * event.detail.height
      });
    }, this.blur = () => {
      this.setData({
        pageBottom: 0
      });
    }, this.inputQuestion = p => {
      this.setData({
        questionText: p.detail.value
      });
    }, this.shuffleDeckFn = () => {
      if (a) {
        if (this.data.options.source && 'freeAsk' == this.data.options.source) {
          if (this.data.questionText.length < 5) {
            Taro.showToast({
              title: '提问不得少于5个字',
              icon: 'none',
              duration: 800
            });
          } else {
            this.freeAskFn();
          }
        } else {
          var colors = this.data.system;
          var eyesToElbow = this.data.isToast;
          var nirXml = this.data.toastMsg;
          if (!eyesToElbow && colors.indexOf('iOS') > -1) {
            return undefined;
          }
          if (this.data.questionText.length < 5) {
            Taro.showToast({
              title: '提问不得少于5个字',
              icon: 'none',
              duration: 800
            });
          } else {
            this.showPayBoxFn();
          }
        }
        /** @type {boolean} */a = false;
      }
    }, this.showPayBoxFn = () => {
      this.setData({
        showPayBox: !this.data.showPayBox
      });
    }, this.priceFn = () => {
      var mockDndService = this;
      var e = this;
      /** @type {number} */var tmpSlug = 0;
      res.fetchPost(res.baseUrl + 'ask/posts_price', {
        type: 'tarot'
      }).then(function (res) {
        res.prices.forEach(function (val, canCreateDiscussions) {
          if (val.is_default) {
            tmpSlug = val.price;
          }
        });
        mockDndService.setData({
          choosePrice: tmpSlug,
          priceArr: res.prices
        });
        e.walletAmount();
      });
    }, this.walletAmount = () => {
      var mockDndService = this;
      var geckoTable = this;
      var pipelets = geckoTable.data.priceArr;
      var byAddress = geckoTable.data.payConfigArr;
      var i = geckoTable.data.walletBalanceText;
      /** @type {boolean} */var n = true;
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
            n = false;
          }
        });
        /** @type {string} */i = num - max > 0 ? '余额：' : '余额不足：';
        mockDndService.setData({
          walletParce: cvb.balance,
          payConfigArr: byAddress,
          walletBalanceText: i,
          showPayConfigBox: n
        });
      });
    }, this.choosePriceFn = event => {
      var aStatistic = this;
      var index = event.currentTarget.dataset.index;
      var items = aStatistic.data.priceArr;
      var pipelets = aStatistic.data.payConfigArr;
      var i = aStatistic.data.walletBalanceText;
      var n = aStatistic.data.showPayConfigBox;
      var val = undefined;
      var price = undefined;
      pipelets.forEach(function (body, canCreateDiscussions) {
        if (28 == body.payType) {
          val = body.amount;
        }
      });
      items.forEach(function (canCreateDiscussions, i) {
        /** @type {number} */
        items[i].is_default = index == i ? 1 : 0;
      });
      if (items[index].coupon_id) {
        price = items[index].price;
        /** @type {string} */i = '余额：';
        /** @type {boolean} */n = false;
      } else {
        /** @type {string} */
        i = items[index].price < val ? '余额：' : '余额不足：';
        price = items[index].price;
        /** @type {boolean} */n = true;
      }
      aStatistic.setData({
        choosePrice: price,
        priceArr: items,
        walletBalanceText: i,
        showPayConfigBox: n
      });
    }, this.choosePayFn = event => {
      var req = this;
      var object_t = event.currentTarget.dataset.type;
      /** @type {!Array} */var images = [];
      var pipelets = req.data.showChooseTarot;
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
      pipelets.forEach(function (options, canCreateDiscussions) {
        images.push({
          id: options.id,
          position: options.position,
          url: options.image,
          width: options.width,
          height: options.height,
          orientation: options.orientation
        });
      });
      var data = {
        circle_id: 12,
        type: 2,
        content: req.data.questionText,
        images: images,
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
    }, this.freeAskFn = () => {
      var req = this;
      /** @type {!Array} */var images = [];
      req.data.showChooseTarot.forEach(function (options, canCreateDiscussions) {
        images.push({
          id: options.id,
          position: options.position,
          url: options.image,
          width: options.width,
          height: options.height,
          orientation: options.orientation
        });
      });
      var data = {
        post_type: 1,
        circle_id: 12,
        type: 2,
        content: req.data.questionText,
        images: images,
        is_anonymous: 1,
        from_src: 'taluo',
        price: req.data.choosePrice
      };
      if (req.data.options.assisPostId) {
        data.assis_post_id = req.data.options.assisPostId;
      }
      res.fetchPost(res.baseUrl + 'ask/posts', data).then(function (params) {
        Taro.hideToast();
        if (!params.status) {
          console.log('支付成功。。。。进入提问详情页面');
          req.setData({
            postId: params.post_id
          });
          Taro.redirectTo({
            url: '../detail/index?postId=' + req.data.postId
          });
        }
      }).catch(function (canCreateDiscussions) {
        /** @type {boolean} */
        a = true;
      });
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
        a = true;
      });
    }, this.wxPay = s => {
      var ds = this;
      res.fetchPost(res.baseUrl + 'ask/posts', s).then(function (post) {
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
        a = true;
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
      });
    }, this.sendCode = () => {
      var mockDndService = this;
      var a = this;
      var data = {
        phone: app.getUserPhone(),
        type: 5,
        noTip: true
      };
      res.fetchPost(res.baseUrl + 'account/send_verify_code', data).then(function (data) {
        mockDndService.setData({
          ticketCode: data.ticket
        });
        a.settime(60);
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

  componentWillMount(options) {
    this.setData({
      options: options
    });
  }

  componentDidShow() {
    var _this = this;
    var mockDndService = this;
    /** @type {boolean} */a = true;
    var e = Taro.getStorageSync('tarotResultData');
    Taro.getSystemInfo({
      success: function (res) {
        _this.setData({
          system: res.system,
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        });
      }
    });
    mockDndService.setData({
      showChooseTarot: e
    });
    mockDndService.priceFn();
    mockDndService.isToastFn();
  }

  render() {
    const {
      windowWidth: windowWidth,
      windowHeight: windowHeight,
      showChooseTarot: showChooseTarot,
      inputAnimation: inputAnimation,
      pageBottom: pageBottom,
      booleanFalse: booleanFalse,
      questionText: questionText,
      showPayBox: showPayBox,
      showCodeBox: showCodeBox,
      showSuccessBox: showSuccessBox,
      scrollX: scrollX,
      priceArr: priceArr,
      showPayConfigBox: showPayConfigBox,
      payConfigArr: payConfigArr,
      walletBalanceText: walletBalanceText,
      choosePrice: choosePrice,
      walletParce: walletParce,
      codeDesc: codeDesc
    } = this.state;
    return <Block>
        <View style={[_styleSheet["page"], 'width: ' + windowWidth + 'px; height: ' + windowHeight + 'px']}>
          <Image mode="widthFix" src="https://static.shengri.cn/uploads/QA_mp/tarrow_star.png" style={_styleSheet["hedaerBg"]} />
          <Image mode="widthFix" src="https://static.shengri.cn/uploads/QA_mp/ic_toubuwenzi@3x.png" style={_styleSheet["headerImg"]} />
          <View style={_styleSheet["operatingAreaBox"]}>
            <View style={[_styleSheet["showTarot"], _styleSheet["clearfix"]]}>
              <Image mode="widthFix" src="https://static.shengri.cn/uploads/QA_mp/ic_rectangle@3x.png" style={_styleSheet["leftIco"]} />
              <Image mode="widthFix" src="https://static.shengri.cn/uploads/QA_mp/ic_rectangle@3x.png" style={_styleSheet["rightIco"]} />
              {showChooseTarot.map((item, index) => {
              return <View style={_styleSheet["tarotItemBox"]}>
                    <View style={_styleSheet["chooseTarotBox"]}>
                      <Image mode="widthFix" src={item.image} />
                    </View>
                    <Text>{item.name}</Text>
                  </View>;
            })}
            </View>
          </View>
          <View style={_styleSheet["infoMsg"]}>
            <Text>生活和塔罗牌图案之间的关联在于它们之间相同的意义</Text>
            <Text>人生不同境遇的体验，会有相应的塔罗牌来描述</Text>
            <Text>就在摊开牌的那一刻，神秘的，似乎毫无理由的出现</Text>
          </View>
          <View animation={inputAnimation} style={[_styleSheet["animBox"], 'bottom:' + pageBottom + 'rpx']}>
            <View style={_styleSheet["textareaBox"]}>
              {!showPayBox && !showCodeBox && !showSuccessBox ? <Textarea adjustPosition={booleanFalse} onLur={this.blur} onOcus={this.focus} onNput={this.inputQuestion} disabled={booleanFalse} fixed="true" maxlength="500" placeholder="\是\时\候\，\敞\开\心\扉\，\讲\出\你\的\困\惑\了..." placeholderStyle="color: #ffffff;" showConfirmBar={booleanFalse} value={questionText} style={_styleSheet["textarea"]} /> : <View style={_styleSheet["textarea"]}>
                  {questionText ? questionText : '是时候，敞开心扉，讲出你的困惑了...'}
                </View>}
            </View>
            <View style={_styleSheet["btnBoxBg"]}>
              <View style={_styleSheet["btnBox"]}>
                <View onClick={this.shuffleDeckFn} style={_styleSheet["btn"]}>
                  <Text>咨询</Text>
                  <Text>塔罗师</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
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
        {showCodeBox && <View onClick style={[_styleSheet["payBoxBg"], 'width: ' + windowWidth + 'px; height: ' + windowHeight + 'px']}>
            <View onClick={this.noClose} style={_styleSheet["codeBox"]}>
              <Image onClick={this.showCodeBoxFn} mode="widthFix" src="https://static.shengri.cn/uploads/QA_mp/close@3x.png" />
              <View style={_styleSheet["title"]}>需要支付</View>
              <View style={_styleSheet["parce"]}>{choosePrice / 100 + '元'}</View>
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
        {showSuccessBox && <View onClick style={[_styleSheet["payBoxBg"], 'width: ' + windowWidth + 'px; height: ' + windowHeight + 'px']}>
            <View style={_styleSheet["successBox"]}>
              <Image mode="widthFix" src="https://static.shengri.cn/uploads/QA_mp/success@3x.png" />
              <View style={_styleSheet["title"]}>收到您的问题啦</View>
              <View style={_styleSheet["subTitle"]}>
                收听解答后记得评价哦，您的意见会让我们做得更好
              </View>
              <View style={_styleSheet["btn"]}>好的</View>
            </View>
          </View>}
      </Block>;
  }
}, _class2.config = {
  navigationBarTitleText: '塔罗解惑',
  navigationBarTextStyle: 'black',
  navigationBarBackgroundColor: '#FFF',
  enablePullDownRefresh: false
}, _temp2)) || _class);

export default _C;