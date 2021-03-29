# 🚢 hook-into-props

## Introduction

```jsx
import React from 'react'
import hookIntoProps from 'hook-into-props'

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

Alternatively you can copy the [source code](index.js), it's only a few lines. If you don't feel like adding any abstractions at all, check out [without-abstractions](#without-abstractions).

## Examples

### Using props with hooks

```jsx
import React from 'react'
import hookIntoProps from 'hook-into-props'

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

export default hookIntoProps(useHooks)(SearchResults)
```

### Using multiple hooks

```jsx
import React from 'react'
import hookIntoProps from 'hook-into-props'
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

export default hookIntoProps(useHooks)(UserForm)
```

### Exporting Higher-Order-Components

```jsx
export const withWindowSize = hookIntoProps(() => ({
  windowSize: useWindowSize()
}))
```

## Under the hood

That's the (simplified) [source code](index.js):

```jsx
function hookIntoProps(useHooks) {
  return function(Component) {
    return function HooksProvider(props) {
      return <Component {...props} {...useHooks(props)} />
    }
  }
}
```

(The hook calls in `useHooks` are only executed when `useHooks` is called inside of `HooksProvider`. At that point they are called within a function component, where we can use hooks. The results of our hook calls are passed as props)

## Alternatives

### Without abstractions

To avoid any helpers at all, we could inline a functional component in the export statement.

```jsx
import React from 'react'

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
import React from 'react'

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

### Rewriting your class as a function component

You could also refactor your class component and directly use hooks inside your new function component. However, refactoring existing classes isn't always an option.

Being able to use hooks with your old code can be convenient. It actually allows you to refactor existing higher order components to hooks without breaking support for your existing class components.
