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
    const newChips = chip.split(',').filter((c) => c.trim().length > 0)
    this.setState({
      chips: [...this.state.chips, ...newChips]
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
      value={this.state.chips}
      onRequestAdd={(chip) => this.handleRequestAdd(chip)}
      onRequestDelete={(deletedChip) => this.handleRequestDelete(deletedChip)}
      fullWidth
    />
  }
}

export default ControlledChipInput
