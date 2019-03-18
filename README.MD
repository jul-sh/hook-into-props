# 🚢 hookIntoProps

- [Introduction](#Introduction)
- [Installation](#Installation)
- [Examples](#Examples)
  - [Using props with hooks](#Using-props-with-hooks)
  - [Using multiple hooks](#Using-multiple-hooks)
  - [Reusable-Higher-Order-Components](#Reusable-Higher-Order-Components)
  - [Replacing the old context API](#Replacing-the-old-context-API)
- [Under the hood](#Under-the-hood)
- [Alternatives](#Alternatives)
  - [Render-props](#Render-props)
  - [withReactHooks](#withReactHooks)

## Introduction

```jsx
class DisplayWindowSize extends React.Component {
  render() {
    this.props.windowSize
  }
}

const useHooks = () => ({ windowSize: useWindowSize() })

export default hookIntoProps(useHooks)(DisplayWindowSize)
```

## Installation

You can install it via `npm i hook-into-props`. (~ 200 bytes gzipped).

Alternatively you can copy the [source code](src/index.js), it's only a few lines.

## Examples

### Using props with hooks

```jsx
class SearchResults extends React.Component {
  render() {
    this.props.isLoading ? 'loading' : this.props.searchResults
  }
}

const useHooks = props => {
  const [isLoading, searchResults] = useFetch(
    `https://foo.com/?search=${props.searchTerm}`
  )

  return { isLoading, searchResults }
}

export default hookIntoProps(useHooks)(WindowDetails)
```

### Using multiple hooks

```jsx
class WindowDetails extends React.Component {
  render() {
    this.props.windowSize + ' ' + this.props.scrollPosition
  }
}

const useHooks = () => {
  const windowSize = useWindowSize()
  const scrollPosition = useWindowScrollPosition()

  return { windowSize, scrollPosition }
}

export default hookIntoProps(useHooks)(WindowDetails)
```

### Reusable Higher-Order-Components

```jsx
const useHooks = () => ({ windowSize: useWindowSize() })

export const withWindowSize = hookIntoProps(useHooks)
```

### Replacing the old context API

```jsx
/* Old, slow context api 😢 */

import React from 'react'

class UserDetails extends React.Component {
  render() {
    const { referralCode, timezoneOffset, featureList } = this.context
    // ...
  }
}

UserDetails.contextTypes = {
  referralCode: PropTypes.string,
  timezoneOffset: PropTypes.number,
  featureList: PropTypes.arrayOf(PropTypes.string)
}

export default UserDetails
```

```jsx
/* refactored to the new context API ✨ */

import React from 'react'
import { ReferralCode, TimezoneOffset, FeatureList } from '~/contexts'

class UserDetails extends React.Component {
  render() {
    const { referralCode, timezoneOffset, featureList } = this.props
    // ...
  }
}

const useHooks = () => ({
  referralCode: useContext(ReferralCode),
  timezoneOffset: useContext(TimezoneOffset),
  featureList: useContext(FeatureList)
})

export default hookIntoProps(useHooks)(DisplayWindowSize)
```

## Under the hood

```jsx
// That's the basic source code:
const hookIntoProps = useHooks => Component => {
  const HooksProvider = props => <Component {...props} {...useHooks(props)} />

  return HooksProvider
}
```

The `useHooks` argument should be a custom hook. It can be that used to call, format and combine React hooks. We can use it to return an object which is spread to the props of the passed component. `HookProvider` is a functional [Higher-Order-Component](https://reactjs.org/docs/higher-order-components.html). It allows us to call react hooks & add aditional props to our component.

(The fact that the hook calls in `useHooks` are only executed when `useHooks` is called is known as [lazy evaluation](https://stackoverflow.com/a/38904906). A function used to inject code into another component is also known as a [Thunk](https://en.wikipedia.org/wiki/Thunk).)

## Alternatives

### Render-props

We could also create a simple Component that allows us to use consume hooks through render-props:

```jsx
const HookProvider = ({ children, useHooks }) => children(useHooks())

class DisplayWindowSize extends React.Component {
  render() {
    return (
      <HookProvider useHooks={() => useWindowSize()}>
        {windowSize => <span>{windowSize}</span>}
      </HookProvider>
    )
  }
}
```

While this looks clean, I'm not sure it's really all that useful. Here, `HookProvider` must be called in the render method, meaning we won't have access to the hook result in our class methods. At that point, we could also write a functional component and call hooks directly.

### withReactHooks

[withReactHooks](https://github.com/kesne/with-react-hooks) is a HoC that allows you to call hooks directly in a class component's render method. I would advise against this approach as well.

Not only does it suffer from the same caveats as the render-props approach, but it relies on [mutating the passed Component's render method](https://github.com/kesne/with-react-hooks/blob/master/src/index.tsx). The React documentation explicitly [warns against this](https://reactjs.org/docs/higher-order-components.html#dont-mutate-the-original-component-use-composition). Instead of mutation, composition is recommended, which is the approach taken by `hookIntoProps`.
