// temporary fix, see https://github.com/facebookincubator/create-react-app/issues/3199 and https://github.com/facebook/jest/issues/4545
global.requestAnimationFrame = (cb) => {
  setTimeout(cb, 0)
}
