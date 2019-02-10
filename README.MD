# 🚢connectHooks 

##### Convert hooks to higherOrders like so:

```jsx
const withWindowSize = connectHooks([
  {
    hook: useWindowSize,
    toProps: windowSize => ({ windowSize })
  }
])
```

```jsx
// You can also combine multiple hooks into one HoC:

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

##### Or use connectHooks directly like so:

```jsx
export default connectHooks([
  {
    hook: useFetch,
    hookArgs: ["https://swapi.co/api/people/1"],
    toProps: ([isLoading, data]) => ({ isLoading, data })
  }
])(
  class ClassComponent extends React.Component {
    // ...
    render() {
      this.props.isLoading ? "loading" : this.props.data
    }
  }
)
```

example: https://codesandbox.io/s/qk6r33649q

Using this, you can refactor your codebase's existing HoCs into hooks while continuing to use them with your old class components. 

Long term however, this pattern probably isn't that helpful. Hooks elimate the need for class components, and in functional components you can call hooks directly.

It can help with the transition period though, and it was fun to code 😉.