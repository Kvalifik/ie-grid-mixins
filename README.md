# ie-grid-mixins
A collection of mixins to write IE compliant grid styling in Styled Components

## Install

`npm install Kvalifik/ie-grid-mixins`

## Usage

You can actually just call the function from anywhere, but I would suggest that you reference it in your theme to make it available everywhere. Also you should use it with **styled-components**.

### Include it in your theme

```js
import ieGridMixin from 'ie-grid-mixins'
import { css } from 'styled-components'

export const theme = {
  /* ... */
  grid: ieGridMixin(css)
}
```

### Use the function

```js
const MyComponent = styled.div`
  ${theme.grid(expression)}
`
```

Example expressions:

`display: grid`

`grid-column: 1 / 2`

`grid-row: 1 / 2`

`grid-template-columns: 1fr 2fr`

`grid-template-columns: repeat(12, minmax(240px, 1fr))`

`grid-template-rows: 1fr 2fr`

`grid-template-columns: repeat(3, 1fr)`


### Declare multiple rules at once

If you want to, you can delare multiple rules inside an array by calling `mixin.all`.

```js
const MyComponent = styled.div`
  ${theme.grid.all([
    'display: grid',
    'grid-template-columns: 1fr 2fr'
  ])}
`
