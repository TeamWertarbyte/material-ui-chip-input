import React from 'react'
import ChipInput from '../../src/ChipInput'

export default class CustomInputFormatting extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      inputValue: ''
    }
  }

  handleUpdateInput = (e) => {
    // this chip input doesn't permit spaces in chip values
    this.setState({ inputValue: e.target.value.replace(' ', '') })
  }

  handleChange = () => {
    // since the input value is controlled now, we need to clear it ourselves after adding a chip
    this.setState({ inputValue: '' })
  }

  render () {
    return (
      <ChipInput
        label='Some chips (no spaces allowed)'
        onUpdateInput={this.handleUpdateInput}
        inputValue={this.state.inputValue}
        onChange={this.handleChange}
        fullWidth
      />
    )
  }
}
