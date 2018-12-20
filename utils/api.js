import Taro from '@tarojs/taro-rn';
import React from 'react';

/**
 * @param {string} method
 * @param {string} url
 * @param {!Object} body
 * @return {?}
 */
function send(method, url, body) {
  /** @type {boolean} */
  var c = true;
  return body.noTip && (c = false, delete body.noTip), new Promise(function (optError, doLogin) {
    Taro.request({
      url: url,
      method: method,
      data: body,
      header: header,
      success: function (response) {
        if (200 == response.statusCode || 201 == response.statusCode) {
          optError(response.data);
        } else {
          if (435 == response.statusCode) {
            app.getUserInfo(function () {
              send(method, url, body);
            });
          } else {
            doLogin(response);
            if (c) {
              Taro.showModal({
                title: '提示',
                content: response.data.msg,
                showCancel: false,
                confirmColor: '#ff3939',
                success: function (backdata) {}
              });
            }
          }
        }
      },
      fail: function (form) {
        doLogin(form);
      }
    });
  });
}

var app;

setTimeout(function () {
  app = Taro.getApp();
});

var Promise = require('es6-promise-min').Promise;

var md5 = require('./md5.min.js');

var appConfig = require('../config.js');

console.log(appConfig.name + '!!!!!!!!!!!!!!!!!!!!!!!   <------  注意');

console.log(appConfig.appId + '!!!!!!!!!!!!!!!!!!!!!!!   <------  注意appId');

var header = {
  'Content-Type': 'application/json',
  'OI-APPKEY': appConfig.appKey,
  'OI-UDID': '00000000000000000000000000000000',
  'OI-AUTH': '',
  'OI-CHN': 0,
  'OI-WXAPP-SESSION': '',
  'OI-TYPE': 'USER',
  'OI-APIVER': '47'
};

module.exports = {
  header: header,
  baseUrl: 'https://api.octinn.com/',
  fetchGet: function (url) {
    return send('GET', url, arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : {});
  },
  fetchPost: function (id) {
    return send('POST', id, arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : {});
  },
  fetchPut: function (url) {
    return send('PUT', url, arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : {});
  },
  fetchDelete: function (url) {
    return send('DELETE', url, arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : {});
  },
  setToken: function (value) {
    /** @type {string} */
    header['OI-AUTH'] = value;
  },
  setUdid: function (key) {
    header['OI-UDID'] = md5(key);
  },
  setSession: function (sessionId) {
    header['OI-WXAPP-SESSION'] = sessionId;
  },
  setChannel: function (value) {
    header['OI-CHN'] = value;
  }
};