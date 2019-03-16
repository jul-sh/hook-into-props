# 🚢 hookToProps

## Use hooks like higherOrders:

```jsx
class DisplayWindowSize extends React.Component {
  render() {
    this.props.windowSize
  }
}

const useHooks = () => ({ windowSize: useWindowSize() }))

export default hookToProps(useHooks)(DisplayWindowSize)
```

## Installation

You can install it via `npm i hook-to-props`. (120 bytes gzipped).

Alternatively you can copy the source code below, it's only a few lines.

## Under the hood

```jsx
// That's the entire source code, really.
const hookToProps = useHooks => Component => {
  const HooksProvider = props => <Component {...props} {...useHooks(props)} />

  return HooksProvider
}
```

`useHooks` is a custom hook that used to call, format and combine React hooks. It can return an object which is spread to the props of the passed component. `HookProvider` is a functional [Higher-Order-Component](https://reactjs.org/docs/higher-order-components.html). It allows us to call react hooks & add aditional props to our component.

(The fact that the hook calls in `useHooks` are only executed when `useHooks` is called is known as [lazy evaluation](https://stackoverflow.com/a/38904906). A function used to inject code into another component is also known as a [Thunk](https://en.wikipedia.org/wiki/Thunk).)

## More Examples

Using props with hooks:

```jsx
class SearchResults extends React.Component {
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

Using multiple hooks:

```jsx
class WindowDetails extends React.Component {
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
