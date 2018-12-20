import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  "msgList": {
    "marginBottom": 20,
    "width": "100%",
    "backgroundColor": "#F9F9F9"
  },
  "nothing": {
    "paddingTop": 56,
    "width": "100%",
    "display": "flex",
    "alignItems": "center",
    "flexDirection": "column"
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