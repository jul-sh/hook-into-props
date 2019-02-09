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

export default connectHooks
