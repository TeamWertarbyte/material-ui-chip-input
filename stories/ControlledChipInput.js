/* global alert */
import React from 'react'
import PropTypes from 'prop-types'
import ChipInput from '../src/ChipInput'

class ControlledChipInput extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      chips: ['js']
    }
  }

  onBeforeRequestAdd (chip) {
    return chip.length >= 3
  }

  handleRequestAdd (chip) {
    this.setState({
      chips: [...this.state.chips, chip]
    })
  }

  handleRequestDelete (deletedChip) {
    if (deletedChip !== 'js') {
      this.setState({
        chips: this.state.chips.filter((c) => c !== deletedChip)
      })
    } else {
      alert('Why would you delete JS?')
    }
  }

  render () {
    return <ChipInput
      {...this.props}
      value={this.state.chips}
      onBeforeRequestAdd={(chip) => this.onBeforeRequestAdd(chip)}
      onRequestAdd={(chip) => this.handleRequestAdd(chip)}
      onRequestDelete={(deletedChip) => this.handleRequestDelete(deletedChip)}
      onBlur={(event) => {
        if (this.props.addOnBlur && event.target.value) {
          this.handleRequestAdd(event.target.value)
        }
      }}
      fullWidth
      floatingLabelText='Some chips with at least three characters'
    />
  }
}

ControlledChipInput.propTypes = {
  addOnBlur: PropTypes.bool
}

export default ControlledChipInput
