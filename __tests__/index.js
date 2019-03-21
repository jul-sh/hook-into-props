require('jest-dom/extend-expect')
require('react-testing-library/cleanup-after-each')

const React = require('react')
const { render, waitForElement, fireEvent } = require('react-testing-library')
const hookIntoProps = require('../dist/index.js')

describe('The `hookIntoProps` helper', () => {
  it('passes props through to the wrapped Component', async () => {
    const MockComponent = props => props.name
    const useHooks = () => {}
    const WrappedMockComponent = hookIntoProps(useHooks)(MockComponent)

    const { getByText } = render(
      React.createElement(WrappedMockComponent, { name: 'Jules' })
    )

    await waitForElement(() => getByText(/Jules/i))
  })

  it('calls hooks based on props', async () => {
    const MockComponent = props => `Count: ${props.count}`
    const useHooks = props => {
      const [count] = React.useState(props.initialCount)

      return { count }
    }
    const WrappedMockComponent = hookIntoProps(useHooks)(MockComponent)

    const { getByText } = render(
      React.createElement(WrappedMockComponent, { initialCount: 5 })
    )

    await waitForElement(() => getByText(/Count: 5/i))
  })

  it('updates if required', async () => {
    class MockComponent extends React.Component {
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
          React.createElement('span', {}, `Count: ${this.props.count}`),
          React.createElement(
            'button',
            { onClick: this.handleChange },
            'Click to increase count'
          )
        )
      }
    }
    const useHooks = () => {
      const [count, setCount] = React.useState(0)

      return { count, setCount }
    }
    const WrappedMockComponent = hookIntoProps(useHooks)(MockComponent)

    const { getByText } = render(React.createElement(WrappedMockComponent))
    fireEvent.click(getByText('Click to increase count'))

    await waitForElement(() => getByText(/Count: 1/i))
  })

  it('passes no additional props', async () => {
    const MockComponent = props =>
      `List of props: "${Object.keys(props).toString()}"`
    const useHooks = () => {
      const [count, setCount] = React.useState(0)

      return { count, setCount }
    }
    const WrappedMockComponent = hookIntoProps(useHooks)(MockComponent)

    const { getByText } = render(React.createElement(WrappedMockComponent))

    await waitForElement(() => getByText(/List of props: "count,setCount"/i))
  })

  it('hoists statics of the wrapped Component', () => {
    const MockComponent = props => null
    MockComponent.foo = 'bar'
    const useHooks = () => {}
    const WrappedMockComponent = hookIntoProps(useHooks)(MockComponent)

    const actual = WrappedMockComponent.foo
    const expected = MockComponent.foo
    expect(actual).toEqual(expected)
  })
})
