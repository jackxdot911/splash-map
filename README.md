eas build:configure 




eas build --platform android








React native directory 



Local 
npx expo prebuilt 

npx expo run:ios

npx expo run:android

Cloud
npm i -g rad-cli
eas -v
eas login
eas whoami 

eas init
eas build:configure       ———-All.   -eas.json

Add /ios and /android in .gitignore

eas build --profile development --platform ios





.apk 

Check photos

eas.json
…..
“androidapk” : {
      “android” : {
      “buildType”: “apk”
}
}

eas build --platform android --profile androidapk 

//////////////////////////////

com.jackdotedge.test

keytool -list -v -keystore debug.keystore -alias androiddebugkey -storepass android -keypass android




/////////////
eas credentials 
to get keystore



https://stackoverflow.com/questions/57505545/expo-google-sign-in-developer-error/72383211#72383211





///

keystore password -> 123456


///

create keystore

keytool -genkey -v -keystore new-release-key.keystore -alias new-key-alias -keyalg RSA -keysize 2048 -validity 10000


keytool -list -v -keystore new-release-key.keystore -alias new-key-alias

