import React from "react"

const connectHooks = getHookValues => Component => {
  const HooksProvider = props => (
    <Component {...props} {...getHookValues(props)} />
  )

  return HooksProvider
}

export default connectHooks
