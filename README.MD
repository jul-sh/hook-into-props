# 🚢 hookIntoProps

- [Introduction](#Introduction)
- [Installation](#Installation)
- [Examples](#Examples)
  - [Using props with hooks](#Using-props-with-hooks)
  - [Using multiple hooks](#Using-multiple-hooks)
  - [Exporting Higher-Order-Components](#Exporting-Higher-Order-Components)
- [Under the hood](#Under-the-hood)
- [Alternatives](#Alternatives)
  - [Without abstractions](#Without-abstractions)
  - [Render-props](#Render-props)
  - [Refactoring to functional components](#Rewriting-your-class-as-a-functional-component)

## Introduction

```jsx
class DisplayWindowSize extends React.Component {
  render() {
    return this.props.windowSize
  }
}

const useHooks = () => ({ windowSize: useWindowSize() })

export default hookIntoProps(useHooks)(DisplayWindowSize)
```

## Installation

You can install it via `npm i hook-into-props`. (200 bytes + 1kb dependencies. See [bundle-phobia](https://bundlephobia.com/result?p=hook-into-props))

Alternatively you can copy the [source code](src/index.js), it's only a few lines. If you don't feel like adding any abstractions at all, check out [without-abstractions](#without-abstractions).

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
import React from 'react'
import { ReferralCode, TimezoneOffset, FeatureList } from '~/contexts'

class UserForm extends React.Component {
  componentDidMount() {
    const { referralCode, timezoneOffset, featureList } = this.props
    // ...
  }
  render() {
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

### Exporting Higher-Order-Components

```jsx
const useHooks = () => ({ windowSize: useWindowSize() })

export const withWindowSize = hookIntoProps(useHooks)
```

## Under the hood

That's the (simplified) [source code](src/index.js):

```jsx
const hookIntoProps = useHooks => Component => {
  const HooksProvider = props => <Component {...props} {...useHooks(props)} />

  return HooksProvider
}
```

(The hook calls in `useHooks` are only executed when `useHooks` is called inside of `HooksProvider`. This is a concept known as [lazy evaluation](https://stackoverflow.com/a/38904906). A function passed to be executed in another component is also known as a [Thunk](https://en.wikipedia.org/wiki/Thunk).)

## Alternatives

### Without abstractions

To avoid any helpers at all, we could inline a functional component in the export statement.

```jsx
class DisplayWindowSize extends React.Component {
  render() {
    return this.props.isLoading ? 'loading' : this.props.searchResults
  }
}

export default function HooksProvider(props) {
  const [isLoading, searchResults] = useFetch(
    `https://foo.com/?search=${props.searchTerm}`
  )

  return (
    <DisplayWindowSize
      {...props}
      isLoading={isLoading}
      searchResults={searchResults}
    />
  )
}
```

This can work very well for simple cases. It lays out the logic in a verbose manner.

There's some caveats to this though. First, the export must be a named function declaration, as else you end up with an odd React tree of `Unkown` components. Secondly, with more complexity, this can become harder to read. It becomes more difficult to see at a glance which component is really being exported. Also, you'll have to remember to manually spread props every time.

### Render-props

We could also create a simple Component that allows us to consume hooks through render-props:

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

This looks clean, but we won't have access to the hook result in our other class methods. This can make it poor choice for supporting existing class components.

### Rewriting your class as a functional component

You could also refactor your class component and directly use hooks inside your new function component. However, refactoring existing classes isn't always an option. Being able to use your new hooks with your old code can be convenient.
