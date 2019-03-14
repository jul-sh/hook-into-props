# 🚢connectHooks

## Use hooks like higherOrders:

```jsx
class DisplayWindowSize extends React.Component {
  // ...
  render() {
    this.props.windowSize
  }
}

const HooksThumb = () => ({ windowSize: useWindowSize() }))

export default connectHooks(HooksThumb)(DisplayWindowSize)
```

## Under the hood

Source code:

```jsx
const connectHooks = HooksThumb => Component => {
  const HooksProvider = props => <Component {...props} {...HooksThumb(props)} />

  return HooksProvider
}
```

The hook calls in `HooksThumb` are only evaluated once that function is called. (A concept known as [lazy evaluation](https://stackoverflow.com/a/38904906)). We call `HooksThumb` inside of the `HookProvider` [Higher-Order-Component](https://reactjs.org/docs/higher-order-components.html). Since `HooksThumb` is called from a React function component, our hook calls are properly processed.

## Advanced Examples

Using multiple hooks into a single HoC:

```jsx
class WindowDetails extends React.Component {
  // ...
  render() {
    this.props.windowSize + ' ' + this.props.scrollPosition
  }
}

const HooksThumb = () => {
  const windowSize = useWindowSize()
  const scrollPosition = useWindowScrollPosition()

  return { windowSize, scrollPosition }
}

export default connectHooks(HooksThumb)(WindowDetails)
```

Using props with hooks:

```jsx
class SearchResults extends React.Component {
  // ...
  render() {
    this.props.isLoading ? 'loading' : this.props.searchResults
  }
}

const HooksThumb = props => {
  const [isLoading, searchResults] = useFetch(
    `https://foo.com/?search=${props.searchTerm}`
  )

  return { isLoading, searchResults }
}

export default connectHooks(HooksThumb)(WindowDetails)
```
