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

eas build —profile development —platform ios





.apk 

Check photos

eas.json
…..
“androidapk” : {
      “android” : {
      “buildType”: “apk”
}
}

eas build —platform android —profile androidapk 

