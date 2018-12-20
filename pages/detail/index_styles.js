import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  "pageCont": {
    "width": 335
  },
  "nothing": {
    "marginTop": 40,
    "marginRight": "auto",
    "marginBottom": 40,
    "marginLeft": "auto",
    "width": 150,
    "textAlign": "center",
    "fontSize": 14,
    "color": "#999999"
  },
  "page": {
    "width": "100%",
    "backgroundColor": "#ffffff",
    "display": "flex",
    "flexDirection": "column",
    "alignItems": "center",
    "justifyContent": "center"
  },
  "evaluationBg": {
    "paddingTop": 0.05,
    "backgroundColor": "rgba(0, 0, 0, 0.5)",
    "position": "fixed",
    "top": 0,
    "zIndex": 10
  },
  "evaluationBox": {
    "marginTop": 150,
    "marginRight": "auto",
    "marginBottom": 150,
    "marginLeft": "auto",
    "paddingTop": 0.05,
    "width": 315,
    "height": 271,
    "borderRadius": 10,
    "backgroundColor": "#ffffff"
  },
  "jumpIndex": {
    "position": "fixed",
    "bottom": 55,
    "right": 7.5,
    "width": 96,
    "height": 104
  },
  "invitationMask": {
    "width": "100%",
    "height": "100%",
    "position": "fixed",
    "bottom": 0,
    "animation": "invitationMaskAnim 2s linear forwards"
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