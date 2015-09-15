/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"

#import "RCTRootView.h"

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
  NSURL *jsCodeLocation;

  jsCodeLocation = [NSURL URLWithString:@"http://localhost:8081/index.ios.bundle"];
  //  jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];

  // Sometimes you want your users to get few todos by default when they launch the app
  // for the first time
  NSMutableDictionary *initialState = [NSMutableDictionary dictionaryWithDictionary:@{
    @"list": @[
      @{@"id": @1, @"title": @"Buy a cat"},
      @{@"id": @2, @"title": @"Buy another cat"}
    ]
  }];

  // Let's load user defaults we saved previously
  // and merge them into initial state
  // you can perform other async actions here, up to you
  NSDictionary *userState = [[NSUserDefaults standardUserDefaults] dictionaryForKey:@"state"];
  [initialState addEntriesFromDictionary:userState];

  // Use user saved state if there is one, load initial state otherwise to give seamless
  // user experience or just to have nice development
  // Remember - you need to rerun app from XCode in order for these changes to propagate
  // Normal refreshing will have no effect
  NSDictionary *initialProperties = @{
    @"initialState": initialState
  };

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"este"
                                               initialProperties:initialProperties
                                                   launchOptions:launchOptions];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [[UIViewController alloc] init];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];

  return YES;
}

@end
