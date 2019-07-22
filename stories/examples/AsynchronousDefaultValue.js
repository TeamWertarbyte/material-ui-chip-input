import React from 'react'
import ChipInput from '../../src/ChipInput'

class AsynchronousDefaultValue extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      chips: null,
    }
  }

  componentDidMount () {
      setTimeout(() => this.setState({ chips: ['Foo', 'Bar']}), 1000);
  }

  render () {
    return (
        <ChipInput
            defaultValue={this.state.chips}
            fullWidth
            onChange={()=>{}}
        />
    )
  }
}

export default AsynchronousDefaultValue
