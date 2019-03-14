# 🚢connectToHooks

## Use hooks like higherOrders:

```jsx
class DisplayWindowSize extends React.Component {
  // ...
  render() {
    this.props.windowSize
  }
}

const useHooks = () => ({ windowSize: useWindowSize() }))

export default connectToHooks(useHooks)(DisplayWindowSize)
```

## Under the hood

```jsx
// That's the entire source code, really.
const connectToHooks = useHooks => Component => {
  const HooksProvider = props => <Component {...props} {...useHooks(props)} />

  return HooksProvider
}

export default connectToHooks
```

`useHooks` is a custom hook that combines our hooks and returns them in an object that can be passed to the props. Is called in the `useHooks` `HookProvider` [Higher-Order-Component](https://reactjs.org/docs/higher-order-components.html) Since `useHooks` is called from a React function component, our hook calls are properly processed.

The fact that the hook calls in `useHooks` are only executed when `useHooks` is called is known as [lazy evaluation](https://stackoverflow.com/a/38904906). A function used to inject code into another component is also known as a [Thunk](https://en.wikipedia.org/wiki/Thunk).

## Advanced Examples

Using multiple hooks:

```jsx
class WindowDetails extends React.Component {
  // ...
  render() {
    this.props.windowSize + ' ' + this.props.scrollPosition
  }
}

const useHooks = () => {
  const windowSize = useWindowSize()
  const scrollPosition = useWindowScrollPosition()

  return { windowSize, scrollPosition }
}

export default connectToHooks(useHooks)(WindowDetails)
```

Using props with hooks:

```jsx
class SearchResults extends React.Component {
  // ...
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

export default connectToHooks(useHooks)(WindowDetails)
```
