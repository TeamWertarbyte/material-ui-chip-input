import React from 'react'
import ChipInput from '../src/ChipInput'

class ControlledChipInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      chips: ['js']
    }
  }

  handleRequestAdd(chip) {
    this.setState({
      chips: [...this.state.chips, chip]
    })
  }

  handleRequestDelete(deletedChip) {
    if (deletedChip !== 'js') {
      this.setState({
        chips: this.state.chips.filter((c) => c !== deletedChip)
      })
    } else {
      alert('Why would you delete JS?')
    }
  }

  render() {
    return <ChipInput
      {...this.props}
      value={this.state.chips}
      onRequestAdd={(chip) => this.handleRequestAdd(chip)}
      onRequestDelete={(deletedChip) => this.handleRequestDelete(deletedChip)}
      fullWidth
    />
  }
}

export default ControlledChipInput
