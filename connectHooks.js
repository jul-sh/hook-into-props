import React from "react"

const connectHooks = hooks => Component => props => {
  const HookProvider = () => (
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

  return <HookProvider />
}

export default connectHooks
