import React from 'react'

const hookToProps = useHooks => Component => {
  const HooksProvider = props => <Component {...props} {...useHooks(props)} />

  return HooksProvider
}

export default hookToProps
