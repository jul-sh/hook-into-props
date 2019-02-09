# connectHooks ⛴

I'm not sure a HoC for hooks is a good idea, but it seemed fun to build.
Also, it may come in handy when adding new code to old components.

#### Use like so:

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

#### Compose hooks into higherOrders like so:

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
