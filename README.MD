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

`connectHooks` allows you to refactor your existing HoCs into hooks without needing to also refactor all your class based components that use them.

Simply rewrite your existing HoC into a custom hook. That makes it easy to consume in your newer functional components. Then use `connectHooks` to recreate the former HoC.

## Installation

Simply paste the content of `connectHooks.js` into your codebase, it's only 20 lines of code. :3
