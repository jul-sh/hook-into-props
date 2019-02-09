// I'm not sure a HoC for hooks is a good idea, but it seemed fun to build.
// Also, it may come in handy when adding new code to old components.

import React from "react"

const connectHooks = hooks => Component => props => {
  const HookProvider = ({ hooks, Component }) => (
    <Component
      {...props}
      {...hooks.reduce(
        (accumulator, { hook, hookArgs, toProps }) => ({
          ...accumulator,
          ...toProps(hook(...hookArgs))
        }),
        {}
      )}
    />
  )

  return <HookProvider hooks={hooks} Component={Component} />
}

/* 
Use like so:

export default connectHooks([
  {
    hook: useFetch,
    hookArgs: ["https://swapi.co/api/people/1"],
    toProps: ([isLoading, data]) => ({ isLoading, data })
  }
])(
  class ClassComponent extends React.Component {
   // ...
   render () {
     this.props.isLoading ? "loading" : this.props.data
   }
  }
)

Compose hooks into higherOrders like so:

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
*/

export default connectHooks
