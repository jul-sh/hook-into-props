import React from "react"
import connectHooks from "../connectHooks"

class ClassComponent extends React.Component {
  // ... (imagine legacy code here)
  handleChange = event => this.props.setValue(event.target.value)
  render() {
    return <textarea value={this.props.value} onChange={this.handleChange} />
  }
}

const HooksThumb = () => {
  const [value, setValue] = React.useState("Hello World!")

  return { value, setValue }
}

export default connectHooks(HooksThumb)(ClassComponent)
