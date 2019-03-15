# 🚢hookToProps

## Use hooks like higherOrders:

```jsx
class DisplayWindowSize extends React.Component {
  // ...
  render() {
    this.props.windowSize
  }
}

const useHooks = () => ({ windowSize: useWindowSize() }))

export default hookToProps(useHooks)(DisplayWindowSize)
```

## Installation

You can install it via `npm i hook-to-props`.
Alternatively you can copy the source code below, it's only a few lines.

## Under the hood

```jsx
// That's the entire source code, really.
const hookToProps = useHooks => Component => {
  const HooksProvider = props => <Component {...props} {...useHooks(props)} />

  return HooksProvider
}

export default hookToProps
```

`useHooks` is a custom hook used to format (or combine) the result of hook calls. It should return an object. `HookProvider` is a functional [Higher-Order-Component](https://reactjs.org/docs/higher-order-components.html). It calls `useHooks` and spreads the result as props.

(The fact that the hook calls in `useHooks` are only executed when `useHooks` is called is known as [lazy evaluation](https://stackoverflow.com/a/38904906). A function used to inject code into another component is also known as a [Thunk](https://en.wikipedia.org/wiki/Thunk).)

## More Examples

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

export default hookToProps(useHooks)(WindowDetails)
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

export default hookToProps(useHooks)(WindowDetails)
```
