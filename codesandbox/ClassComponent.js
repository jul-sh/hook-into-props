import React from 'react'
import connectHooks from '../connectHooks'

export default connectHooks(() => {
  const [value, setValue] = React.useState('Hello World!')

  return { value, setValue }
})(
  class ClassComponent extends React.Component {
    // ... (imagine legacy code here)
    handleChange = event => this.props.setValue(event.target.value)
    render() {
      return <textarea value={this.props.value} onChange={this.handleChange} />
    }
  }
)
