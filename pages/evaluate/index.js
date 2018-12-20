var _dec, _class, _class2, _temp2, _initialiseProps;

import Taro from '@tarojs/taro-rn';
import { View, Image, Text } from "@tarojs/components-rn";
import React from 'react';

import withWeapp from '@tarojs/with-weapp';
import indexStyleSheet from "./index_styles";
var _styleSheet = indexStyleSheet;
var app = require('./../../utils/api.js');

var s = (Taro.getApp(), undefined);

let _C = (_dec = withWeapp('Page'), _dec(_class = (_temp2 = _class2 = class _C extends React.Component {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), _initialiseProps.call(this), _temp;
  }

  componentWillMount(hashComponent) {}

  componentDidShow(callback) {
    var e = Taro.getStorageSync('commentsData');
    s = Taro.createInnerAudioContext();
    this.setData({
      commentsData: e
    });
    this.fetchData();
  }

  componentWillUnmount() {
    s.stop();
    s.destroy();
  }

  render() {
    const {
      showPage: showPage,
      commentsData: commentsData,
      currentText: currentText,
      scoreArr: scoreArr,
      keywords: keywords
    } = this.state;
    return showPage && <View style={_styleSheet["page"]}>
          <View style={_styleSheet["pageCont"]}>
            <View style={_styleSheet["header"]}>
              <Image mode="widthFix" src={commentsData.owner.avatar} style={_styleSheet["img"]} />
              <View onClick={this.playAudio} data-commentid={commentsData.comment_id} style={_styleSheet["audioBg"]}>
                {commentsData.play ? <Image mode="widthFix" src="https://static.shengri.cn/uploads/QA_mp/audioAnim@3x.gif" style={_styleSheet["ico"]} /> : <Image mode="widthFix" src="https://static.shengri.cn/uploads/QA_mp/detail_yuyinic@3x.png" style={_styleSheet["ico"]} />}
                <Text>{currentText}</Text>
              </View>
            </View>
            <View style={_styleSheet["scoreText"]}>为这个回复打分</View>
            <View style={_styleSheet["scoreBox"]}>
              {scoreArr.map((item, index) => {
            return <Image onClick={this.scoreFn} data-index={index} mode="widthFix" src={item.choose ? 'https://static.shengri.cn/uploads/QA_mp/shoucang@3x.png' : 'https://static.shengri.cn/uploads/QA_mp/rating_star_gray@3x.png'} />;
          })}
            </View>
            <View style={_styleSheet["chooseLbleText"]}>
              <Text>下面哪些词语可以形容这条回复</Text>
              <View style={_styleSheet["instructions"]}>最多可选3条</View>
            </View>
            <View style={_styleSheet["lableBox"]}>
              {keywords.map((item, index) => {
            return <View onClick={this.chooseLbleFn} data-id={item.id} data-index={index} style={[_styleSheet["lableItem"], 'background-image: url(' + (item.active ? 'https://static.shengri.cn/uploads/QA_mp/lablechoose@3x.png' : 'https://static.shengri.cn/uploads/QA_mp/lable@3x.png') + ');']}>
                    {item.keyword}
                  </View>;
          })}
            </View>
            <View onClick={this.submit} style={_styleSheet["btn"]}>
              提交
            </View>
          </View>
        </View>;
  }
}, _class2.config = {
  navigationBarTitleText: '评价',
  navigationBarTextStyle: 'black',
  navigationBarBackgroundColor: '#FFF',
  enablePullDownRefresh: false
}, _initialiseProps = function () {
  this.state = {
    windowWidth: 0,
    windowHeight: 0,
    showPage: false,
    hasAudio: false,
    commentsData: {},
    currentText: '点击重听',
    scoreArr: [{
      choose: 0
    }, {
      choose: 0
    }, {
      choose: 0
    }, {
      choose: 0
    }, {
      choose: 0
    }],
    score: 0,
    keywordsData: [],
    keywords: [],
    idArr: []
  };

  this.fetchData = ignoreSettings => {
    var collection = this;
    Taro.showToast({
      title: '加载中...',
      icon: 'loading',
      duration: 1e4
    });
    app.fetchGet(app.baseUrl + 'ask/marking/keywords').then(function (regexps) {
      Taro.hideToast();
      var keywords = regexps.keywords;
      keywords.forEach(function (toolScope, a) {
        /** @type {number} */
        toolScope.active = 0;
      });
      collection.setData({
        keywords: keywords,
        keywordsData: keywords,
        showPage: true
      });
    });
  };

  this.playAudio = event => {
    var self = this;
    var SCRIPT_URL = undefined;
    var r = self.data.hasAudio;
    var explosionSprite = self.data.commentsData;
    var c = event.currentTarget.dataset.commentid;
    if (r) {
      if (explosionSprite.play) {
        s.pause();
        /** @type {boolean} */explosionSprite.play = false;
        self.setData({
          currentText: '已暂停',
          commentsData: explosionSprite
        });
      } else {
        s.play();
        /** @type {boolean} */explosionSprite.play = true;
        self.setData({
          currentText: '正在播放',
          commentsData: explosionSprite
        });
      }
    } else {
      self.setData({
        currentText: '正在缓存'
      });
      app.fetchGet(app.baseUrl + 'forum/posts/' + c + '/audio', {
        noTip: true
      }).then(function (res) {
        SCRIPT_URL = res.date.resource_url;
        s.src = SCRIPT_URL;
        /** @type {boolean} */s.obeyMuteSwitch = false;
        /** @type {boolean} */s.autoplay = true;
        s.onPlay(function () {
          /** @type {boolean} */
          explosionSprite.play = true;
          self.setData({
            hasAudio: true,
            currentText: '正在播放',
            commentsData: explosionSprite
          });
        });
        s.onEnded(function () {
          /** @type {boolean} */
          explosionSprite.play = false;
          self.setData({
            hasAudio: false,
            currentText: '点击重听',
            commentsData: explosionSprite
          });
        });
      });
    }
  };

  this.scoreFn = data => {
    var state = this;
    var b = data.currentTarget.dataset.index;
    var v = b + 1;
    var pipelets = state.data.scoreArr;
    var trytes = state.data.keywordsData;
    /** @type {!Array} */var COMMANDS = [];
    pipelets.forEach(function (_providers, a) {
      /** @type {number} */
      _providers.choose = 0;
    });
    pipelets.forEach(function (_providers, a) {
      if (a <= b) {
        /** @type {number} */
        _providers.choose = 1;
      }
    });
    trytes.forEach(function (args, a) {
      /** @type {number} */
      args.active = 0;
      if (v < 3 && 2 == args.effect) {
        COMMANDS.push(args);
      } else {
        if (3 == v && 3 == args.effect) {
          COMMANDS.push(args);
        } else {
          if (v > 3 && 1 == args.effect) {
            COMMANDS.push(args);
          }
        }
      }
    });
    state.setData({
      scoreArr: pipelets,
      score: v,
      keywords: COMMANDS,
      idArr: []
    });
  };

  this.chooseLbleFn = event => {
    var that = this;
    var aNodeName = (event.currentTarget.dataset.id, event.currentTarget.dataset.index);
    var keywords = that.data.keywords;
    var n = that.data.idArr;
    keywords.forEach(function (p, a) {
      if (aNodeName == a) {
        if (p.active) {
          /** @type {number} */
          p.active = 0;
          n.forEach(function (category, e) {
            if (category == p.id) {
              n.splice(e, 1);
            }
          });
        } else {
          if (n.length > 2) {
            return undefined;
          }
          /** @type {number} */p.active = 1;
          n.push(p.id);
        }
      }
    });
    that.setData({
      keywords: keywords,
      idArr: n
    });
  };

  this.submit = () => {
    var default_album = this;
    var comment_id = default_album.data.commentsData.comment_id;
    var pipelets = default_album.data.idArr;
    var score = default_album.data.score;
    var tag = undefined;
    pipelets.forEach(function (type, jcoverflip) {
      tag = 0 == jcoverflip ? type : tag + '-' + type;
    });
    Taro.showToast({
      title: '提交中...',
      icon: 'loading',
      duration: 1e4
    });
    app.fetchPost(app.baseUrl + 'ask/marking/' + comment_id, {
      star: score,
      keywords: tag
    }).then(function (canCreateDiscussions) {
      Taro.hideToast();
      Taro.navigateBack({
        delta: 1
      });
    });
  };
}, _temp2)) || _class);

export default _C;