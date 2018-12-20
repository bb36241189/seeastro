import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  "page": {
    "backgroundColor": "#ffffff",
    "display": "flex",
    "flexDirection": "column",
    "alignItems": "center",
    "justifyContent": "center"
  },
  "pageCont": {
    "width": 335
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