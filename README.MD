# connectHooks ⛴

This probably isn't a good idea longterm, it basically defeats the point of react hook. That said, it may actually come in handy for a while.
If you use `connectHooks`, you can refactor your HoCs into hooks without needing to immediatedly refactor all your classes that are using them.

#### Use it directly like so:

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

#### Or compose hooks into higherOrders like so:

```jsx
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
