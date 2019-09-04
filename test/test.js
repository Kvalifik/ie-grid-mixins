/* globals describe, it */

var assert = require('assert')
var equal = assert.deepStrictEqual

/*
  This css stand-in function simply returns all arguments.
  However a few subtle changes are made to the raw arguments:

  The first argument is an array of strings,
  and each of these are stripped of new-lines and spaces.
  All other arguments are converted to strings,
  even though they might be of other types initially.

  These changes are made so it is easy to test,
  and note that spaces and new-lines are optional in css, which makes it safe test without them.
*/

function css () {
  const args = Array.from(arguments).map(arg => {
    if (Array.isArray(arg)) {
      return arg.map(subArg => subArg
        .toString()
        .replace(/\n/g, '')
        .replace(/\s*/g, ''))
    } else {
      return arg
        .toString()
    }
  })

  return args
}

var mixin = require('..')(css)

describe('display', function () {
  it('should return correct value on "display: static"', function () {
    equal(mixin('display: static'), [
      ['display:', ';'],
      'static'
    ])
  })

  it('should return correct value on "display: grid"', function () {
    equal(mixin('display: grid'), [
      ['display:-ms-grid;display:grid;']
    ])
  })
})

describe('grid-column', function () {
  it('should support short-hand syntax', function () {
    equal(mixin('grid-column: 1 / 2'), [
      ['-ms-grid-column:', ';-ms-grid-column-span:', ';grid-column:', ';'],
      '1',
      '1',
      '1 / 2'
    ])
  })

  it('should support optional span syntax', function () {
    equal(mixin('grid-column: 1'), [
      ['-ms-grid-column:', ';-ms-grid-column-span:', ';grid-column:', ';'],
      '1',
      '1',
      '1'
    ])
  })
})

describe('grid-row', function () {
  it('should support short-hand syntax', function () {
    equal(mixin('grid-row: 1 / 2'), [
      ['-ms-grid-row:', ';-ms-grid-row-span:', ';grid-row:', ';'],
      '1',
      '1',
      '1 / 2'
    ])
  })

  it('should support optional span syntax', function () {
    equal(mixin('grid-row: 1'), [
      ['-ms-grid-row:', ';-ms-grid-row-span:', ';grid-row:', ';'],
      '1',
      '1',
      '1'
    ])
  })
})

describe('grid-template-columns', function () {
  it('should support single column', function () {
    equal(mixin('grid-template-columns: 1fr'), [
      ['-ms-grid-columns:', ';grid-template-columns:', ';'],
      '1fr',
      '1fr'
    ])
  })

  it('should support multiple columns', function () {
    equal(mixin('grid-template-columns: 1fr 2fr 3fr'), [
      ['-ms-grid-columns:', ';grid-template-columns:', ';'],
      '1fr 2fr 3fr',
      '1fr 2fr 3fr'
    ])
  })

  it('should support repeat function', function () {
    equal(mixin('grid-template-columns: repeat(12, 1fr 20px) 1fr'), [
      ['-ms-grid-columns:', ';grid-template-columns:', ';'],
      '(1fr 20px)[12] 1fr',
      'repeat(12, 1fr 20px) 1fr'
    ])
  })

  it('should support minmax function', function () {
    equal(mixin('grid-template-columns: minmax(200px, 500px)'), [
      ['-ms-grid-columns:', ';grid-template-columns:', ';'],
      'minmax(200px, 500px)',
      'minmax(200px, 500px)'
    ])
  })

  it('should support minmax function inside repeat', function () {
    equal(mixin('grid-template-columns: repeat(12, minmax(200px, 1fr))'), [
      ['-ms-grid-columns:', ';grid-template-columns:', ';'],
      '(minmax(200px, 1fr))[12]',
      'repeat(12, minmax(200px, 1fr))'
    ])
  })

  it('should throw an exception if you use auto fit', function () {
    assert.throws(function () {
      mixin('grid-template-columns: repeat(auto-fit, minmax(200px, 1fr))')
    })
  })

  it('should throw an exception if you use auto fill', function () {
    assert.throws(function () {
      mixin('grid-template-columns: repeat(auto-fill, minmax(200px, 1fr))')
    })
  })
})

describe('grid-template-rows', function () {
  it('should support single row', function () {
    equal(mixin('grid-template-rows: 1fr'), [
      ['-ms-grid-rows:', ';grid-template-rows:', ';'],
      '1fr',
      '1fr'
    ])
  })

  it('should support multiple rows', function () {
    equal(mixin('grid-template-rows: 1fr 2fr 3fr'), [
      ['-ms-grid-rows:', ';grid-template-rows:', ';'],
      '1fr 2fr 3fr',
      '1fr 2fr 3fr'
    ])
  })

  it('should support repeat function', function () {
    equal(mixin('grid-template-rows: repeat(12, 1fr 20px) 1fr'), [
      ['-ms-grid-rows:', ';grid-template-rows:', ';'],
      '(1fr 20px)[12] 1fr',
      'repeat(12, 1fr 20px) 1fr'
    ])
  })

  it('should support minmax function', function () {
    equal(mixin('grid-template-rows: minmax(200px, 500px)'), [
      ['-ms-grid-rows:', ';grid-template-rows:', ';'],
      'minmax(200px, 500px)',
      'minmax(200px, 500px)'
    ])
  })

  it('should support minmax function inside repeat', function () {
    equal(mixin('grid-template-rows: repeat(12, minmax(200px, 1fr))'), [
      ['-ms-grid-rows:', ';grid-template-rows:', ';'],
      '(minmax(200px, 1fr))[12]',
      'repeat(12, minmax(200px, 1fr))'
    ])
  })

  it('should throw an exception if you use auto fit', function () {
    assert.throws(function () {
      mixin('grid-template-rows: repeat(auto-fit, minmax(200px, 1fr))')
    })
  })

  it('should throw an exception if you use auto fill', function () {
    assert.throws(function () {
      mixin('grid-template-rows: repeat(auto-fill, minmax(200px, 1fr))')
    })
  })
})

describe('align-self', function () {
  it('should return correct value', function () {
    equal(
      mixin('align-self: center'),
      [
        ['-ms-grid-row-align:', ';align-self:', ';'],
        'center',
        'center'
      ]
    )
  })
})

describe('justify-self', function () {
  it('should return correct value', function () {
    equal(
      mixin('justify-self: center'),
      [
        ['-ms-grid-column-align:', ';justify-self:', ';'],
        'center',
        'center'
      ]
    )
  })
})

describe('mixin.all', function () {
  it('should support multiple rules', function () {
    equal(
      mixin.all([
        'display: grid',
        'grid-template-columns: 1fr 2fr'
      ]),
      [
        ['', '', ''],
        ['display:-ms-grid;display:grid;'],
        [
          '-ms-grid-columns:,;grid-template-columns:,;',
          '1fr2fr',
          '1fr2fr'
        ]
      ]
    )
  })
})

describe('misc', function () {
  it('should throw an exception on an invalid keyword', function () {
    assert.throws(function () {
      mixin('position: absolute')
    })
  })
})
