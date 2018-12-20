var _dec, _class, _class2, _temp2;

import Taro from '@tarojs/taro-rn';
import { Block, View, Text, Button } from "@tarojs/components-rn";
import React from 'react';

import withWeapp from '@tarojs/with-weapp';
import DownloadPromptTmpl from '../../imports/DownloadPromptTmpl.js';
import indexStyleSheet from "./index_styles";
var _styleSheet = indexStyleSheet;
var $ = require('./../../utils/api.js');

var app = Taro.getApp();

var s = undefined;

let _C = (_dec = withWeapp('Page'), _dec(_class = (_temp2 = _class2 = class _C extends React.Component {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.state = {
      windowWidth: 0,
      windowHeight: 0,
      showDownloadPrompt: false,
      showDownloadTimeout: false,
      showInvitationMask: false,
      downloadPromptText: '下载生日管家可解锁第二个答案',
      showPage: false,
      showIco: false,
      showEvaluationBox: false,
      postId: 0,
      dataQA: {},
      commentsData: [],
      currentAudio: 999,
      userUid: 0,
      helpFriendsData: {}
    }, this.onShareAppMessage = canCreateDiscussions => {
      var hook = this;
      var button = hook.data.helpFriendsData.share;
      return {
        title: button.title,
        path: 'pages/index/index?assisPostId=' + hook.data.postId,
        imageUrl: button.img
      };
    }, this.noclose = () => {}, this.fetchData = keyword => {
      var mockDndService = this;
      Taro.showToast({
        title: '加载中...',
        icon: 'loading',
        duration: 1e4
      });
      $.fetchGet($.baseUrl + 'ask/postsInfo/' + keyword).then(function (simpleselect) {
        Taro.hideToast();
        /** @type {boolean} */var a = false;
        if (simpleselect.data.show_cover) {
          /** @type {boolean} */
          a = true;
        }
        mockDndService.setData({
          showInvitationMask: a,
          dataQA: simpleselect.data,
          showPage: true
        });
      });
    }, this.commentData = shiftId => {
      var mockDndService = this;
      $.fetchGet($.baseUrl + 'ask/' + shiftId + '/comments', {
        owner: 0,
        sort: 'asc'
      }).then(function (data) {
        var messageArray = data.items;
        /** @type {boolean} */var e = false;
        var model = Taro.getStorageSync('commentIndex');
        messageArray.forEach(function (_, a) {
          /** @type {boolean} */
          _.isPlay = false;
        });
        if (model.has) {
          if (!data.items[model.index].is_marked) {
            /** @type {boolean} */
            e = true;
          }
        }
        mockDndService.setData({
          showEvaluationBox: e,
          commentsData: messageArray
        });
      });
    }, this.helpFriendsDataFn = ObjectId => {
      var mockDndService = this;
      $.fetchGet($.baseUrl + 'ask/assistance/lists', {
        post_id: ObjectId
      }).then(function (canCreateDiscussions) {
        mockDndService.setData({
          helpFriendsData: canCreateDiscussions
        });
      });
    }, this.playAudio = event => {
      var that = this;
      var undefined = event.currentTarget.dataset.operate;
      if (that.checkLoginStatus()) {
        if ('show_cover' == undefined) {
          var id = event.detail.formId;
          var openid = app.globalData.wxInfo.openId;
          return console.log(id), $.fetchPost($.baseUrl + 'wechat/saveformdata', {
            open_id: openid,
            form_id: id,
            context: {
              type: 1
            },
            noTip: true
          }).then(function (canCreateDiscussions) {}), undefined;
        }
        if ('download' == undefined) {
          return that.statisticalSecondSound(), undefined;
        }
        if ('timeout' == undefined) {
          return undefined;
        }
        var SCRIPT_URL = undefined;
        var tindex = event.currentTarget.dataset.index;
        var u = that.data.userUid;
        var types = that.data.commentsData;
        var h = event.currentTarget.dataset.commentid;
        if (!event.currentTarget.dataset.islisten) {
          return undefined;
        }
        if (tindex == that.data.currentAudio) {
          if (types[tindex].isPlay) {
            s.pause();
            /** @type {string} */types[tindex].currentText = '已暂停';
            /** @type {boolean} */types[tindex].isPlay = false;
            that.setData({
              commentsData: types
            });
          } else {
            s.play();
            /** @type {string} */types[tindex].currentText = '正在播放';
            /** @type {boolean} */types[tindex].isPlay = true;
            that.setData({
              commentsData: types
            });
          }
        } else {
          types.forEach(function (canCreateDiscussions, typeCode) {
            /** @type {boolean} */
            types[typeCode].isPlay = false;
            /** @type {(null|string)} */types[typeCode].currentText = typeCode == tindex ? '正在缓存' : null;
          });
          that.setData({
            commentsData: types
          });
          s.stop();
          $.fetchGet($.baseUrl + 'forum/posts/' + h + '/audio', {
            noTip: true
          }).then(function (res) {
            SCRIPT_URL = res.date.resource_url;
            s.src = SCRIPT_URL;
            /** @type {boolean} */s.obeyMuteSwitch = false;
            /** @type {boolean} */s.autoplay = true;
            s.onPlay(function () {
              /** @type {string} */
              types[tindex].currentText = '正在播放';
              /** @type {boolean} */types[tindex].isPlay = true;
              that.setData({
                commentsData: types
              });
            });
            s.onEnded(function () {
              /** @type {null} */
              types[tindex].currentText = null;
              /** @type {boolean} */types[tindex].isPlay = false;
              that.setData({
                commentsData: types
              });
              if (!(u != types[tindex].reply_to_uid || types[tindex].is_marked)) {
                Taro.setStorageSync('commentsData', types[tindex]);
                Taro.setStorageSync('postId', that.data.postId);
                Taro.setStorageSync('commentIndex', {
                  has: true,
                  index: tindex
                });
                Taro.navigateTo({
                  url: '../evaluate/index'
                });
              }
            });
          });
        }
        that.setData({
          currentAudio: tindex
        });
      }
    }, this.submitEvaluate = () => {
      var cache = this;
      var i = Taro.getStorageSync('commentIndex').index;
      var comment_id = cache.data.commentsData[i].comment_id;
      Taro.showToast({
        title: '提交中...',
        icon: 'loading',
        duration: 1e4
      });
      $.fetchPost($.baseUrl + 'ask/marking/' + comment_id, {
        star: 4
      }).then(function (canCreateDiscussions) {
        Taro.hideToast();
        cache.setData({
          showEvaluationBox: false
        });
        Taro.removeStorageSync('postId');
        Taro.removeStorageSync('commentIndex');
        Taro.removeStorageSync('commentsData');
        cache.commentData(cache.data.postId);
      });
    }, this.goEvaluate = () => {
      Taro.navigateTo({
        url: '../evaluate/index'
      });
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
    }, this.promptDownload = () => {
      this.setData({
        showDownloadPrompt: true
      });
    }, this.cancel = () => {
      this.setData({
        showDownloadPrompt: false,
        showDownloadTimeout: false
      });
    }, this.statisticalClickDown = () => {
      console.log('------');
    }, this.statisticalSecondSound = () => {
      console.log('*******');
    }, this.inviteFriendFn = event => {
      var id = event.detail.formId;
      var openid = app.globalData.wxInfo.openId;
      console.log(id);
      $.fetchPost($.baseUrl + 'wechat/saveformdata', {
        open_id: openid,
        form_id: id,
        context: {
          type: 1
        },
        noTip: true
      }).then(function (canCreateDiscussions) {});
    }, this.jumpIndedx = () => {
      Taro.switchTab({
        url: '../index/index'
      });
    }, _temp;
  }

  componentWillMount(data) {
    this.setData({
      postId: data.postId
    });
    if (app.isLogin()) {
      this.fetchData(data.postId);
      this.commentData(data.postId);
      this.helpFriendsDataFn(data.postId);
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

  componentDidShow(callback) {
    var $scope = this;
    s = Taro.createInnerAudioContext();
    Taro.getSystemInfo({
      success: function (res) {
        $scope.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        });
      }
    });
    if (1 == Taro.getCurrentPages().length) {
      this.setData({
        showIco: true
      });
    }
    if (Taro.getStorageSync('postId')) {
      $scope.fetchData(Taro.getStorageSync('postId'));
      $scope.commentData(Taro.getStorageSync('postId'));
    }
    if (app.globalData.userInfo && app.globalData.userInfo.uid) {
      $scope.setData({
        userUid: app.globalData.userInfo.uid,
        currentAudio: 999
      });
    }
  }

  componentWillUnmount() {
    s.stop();
    s.destroy();
    Taro.removeStorageSync('postId');
    Taro.removeStorageSync('commentIndex');
    Taro.removeStorageSync('commentsData');
  }

  render() {
    const {
      showPage: showPage,
      dataQA: dataQA,
      commentsData: commentsData,
      windowWidth: windowWidth,
      windowHeight: windowHeight,
      showEvaluationBox: showEvaluationBox,
      showInvitationMask: showInvitationMask,
      helpFriendsData: helpFriendsData,
      showDownloadPrompt: showDownloadPrompt,
      showDownloadTimeout: showDownloadTimeout
    } = this.state;
    return <Block>
        {showPage && <View style={_styleSheet["page"]}>
            <View style={_styleSheet["pageCont"]}>
              <View style={_styleSheet["header"]}>
                <View style={_styleSheet["left"]}>
                  <Image mode="widthFix" src={dataQA.icon} />
                  <Text style={{ fontSize: '28rpx', color: '#DFDFDF', margin: '0 10rpx' }}>
                    /
                  </Text>
                  <Text>{dataQA.created_at_hm}</Text>
                </View>
                <View style={_styleSheet["right"]}>
                  <Text>
                    赏¥
                    <Text style={{ fontSize: '38rpx', marginRight: '20rpx' }}>
                      {dataQA.price / 100}
                    </Text>
                  </Text>
                  <Text style={{ fontSize: '24rpx' }}>
                    {'余¥' + dataQA.balance / 100}
                  </Text>
                </View>
              </View>
              <View style={_styleSheet["contMsg"]}>{dataQA.content}</View>
              <View style={_styleSheet["qSource"]}>
                <View style={_styleSheet["diceIco"]}>
                  {dataQA.images.map((item, index) => {
                return <Image mode="widthFix" src={item.url} />;
              })}
                </View>
                <View style={_styleSheet["from"]}>{'—  ' + dataQA.from + '  —'}</View>
              </View>
            </View>
            <View style={{ marginTop: '24rpx', width: '100%', height: '8rpx', background: '#F9F9F9' }} />
            {commentsData.length > 0 ? <View style={_styleSheet["pageCont"]}>
                {commentsData.map((item, index) => {
            return <View style={[_styleSheet["commentItem"], _styleSheet["clearfix"]]}>
                      <View style={_styleSheet["left"]}>
                        <View style={[_styleSheet["avatar"], 'background-image: url(' + item.owner.avatar + ');']}>
                          <View style={_styleSheet["font"]}>v</View>
                        </View>
                      </View>
                      <View style={_styleSheet["center"]}>
                        <View style={_styleSheet["name"]}>
                          <View style={[_styleSheet["ellipsis"], { fontSize: '28rpx', color: '#333333', maxWidth: '168rpx' }]}>
                            {item.owner.nickname}
                          </View>
                          <Text style={{ margin: '0 6rpx  0 20rpx' }}>
                            {item.owner.cert_name + ' /'}
                          </Text>
                          {item.marking.star.map((item, index) => {
                    return <Image mode="widthFix" src="https://static.shengri.cn/uploads/QA_mp/detail_star@3x.png" style={{ marginLeft: '8rpx' }} />;
                  })}
                        </View>
                        <View style={_styleSheet["time"]}>{item.created_at_hm}</View>
                        <Form onUbmit={this.playAudio} data-commentid={item.comment_id} data-index={index} data-islisten={item.audio.is_listen} data-operate={item.operate} reportSubmit="true">
                          <View style={_styleSheet["audio"]}>
                            <Button formType="submit" style={_styleSheet["openFormid"]} />
                            {item.isPlay ? <Image mode="widthFix" src="https://static.shengri.cn/uploads/QA_mp/audioAnim@3x.gif" style={_styleSheet["ico"]} /> : <Image mode="widthFix" src="https://static.shengri.cn/uploads/QA_mp/detail_yuyinic@3x.png" style={_styleSheet["ico"]} />}
                            {item.currentText ? <Text>{item.currentText}</Text> : <Text>{item.audio.audio_mins + 's'}</Text>}
                            {(!item.audio.is_listen || item.operate == 'download') && <Image mode="widthFix" src="https://static.shengri.cn/uploads/QA_mp/detail_suozi@3x.png" style={_styleSheet["lock"]} />}
                            {item.owner.can_chat && <Image onClick={this.promptDownload} mode="widthFix" src="https://static.shengri.cn/uploads/QA_mp/callBtn.png" style={_styleSheet["callBtn"]} />}
                          </View>
                        </Form>
                        {item.mark.length > 0 && <View style={_styleSheet["lableBox"]}>
                            <Text style={{ opacity: '0.6' }}>提问者评价：</Text>
                            {item.mark.map((lable, index) => {
                    return <Text style={{ fontSize: '24rpx', color: '#001B1B', marginLeft: '12rpx' }}>
                                  {'#' + lable}
                                </Text>;
                  })}
                          </View>}
                      </View>
                      {item.price == 0 ? <View style={_styleSheet["right"]}>免费</View> : <View style={_styleSheet["right"]}>
                          {'得￥' + item.price / 100}
                        </View>}
                    </View>;
          })}
              </View> : <View style={_styleSheet["pageCont"]}>
                <View style={_styleSheet["nothing"]}>
                  <Image mode="widthFix" src="https://static.shengri.cn/uploads/QA_mp/detail_Artwork@3x.png" />
                  <View>达人正在解答哦......</View>
                </View>
              </View>}
            {showEvaluationBox && <View style={[_styleSheet["evaluationBg"], 'width: ' + windowWidth + 'px; height: ' + windowHeight + 'px']}>
                <View style={_styleSheet["evaluationBox"]}>
                  <View style={_styleSheet["title"]}>默认好评哦！</View>
                  <View style={_styleSheet["scoreBox"]}>
                    {5 .map((item, index) => {
                return <Image mode="widthFix" src={index != 4 ? 'https://static.shengri.cn/uploads/QA_mp/shoucang@3x.png' : 'https://static.shengri.cn/uploads/QA_mp/rating_star_gray@3x.png'} style={_styleSheet["ico"]} />;
              })}
                  </View>
                  <View style={_styleSheet["bottomBtn"]}>
                    <View onClick={this.submitEvaluate} style={_styleSheet["determine"]}>
                      确定
                    </View>
                    <View onClick={this.goEvaluate} style={_styleSheet["toEvaluate"]}>
                      去评价
                    </View>
                  </View>
                </View>
              </View>}
            {showInvitationMask && <View onClick={this.noclose} style={_styleSheet["invitationMask"]}>
                <View style={_styleSheet["invitation"]}>
                  <View style={_styleSheet["title"]}>
                    - 再邀请
                    <Text>
                      {helpFriendsData.total_num - helpFriendsData.num}
                    </Text>
                    位好友即可解锁答案 -
                  </View>
                  <View style={_styleSheet["helpFriend"]}>
                    {helpFriendsData.total_num.map((item, index) => {
                return <View style={[_styleSheet["item"], 'margin-right: ' + (helpFriendsData.total_num == 2 ? '160' : helpFriendsData.total_num > 3 ? '15' : '30') + 'rpx;']}>
                          <Image mode="widthFix" src={helpFriendsData.itmes[index].avatar ? helpFriendsData.itmes[index].avatar : 'https://static.shengri.cn/uploads/QA_mp/detailWaiting.png'} />
                          <View style={[_styleSheet["name"], _styleSheet["ellipsis"]]}>
                            {helpFriendsData.itmes[index].nickname ? helpFriendsData.itmes[index].nickname : '待邀请'}
                          </View>
                        </View>;
              })}
                  </View>
                  <Form onUbmit={this.inviteFriendFn} reportSubmit="true">
                    <View style={_styleSheet["helpBtn"]}>
                      <Button formType="submit" openType="share" style={_styleSheet["openFormid1"]} />
                      <Text>邀请好友助力</Text>
                    </View>
                  </Form>
                  <View style={_styleSheet["instructions"]}>
                    助力需在24小时内完成，助力好友不会看到您的提问
                  </View>
                  <View style={_styleSheet["prompt"]}>- 好友如何助力 -</View>
                  <View style={_styleSheet["steps"]}>
                    <View style={_styleSheet["item"]}>
                      <Image mode="widthFix" src="https://static.shengri.cn/uploads/QA_mp/detailNumber1@3x.png" />
                      <Text>打开分享链接</Text>
                    </View>
                    <View style={_styleSheet["item"]}>
                      <Image mode="widthFix" src="https://static.shengri.cn/uploads/QA_mp/detailNumber2@3x.png" />
                      <Text>授权小程序</Text>
                    </View>
                    <View style={_styleSheet["item"]}>
                      <Image mode="widthFix" src="https://static.shengri.cn/uploads/QA_mp/detailNumber3@3x.png" />
                      <Text>提问问题</Text>
                    </View>
                  </View>
                </View>
              </View>}
          </View>}
        <DownloadPromptTmpl data={{
        windowWidth: (windowWidth, windowHeight)
      }} />
        <DownloadPromptTmpl data={{
        windowWidth: (windowWidth, windowHeight)
      }} />
      </Block>;
  }
}, _class2.config = {
  navigationBarTitleText: '提问详情',
  navigationBarTextStyle: 'black',
  navigationBarBackgroundColor: '#FFF',
  enablePullDownRefresh: false
}, _temp2)) || _class);

export default _C;