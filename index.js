import React from 'react'
import hoistNonReactStatics from 'hoist-non-react-statics'

const hookIntoProps = useHooks => Component => {
  const HooksProvider = props =>
    React.createElement(Component, { ...props, ...useHooks(props) })

  HooksProvider.displayName = `HookIntoProps(${Component.displayName ||
    Component.name ||
    'Component'})`

  return hoistNonReactStatics(HooksProvider, Component)
}

export default hookIntoProps
