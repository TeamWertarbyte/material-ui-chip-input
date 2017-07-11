import React from 'react'
import ChipInput from '../src/ChipInput'

class ClipboardExample extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      chips: []
    }
  }

  handleRequestAdd (...chips) {
    this.setState({
      chips: [...this.state.chips, ...chips]
    })
  }

  handleRequestDelete (deletedChip) {
    this.setState({
      chips: this.state.chips.filter((c) => c !== deletedChip)
    })
  }

  render () {
    return (
      <ChipInput
        {...this.props}
        hintText='Paste anything here (try with line breaks)'

        value={this.state.chips}
        onPaste={(event) => {
          const clipboardText = event.clipboardData.getData('Text')

          event.preventDefault()

          this.handleRequestAdd(...clipboardText.split('\n').filter((t) => t.length > 0))

          if (this.props.onPaste) {
            this.props.onPaste(event)
          }
        }}
        onRequestAdd={(chip) => this.handleRequestAdd(chip)}
        onRequestDelete={(deletedChip) => this.handleRequestDelete(deletedChip)}
        fullWidth
      />
    )
  }
}

export default ClipboardExample
