[![CircleCI](https://circleci.com/gh/este/este/tree/next.svg?style=svg)](https://circleci.com/gh/este/este/tree/next)

# Next Este (WIP)

NPM scripts notes

- build must contain only `next build` because it's called in Now where additional build steps slow down building and can be buggy as well.
- rimrafBabelCache deletes babel cache, env-config needs it sometimes.

Other notes

- __generated__ dirs are stored in repo because deployment to Zeit Now. I don't
know how to set Now deploy to add git ignored files. I also don't know how to
run npm relay in Now cloud, because it depends on watchman.
