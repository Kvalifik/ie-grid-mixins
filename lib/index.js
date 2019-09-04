function convertRepeatFunction (value) {
  return value.replace(/repeat\(.+\)/g, function (str) {
    const times = str.match(/.*,/)[0].replace(/,.*$/, '').replace(/^repeat\(/, '')
    const pattern = str.match(/,.*$/)[0].replace(/^,\s*/, '').replace(/\s*\)$/, '')
    return [
      '(',
      pattern,
      ')[',
      times,
      ']'
    ].join('')
  })
}

function failIfAutoPlacement (value) {
  if (value.indexOf('auto-fit') > -1 || value.indexOf('auto-fill') > -1) {
    throw new Error('auto-fit and auto-fill not supported in IE. Do something else.')
  }
}

module.exports = function (css) {
  if (typeof css !== 'function') {
    throw new Error('Argument "css" must be a valid function.')
  }

  const mixins = {
    'display': function (value) {
      if (value === 'grid') {
        return css`
          display: -ms-grid;
          display: grid;
        `
      } else {
        return css`
          display: ${value};
        `
      }
    },
    'grid-column': function (value) {
      const split = value.split(/\s+\/\s+/)
      const start = split[0]
      const end = split[1]
      const span = end ? end - start : '1'

      return css`
        -ms-grid-column: ${start};
        -ms-grid-column-span: ${span};
        grid-column: ${value};
      `
    },
    'grid-row': function (value) {
      const split = value.split(/\s+\/\s+/)
      const start = split[0]
      const end = split[1]
      const span = end ? end - start : '1'

      return css`
        -ms-grid-row: ${start};
        -ms-grid-row-span: ${span};
        grid-row: ${value};
      `
    },
    'grid-template-columns': function (value) {
      failIfAutoPlacement(value)
      const ieValue = convertRepeatFunction(value)

      return css`
        -ms-grid-columns: ${ieValue};
        grid-template-columns: ${value};
      `
    },
    'grid-template-rows': function (value) {
      failIfAutoPlacement(value)
      const ieValue = convertRepeatFunction(value)

      return css`
        -ms-grid-rows: ${ieValue};
        grid-template-rows: ${value};
      `
    },
    'align-self': function (value) {
      return css`
        -ms-grid-row-align: ${value};
        align-self: ${value};
      `
    },
    'justify-self': function (value) {
      return css`
        -ms-grid-column-align: ${value};
        justify-self: ${value};
      `
    }
  }

  function mixin (expression) {
    const split = expression.split(':')
    // Remove leading and trailing spaces
    const key = split[0].replace(/(^\s*|\s*$)/g, '')
    const value = split[1].replace(/(^\s*|\s*$)/g, '').replace(/;$/, '')

    const func = mixins[key]

    if (!func) {
      throw new Error('Grid key ' + key + ' not supported.')
    }

    return func(value)
  }

  mixin.all = function (rules) {
    return css.apply(
      null,
      [new Array(rules.length + 1).fill('')]
        .concat(
          rules.map(rule => mixin(rule))
        )
    )
  }

  return mixin
}
