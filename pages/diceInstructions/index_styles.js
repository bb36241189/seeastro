import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  "pageBg": {
    "backgroundColor": "#F3F3FF",
    "position": "fixed",
    "top": 0,
    "zIndex": -999
  },
  "pageCont": {
    "marginTop": 100,
    "paddingBottom": 41,
    "width": "100%",
    "display": "flex",
    "alignItems": "center",
    "justifyContent": "center",
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