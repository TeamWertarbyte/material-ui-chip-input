import React from 'react'
import ChipInput from '../../src/ChipInput'

class ClipboardExample extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      chips: []
    }
  }

  handleAdd (...chips) {
    this.setState({
      chips: [...this.state.chips, ...chips]
    })
  }

  handleDelete (deletedChip) {
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

          this.handleAdd(...clipboardText.split('\n').filter((t) => t.length > 0))

          if (this.props.onPaste) {
            this.props.onPaste(event)
          }
        }}
        onAdd={(chip) => this.handleAdd(chip)}
        onDelete={(deletedChip) => this.handleDelete(deletedChip)}
        fullWidth
      />
    )
  }
}

export default ClipboardExample
