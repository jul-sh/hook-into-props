import React from 'react'
import connectToHooks from '../connectToHooks'

class ClassComponent extends React.Component {
  // ... (imagine legacy code here)
  handleChange = event => this.props.setValue(event.target.value)
  render() {
    return <textarea value={this.props.value} onChange={this.handleChange} />
  }
}

const useHooks = () => {
  const [value, setValue] = React.useState('Hello World!')

  return { value, setValue }
}

export default connectToHooks(useHooks)(ClassComponent)
