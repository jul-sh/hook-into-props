import React from "react"
import connectHooks from "../connectHooks"

export default connectHooks([
  {
    hook: React.useState,
    hookArgs: ["Hello World!"],
    toProps: ([value, setValue]) => ({ value, setValue })
  }
])(
  class ClassComponent extends React.Component {
    // ...
    handleChange = event => this.props.setValue(event.target.value)
    render() {
      return <textarea value={this.props.value} onChange={this.handleChange} />
    }
  }
)
