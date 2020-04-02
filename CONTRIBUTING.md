# Contributing to react-native-svg-charts

First of all a __big__ thank you for wanting to contribute to this library. 🏆

In order for this to be maintainable we ask you to follow these rules when contributing.

* work off of and make your pull request to the `dev` branch. Master is meant to reflect what's published to npm, think git flow.
* make sure that you understand how this library works and utilize what's already in place, try not to introduce new complexity unless properly motivated.
* motivate why you've made the changes you have made in the PR description.
* make sure your implementation doesn't break anything, step through all the [StoryBook stories](#demo-application) and make sure everything look as expected. Also make sure that the circleci builds are passing.
* create one (or several) new story/stories that showcases your new feature
* fork [`react-native-svg-charts-examples`](https://github.com/JesperLekland/react-native-svg-charts-examples) and make a PR with your newly implementes stories (include screenshots).
* bundle the library using `npm run prepare` to make it compatible with web if you are publishing a new release to npm.


## Demo Application

### Install
```shell
yarn install
```

### Run
See [Running your React Native application](https://reactnative.dev/docs/environment-setup)

#### Start Metro bundler
```shell
yarn start
```

#### Launch app on emulator or real device
if using iOS
```shell
npx react-native run-ios
```
or, if using Android:
```shell
npx react-native run-android
```

#### Start Storybook server
```shell
yarn storybook
```
(That should open [localhost:7008](localhost:7008) in your browser)

#### Reload your device
That's a requirement of Storybook for React Native

#### browse our charts
