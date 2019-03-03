# 🚢connectHooks

## How to use:

### Use hooks in class components like so:

```jsx
export default connectHooks([
  {
    hook: useFetch,
    hookArgs: ['https://swapi.co/api/people/1'],
    toProps: ([isLoading, data]) => ({ isLoading, data })
  }
])(
  class ClassComponent extends React.Component {
    // ...
    render() {
      this.props.isLoading ? 'loading' : this.props.data
    }
  }
)
```

### Convert hooks to higherOrders like so:

```jsx
const withWindowSize = connectHooks([
  {
    hook: useWindowSize,
    toProps: windowSize => ({ windowSize })
  }
])
```

```jsx
// You can also combine multiple hooks:

const withWindowSizeAndScrollPosition = connectHooks([
  {
    hook: useWindowScrollPosition,
    toProps: scrollPosition => ({ scrollPosition })
  },
  {
    hook: useWindowSize,
    toProps: windowSize => ({ windowSize })
  }
])
```

## Purpose:

##### Summary

`connectHooks` allows you to replace HoCs with hooks without needing to also refactor all your class components.

##### In detail

You may find yourself wanting to rewrite a HoC into a custom hook, since they are easier to consume in functional components. Usually that would mean that would have to refactor all the class components that use that HoC, since you cannot use hooks in React classes. However, with `connectHooks` can recreate the former HoC and continue supporting your class components.

## Installation

You can add [connectHooks.js](connectHooks.js) directly to your codebase. It's depency free and only 20 lines of code. :3
