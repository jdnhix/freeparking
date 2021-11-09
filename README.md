# Free Parking

## Flutter Setup

- We'll essentially be following this website [here](https://flutter.dev/docs/get-started/install/macos).
  - note that these steps are for macOS, but should be easy to replicate for other systems.

### Installations
- Cloning this repo wherever you'd like.
- Download the flutter zip from that website.
- Go ahead and install android studio [here](https://developer.android.com/studio/?gclid=CjwKCAiA1aiMBhAUEiwACw25MU_gAQPLyUHZJ985ap2eqTqj5MATRILUtA0I_-otp6ROICl2Mr6LXRoCRuoQAvD_BwE&gclsrc=aw.ds).
- Download XCode, available in app store.

### Configuration
- In the root of the repo, execute this command to install flutter:
```
unzip ~/Downloads/flutter_macos_2.5.3-stable.zip
```
- Run this command to add "flutter" to your bin:
```
export PATH="$PATH:`pwd`/flutter/bin"
```
- Run this command next to make sure everything is setup correctly. It should provide instructions on how to fix any issues if present.
  - this [link](https://flutter-examples.com/flutter-command-line-tools-component-is-missing/) should be useful with Android Toolchain issues.
```
flutter doctor
```


