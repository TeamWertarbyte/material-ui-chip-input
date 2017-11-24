/**
 * Notice: Some code was adapted from Material-UI's text field.
 *         Copyright (c) 2014 Call-Em-All (https://github.com/callemall/material-ui)
 */
import React from 'react'
import PropTypes from 'prop-types'
import Input, { InputAdornment } from 'material-ui/Input'
import Chip from 'material-ui/Chip'
import withStyles from 'material-ui/styles/withStyles'
import blue from 'material-ui/colors/blue'
import cx from 'classnames'

const styles = {
  root: {
    fontSize: 16,
    lineHeight: '24px',
    // width: props.fullWidth ? '100%' : 256,
    display: 'inline-block',
    position: 'relative',
    cursor: 'text',
    height: 'auto'
  },
  inputRoot: {
    display: 'inline-block'
  },
  input: {
    display: 'inline-block',
    // cursor: props.disabled ? 'not-allowed' : 'initial',
    appearance: 'none', // Remove border in Safari, doesn't seem to break anything in other browsers
    WebkitTapHighlightColor: 'rgba(0,0,0,0)', // Remove mobile color flashing (deprecated style).
    float: 'left'
  },
  defaultChip: {
    margin: '8px 8px 0 0',
    float: 'left'
  }
}

const defaultChipRenderer = ({ value, text, isFocused, isDisabled, handleClick, handleRequestDelete, defaultStyle }, key) => (
  <Chip
    key={key}
    style={{ ...defaultStyle, pointerEvents: isDisabled ? 'none' : undefined }}
    backgroundColor={isFocused ? blue[300] : null}
    onClick={handleClick}
    onRequestDelete={handleRequestDelete}
    label={text}
  />
)

class ChipInput extends React.Component {
  static contextTypes = {
    muiTheme: PropTypes.object.isRequired
  };

  state = {
    isFocused: false,
    errorText: undefined,
    isClean: true,
    chips: [],
    focusedChip: null,
    inputValue: ''
  }

  constructor (props) {
    super(props)
    if (props.defaultValue) {
      this.state.chips = props.defaultValue
    }
  }

  componentDidMount () {
    // const handleKeyDown = this.autoComplete.handleKeyDown
    // this.autoComplete.handleKeyDown = (event) => {
    //   const {newChipKeyCodes} = this.props
    //   if (newChipKeyCodes.indexOf(event.keyCode) >= 0 && event.target.value) {
    //     event.preventDefault()
    //     this.handleAddChip(event.target.value)
    //     this.autoComplete.forceUpdate()
    //   } else {
    //     handleKeyDown(event)
    //   }
    // }

    // this.autoComplete.handleItemTouchTap = (event, child) => {
    //   const dataSource = this.autoComplete.props.dataSource

    //   const index = parseInt(child.key, 10)
    //   const chosenRequest = dataSource[index]
    //   this.handleAddChip(chosenRequest)
    //   this.autoComplete.forceUpdate()
    //   this.autoComplete.close()

    //   setTimeout(() => this.focus(), 1)
    // }

    // // force update autocomplete to ensure that it uses the new handlers
    // this.autoComplete.forceUpdate()
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.disabled) {
      this.setState({ focusedChip: null })
    }
  }

  blur () {
    if (this.input) this.actualInput.blur()
  }

  focus = () => {
    this.actualInput.focus()
    // this.getInputNode().focus()
    // if (this.props.openOnFocus && !this.props.disabled) {
    // }
    if (this.state.focusedChip) {
      this.setState({ focusedChip: null })
    }
  }

  handleInputBlur = (event) => {
    if (this.props.onBlur) {
      this.props.onBlur(event)
    }

    // A momentary delay is required to support openOnFocus. We must give time for the autocomplete
    // menu to close before checking the current status. Otherwise, tabbing off the input while the
    // menu is open results in the input keeping its focus styles. Note that the ref might not be set
    // yet, so this.autocomplete might be null.
    setTimeout(() => {
      if (this.autoComplete && (!this.autoComplete.state.open || this.autoComplete.requestsList.length === 0)) {
        if (this.props.clearOnBlur) {
          this.clearInput()
        }
        this.setState({ isFocused: false })
      }
    }, 0)
  }

  handleInputFocus = (event) => {
    if (this.props.disabled) {
      return
    }
    this.setState({isFocused: true})
    if (this.props.onFocus) {
      this.props.onFocus(event)
    }
  }

  handleKeyDown = (event) => {
    this.setState({ keyPressed: false, preventChipCreation: false })
    if (this.props.newChipKeyCodes.indexOf(event.keyCode) >= 0) {
      this.handleAddChip(event.target.value)
    } else if (event.keyCode === 8 || event.keyCode === 46) {
      if (event.target.value === '') {
        const chips = this.props.value || this.state.chips
        if (this.state.focusedChip == null && event.keyCode === 8) {
          this.setState({ focusedChip: chips[chips.length - 1] })
        } else if (this.state.focusedChip) {
          const index = chips.findIndex((chip) => {
            return this.props.dataSourceConfig
              ? this.state.focusedChip[this.props.dataSourceConfig.value] === chip[this.props.dataSourceConfig.value]
              : this.state.focusedChip === chip
          })
          const value = this.props.dataSourceConfig ? this.state.focusedChip[this.props.dataSourceConfig.value] : this.state.focusedChip
          this.handleDeleteChip(value, index)
          if (event.keyCode === 8 && index > 0) {
            this.setState({ focusedChip: chips[index - 1] })
          } else if (event.keyCode === 46 && index < chips.length - 1) {
            this.setState({ focusedChip: chips[index + 1] })
          }
        }
      }
    } else if (event.keyCode === 37) {
      const chips = this.props.value || this.state.chips
      if (this.state.focusedChip == null && event.target.value === '' && chips.length) {
        return this.setState({ focusedChip: chips[chips.length - 1] })
      }
      const index = chips.findIndex((chip) => {
        return this.props.dataSourceConfig && this.state.focusedChip
          ? this.state.focusedChip[this.props.dataSourceConfig.value] === chip[this.props.dataSourceConfig.value]
          : this.state.focusedChip === chip
      })
      if (index > 0) {
        this.setState({ focusedChip: chips[index - 1] })
      }
    } else if (event.keyCode === 39) {
      const chips = this.props.value || this.state.chips
      const index = chips.findIndex((chip) => {
        return this.props.dataSourceConfig && this.state.focusedChip
          ? this.state.focusedChip[this.props.dataSourceConfig.value] === chip[this.props.dataSourceConfig.value]
          : this.state.focusedChip === chip
      })
      if (index >= 0 && index < chips.length - 1) {
        this.setState({ focusedChip: chips[index + 1] })
      } else {
        this.setState({ focusedChip: null })
      }
    } else {
      this.setState({ focusedChip: null })
    }
  }

  handleKeyUp = (event) => {
    if (!this.state.preventChipCreation && this.props.newChipKeyCodes.indexOf(event.keyCode) > 0 && this.state.keyPressed) {
      this.clearInput()
    } else {
      this.setState({ inputValue: event.target.value })
    }
  }

  handleKeyPress = (event) => {
    this.setState({keyPressed: true})
  }

  handleUpdateInput = (e) => {
    this.setState({ inputValue: e.target.value })

    if (this.props.onUpdateInput) {
      // this.props.onUpdateInput(searchText, dataSource, params)
      this.props.onUpdateInput(e.target.value)
    }
  }

  handleAddChip (chip) {
    if (this.props.onBeforeRequestAdd && !this.props.onBeforeRequestAdd(chip)) {
      return this.setState({ preventChipCreation: true })
    }
    this.setState({ inputValue: '' })
    const chips = this.props.value || this.state.chips

    if (this.props.dataSourceConfig) {
      if (typeof chip === 'string') {
        chip = {
          [this.props.dataSourceConfig.text]: chip,
          [this.props.dataSourceConfig.value]: chip
        }
      }

      if (this.props.allowDuplicates || !chips.some((c) => c[this.props.dataSourceConfig.value] === chip[this.props.dataSourceConfig.value])) {
        if (this.props.value) {
          if (this.props.onRequestAdd) {
            this.props.onRequestAdd(chip)
          }
        } else {
          this.setState({ chips: [ ...this.state.chips, chip ] })
          if (this.props.onChange) {
            this.props.onChange([ ...this.state.chips, chip ])
          }
        }
      }
    } else {
      if (chip.trim().length > 0) {
        if (this.props.allowDuplicates || chips.indexOf(chip) === -1) {
          if (this.props.value) {
            if (this.props.onRequestAdd) {
              this.props.onRequestAdd(chip)
            }
          } else {
            this.setState({ chips: [ ...this.state.chips, chip ] })
            if (this.props.onChange) {
              this.props.onChange([ ...this.state.chips, chip ])
            }
          }
        }
      }
    }
  }

  handleDeleteChip (chip, i) {
    if (this.props.value) {
      if (this.props.onRequestDelete) {
        this.props.onRequestDelete(chip, i)
      }
    } else {
      if (this.props.dataSourceConfig) {
        const chips = this.state.chips.slice()
        let changed = chips.splice(i, 1) // remove the chip at index i
        if (changed) {
          this.setState({
            chips,
            focusedChip: this.state.focusedChip && this.state.focusedChip[this.props.dataSourceConfig.value] === chip ? null : this.state.focusedChip
          })
          if (this.props.onChange) {
            this.props.onChange(chips)
          }
        }
      } else {
        const chips = this.state.chips.slice()
        let changed = chips.splice(i, 1) // remove the chip at index i
        if (changed) {
          this.setState({
            chips,
            focusedChip: this.state.focusedChip === chip ? null : this.state.focusedChip
          })
          if (this.props.onChange) {
            this.props.onChange(chips)
          }
        }
      }
    }
  }

  clearInput () {
    this.setState({ inputValue: '' })
  }

  /**
   * Sets a reference to the AutoComplete instance.
   *
   * Using a bound class method here to set `autoComplete` to avoid it being set
   * to null by an inline ref callback.
   *
   * See [Issue #71](https://github.com/TeamWertarbyte/material-ui-chip-input/issues/71)
   *
   * @param {Object} autoComplete - The AutoComplete DOM element or null
   */
  setInputRef = (input) => {
    this.input = input
  }

  render () {
    const {
      classes,
      children,
      className,
      dataSourceConfig,
      disabled,
      errorStyle,
      errorText, // eslint-disable-line no-unused-vars
      fullWidth,
      fullWidthInput,
      hintText,
      hintStyle,
      id,
      inputStyle,
      clearOnBlur,
      onBlur, // eslint-disable-line no-unused-vars
      onChange, // eslint-disable-line no-unused-vars
      onFocus, // eslint-disable-line no-unused-vars
      style,
      chipContainerStyle,
      underlineDisabledStyle,
      underlineFocusStyle,
      underlineShow,
      underlineStyle,
      defaultValue = [], // eslint-disable-line no-unused-vars
      filter,
      value,
      dataSource,
      floatingLabelFixed,
      floatingLabelFocusStyle, // eslint-disable-line no-unused-vars
      floatingLabelStyle, // eslint-disable-line no-unused-vars
      floatingLabelText,
      onBeforeRequestAdd,
      onRequestAdd, // eslint-disable-line no-unused-vars
      onRequestDelete, // eslint-disable-line no-unused-vars
      chipRenderer = defaultChipRenderer,
      newChipKeyCodes, // eslint-disable-line no-unused-vars
      allowDuplicates, // eslint-disable-line no-unused-vars
      ...other
    } = this.props

    const chips = this.props.value || this.state.chips
    const autoCompleteData = dataSourceConfig
      ? (dataSource || []).filter((value) => !chips.some((c) => c[dataSourceConfig.value] === value[dataSourceConfig.value]))
      : (dataSource || []).filter((value) => chips.indexOf(value) < 0)

    const actualFilter = other.openOnFocus ? (search, key) => (search === '' || filter(search, key)) : filter

    return (
      <div
        className={cx(classes.root, className)}
        onClick={this.focus}
      >
        <Input
          ref={this.setInputRef}
          classes={{ input: classes.input, root: classes.inputRoot }}
          startAdornment={
            <InputAdornment position='start'>
              <div className={classes.chipContainer}>
                {chips.map((tag, i) => {
                  const value = dataSourceConfig ? tag[dataSourceConfig.value] : tag
                  return chipRenderer({
                    value,
                    text: dataSourceConfig ? tag[dataSourceConfig.text] : tag,
                    chip: tag,
                    isDisabled: disabled,
                    isFocused: dataSourceConfig ? (this.state.focusedChip && this.state.focusedChip[dataSourceConfig.value] === value) : (this.state.focusedChip === value),
                    handleClick: () => this.setState({ focusedChip: value }),
                    handleRequestDelete: () => this.handleDeleteChip(value, i),
                    defaultStyle: styles.defaultChip
                  }, i)
                })}
              </div>
            </InputAdornment>
          }
          filter={actualFilter}
          dataSource={autoCompleteData}
          dataSourceConfig={dataSourceConfig}
          value={this.state.inputValue}
          onChange={this.handleUpdateInput}
          onKeyDown={this.handleKeyDown}
          onKeyPress={this.handleKeyPress}
          onKeyUp={this.handleKeyUp}
          inputProps={{ ref: (ref) => { this.actualInput = ref } }}
          {...other}
        />
      </div>
    )
  }
}

ChipInput.propTypes = {
  style: PropTypes.object,
  chipContainerStyle: PropTypes.object,
  floatingLabelText: PropTypes.node,
  hintText: PropTypes.node,
  id: PropTypes.string,
  dataSourceConfig: PropTypes.shape({
    text: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
  }),
  disabled: PropTypes.bool,
  defaultValue: PropTypes.array,
  onChange: PropTypes.func,
  value: PropTypes.array,
  onBeforeRequestAdd: PropTypes.func,
  onRequestAdd: PropTypes.func,
  onRequestDelete: PropTypes.func,
  dataSource: PropTypes.array,
  onUpdateInput: PropTypes.func,
  openOnFocus: PropTypes.bool,
  chipRenderer: PropTypes.func,
  newChipKeyCodes: PropTypes.arrayOf(PropTypes.number),
  clearOnBlur: PropTypes.bool,
  allowDuplicates: PropTypes.bool
}

ChipInput.defaultProps = {
  newChipKeyCodes: [13],
  clearOnBlur: true,
  allowDuplicates: false,
  underlineShow: true
}

export default withStyles(styles)(ChipInput)
