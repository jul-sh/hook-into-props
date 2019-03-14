import React from 'react'

const connectToHooks = useHooks => Component => {
  const HooksProvider = props => <Component {...props} {...useHooks(props)} />

  return HooksProvider
}

export default connectToHooks
