import React from 'react'

const connectHooks = getHookValues => Component => props => {
  const HookProvider = () => <Component {...props} {...getHookValues()} />

  return <HookProvider />
}

export default connectHooks
