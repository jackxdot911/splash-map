import * as WebBrowser from 'expo-web-browser';

// Instead of using WebView component, use WebBrowser.openBrowserAsync
// For example:
export const openWeb = async () => {
  await WebBrowser.openBrowserAsync('https://google.com');
};