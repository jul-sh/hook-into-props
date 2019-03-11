# 🚢connectHooks

##### Summary

`connectHooks` allows you to replace HoCs with hooks without needing to also refactor all your class components. The API for this abstraction is still experimental and hasn't been applied to a large codebase. For alternate API proposals, check the different branches. :)

##### In detail

You may find yourself wanting to rewrite a HoC into a custom hook, since they are easier to consume in functional components. Usually that would mean that would have to refactor all the class components that use that HoC, since you cannot use hooks in React classes. However, with `connectHooks` can recreate the former HoC and continue supporting your class components.

### Use hooks in class components like so:

```jsx
export default connectHooks([
  {
    hook: useFetch,
    hookArgs: ['https://swapi.co/api/people/1'],
    toProps: ([isLoading, data]) => ({ isLoading, data })
  }
])(
  class ClassComponent extends React.Component {
    // ...
    render() {
      this.props.isLoading ? 'loading' : this.props.data
    }
  }
)
```

### Convert hooks to higherOrders like so:

```jsx
const withWindowSize = connectHooks([
  {
    hook: useWindowSize,
    toProps: windowSize => ({ windowSize })
  }
])
```

```jsx
// You can also combine multiple hooks:

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

```jsx
// HoC with dynamic arguments

const withFetch = url =>
  connectHooks([
    {
      hook: useFetch,
      hookArgs: [url],
      toProps: ([isLoading, data]) => ({ isLoading, data })
    }
  ])

class ClassComponent extends React.Component {
  // ...
  render() {
    this.props.isLoading ? 'loading' : this.props.data
  }
}

export default withFetch('https://swapi.co/api/people/1')(ClassComponent)
```
