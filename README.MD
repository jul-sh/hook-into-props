# connectHooks ⛴

I don't think a HoC for hooks is a good idea long term, but it seemed fun to build.
Also, it may come in handy in some ways. It allows refactoring your HoCs into hooks without needing to also refactor all the classes that use them.

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
