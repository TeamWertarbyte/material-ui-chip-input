/**
 * Notice: Some code was adapted from Material-UI's text field.
 *         Copyright (c) 2014 Call-Em-All (https://github.com/callemall/material-ui)
 */
import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Input from '@material-ui/core/Input'
import FilledInput from '@material-ui/core/FilledInput/FilledInput'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import InputLabel from '@material-ui/core/InputLabel'
import Chip from '@material-ui/core/Chip'
import withStyles from '@material-ui/core/styles/withStyles'
import blue from '@material-ui/core/colors/blue'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import cx from 'classnames'

const variantComponent = {
  standard: Input,
  filled: FilledInput,
  outlined: OutlinedInput
}

const styles = (theme) => {
  const light = theme.palette.type === 'light'
  const bottomLineColor = light ? 'rgba(0, 0, 0, 0.42)' : 'rgba(255, 255, 255, 0.7)'

  return {
    root: {},
    inputRoot: {
      display: 'inline-block',
      marginTop: 0,
      '&$outlined,&$filled': {
        boxSizing: 'border-box'
      },
      '&$outlined': {
        paddingTop: 14
      },
      '&$filled': {
        paddingTop: 28
      }
    },
    input: {
      display: 'inline-block',
      appearance: 'none', // Remove border in Safari, doesn't seem to break anything in other browsers
      WebkitTapHighlightColor: 'rgba(0,0,0,0)', // Remove mobile color flashing (deprecated style).
      float: 'left',
      '&:not($standard)': {
        paddingTop: 0
      }
    },
    chipContainer: {
      cursor: 'text',
      marginBottom: -2,
      minHeight: 40,
      '&$labeled&$standard': {
        marginTop: 18
      }
    },
    outlined: {},
    standard: {},
    filled: {},
    labeled: {},
    label: {
      top: 4,
      '&$outlined&:not($labelShrink)': {
        top: -4
      },
      '&$filled&:not($labelShrink)': {
        top: 0
      }
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
          easing: theme.transitions.easing.easeIn
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
        backgroundColor: theme.palette.error.main,
        transform: 'scaleX(1)' // error is always underlined in red
      }
    },
    chip: {
      margin: '0 8px 8px 0',
      float: 'left'
    }
  }
}

class ChipInput extends React.Component {
  state = {
    chips: [],
    errorText: undefined,
    focusedChip: null,
    inputValue: '',
    isClean: true,
    isFocused: false
  }

  constructor (props) {
    super(props)
    if (props.defaultValue) {
      this.state.chips = props.defaultValue
    }
    this.labelRef = React.createRef()
    this.input = React.createRef()
  }

  componentDidMount () {
    if (this.props.variant === 'outlined') {
      this.labelNode = ReactDOM.findDOMNode(this.labelRef.current)
      this.forceUpdate()
    }
  }

  componentWillUnmount () {
    clearTimeout(this.inputBlurTimeout)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.disabled) {
      this.setState({ focusedChip: null })
    }

    // Lets assume that if the chips have changed, the inputValue should be empty
    // otherwise, we would need to make inputValue a controlled value. which is quite messy
    if (nextProps.value && this.props.clearInputValueOnChange && nextProps.value.length !== this.props.value.length) {
      this.setState({ inputValue: '' })
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
      let result = this.handleAddChip(event.target.value)
      if (result !== false) {
        event.preventDefault()
      }
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
      this.props.onUpdateInput(e)
    }
  }

  /**
   * Handles adding a chip.
   * @param {string|object} chip Value of the chip, either a string or an object (if dataSourceConfig is set)
   * @returns True if the chip was added (or at least `onAdd` was called), false if adding the chip was prevented
   */
  handleAddChip (chip) {
    if (this.props.onBeforeAdd && !this.props.onBeforeAdd(chip)) {
      this.setState({ preventChipCreation: true })
      return false
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
          this.updateChips([ ...this.state.chips, chip ])
        }
      }
    } else if (chip.trim().length > 0) {
      if (this.props.allowDuplicates || chips.indexOf(chip) === -1) {
        if (this.props.value && this.props.onAdd) {
          this.props.onAdd(chip)
        } else {
          this.updateChips([ ...this.state.chips, chip ])
        }
      }
    } else {
      return false
    }
    return true
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
        this.updateChips(chips, { focusedChip })
      }
    }
  }

  updateChips (chips, additionalUpdates = {}) {
    this.setState({ chips, ...additionalUpdates })
    if (this.props.onChange) {
      this.props.onChange(chips)
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
   * Set the reference to the actual input, that is the input of the Input.
   * @param {object} ref - The reference
   */
  setActualInputRef = (ref) => {
    this.actualInput = ref
    if (this.props.inputRef) {
      this.props.inputRef(ref)
    }
  }

  render () {
    const {
      allowDuplicates,
      alwaysShowPlaceholder,
      blurBehavior,
      children,
      chipRenderer = defaultChipRenderer,
      classes,
      className,
      clearInputValueOnChange,
      defaultValue,
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
      id,
      InputProps = {},
      inputRef,
      InputLabelProps = {},
      label,
      newChipKeyCodes,
      onBeforeAdd,
      onAdd,
      onBlur,
      onDelete,
      onChange,
      onFocus,
      onKeyDown,
      onKeyPress,
      onKeyUp,
      onUpdateInput,
      placeholder,
      required,
      rootRef,
      value,
      variant,
      ...other
    } = this.props

    const chips = this.props.value || this.state.chips

    const hasInput = (this.props.value || this.state.chips).length > 0 || this.state.inputValue.length > 0
    const shrinkFloatingLabel = InputLabelProps.shrink != null
      ? InputLabelProps.shrink
      : (label != null && (hasInput || this.state.isFocused))

    const chipComponents = chips.map((tag, i) => {
      const value = dataSourceConfig ? tag[dataSourceConfig.value] : tag
      return chipRenderer(
        {
          value,
          text: dataSourceConfig ? tag[dataSourceConfig.text] : tag,
          chip: tag,
          isDisabled: !!disabled,
          isFocused: this.state.focusedChip === i,
          handleClick: () => this.setState({ focusedChip: i }),
          handleDelete: () => this.handleDeleteChip(value, i),
          className: classes.chip
        },
        i
      )
    })

    const InputMore = {}
    if (variant === 'outlined') {
      if (InputLabelProps && typeof InputLabelProps.shrink !== 'undefined') {
        InputMore.notched = InputLabelProps.shrink
      }

      InputMore.labelWidth =
        (shrinkFloatingLabel && this.labelNode && this.labelNode.offsetWidth) ||
        0
    }

    if (variant !== 'standard') {
      InputMore.startAdornment = (
        <React.Fragment>{chipComponents}</React.Fragment>
      )
    } else {
      InputProps.disableUnderline = true
    }

    const InputComponent = variantComponent[variant]

    return (
      <FormControl
        ref={rootRef}
        fullWidth={fullWidth}
        className={cx(className, classes.root)}
        error={error}
        required={required}
        onClick={this.focus}
        disabled={disabled}
        variant={variant}
        {...other}
      >
        {label && (
          <InputLabel
            htmlFor={id}
            classes={{root: cx(classes[variant], classes.label), shrink: classes.labelShrink}}
            shrink={shrinkFloatingLabel}
            focused={this.state.isFocused}
            variant={variant}
            ref={this.labelRef}
            {...InputLabelProps}
          >
            {label}
          </InputLabel>
        )}
        <div
          className={cx(
            classes[variant],
            classes.chipContainer,
            {
              [classes.inkbar]: !disableUnderline && variant === 'standard',
              [classes.focused]: this.state.isFocused,
              [classes.underline]: !disableUnderline && variant === 'standard',
              [classes.disabled]: disabled,
              [classes.labeled]: label != null,
              [classes.error]: error
            })}
        >
          {variant === 'standard' && chipComponents}
          <InputComponent
            ref={this.input}
            classes={{
              input: cx(classes.input, classes[variant]),
              root: cx(classes.inputRoot, classes[variant])
            }}
            id={id}
            value={this.state.inputValue}
            onChange={this.handleUpdateInput}
            onKeyDown={this.handleKeyDown}
            onKeyPress={this.handleKeyPress}
            onKeyUp={this.handleKeyUp}
            onFocus={this.handleInputFocus}
            onBlur={this.handleInputBlur}
            inputRef={this.setActualInputRef}
            disabled={disabled}
            fullWidth={fullWidthInput}
            placeholder={(!hasInput && (shrinkFloatingLabel || label == null)) || alwaysShowPlaceholder ? placeholder : null}
            {...InputProps}
            {...InputMore}
          />
        </div>
        {helperText && (
          <FormHelperText
            {...FormHelperTextProps}
            className={FormHelperTextProps ? cx(FormHelperTextProps.className, classes.helperText) : classes.helperText}
          >
            {helperText}
          </FormHelperText>
        )}
      </FormControl>
    )
  }
}

ChipInput.propTypes = {
  /** Allows duplicate chips if set to true. */
  allowDuplicates: PropTypes.bool,
  /** If true, the placeholder will always be visible. */
  alwaysShowPlaceholder: PropTypes.bool,
  /** Behavior when the chip input is blurred: `'clear'` clears the input, `'add'` creates a chip and `'ignore'` keeps the input. */
  blurBehavior: PropTypes.oneOf(['clear', 'add', 'ignore']),
  /** A function of the type `({ value, text, chip, isFocused, isDisabled, handleClick, handleDelete, className }, key) => node` that returns a chip based on the given properties. This can be used to customize chip styles.  Each item in the `dataSource` array will be passed to `chipRenderer` as arguments `chip`, `value` and `text`. If `dataSource` is an array of objects and `dataSourceConfig` is present, then `value` and `text` will instead correspond to the object values defined in `dataSourceConfig`. If `dataSourceConfig` is not set and `dataSource` is an array of objects, then a custom `chipRenderer` must be set. `chip` is always the raw value from `dataSource`, either an object or a string. */
  chipRenderer: PropTypes.func,
  /** Whether the input value should be cleared if the `value` prop is changed. */
  clearInputValueOnChange: PropTypes.bool,
  /** Data source for auto complete. This should be an array of strings or objects. */
  dataSource: PropTypes.array,
  /** Config for objects list dataSource, e.g. `{ text: 'text', value: 'value' }`. If not specified, the `dataSource` must be a flat array of strings or a custom `chipRenderer` must be set to handle the objects. */
  dataSourceConfig: PropTypes.shape({
    text: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
  }),
  /** The chips to display by default (for uncontrolled mode). */
  defaultValue: PropTypes.array,
  /** Disables the chip input if set to true. */
  disabled: PropTypes.bool,
  /** Disable the input underline. Only valid for 'standard' variant */
  disableUnderline: PropTypes.bool,
  /** Props to pass through to the `FormHelperText` component. */
  FormHelperTextProps: PropTypes.object,
  /** If true, the chip input will fill the available width. */
  fullWidth: PropTypes.bool,
  /** If true, the input field will always be below the chips and fill the available space. By default, it will try to be beside the chips. */
  fullWidthInput: PropTypes.bool,
  /** Helper text that is displayed below the input. */
  helperText: PropTypes.node,
  /** Props to pass through to the `InputLabel`. */
  InputLabelProps: PropTypes.object,
  /** Props to pass through to the `Input`. */
  InputProps: PropTypes.object,
  /** Use this property to pass a ref callback to the native input component. */
  inputRef: PropTypes.func,
  /* The content of the floating label. */
  label: PropTypes.node,
  /** The key codes used to determine when to create a new chip. */
  newChipKeyCodes: PropTypes.arrayOf(PropTypes.number),
  /** Callback function that is called when a new chip was added (in controlled mode). */
  onAdd: PropTypes.func,
  /** Callback function that is called with the chip to be added and should return true to add the chip or false to prevent the chip from being added without clearing the text input. */
  onBeforeAdd: PropTypes.func,
  /** Callback function that is called when the chips change (in uncontrolled mode). */
  onChange: PropTypes.func,
  /** Callback function that is called when a new chip was removed (in controlled mode). */
  onDelete: PropTypes.func,
  /** Callback function that is called when the input changes. */
  onUpdateInput: PropTypes.func,
  /** A placeholder that is displayed if the input has no values. */
  placeholder: PropTypes.string,
  /** The chips to display (enables controlled mode if set). */
  value: PropTypes.array,
  /** The variant of the Input component */
  variant: PropTypes.oneOf(['outlined', 'standard', 'filled'])
}

ChipInput.defaultProps = {
  allowDuplicates: false,
  blurBehavior: 'clear',
  clearInputValueOnChange: false,
  disableUnderline: false,
  newChipKeyCodes: [13],
  variant: 'standard'
}

export default withStyles(styles)(ChipInput)

export const defaultChipRenderer = ({ value, text, isFocused, isDisabled, handleClick, handleDelete, className }, key) => (
  <Chip
    key={key}
    className={className}
    style={{ pointerEvents: isDisabled ? 'none' : undefined, backgroundColor: isFocused ? blue[300] : undefined }}
    onClick={handleClick}
    onDelete={handleDelete}
    label={text}
  />
)
