var _dec, _class, _class2, _temp2;

import Taro from '@tarojs/taro-rn';
import { View, Image, Text } from "@tarojs/components-rn";
import React from 'react';

import withWeapp from '@tarojs/with-weapp';
import indexStyleSheet from "./index_styles";
var _styleSheet = indexStyleSheet;
var test = require('./../../utils/api.js');

var app = Taro.getApp();

let _C = (_dec = withWeapp('Page'), _dec(_class = (_temp2 = _class2 = class _C extends React.Component {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.state = {
      list: [],
      page: 0,
      isMore: true
    }, this.onReachBottom = () => {
      this.fetchMore();
    }, this.fetchData = () => {
      var $ = this;
      var isMore = $.data.isMore;
      var currentPage = $.data.page;
      Taro.showToast({
        title: '加载中...',
        icon: 'loading',
        duration: 1e4
      });
      test.fetchGet(test.baseUrl + 'ask/userQuestionList', {
        limit: 10,
        page: $.data.page
      }).then(function (s) {
        Taro.hideToast();
        if (s.items.length < 10) {
          /** @type {boolean} */
          isMore = false;
        } else {
          currentPage = currentPage + 1;
        }
        $.setData({
          page: currentPage,
          list: s.items,
          isMore: isMore
        });
      });
    }, this.fetchMore = () => {
      var $ = this;
      var isMore = $.data.isMore;
      var currentPage = $.data.page;
      if (isMore) {
        Taro.showToast({
          title: '加载中...',
          icon: 'loading',
          duration: 1e4
        });
        test.fetchGet(test.baseUrl + 'ask/userQuestionList', {
          limit: 10,
          page: $.data.page
        }).then(function (t) {
          Taro.hideToast();
          if (t.items.length < 10) {
            /** @type {boolean} */
            isMore = false;
          } else {
            currentPage = currentPage + 1;
          }
          $.setData({
            isMore: isMore,
            page: currentPage,
            list: $.data.list.concat(t.items)
          });
        });
      }
    }, this.goDetail = event => {
      var postid = event.currentTarget.dataset.postid;
      Taro.navigateTo({
        url: '../detail/index?postId=' + postid
      });
    }, this.goIndexFn = () => {
      Taro.switchTab({
        url: '../index/index'
      });
    }, _temp;
  }

  componentWillMount(hashComponent) {}

  componentDidShow() {
    var tools = this;
    if (app.isLogin()) {
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
      this.fetchData();
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

  componentDidMount() {}

  componentDidHide() {}

  componentWillUnmount() {}

  render() {
    const { list: list } = this.state;
    return list.length > 0 ? <View style={_styleSheet["msgList"]}>
        {list.map((item, index) => {
        return <View onClick={this.goDetail} data-postid={item.post_id} style={_styleSheet["itemMsg"]}>
              <View style={_styleSheet["top"]}>
                <View style={_styleSheet["left"]}>
                  <Image mode="widthFix" src={item.image} />
                  <Text>{'/ ' + item.created_at_hm}</Text>
                </View>
              </View>
              <View style={_styleSheet["center"]}>{item.content}</View>
              <View style={_styleSheet["bottom"]}>
                <Text style={_styleSheet["left"]}>{item.replyTimes + '人回答'}</Text>
                <Text style={_styleSheet["right"]}>
                  <Text style={_styleSheet["money"]}>￥</Text>
                  {item.price / 100}
                </Text>
              </View>
            </View>;
      })}
      </View> : <View style={_styleSheet["nothing"]}>
        <View style={_styleSheet["bg"]}>
          <Image mode="widthFix" src="https://static.shengri.cn/uploads/QA_mp/kongbaiico.png" />
        </View>
        <View onClick={this.goIndexFn} style={_styleSheet["btn"]}>
          去提问
        </View>
      </View>;
  }
}, _class2.config = {
  navigationBarTextStyle: 'black',
  navigationBarBackgroundColor: '#FFF',
  enablePullDownRefresh: false
}, _temp2)) || _class);

export default _C;