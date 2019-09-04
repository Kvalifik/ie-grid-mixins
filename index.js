module.exports = function (css) {
  return {
    displayGrid: function () {
      return css`
        display: -ms-grid;
        display: grid;
      `
    }
  }
}
