# 🚢connectHooks

## Convert hooks to higherOrders like so:

```jsx
class DisplayWindowSize extends React.Component {
  // ...
  render() {
    this.props.windowSize
  }
}

const withWindowSize = connectHooks(() => ({ windowSize: useWindowSize() }))

export default withWindowSize(DisplayWindowSize)
```

```jsx
// You can also combine multiple hooks into a single HoC:
const withWindowSizeAndScrollPosition = connectHooks(() => {
  const windowSize = useWindowSize()
  const scrollPosition = useWindowScrollPosition()

  return { windowSize, scrollPosition }
})
```

## But why?

Using `connectHooks` you can start using the shiny new react hooks, without worrying about breaking support for old class components.

Note that this helper and its API are still experimental. It hasn't yet been used in a major codebase.
