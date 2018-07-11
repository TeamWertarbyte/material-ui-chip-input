import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import ChipInput from '../../src/ChipInput'

const styles = {
  chipInputRoot: {
    border: '1px solid red',
    borderRadius: 2
  },
  chipInputInput: {
    textAlign: 'right'
  },
  chip: {
    background: 'linear-gradient(124deg, #ff2400, #e81d1d, #e8b71d, #e3e81d, #1de840, #1ddde8, #2b1de8, #dd00f3, #dd00f3)',
    backgroundSize: '1800% 1800%',
    animation: 'rainbow 18s ease infinite'
  },
  '@keyframes rainbow': {
    '0%': { backgroundPosition: '0% 82%' },
    '50%': { backgroundPosition: '100% 19%' },
    '100%': { backgroundPosition: '0% 82%' }
  }
}

class CustomChipInput extends React.Component {
  render () {
    const { classes, ...other } = this.props

    return (
      <ChipInput
        {...other}
        classes={{
          root: classes.chipInputRoot,
          input: classes.chipInputInput,
          chip: classes.chip
        }}
        defaultValue={['Butterfly', 'Unicorn', 'Rainbow', 'Fairy']}
      />
    )
  }
}

export default withStyles(styles)(CustomChipInput)
