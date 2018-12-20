import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  "userInfo": {
    "width": "100%",
    "backgroundColor": "#ffffff",
    "paddingTop": 0.5
  },
  "freeAsk": {
    "marginTop": 15,
    "marginRight": "auto",
    "marginBottom": 0,
    "marginLeft": "auto",
    "width": 336,
    "height": 60
  },
  "banner": {
    "width": "100%",
    "paddingTop": 0.05,
    "backgroundColor": "#ffffff"
  },
  "header": {
    "marginTop": 10,
    "marginRight": "auto",
    "marginBottom": 0,
    "marginLeft": "auto",
    "width": 335,
    "height": 191,
    "boxSizing": "border-box",
    "display": "flex",
    "justifyContent": "space-between"
  },
  "guide": {
    "marginTop": 0,
    "marginRight": "auto",
    "marginBottom": 15,
    "marginLeft": "auto",
    "width": 333,
    "height": 152,
    "display": "flex",
    "justifyContent": "space-between"
  },
  "msgList": {
    "paddingBottom": 20,
    "width": "100%"
  },
  "prompt": {
    "width": "100%",
    "height": "100%",
    "position": "fixed",
    "top": 0,
    "left": 0,
    "backgroundColor": "rgba(0, 0, 0, 0.4)"
  },
  "promptBg": {
    "position": "absolute",
    "top": "48%",
    "right": 69.5,
    "width": 236,
    "height": 51,
    "backgroundImage": "url(\"https://static.shengri.cn/uploads/QA_mp/zhiyinbg@3x.png\")",
    "backgroundSize": "100%",
    "backgroundRepeat": "no-repeat",
    "fontSize": 14,
    "color": "#313A5A",
    "textAlign": "center",
    "lineHeight": 65
  },
  "promptBgAnim1": {
    "animation": "ation1 2s linear forwards"
  },
  "promptBgAnim2": {
    "animation": "ation2 2s linear forwards"
  },
  "ellipsis": {
    "overflow": "hidden",
    "textOverflow": "ellipsis",
    "whiteSpace": "nowrap"
  },
  "clearfix": {
    "zoom": 1
  },
  "downloadPrompt": {
    "position": "fixed",
    "top": 0,
    "left": 0,
    "zIndex": 999,
    "backgroundColor": "rgba(0, 0, 0, 0.5)",
    "display": "flex",
    "justifyContent": "center",
    "alignItems": "center"
  },
  "ellipsislines": {
    "display": "-webkit-box",
    "WebkitBoxOrient": "vertical",
    "WebkitLineClamp": 2,
    "overflow": "hidden"
  }
})