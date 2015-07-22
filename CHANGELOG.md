Changelog
=========

Weekly updates and summary of all changes in the Este project. The changelog is always broken down into 3 secions:
- `Bugs` - bug fixes
- `Features` - new features and real changes
- `Style and deps` - mainly style tweaks and dependencies updates

## 23.06 - 20.07

- New super awesome even more reduced Flux. Who needs Flux framework?
- Test examples for actions and stores
- Este devtools are back
- Fixed intl and Karma deps until their issues will be resolved
- Some small changes in app structure, i18n renamed to intl etc.
- Add nyan progress bar for the webpack build
- Locales per app feature, extend translations with default ones.
- Smarter user state preloading
- Removed pages directory, all components belong to features
- Add ES7 support, add decorators, function bind syntax, static props
- Added link to Czech articles about Este.js
- several minor fixes

## 13.06 - 23.06

### Features
- `2ef5b79` - Added simple test case for actions
- `280aadb` - Added shallow rendering test example
- `13c59be` - Gulpfile now in ES6
- `491efb4` - Webpack cheap source maps instead of normal ones #speed
- `d547016` - Jest is gone, Karma/Mocha/Chai for the win
- `2a8e5ad` - Brand new `console.js` - easier development and debugging with dev tools
- `fe4ca33` - Editable buttons are now optional, configurable via props (editable component)
- `66e70ae` - Render time is not relevant anymore, likely to be used elsewhere in the future
- `06435b7` - Render time should not render in production - not relevent because of above anymore
- `3352151` - Added editable `textarea` example
- `b621b1f` - render app in componentWillMount, not in componentDidMonut, see #274
- `dfc4c14` - Move app state persistence into higher order component instead of putting logic into `app.react.js`
- `68905fe` - Don't lint tests
- `c35a6b9` - Removed fastclick dependency
- `62a0f8d` - App footer is now a component

### Style tweaks & deps
- `25ec010` - Different way of accessing props, use destruct statement where possible in render method
- `f5c556b` - Replaced require with import in server.js
- `88b15c4` - Fixed wrong usage of `section` element, replaced with `div`
- `9fb4498` - Karma config keys are sorted as @steia prefers alphabetical order everywhere
- `e1e3544` - Better message for checking `todos` in production mode
- `9ac2661` - Immutable should be lowercase, not uppercase
- `8b4be48` - Updated Readme (mention hot reload for Flux actions and stores as well)
- `3235e1e` - Update comment about piping hook.
- `87c73e4` - Update css-loader.
- `80821bf` - Git ignore updated
- `64ed4c1` - Updates to editorconfig
- `6e50fd3` - Updated Readme
- `95d5040` - Updated Readme
- `1c42f03` - Updated Readme
- `8176fb2` - Updated Readme
- `5ac0037` - Updated Readme
- `18b3d98` - Update gulp-eslint
- `ba23ec6` - Update eslint dep
- `0ce218b` - Editable component refactored
- `5652eb3` - Remove unused import
- `bd08d11` - Update toCheck method
- `fb951cf` - Renamed `users` to `user` #276
- `7524a16` - App cursor is removed as it was empty anyway
- `e019e8c` - Removed unused props from various components
- `eb137a2` - Better Express mounted messages, instead of Este.js - use `api`
- `6dfc24d` - Removed unused files
- `d6bfbec` - Use ES6 fat arrow instead of function where possible

### Bugs 
- `5306eb6` - Fixed non working ST3 link
- `d80b9b0` - Karma-dev doesn't run in production anymore
- `28b1dc5` - Fixed 404 error for static files in production
- `794449d` - Use `0.0.0.0` instead of localhost - accessing dev server from remote host works now (Note to Windows users - looks like `0.0.0.0` is not properly recognised, please submit an issue if needed)
