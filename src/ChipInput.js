/**
 * Notice: Some code was adapted from Material-UI's text field.
 *         Copyright (c) 2014 Call-Em-All (https://github.com/callemall/material-ui)
 */
import React from 'react'
import PropTypes from 'prop-types'
import Input, { InputLabel } from 'material-ui/Input'
import Chip from 'material-ui/Chip'
import withStyles from 'material-ui/styles/withStyles'
import blue from 'material-ui/colors/blue'
import FormControl from 'material-ui/Form/FormControl'
import FormHelperText from 'material-ui/Form/FormHelperText'
import cx from 'classnames'

const styles = (theme) => {
  const light = theme.palette.type === 'light'
  const bottomLineColor = light ? 'rgba(0, 0, 0, 0.42)' : 'rgba(255, 255, 255, 0.7)'

  return {
    root: {},
    inputRoot: {
      display: 'inline-block',
      marginTop: 0
    },
    input: {
      display: 'inline-block',
      appearance: 'none', // Remove border in Safari, doesn't seem to break anything in other browsers
      WebkitTapHighlightColor: 'rgba(0,0,0,0)', // Remove mobile color flashing (deprecated style).
      float: 'left'
    },
    chipContainer: {
      cursor: 'text',
      marginBottom: -2,
      minHeight: 40,
      '&$labeled': {
        marginTop: 18
      }
    },
    labeled: {},
    label: {
      top: 4
    },
    labelShrink: {
      top: 0
    },
    helperText: {
      marginBottom: -20
    },
    inkbar: {
      '&:after': {
        backgroundColor: theme.palette.primary[light ? 'dark' : 'light'],
        left: 0,
        bottom: 0,
        // Doing the other way around crash on IE11 "''" https://github.com/cssinjs/jss/issues/242
        content: '""',
        height: 2,
        position: 'absolute',
        right: 0,
        transform: 'scaleX(0)',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shorter,
          easing: theme.transitions.easing.easeOut
        }),
        pointerEvents: 'none' // Transparent to the hover style.
      },
      '&$focused:after': {
        transform: 'scaleX(1)'
      }
    },
    focused: {},
    disabled: {},
    underline: {
      '&:before': {
        backgroundColor: bottomLineColor,
        left: 0,
        bottom: 0,
        // Doing the other way around crash on IE11 "''" https://github.com/cssinjs/jss/issues/242
        content: '""',
        height: 1,
        position: 'absolute',
        right: 0,
        transition: theme.transitions.create('background-color', {
          duration: theme.transitions.duration.shorter,
          easing: theme.transitions.easing.ease
        }),
        pointerEvents: 'none' // Transparent to the hover style.
      },
      '&:hover:not($disabled):before': {
        backgroundColor: theme.palette.text.primary,
        height: 2
      },
      '&$disabled:before': {
        background: 'transparent',
        backgroundImage: `linear-gradient(to right, ${bottomLineColor} 33%, transparent 0%)`,
        backgroundPosition: 'left top',
        backgroundRepeat: 'repeat-x',
        backgroundSize: '5px 1px'
      }
    },
    error: {
      '&:after': {
        backgroundColor: theme.palette.error.A400,
        transform: 'scaleX(1)' // error is always underlined in red
      }
    },
    chip: {
      margin: '0 8px 8px 0',
      float: 'left'
    }
  }
}

const defaultChipRenderer = ({ value, text, isFocused, isDisabled, handleClick, handleDelete, className }, key) => (
  <Chip
    key={key}
    className={className}
    style={{ pointerEvents: isDisabled ? 'none' : undefined, backgroundColor: isFocused ? blue[300] : undefined }}
    onClick={handleClick}
    onDelete={handleDelete}
    label={text}
  />
)

class ChipInput extends React.Component {
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

  componentWillUnmount () {
    clearTimeout(this.inputBlurTimeout)
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

  /**
   * Blurs this component.
   * @public
   */
  blur () {
    if (this.input) this.actualInput.blur()
  }

  /**
   * Focuses this component.
   * @public
   */
  focus = () => {
    this.actualInput.focus()
    // this.getInputNode().focus()
    // if (this.props.openOnFocus && !this.props.disabled) {
    // }
    if (this.state.focusedChip != null) {
      this.setState({ focusedChip: null })
    }
  }

  handleInputBlur = (event) => {
    if (this.props.onBlur) {
      this.props.onBlur(event)
    }
    this.setState({ isFocused: false })
    if (this.state.focusedChip != null) {
      this.setState({ focusedChip: null })
    }
    if (this.props.blurBehavior === 'add') {
      // Lets assume that we only want to add the existing content as chip, when
      // another event has not added a chip within 200ms .
      // e.g. onSelection Callback in Autocomplete case
      let numChipsBefore = (this.props.value || this.state.chips).length
      let value = event.target.value
      this.inputBlurTimeout = setTimeout(() => {
        let numChipsAfter = (this.props.value || this.state.chips).length
        if (numChipsBefore === numChipsAfter) {
          this.handleAddChip(value)
        } else {
          this.clearInput()
        }
      }, 150)
    } else if (this.props.blurBehavior === 'clear') {
      this.clearInput()
    }

    // A momentary delay is required to support openOnFocus. We must give time for the autocomplete
    // menu to close before checking the current status. Otherwise, tabbing off the input while the
    // menu is open results in the input keeping its focus styles. Note that the ref might not be set
    // yet, so this.autocomplete might be null.
    // setTimeout(() => {
    //   if (this.autoComplete && (!this.autoComplete.state.open || this.autoComplete.requestsList.length === 0)) {
    //     if (this.props.clearOnBlur) {
    //       this.clearInput()
    //     }
    //     this.setState({ isFocused: false })
    //   }
    // }, 0)
  }

  handleInputFocus = (event) => {
    this.setState({ isFocused: true })
    if (this.props.onFocus) {
      this.props.onFocus(event)
    }
  }

  handleKeyDown = (event) => {
    const { focusedChip } = this.state
    this.setState({ keyPressed: false, preventChipCreation: false })
    if (this.props.onKeyDown) {
      // Needed for arrow controls on menu in autocomplete scenario
      this.props.onKeyDown(event)
      // Check if the callback marked the event as isDefaultPrevented() and skip further actions
      // enter key for example should not always add the current value of the inputField
      if (event.isDefaultPrevented()) {
        return
      }
    }

    if (this.props.newChipKeyCodes.indexOf(event.keyCode) >= 0) {
      this.handleAddChip(event.target.value)
    } else if (event.keyCode === 8 || event.keyCode === 46) {
      if (event.target.value === '') {
        const chips = this.props.value || this.state.chips
        if (focusedChip == null && event.keyCode === 8) {
          this.setState({ focusedChip: chips.length - 1 })
        } else if (focusedChip != null) {
          const chips = this.props.value || this.state.chips
          const value = chips[focusedChip]
          this.handleDeleteChip(value, focusedChip)
          if (event.keyCode === 8 && focusedChip > 0) {
            this.setState({ focusedChip: focusedChip - 1 })
          } else if (event.keyCode === 46 && focusedChip <= chips.length - 1) {
            this.setState({ focusedChip })
          }
        }
      }
    } else if (event.keyCode === 37) {
      const chips = this.props.value || this.state.chips
      if (focusedChip == null && event.target.value === '' && chips.length) {
        return this.setState({ focusedChip: chips.length - 1 })
      }
      if (focusedChip != null && focusedChip > 0) {
        this.setState({ focusedChip: focusedChip - 1 })
      }
    } else if (event.keyCode === 39) {
      const chips = this.props.value || this.state.chips
      if (focusedChip != null && focusedChip < chips.length - 1) {
        this.setState({ focusedChip: focusedChip + 1 })
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
    if (this.props.onKeyUp) { this.props.onKeyUp(event) }
  }

  handleKeyPress = (event) => {
    this.setState({ keyPressed: true })
    if (this.props.onKeyPress) { this.props.onKeyPress(event) }
  }

  handleUpdateInput = (e) => {
    this.setState({ inputValue: e.target.value })

    if (this.props.onUpdateInput) {
      // this.props.onUpdateInput(searchText, dataSource, params)
      this.props.onUpdateInput(e.target.value)
    }
  }

  handleAddChip (chip) {
    if (this.props.onBeforeAdd && !this.props.onBeforeAdd(chip)) {
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
        if (this.props.value && this.props.onAdd) {
          this.props.onAdd(chip)
        } else {
          this.setState({ chips: [ ...this.state.chips, chip ] })
          if (this.props.onChange) {
            this.props.onChange([ ...this.state.chips, chip ])
          }
        }
      }
    } else if (chip.trim().length > 0) {
      if (this.props.allowDuplicates || chips.indexOf(chip) === -1) {
        if (this.props.value && this.props.onAdd) {
          this.props.onAdd(chip)
        } else {
          this.setState({ chips: [ ...this.state.chips, chip ] })
          if (this.props.onChange) {
            this.props.onChange([ ...this.state.chips, chip ])
          }
        }
      }
    }
  }

  handleDeleteChip (chip, i) {
    if (this.props.value) {
      if (this.props.onDelete) {
        this.props.onDelete(chip, i)
      }
    } else {
      const chips = this.state.chips.slice()
      const changed = chips.splice(i, 1) // remove the chip at index i
      if (changed) {
        let focusedChip = this.state.focusedChip
        if (this.state.focusedChip === i) {
          focusedChip = null
        } else if (this.state.focusedChip > i) {
          focusedChip = this.state.focusedChip - 1
        }
        this.setState({ chips, focusedChip })
        if (this.props.onChange) {
          this.props.onChange(chips)
        }
      }
    }
  }

  /**
   * Clears the text field for adding new chips.
   * @public
   */
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
      allowDuplicates, // eslint-disable-line no-unused-vars
      blurBehavior,
      children,
      chipRenderer = defaultChipRenderer,
      classes,
      className,
      defaultValue = [], // eslint-disable-line no-unused-vars
      dataSource,
      dataSourceConfig,
      disabled,
      disableUnderline,
      error,
      filter,
      FormHelperTextProps,
      fullWidth,
      fullWidthInput,
      helperText,
      helperTextClassName,
      id,
      inputRef,
      InputLabelProps,
      label,
      labelClassName,
      newChipKeyCodes, // eslint-disable-line no-unused-vars
      onBeforeAdd,
      onAdd, // eslint-disable-line no-unused-vars
      onDelete, // eslint-disable-line no-unused-vars
      onBlur, // eslint-disable-line no-unused-vars
      onChange, // eslint-disable-line no-unused-vars
      onFocus, // eslint-disable-line no-unused-vars
      onUpdateInput, // eslint-disable-line
      // openOnFocus, // eslint-disable-line
      onKeyDown,
      onKeyPress,
      onKeyUp,
      placeholder,
      required,
      rootRef,
      value,
      ...other
    } = this.props

    const chips = this.props.value || this.state.chips
    // const autoCompleteData = dataSourceConfig
    //   ? (dataSource || []).filter((value) => !chips.some((c) => c[dataSourceConfig.value] === value[dataSourceConfig.value]))
    //   : (dataSource || []).filter((value) => chips.indexOf(value) < 0)

    // const actualFilter = openOnFocus ? (search, key) => (search === '' || filter(search, key)) : filter

    const hasInput = (this.props.value || this.state.chips).length > 0 || this.state.inputValue.length > 0
    // const showPlaceholder = placeholder && !hasInput
    const shrinkFloatingLabel = label != null && (hasInput || this.state.isFocused)

    return (
      <FormControl
        ref={rootRef}
        fullWidth={fullWidth}
        className={cx(className, classes.root)}
        error={error}
        required={required}
        onClick={this.focus}
        disabled={disabled}
        {...other}
      >
        {label && (
          <InputLabel
            htmlFor={id}
            className={labelClassName}
            classes={{ root: classes.label, shrink: classes.labelShrink }}
            shrink={shrinkFloatingLabel}
            focused={this.state.isFocused}
            {...InputLabelProps}
          >
            {label}
          </InputLabel>
        )}
        <div className={cx(
          classes.chipContainer,
          {
            [classes.inkbar]: !disableUnderline,
            [classes.focused]: this.state.isFocused,
            [classes.underline]: !disableUnderline,
            [classes.disabled]: disabled,
            [classes.labeled]: label != null,
            [classes.error]: error
          })}
        >
          {chips.map((tag, i) => {
            const value = dataSourceConfig ? tag[dataSourceConfig.value] : tag
            return chipRenderer({
              value,
              text: dataSourceConfig ? tag[dataSourceConfig.text] : tag,
              chip: tag,
              isDisabled: !!disabled,
              isFocused: this.state.focusedChip === i,
              handleClick: () => this.setState({ focusedChip: i }),
              handleDelete: () => this.handleDeleteChip(value, i),
              className: classes.chip
            }, i)
          })}
          <Input
            ref={this.setInputRef}
            classes={{ input: classes.input, root: classes.inputRoot }}
            id={id}
            value={this.state.inputValue}
            onChange={this.handleUpdateInput}
            onKeyDown={this.handleKeyDown}
            onKeyPress={this.handleKeyPress}
            onKeyUp={this.handleKeyUp}
            onFocus={this.handleInputFocus}
            onBlur={this.handleInputBlur}
            inputRef={(ref) => { this.actualInput = ref; inputRef(ref) }}
            disabled={disabled}
            disableUnderline
            fullWidth={fullWidthInput}
            placeholder={!hasInput && (shrinkFloatingLabel || label == null) ? placeholder : null}
            {...other}
          />
        </div>
        {helperText && (
          <FormHelperText className={cx(helperTextClassName, classes.helperText)} {...FormHelperTextProps}>
            {helperText}
          </FormHelperText>
        )}
      </FormControl>
    )
  }
}

ChipInput.propTypes = {
  style: PropTypes.object,
  chipContainerStyle: PropTypes.object,
  dataSourceConfig: PropTypes.shape({
    text: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
  }),
  disabled: PropTypes.bool,
  defaultValue: PropTypes.array,
  onChange: PropTypes.func,
  value: PropTypes.array,
  onBeforeAdd: PropTypes.func,
  onAdd: PropTypes.func,
  onDelete: PropTypes.func,
  dataSource: PropTypes.array,
  onUpdateInput: PropTypes.func,
  // openOnFocus: PropTypes.bool,
  chipRenderer: PropTypes.func,
  newChipKeyCodes: PropTypes.arrayOf(PropTypes.number),
  allowDuplicates: PropTypes.bool,
  fullWidth: PropTypes.bool,
  fullWidthInput: PropTypes.bool,
  inputRef: PropTypes.func,
  blurBehavior: PropTypes.oneOf(['clear', 'add', 'ignore'])
}

ChipInput.defaultProps = {
  newChipKeyCodes: [13],
  blurBehavior: 'clear',
  allowDuplicates: false,
  inputRef: () => {}
}

export default withStyles(styles)(ChipInput)
