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

## Under the hood

Source code:

```jsx
const connectHooks = getHookValues => Component => {
  const HooksProvider = props => <Component {...props} {...getHookValues(props)} />

  return HooksProvider
}
```

According to the React docs, [hooks should only be called from React function components](https://reactjs.org/docs/hooks-overview.html#rules-of-hooks). So why can we call hooks in `getHookValues`, even though it is not a React component?

The hook calls in `getHookValues` are only evaluated once that function is called. (A concept known as [lazy evaluation](https://stackoverflow.com/a/38904906)). We call `getHookValues` inside of the HookProvider [Higher-Order-Component](https://reactjs.org/docs/higher-order-components.html). Since `getHookValues` is ultimately called from a React function component, our hook calls are properly processed.

For more background see Ryan Florence's [Using Hooks in Classes](https://reacttraining.com/blog/using-hooks-in-classes/).

## But why?

Using `connectHooks` you can start using the shiny new react hooks, without worrying about breaking support for old class components.

## Advanced Examples

Combining multiple hooks into a single HoC:

```jsx
class WindowDetails extends React.Component {
  // ...
  render() {
    this.props.windowSize + ' ' + this.props.scrollPosition
  }
}

const withWindowSizeAndScrollPosition = connectHooks(() => {
  const windowSize = useWindowSize()
  const scrollPosition = useWindowScrollPosition()

  return { windowSize, scrollPosition }
})

export default withWindowSizeAndScrollPosition(WindowDetails)
```

Using props with hooks:

```jsx
class SearchResults extends React.Component {
  // ...
  render() {
    this.props.isLoading ? 'loading' : this.props.searchResults
  }
}

const withHooks = connectHooks(props => {
  const [isLoading, searchResults] = useFetch(
    `https://foo.com/?search=${props.searchTerm}`
  )

  return { isLoading, searchResults }
})

export default withHooks(WindowDetails)
```

```jsx
<SearchResults searchTerm={searchTerm}>
```
