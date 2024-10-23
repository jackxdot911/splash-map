import { StyleSheet } from 'react-native'
import React from 'react'
import { WebView } from 'react-native-webview'

const webView = () => {
  return (
      <WebView source={{ uri: 'https://reactnative.dev/' }} style={{ flex: 1 }} />
  )
}

export default webView

const styles = StyleSheet.create({})