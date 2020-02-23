# Firebase Authentication Kit for React Native

Thank you for purchasing the Firebase Authentication Kit 👏

Your purchase helps support open-source projects such as [React Native Firebase](https://invertase.io/oss/react-native-firebase).

## Getting started

Ensure your development environment is set up for React Native by following the [React Native documentation](https://facebook.github.io/react-native/docs/getting-started).

### Install dependencies

1. Install [NPM](https://www.npmjs.com) dependencies with [Yarn](https://yarnpkg.com/lang/en/): `yarn`.
2. Install CocoaPods [CocoaPods](https://cocoapods.org) inside of the `ios` directory:

```bash
$ cd ios/
$ pod install --repo-update
```

### Android: Setting up App Signing

Google Sign-In requires a `keystore` file to be added to your project and the Firebase console for both debug and release builds, we've included a `debug` one by default. To setup a new `keystore` file, follow the [guide here](https://developer.android.com/studio/publish/app-signing#debug-mode).

### Add your app id and name

This project is preconfigured with `market.reactnative.firebaseauthkit` as its app id. You will probably want to replace it using the `rename-script` npm script provided with this product.

### Add your Firebase credentials

1. Choose your existing Firebase project from the [Firebase console](https://console.firebase.google.com/).
   > Creating a new project? Check out the React Native Firebase [documentation](https://invertase.io/oss/react-native-firebase/quick-start/create-firebase-project).
2. Add the Firebase credentials to your project by following documentation for [Android](https://invertase.io/oss/react-native-firebase/quick-start/android-firebase-credentials) and [iOS](https://invertase.io/oss/react-native-firebase/quick-start/ios-firebase-credentials).

## Social Providers

The Firebase Authentication Kit supports multiple authentication providers. Follow the links below for documentation on setting up each provider:

- [Email and Password Authentication](/docs/email-password-auth.md)
- [Facebook Authentication](/docs/facebook-auth.md)
- [Google Authentication](/docs/google-auth.md)
- [Phone Authentication](/docs/phone-auth.md)
