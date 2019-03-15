import React from 'react'

const hookToProps = useHooks => Component => {
  const HookResultProvider = props => <Component {...props} {...useHooks(props)} />

  return HookResultProvider
}

export default hookToProps
