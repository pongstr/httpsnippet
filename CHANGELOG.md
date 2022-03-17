## [2.0.1](https://github.com/RapidAPI/httpsnippet/compare/v2.0.0...v2.0.1) (2022-03-17)



# [2.0.0](https://github.com/RapidAPI/httpsnippet/compare/v1.19.1...v2.0.0) (2022-03-17)


### Bug Fixes

* add check for existing clients ([4946569](https://github.com/RapidAPI/httpsnippet/commit/4946569f452f8f4d91de082992b006adb701c0d3))
* bug where FormData in the js fetch target wasn't applied ([#202](https://github.com/RapidAPI/httpsnippet/issues/202)) ([200b1fd](https://github.com/RapidAPI/httpsnippet/commit/200b1fda75e9862577fc11883143a0f15545a8e7))
* can't load the form-data polyfill in browsers because fs doesn't exist ([#184](https://github.com/RapidAPI/httpsnippet/issues/184)) ([0fc7f4a](https://github.com/RapidAPI/httpsnippet/commit/0fc7f4a42cafadf00d1f2c0463ac93f9a8e7258b))
* coding against native FormData and form-data ([ce5f277](https://github.com/RapidAPI/httpsnippet/commit/ce5f277068951998cf48044a1a70f0c547666cea))
* don't convert header names to lowercase ([#178](https://github.com/RapidAPI/httpsnippet/issues/178)) ([6afa231](https://github.com/RapidAPI/httpsnippet/commit/6afa231ec6bb30f47b19e08c7d4887637eef5d8e)), closes [#74](https://github.com/RapidAPI/httpsnippet/issues/74)
* moving form-data usage over to using the native FormData object ([d493781](https://github.com/RapidAPI/httpsnippet/commit/d493781044108901b860c7ce374745bb244543fe))
* node-fetch doesn't support the `qs` option ([#213](https://github.com/RapidAPI/httpsnippet/issues/213)) ([d82a992](https://github.com/RapidAPI/httpsnippet/commit/d82a9923cfdcfc67b1f10224e79b79ba04936495))
* not sending form urlencoded properly in JS fetch snippets ([#218](https://github.com/RapidAPI/httpsnippet/issues/218)) ([6b85ba2](https://github.com/RapidAPI/httpsnippet/commit/6b85ba24b13241990fecae20eeae3c7d257cd415))
* out of date regex that was causing readstreams to be stringified ([89177c3](https://github.com/RapidAPI/httpsnippet/commit/89177c34634c4481aab5ef1c0da1c6bbceb78a1f))
* regression in header case-insensitivity ([#188](https://github.com/RapidAPI/httpsnippet/issues/188)) ([86e7b0e](https://github.com/RapidAPI/httpsnippet/commit/86e7b0e2e0cd9384db5d7dc7ed5608a1d4e3e7b3))
* setting the form-data boundary when under node ([86c52ba](https://github.com/RapidAPI/httpsnippet/commit/86c52ba99e4ad36ecbd441d22f4ac525f7c9b39f))
* updating the curl target to prioritize param.fileName ([ea50f99](https://github.com/RapidAPI/httpsnippet/commit/ea50f9909bf6a7d4325318578128abffdd8e27fb))
* updating the node request target to prefer single quotes ([f98662c](https://github.com/RapidAPI/httpsnippet/commit/f98662c03ccf3875550d55cda9c51c263af27a36))
* updating the node request target to prioritize param.fileName ([36a1a5b](https://github.com/RapidAPI/httpsnippet/commit/36a1a5bd97728b716cca6012d505946e1023b03a))
* updating the node-fetch target to handle form-urlencoded requests ([#187](https://github.com/RapidAPI/httpsnippet/issues/187)) ([07d5ebf](https://github.com/RapidAPI/httpsnippet/commit/07d5ebfc2720d98693ba568447953e7b180ae5e2))
* using `null` instead of `NULL` ([6dbb2b7](https://github.com/RapidAPI/httpsnippet/commit/6dbb2b70575fec160c417a74d49ab3fc613947bd))


* chore(release bump) - Bump package.json to version 2.0.0 ([7fd160c](https://github.com/RapidAPI/httpsnippet/commit/7fd160c016d7b00aca923673004dcdcf4b5a0068))


### Features

* cleaner python requests json snippets ([#189](https://github.com/RapidAPI/httpsnippet/issues/189)) ([e81f30a](https://github.com/RapidAPI/httpsnippet/commit/e81f30a56ab8c600d583d7e9706ec944f12c106f))
* updating javascript targets to use `const` instead of `var` ([cd034d0](https://github.com/RapidAPI/httpsnippet/commit/cd034d030b2317898ce8d5e10cbf6ff643a438a8))
* updating php targets to use `[]` instead of `array()` ([6a814ab](https://github.com/RapidAPI/httpsnippet/commit/6a814abe78af59849c07cdaf8cd51ef266d71c52))


### BREAKING CHANGES

* removed support for Node < 10



## [1.19.1](https://github.com/RapidAPI/httpsnippet/compare/v1.19.0...v1.19.1) (2019-05-05)



# [1.19.0](https://github.com/RapidAPI/httpsnippet/compare/v1.16.7...v1.19.0) (2019-04-29)


### Reverts

* Revert "docs(badges): remove badges until fixed" ([a1ed134](https://github.com/RapidAPI/httpsnippet/commit/a1ed13467d54c4a870c7421e2f003e3c7ab47c49))



## [1.16.7](https://github.com/RapidAPI/httpsnippet/compare/v1.16.5...v1.16.7) (2019-03-10)


### Bug Fixes

* jsonObj cannot have null value ([f21d76e](https://github.com/RapidAPI/httpsnippet/commit/f21d76ebdb3715f8c6b16fba1100761a8fc50d2a))
* **package:** update har-validator to version 5.0.0 ([f1a74c8](https://github.com/RapidAPI/httpsnippet/commit/f1a74c80952dac63d812750c3b24038da44fe244))


### Features

* **powershell:** add powershell webrequest target ([#127](https://github.com/RapidAPI/httpsnippet/issues/127)) ([7496355](https://github.com/RapidAPI/httpsnippet/commit/74963555cdcb4677a4f5a412fd476f567761f3e9)), closes [#105](https://github.com/RapidAPI/httpsnippet/issues/105)



