require('jest-dom/extend-expect')
require('react-testing-library/cleanup-after-each')

const React = require('react')
const { render, waitForElement, fireEvent } = require('react-testing-library')
const hookIntoProps = require('../dist/index.js')

class ExampleComponent extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange() {
    this.props.setCount(count => count + 1)
  }
  render() {
    return React.createElement(
      'div',
      {},
      React.createElement('h1', {}, `Hello ${this.props.name || 'stranger'}!`),
      React.createElement('span', {}, `Count: ${this.props.count}`),
      React.createElement(
        'button',
        { onClick: this.handleChange },
        'Click to increase count'
      )
    )
  }
}

ExampleComponentBase.foo = 'bar'

const useHooks = ({ initialCount = 0 }) => {
  const [count, setCount] = React.useState(initialCount)

  return { count, setCount }
}

const WrappedExampleComponent = hookIntoProps(useHooks)(ExampleComponent)

describe('The `hookIntoProps` helper', () => {
  it('passes props through to the wrapped Component', async () => {
    const { getByText } = render(
      React.createElement(WrappedExampleComponent, { name: 'Jules' })
    )

    await waitForElement(() => getByText(/Hello Jules!/i))
  })

  it('calls hooks based on props', async () => {
    const { getByText } = render(
      React.createElement(WrappedExampleComponent, { initialCount: 7 })
    )

    await waitForElement(() => getByText(/Count: 7/i))
  })

  it('updates if required', async () => {
    const { getByText } = render(
      React.createElement(WrappedExampleComponent, { initialCount: 1 })
    )

    fireEvent.click(getByText('Click to increase count'))

    await waitForElement(() => getByText(/Count: 2/i))
  })

  it('hoists statics of the wrapped Component', () => {
    const actual = WrappedExampleComponent.foo
    const expected = ExampleComponentBase.foo
    expect(actual).toEqual(expected)
  })
})
