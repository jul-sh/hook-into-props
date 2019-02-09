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

##### Or use them directly like so:

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

Using probably isn't a good idea longterm, it basically defeats the point of react hooks. That said, it may actually come in handy for a while.
Using this, you can refactor your codebase's existing HoCs into hooks while continuing to use them with your old class components. Also, it was fun to code 😉.