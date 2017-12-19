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

  onBeforeAdd (chip) {
    return chip.length >= 3
  }

  handleAdd (chip) {
    this.setState({
      chips: [...this.state.chips, chip]
    })
  }

  handleDelete (deletedChip) {
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
      onBeforeAdd={(chip) => this.onBeforeAdd(chip)}
      onAdd={(chip) => this.handleAdd(chip)}
      onDelete={(deletedChip) => this.handleDelete(deletedChip)}
      onBlur={(event) => {
        if (this.props.addOnBlur && event.target.value) {
          this.handleAdd(event.target.value)
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
