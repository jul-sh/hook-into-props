import React from "react"

const connectHooks = HooksThumb => Component => {
  const HooksProvider = props => <Component {...props} {...HooksThumb(props)} />

  return HooksProvider
}

export default connectHooks
