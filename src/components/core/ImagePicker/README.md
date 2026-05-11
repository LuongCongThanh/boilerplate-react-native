 <h1>Install</h1>

 <h3>Step 1</h3>

`yarn add react-native-image-crop-picker react-native-actionsheet`

 <h3>Step 2</h3>
 
 `cd ios`

`pod install`

 <h3>Step 3</h3>

- **IOS:**

In Xcode open Info.plist and add string key `NSPhotoLibraryUsageDescription` with value that describes why you need access to user photos.Depending on what features you use, you also may need `NSCameraUsageDescription` and `NSMicrophoneUsageDescription` keys.

`<key>NSPhotoLibraryUsageDescription</key>`

`<string></string>`

` <key>NSCameraUsageDescription</key>`

`<string></string>`

`<key>NSMicrophoneUsageDescription</key>`

` <string></string>`

- **Android:**

Make sure you are using SDK version `>= 33` add following to `app/src/main/AndroidManifest.xml`

`<uses-permission android:name="android.permission.READ_MEDIA_IMAGES"/>`

`<uses-permission android:name="android.permission.CAMERA"/>`

`<uses-feature android:name="android.hardware.camera" android:required="false" />`

`<uses-feature android:name="android.hardware.camera.front" android:required="false/>`
