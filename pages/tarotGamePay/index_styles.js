import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  "hedaerBg": {
    "width": "100%",
    "position": "fixed",
    "top": 0
  },
  "headerImg": {
    "marginTop": 40,
    "marginRight": "auto",
    "marginBottom": 0,
    "marginLeft": "auto",
    "width": 138
  },
  "operatingAreaBox": {
    "marginTop": 27,
    "width": "100%",
    "minHeight": 103
  },
  "infoMsg": {
    "marginTop": 20,
    "width": "100%",
    "height": 48,
    "display": "flex",
    "flexDirection": "column",
    "alignItems": "center"
  },
  "animBox": {
    "width": "100%",
    "position": "fixed",
    "bottom": 0
  },
  "payBoxBg": {
    "paddingTop": 0.05,
    "backgroundColor": "rgba(0, 0, 0, 0.5)",
    "position": "fixed",
    "top": 0,
    "zIndex": 10
  },
  "payBox": {
    "marginTop": 40,
    "marginRight": "auto",
    "marginBottom": 0,
    "marginLeft": "auto",
    "width": 315,
    "borderRadius": 10,
    "backgroundColor": "#ffffff"
  },
  "page": {
    "paddingTop": 0.05,
    "backgroundColor": "#1f244c",
    "position": "fixed",
    "top": 0
  },
  "active": {
    "backgroundColor": "rgba(255, 57, 57, 0.1)",
    "borderWidth": 1,
    "borderStyle": "solid",
    "borderColor": "#FF3939"
  },
  "codeBox": {
    "marginTop": 120,
    "marginRight": "auto",
    "marginBottom": 120,
    "marginLeft": "auto",
    "paddingTop": 0.05,
    "width": 315,
    "height": 305,
    "backgroundColor": "#ffffff",
    "position": "relative"
  },
  "successBox": {
    "marginTop": 100,
    "marginRight": "auto",
    "marginBottom": 100,
    "marginLeft": "auto",
    "paddingTop": 0.05,
    "width": 315,
    "height": 337,
    "borderRadius": 10,
    "backgroundColor": "#ffffff"
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