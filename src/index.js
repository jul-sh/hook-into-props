import React from 'react'

const hookIntoProps = useHooks => Component => {
  const HooksProvider = React.forwardRef((props, ref) => (
    <Component ref={ref} {...props} {...useHooks(props)} />
  ))

  HooksProvider.displayName = `HookIntoProps(${Component.displayName ||
    Component.name ||
    'Component'})`

  return HooksProvider
}

export default hookIntoProps
