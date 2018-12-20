var _dec, _class, _class2, _temp2;

import Taro from '@tarojs/taro-rn';
import { Block, View, Image, Text, Form, Button, Canvas } from "@tarojs/components-rn";
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

var res = require('../../utils/api.js');

var app = Taro.getApp();

/** @type {boolean} */
var e = true;

var _takingTooLongTimeout = undefined;

var paintNodesTimeout = undefined;

var appendTrackTimer = undefined;

var endCallTimeout = undefined;

var _input_filter_changed = undefined;

var input_filter_changed = undefined;

var _nTimeoutID = undefined;

var _frameTimeout = undefined;

/** @type {boolean} */
var u = true;

/** @type {number} */
var ret = 0;

let _C = (_dec = withWeapp('Page'), _dec(_class = (_temp2 = _class2 = class _C extends React.Component {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.state = {
      windowWidth: 0,
      windowHeight: 0,
      pageShow: false,
      explainAnim: '',
      showEntranceAnimBox: false,
      entranceArr: [{
        anim: ''
      }, {
        anim: ''
      }, {
        anim: ''
      }, {
        anim: ''
      }, {
        anim: ''
      }],
      instructionsAnim: '',
      showShuffleTheDeckBtn: false,
      showShuffleDeckBox: false,
      showRisingAnimBox: false,
      showCutBox: false,
      showCutAnimBox: false,
      showMoveBox: false,
      showOperatingArea: false,
      tarotData: [{
        trans: ''
      }, {
        trans: ''
      }, {
        trans: ''
      }, {
        trans: ''
      }, {
        trans: ''
      }, {
        trans: ''
      }, {
        trans: ''
      }, {
        trans: ''
      }, {
        trans: ''
      }, {
        trans: ''
      }, {
        trans: ''
      }, {
        trans: ''
      }, {
        trans: ''
      }, {
        trans: ''
      }, {
        trans: ''
      }, {
        trans: ''
      }, {
        trans: ''
      }, {
        trans: ''
      }, {
        trans: ''
      }, {
        trans: ''
      }, {
        trans: ''
      }, {
        trans: ''
      }],
      chooseTarotImg: '',
      hiddenAnim: '',
      showChooseTarot: false,
      clickIndex: -1,
      showInterpretationBtn: false,
      showDetailPage: false,
      shareFlag: false,
      authFlag: false,
      guideFlag: false,
      animation: '',
      shareImg: '',
      chooseTarotData: {},
      showTimeLine: false,
      channelData: {}
    }, this.actionFn = () => {
      var aStatistic = this;
      clearTimeout(_takingTooLongTimeout);
      var timers = aStatistic.data.entranceArr;
      if (!timers[0].anim) {
        timers.forEach(function (t, diffX) {
          /** @type {string} */
          t.anim = 'entranceAnimImg' + diffX;
        });
        aStatistic.setData({
          explainAnim: 'explainAnim',
          entranceArr: timers,
          instructionsAnim: 'instructionsAnim'
        });
        /** @type {number} */
        appendTrackTimer = setTimeout(function () {
          aStatistic.setData({
            showShuffleTheDeckBtn: true
          });
        }, 1500);
      }
    }, this.shuffleDeckFn = () => {
      var mockDndService = this;
      mockDndService.setData({
        showEntranceAnimBox: false,
        showShuffleDeckBox: true
      });
      /** @type {number} */
      endCallTimeout = setTimeout(function () {
        mockDndService.setData({
          showShuffleDeckBox: false,
          showRisingAnimBox: true
        });
      }, 12e3);
      /** @type {number} */
      _input_filter_changed = setTimeout(function () {
        mockDndService.setData({
          showRisingAnimBox: false,
          showCutBox: true
        });
      }, 12300);
    }, this.cutFn = () => {
      var mockDndService = this;
      mockDndService.setData({
        showCutBox: false,
        showCutAnimBox: true
      });
      /** @type {number} */
      input_filter_changed = setTimeout(function () {
        mockDndService.setData({
          showCutAnimBox: false,
          showMoveBox: true
        });
      }, 2500);
      /** @type {number} */
      _nTimeoutID = setTimeout(function () {
        mockDndService.setData({
          showMoveBox: false,
          showOperatingArea: true
        });
      }, 3500);
    }, this.choose = event => {
      var dataSource = this;
      var famousMod = dataSource.data.tarotData;
      var i = event.currentTarget.dataset.index;
      if (e) {
        /** @type {boolean} */
        e = false;
        /** @type {string} */
        famousMod[i].trans = 'removeAnim';
        dataSource.setData({
          tarotData: famousMod,
          hiddenAnim: 'hiddenAnim',
          showChooseTarot: true
        });
        dataSource.fetchData(function () {
          /** @type {number} */
          _frameTimeout = setTimeout(function () {
            dataSource.setData({
              showOperatingArea: false,
              showInterpretationBtn: true
            });
          }, 2500);
        });
      } else {
        console.log('不能点击了');
      }
    }, this.fetchData = callback => {
      var mockDndService = this;
      /** @type {string} */
      var url = res.baseUrl + 'brapi/tarot/detail';
      res.fetchGet(url).then(function (canCreateDiscussions) {
        mockDndService.setData({
          chooseTarotData: canCreateDiscussions
        });
        callback();
      });
    }, this.submitFormid1 = event => {
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
    }, this.submitFormid2 = event => {
      var $scope = this;
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
      }).then(function (canCreateDiscussions) {
        /** @type {boolean} */
        u = true;
        /** @type {number} */
        ret = 0;
        $scope.fetchDetailData();
        $scope.shareData();
      });
    }, this.onShareAppMessage = t => {
      var aStatistic = this;
      return console.log(t.target), console.log(aStatistic.data.shareImg), aStatistic.setData({
        shareFlag: false
      }), {
        title: '来自阿卡纳的神秘指引...',
        path: 'pages/tarotSignIn/index',
        imageUrl: aStatistic.data.shareImg
      };
    }, this.noclose = () => {}, this.fetchDetailData = () => {
      var Layout = this;
      /** @type {string} */
      var url = res.baseUrl + 'brapi/tarot/detail';
      res.fetchGet(url).then(function (rects) {
        Layout.setData({
          chooseTarotData: rects,
          showDetailPage: true
        });
        Taro.setNavigationBarColor({
          frontColor: '#ffffff',
          backgroundColor: '#1f244c'
        });
        Layout.drawImageFn(rects.tarotId);
        if (!Taro.getStorageSync('ShowGuide')) {
          setTimeout(function () {
            Layout.setData({
              guideFlag: true
            });
            setTimeout(function () {
              if (Layout.data.windowHeight > 667 && Layout.data.windowWidth <= 375) {
                Layout.setData({
                  animation: 'promptBgAnim1'
                });
              } else {
                Layout.setData({
                  animation: 'promptBgAnim2'
                });
              }
            }, 400);
          }, 2e3);
        }
      });
    }, this.shareData = () => {
      var mockDndService = this;
      /** @type {string} */
      var url = res.baseUrl + 'store/weapp/share';
      res.fetchGet(url, {
        noTip: true
      }).then(function (canCreateDiscussions) {
        mockDndService.setData({
          showTimeLine: canCreateDiscussions.showTimeLine
        });
      });
    }, this.shareFn = () => {
      this.setData({
        shareFlag: !this.data.shareFlag
      });
    }, this.authFn = () => {
      this.setData({
        authFlag: !this.data.authFlag
      });
    }, this.guideFn = () => {
      Taro.setStorageSync('ShowGuide', true);
      this.setData({
        guideFlag: false
      });
    }, this.showAuthListFn = p => {
      var options = this;
      options.setData({
        authFlag: false
      });
      if (p.detail.authSetting['scope.writePhotosAlbum']) {
        options.saveImage();
      }
    }, this.drawImageFn = canCreateDiscussions => {
      var me = this;
      /** @type {string} */
      var src = 'https://static.shengri.cn/uploads/PMSelfService/manager/moments/miniProgram/tarot/screenshots0815/' + canCreateDiscussions + '.png';
      var value = me.data.chooseTarotData;
      me.downloadImg(src, function (coloredImage) {
        var context = Taro.createCanvasContext('shareCanvas');
        context.drawImage(coloredImage, 0, 0, 750, 1327.5);
        setTimeout(function () {
          context.setFillStyle('#FBD858');
          context.setFontSize(20);
          context.fillText('农历' + value.lunar_date, 62, 174);
          context.stroke();
          context.setTextAlign('center');
          context.setFillStyle('#FBD858');
          context.setFontSize(44);
          context.fillText(value.day, 654, 168);
          context.stroke();
          context.setFillStyle('#FBD858');
          context.setFontSize(24);
          context.fillText(value.month, 577, 140);
          context.stroke();
          context.setFillStyle('#FBD858');
          context.setFontSize(24);
          context.fillText(value.year, 577, 176);
          context.stroke();
          context.draw(true, function () {
            Taro.canvasToTempFilePath({
              canvasId: 'shareCanvas',
              success: function (resp) {
                console.log('保存生成的图片');
                console.log(resp.tempFilePath);
                me.setData({
                  shareImg: resp.tempFilePath
                });
              },
              fail: function (er) {
                console.log(er);
              },
              complete: function () {}
            });
          });
        }, 300);
      });
    }, this.saveImage = () => {
      var $ = this;
      $.setData({
        shareFlag: false
      });
      if (u) {
        /** @type {boolean} */
        u = false;
        Taro.saveImageToPhotosAlbum({
          filePath: $.data.shareImg,
          success: function (backdata) {
            /** @type {boolean} */
            u = true;
            Taro.showModal({
              title: '图片已保存至相册',
              content: '由于系统限制，需要您手动分享至朋友圈',
              showCancel: false,
              success: function (backdata) {}
            });
          },
          fail: function () {
            /** @type {boolean} */
            u = true;
            Taro.getSetting({
              success: function (backdata) {
                if (backdata.authSetting['scope.writePhotosAlbum']) {
                  if (ret < 3) {
                    Taro.showModal({
                      title: '保存失败',
                      content: '由于未知原因，保存图片失败，重试一次也许可以解决问题。',
                      cancelText: '下次再说',
                      confirmText: '重试一次',
                      success: function (dt) {
                        if (dt.confirm) {
                          console.log('用户点击确定');
                          $.saveImage();
                        } else {
                          if (dt.cancel) {
                            console.log('用户点击取消');
                          }
                        }
                      }
                    });
                  } else {
                    Taro.showModal({
                      title: '还是不行鸭🐥',
                      content: '很抱歉，看来这很可能是个重试也解决不了的问题。',
                      cancelText: '下次再说',
                      confirmText: '重试一次',
                      success: function (dt) {
                        if (dt.confirm) {
                          console.log('用户点击确定');
                          $.saveImage();
                        } else {
                          if (dt.cancel) {
                            console.log('用户点击取消');
                          }
                        }
                      }
                    });
                  }
                  ret = ret + 1;
                } else {
                  $.setData({
                    authFlag: true
                  });
                }
              }
            });
          }
        });
      }
    }, this.downloadImg = (source, resolve) => {
      Taro.downloadFile({
        url: source,
        success: function (res) {
          var tempFilePath = res.tempFilePath;
          resolve(tempFilePath);
        },
        fail: function () {
          Taro.showToast({
            title: '生成失败',
            icon: 'loading',
            duration: 1500
          });
        }
      });
    }, this.goIndex = () => {
      Taro.switchTab({
        url: '../index/index'
      });
    }, _temp;
  }

  componentWillMount(hashComponent) {}

  componentDidShow() {
    var tools = this;
    var _this = this;
    if (e = true, Taro.getSystemInfo({
      success: function (res) {
        tools.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        });
      }
    }), _this.setData({
      explainAnim: '',
      showEntranceAnimBox: false,
      entranceArr: [{
        anim: ''
      }, {
        anim: ''
      }, {
        anim: ''
      }, {
        anim: ''
      }, {
        anim: ''
      }],
      instructionsAnim: '',
      showShuffleTheDeckBtn: false,
      showShuffleDeckBox: false,
      showRisingAnimBox: false,
      showCutBox: false,
      showCutAnimBox: false,
      showMoveBox: false,
      showOperatingArea: false,
      tarotData: [{
        trans: ''
      }, {
        trans: ''
      }, {
        trans: ''
      }, {
        trans: ''
      }, {
        trans: ''
      }, {
        trans: ''
      }, {
        trans: ''
      }, {
        trans: ''
      }, {
        trans: ''
      }, {
        trans: ''
      }, {
        trans: ''
      }, {
        trans: ''
      }, {
        trans: ''
      }, {
        trans: ''
      }, {
        trans: ''
      }, {
        trans: ''
      }, {
        trans: ''
      }, {
        trans: ''
      }, {
        trans: ''
      }, {
        trans: ''
      }, {
        trans: ''
      }, {
        trans: ''
      }],
      chooseTarotImg: '',
      hiddenAnim: '',
      showChooseTarot: false,
      clickIndex: -1,
      showInterpretationBtn: false
    }), app.isLogin()) {
      Taro.getStorageSync('userInfo');
      Taro.getStorageSync('wxInfo');
      /** @type {string} */
      var url = res.baseUrl + 'brapi/tarot/sign';
      res.fetchGet(url).then(function (testsStatus) {
        if (testsStatus.status) {
          /** @type {boolean} */
          u = true;
          /** @type {number} */
          ret = 0;
          _this.fetchDetailData();
          _this.shareData();
        } else {
          _this.setData({
            pageShow: true
          });
          Taro.setNavigationBarColor({
            frontColor: '#ffffff',
            backgroundColor: '#1f244c'
          });
          /** @type {number} */
          _takingTooLongTimeout = setTimeout(function () {
            _this.actionFn();
          }, 3e3);
        }
      });
      /** @type {number} */
      paintNodesTimeout = setTimeout(function () {
        _this.setData({
          showEntranceAnimBox: true
        });
      }, 200);
    } else {
      if (app.getAllow()) {
        Taro.navigateTo({
          url: '../login/login'
        });
      } else {
        Taro.navigateTo({
          url: '../authorization/authorization'
        });
      }
    }
  }

  componentDidHide() {
    clearTimeout(undefined);
    clearTimeout(_takingTooLongTimeout);
    clearTimeout(paintNodesTimeout);
    clearTimeout(appendTrackTimer);
    clearTimeout(endCallTimeout);
    clearTimeout(_input_filter_changed);
    clearTimeout(input_filter_changed);
    clearTimeout(_nTimeoutID);
    clearTimeout(_frameTimeout);
    console.log(111111111);
  }

  componentWillUnmount() {
    clearTimeout(undefined);
    clearTimeout(_takingTooLongTimeout);
    clearTimeout(paintNodesTimeout);
    clearTimeout(appendTrackTimer);
    clearTimeout(endCallTimeout);
    clearTimeout(_input_filter_changed);
    clearTimeout(input_filter_changed);
    clearTimeout(_nTimeoutID);
    clearTimeout(_frameTimeout);
    console.log(222222222);
  }

  render() {
    const {
      windowWidth: windowWidth,
      windowHeight: windowHeight,
      pageShow: pageShow,
      explainAnim: explainAnim,
      showEntranceAnimBox: showEntranceAnimBox,
      entranceArr: entranceArr,
      instructionsAnim: instructionsAnim,
      showShuffleTheDeckBtn: showShuffleTheDeckBtn,
      showShuffleDeckBox: showShuffleDeckBox,
      showRisingAnimBox: showRisingAnimBox,
      showCutBox: showCutBox,
      showCutAnimBox: showCutAnimBox,
      showMoveBox: showMoveBox,
      hiddenAnim: hiddenAnim,
      showOperatingArea: showOperatingArea,
      clickIndex: clickIndex,
      tarotData: tarotData,
      showChooseTarot: showChooseTarot,
      chooseTarotData: chooseTarotData,
      showInterpretationBtn: showInterpretationBtn,
      showDetailPage: showDetailPage,
      shareFlag: shareFlag,
      showTimeLine: showTimeLine,
      authFlag: authFlag,
      guideFlag: guideFlag,
      animation: animation
    } = this.state;
    return <Block>
        {pageShow && <View style={[_styleSheet["page"], 'width: ' + (windowWidth + 1) + 'px; height: ' + windowHeight + 'px']}>
            <Image mode="widthFix" src="https://static.shengri.cn/uploads/tarotSignIn/Title@2x.png" style={_styleSheet["headerImg"]} />
            {showEntranceAnimBox && <View style={_getStyle('explain ' + explainAnim)}>
                <View style={_styleSheet["content"]}>
                  <Text>我们的生活和塔罗牌图案之间的关联</Text>
                  <Text>并不是字面意义的魔法，</Text>
                  <Text>而是因为它们之间相同的意义。</Text>
                  <View>/</View>
                  <Text>当我们在人生不同阶段经历时，</Text>
                  <Text>会有相应的塔罗牌来描述这些体验，</Text>
                  <Text>那一张牌会在我们内心经历这类原型事件时，</Text>
                  <Text>在摊开牌的那一刻，神秘的，</Text>
                  <Text>似乎毫无理由的出现。</Text>
                </View>
              </View>}
            {showEntranceAnimBox && <View style={_styleSheet["entranceAnimBox"]}>
                <View style={_styleSheet["entranceAnimCon"]}>
                  {entranceArr.map((item, index) => {
              return <Image onClick={this.actionFn} mode="widthFix" src="https://static.shengri.cn/uploads/QA_mp/ic_arrow_Card@3x.png" style={_getStyle('entranceImg entranceImg' + index + ' ' + item.anim)} />;
            })}
                  <View style={_getStyle('instructionsBox ' + instructionsAnim)}>
                    <View style={_styleSheet["icoBox"]}>
                      <Image mode="widthFix" src="https://static.shengri.cn/uploads/QA_mp/ic_fangxing_left@2x.png" />
                    </View>
                    <View style={_styleSheet["center"]}>
                      {!instructionsAnim && <Text>求塔罗日签，抽取今日专属塔罗，</Text>}
                      {!instructionsAnim && <Text>预测今日运势，收获今日提点！</Text>}
                      {instructionsAnim && <Text>摒除杂念，用心倾听</Text>}
                      {instructionsAnim && <Text>准备好后，点击“洗牌”开始</Text>}
                    </View>
                    <View style={_styleSheet["icoBox"]}>
                      <Image mode="widthFix" src="https://static.shengri.cn/uploads/QA_mp/ic_fangxing_left@2x.png" style={{ float: 'right' }} />
                    </View>
                  </View>
                  {showShuffleTheDeckBtn && <View style={_styleSheet["shuffleTheDeckBtnBox"]}>
                      <View onClick={this.shuffleDeckFn} style={_styleSheet["shuffleTheDeckBtn"]}>
                        洗牌
                      </View>
                    </View>}
                </View>
              </View>}
            {showShuffleDeckBox && <View style={_styleSheet["startInterface"]}>
                <View style={_styleSheet["shuffleDeckBox"]}>
                  {10 .map((item, index) => {
              return <View style={[_styleSheet["shuffleDeckItem"], 'animation-delay: ' + index * 0.6 + 's;']}>
                        <Image mode="widthFix" src="https://static.shengri.cn/uploads/QA_mp/ic_arrow_Card@3x.png" style={'animation-iteration-count: ' + (index + 10)} />
                      </View>;
            })}
                </View>
              </View>}
            {showRisingAnimBox && <View style={_styleSheet["startInterface"]}>
                <View style={_styleSheet["risingAnimBox"]}>
                  {5 .map((item, index) => {
              return <Image mode="widthFix" src="https://static.shengri.cn/uploads/QA_mp/ic_arrow_Card@3x.png" style={[_getStyle('risingAnim' + index), 'top: ' + (300 + index * 5) + 'rpx; left: ' + (290 + index * 5) + 'rpx; z-index: ' + (20 - index) + ';']} />;
            })}
                </View>
              </View>}
            {showCutBox && <View style={_styleSheet["startInterface"]}>
                <View style={_styleSheet["cutBox"]}>
                  {5 .map((item, index) => {
              return <Image mode="widthFix" src="https://static.shengri.cn/uploads/QA_mp/ic_arrow_Card@3x.png" style={'top: ' + (40 + index * 5) + 'rpx; left: ' + (290 + index * 5) + 'rpx; z-index: ' + (20 - index) + ';'} />;
            })}
                </View>
                <View style={_styleSheet["instructionsBox"]}>
                  <View style={_styleSheet["icoBox"]}>
                    <Image mode="widthFix" src="https://static.shengri.cn/uploads/QA_mp/ic_fangxing_left@2x.png" />
                  </View>
                  <View style={_styleSheet["center"]}>
                    <Text>现在准备切牌</Text>
                    <Text>集中精神，你的思想会决定切牌结果</Text>
                  </View>
                  <View style={_styleSheet["icoBox"]}>
                    <Image mode="widthFix" src="https://static.shengri.cn/uploads/QA_mp/ic_fangxing_left@2x.png" style={{ float: right }} />
                  </View>
                </View>
                <View style={_styleSheet["shuffleTheDeckBtnBox"]}>
                  <View onClick={this.cutFn} style={_styleSheet["shuffleTheDeckBtn"]}>
                    切牌
                  </View>
                </View>
              </View>}
            {showCutAnimBox && <View style={_styleSheet["startInterface"]}>
                <View style={_styleSheet["cutAnimBox"]}>
                  {3 .map((item, index) => {
              return <Image mode="widthFix" src="https://static.shengri.cn/uploads/tarotSignIn/Card.png" style={_getStyle('cutAnim' + index)} />;
            })}
                </View>
                <View style={_styleSheet["cutAnimText"]}>正在切牌...</View>
              </View>}
            {showMoveBox && <View style={_styleSheet["startInterface"]}>
                <View style={_styleSheet["moveBox"]}>
                  <Image mode="widthFix" src="https://static.shengri.cn/uploads/tarotSignIn/Card.png" />
                </View>
              </View>}
            {showOperatingArea && <View style={_getStyle('startInterface ' + hiddenAnim)}>
                <View style={_styleSheet["operatingArea"]}>
                  <Form onUbmit={this.submitFormid1} reportSubmit="true">
                    <Button formType="submit" style={_styleSheet["openFormid1"]}>
                      {tarotData.map((item, index) => {
                  return <View style={[_getStyle('itemBox itemBoxLocation' + index + ' ' + (clickIndex == index ? '' : 'itemBoxAnim')), 'animation-delay: ' + (clickIndex == index ? 0 : (index + 1) * 0.03) + 's;z-index: ' + (300 - index)]}>
                            <Image onClick={this.choose} data-index={index} mode="widthFix" src="https://static.shengri.cn/uploads/QA_mp/ic_arrow_Card@3x.png" style={_getStyle('itemImg ' + item.trans)} />
                          </View>;
                })}
                    </Button>
                  </Form>
                  <View style={[_styleSheet["readyFont"], _styleSheet["clearfix"]]}>
                    <View style={_styleSheet["icoBox"]}>
                      <Image mode="widthFix" src="https://static.shengri.cn/uploads/QA_mp/ic_fangxing_left@2x.png" />
                    </View>
                    <View style={_styleSheet["center"]}>
                      <Text>准备选牌</Text>
                    </View>
                    <View style={[_styleSheet["icoBox"], { justifyContent: 'flex-start' }]}>
                      <Image mode="widthFix" src="https://static.shengri.cn/uploads/QA_mp/ic_fangxing_right@2x.png" />
                    </View>
                  </View>
                  <View style={_styleSheet["readyFont1"]}>
                    <Text>跟随你的内心，用第一直觉选定一张牌，</Text>
                    <Text>中途不要更改或临时改变主意。</Text>
                  </View>
                </View>
              </View>}
            {showChooseTarot && <View style={_styleSheet["startInterface"]}>
                <View style={_styleSheet["chooseTarotBox"]}>
                  <Image mode="widthFix" src={chooseTarotData.image} style={_styleSheet["tarot"]} />
                  {showInterpretationBtn && <View style={[_styleSheet["instructionsBox"], _styleSheet["showAnim"]]}>
                      <View style={_styleSheet["icoBox"]}>
                        <Image mode="widthFix" src="https://static.shengri.cn/uploads/QA_mp/ic_fangxing_left@2x.png" />
                      </View>
                      <View style={_styleSheet["center"]}>
                        {chooseTarotData.position == 1 ? <Text>{chooseTarotData.name + ' / 正位'}</Text> : <Text>{chooseTarotData.name + ' / 逆位'}</Text>}
                      </View>
                      <View style={_styleSheet["icoBox"]}>
                        <Image mode="widthFix" src="https://static.shengri.cn/uploads/QA_mp/ic_fangxing_left@2x.png" style={{ float: left }} />
                      </View>
                    </View>}
                  {showInterpretationBtn && <View style={[_styleSheet["interpretationBtnBox"], _styleSheet["showAnim"]]}>
                      <View style={_styleSheet["interpretationBtn"]}>解读</View>
                    </View>}
                  <Form onUbmit={this.submitFormid2} reportSubmit="true">
                    <Button formType="submit" style={_styleSheet["openFormid2"]} />
                  </Form>
                </View>
              </View>}
          </View>}
        {showDetailPage && <View style={[_styleSheet["detailPage"], 'width: ' + (windowWidth + 1) + 'px; height: ' + windowHeight + 'px']}>
            <View style={[_styleSheet["pageCont"], 'margin-top: ' + (windowHeight > 555 ? '30px' : '')]}>
              <View style={_styleSheet["header"]}>
                <View style={_styleSheet["top"]}>
                  <View style={_styleSheet["left"]}>
                    <Image mode="widthFix" src="https://static.shengri.cn/uploads/tarotSignIn/Tarot Your Day@2x@3x.png" />
                    <View style={_styleSheet["date"]}>
                      {'农历' + chooseTarotData.lunar_date}
                    </View>
                  </View>
                  <View style={_styleSheet["center"]}>
                    <Image mode="widthFix" src="https://static.shengri.cn/uploads/tarotSignIn/taluoriqianfont3x.png" />
                  </View>
                  <View style={_styleSheet["right"]}>
                    <View style={_styleSheet["day"]}>{chooseTarotData.day}</View>
                    <View style={_styleSheet["yearsMonths"]}>
                      <View style={_styleSheet["months"]}>{chooseTarotData.month}</View>
                      <View style={_styleSheet["years"]}>{chooseTarotData.year}</View>
                    </View>
                  </View>
                </View>
                <View style={_styleSheet["bottom"]}>
                  <View style={_styleSheet["font"]}>
                    {chooseTarotData.name + ' /'}
                    {chooseTarotData.position == 1 ? <Text>正位</Text> : <Text>逆位</Text>}
                  </View>
                </View>
              </View>
              <View style={_styleSheet["tarotContent"]}>
                <View style={_styleSheet["left"]}>
                  <View style={_styleSheet["top"]}>
                    <View style={[_styleSheet["suitable"], _styleSheet["clearfix"]]}>
                      <View style={_styleSheet["suitableFont"]}>
                        {chooseTarotData.good}
                      </View>
                      <Image mode="widthFix" src="https://static.shengri.cn/uploads/tarotSignIn/shiyi@3x.png" />
                    </View>
                    <View style={[_styleSheet["avoid"], _styleSheet["clearfix"]]}>
                      <Image mode="widthFix" src="https://static.shengri.cn/uploads/tarotSignIn/jinji@3x.png" />
                      <View style={_styleSheet["avoidFont"]}>{chooseTarotData.bad}</View>
                    </View>
                  </View>
                  <View style={_styleSheet["bottom"]}>
                    <View style={_styleSheet["title"]}>
                      <View style={_styleSheet["font1"]}>{chooseTarotData.name}</View>
                      <View style={_styleSheet["font2"]}>
                        {chooseTarotData.position == 1 ? <Text>正位</Text> : <Text>逆位</Text>}
                      </View>
                    </View>
                    <View style={[_styleSheet["sign"], _styleSheet["ellipsislines"]]}>
                      {chooseTarotData.sign}
                    </View>
                  </View>
                </View>
                <View style={_styleSheet["right"]}>
                  <Image mode="widthFix" src={chooseTarotData.image} />
                </View>
              </View>
              <View style={_styleSheet["suggested"]}>
                <View style={_styleSheet["icoBox"]}>
                  <View style={_styleSheet["font"]}>暗语</View>
                  <Image mode="widthFix" src="https://static.shengri.cn/uploads/tarotSignIn/anyuico@3x.png" />
                </View>
                <View style={_styleSheet["argot"]}>{chooseTarotData.argot}</View>
              </View>
              <View style={[_styleSheet["shareBtn"], _styleSheet["clearfix"]]}>
                <View style={[_styleSheet["item"], { float: 'left' }]}>
                  <View onClick={this.goIndex} style={[_styleSheet["btn"], _styleSheet["leftBth"]]}>
                    求专业解答
                  </View>
                  <View style={_styleSheet["explain"]}>占卜师为您在线解答</View>
                </View>
                <View style={[_styleSheet["item"], { float: 'right', marginRight: '4rpx' }]}>
                  <View onClick={this.shareFn} style={[_styleSheet["btn"], _styleSheet["rightBtn"]]}>
                    分享我的今日签
                  </View>
                  <View style={_styleSheet["explain"]}>据说比转发锦鲤还有效哦~</View>
                </View>
              </View>
            </View>
            {shareFlag && <View onClick={this.shareFn} style={_styleSheet["mask"]}>
                <View style={[_styleSheet["maskCont"], 'height:' + windowHeight + 'px']}>
                  <View style={_styleSheet["shareBox"]}>
                    <View style={_styleSheet["sharePersonBtn"]}>
                      <Button onClick={this.shareFn} openType="share" />
                    </View>
                    {showTimeLine && <View onClick={this.saveImage} data-tarotid={chooseTarotData.tarotId}>
                        <Image src="https://static.shengri.cn/uploads/xydd/web/xyhk/share-group.png?imageslim" style={{ height: '112rpx', width: '112rpx' }} />
                      </View>}
                  </View>
                  <View onClick={this.shareFn} style={_styleSheet["cancelshare"]}>
                    取消
                  </View>
                </View>
              </View>}
            {authFlag && <View onClick={this.authFn} style={_styleSheet["mask"]}>
                <View onClick={this.noclose} style={_styleSheet["authCont"]}>
                  <View style={_styleSheet["title"]}>需要授权</View>
                  <View style={_styleSheet["info"]}>
                    由于系统限制，需要先把截图保存到相册，才能分享到朋友圈。
                  </View>
                  <View style={_styleSheet["bthBox"]}>
                    <View onClick={this.authFn} style={_styleSheet["left"]}>
                      下次再说
                    </View>
                    <View style={_styleSheet["right"]}>
                      <Button onOpenSetting={this.showAuthListFn} openType="openSetting" type="default" />
                      允许保存
                    </View>
                  </View>
                </View>
              </View>}
            {guideFlag && <View onClick={this.guideFn} style={_styleSheet["mask"]}>
                <View style={_getStyle('promptBg ' + animation)}>
                  一键添加，获每日塔罗指引
                </View>
              </View>}
            <Canvas canvasId="shareCanvas" style={[_styleSheet["canvas"], "width:750px;height:1320px; top: " + (windowHeight + 10) + 'px']} />
          </View>}
      </Block>;
  }
}, _class2.config = {
  navigationBarTitleText: '塔罗日签',
  navigationBarTextStyle: 'black',
  navigationBarBackgroundColor: '#FFF',
  enablePullDownRefresh: false
}, _temp2)) || _class);

export default _C;