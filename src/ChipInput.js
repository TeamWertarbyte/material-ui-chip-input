/**
 * Notice: Some code was adapted from Material-UI's text field.
 *         Copyright (c) 2014 Call-Em-All (https://github.com/callemall/material-ui)
 */
import React, { PropTypes } from 'react'
import TextFieldUnderline from 'material-ui/TextField/TextFieldUnderline'
import TextFieldHint from 'material-ui/TextField/TextFieldHint'
import TextFieldLabel from 'material-ui/TextField/TextFieldLabel'
import AutoComplete from 'material-ui/AutoComplete/AutoComplete'
import transitions from 'material-ui/styles/transitions'
import Chip from 'material-ui/Chip'
import {blue300} from 'material-ui/styles/colors'
import {fade} from 'material-ui/utils/colorManipulator'

const getStyles = (props, context, state) => {
  const {
    baseTheme,
    textField: {
      floatingLabelColor,
      focusColor,
      textColor,
      disabledTextColor,
      backgroundColor,
      hintColor,
      errorColor,
    },
  } = context.muiTheme;

  const styles = {
    root: {
      fontSize: 16,
      lineHeight: '24px',
      width: props.fullWidth ? '100%' : 256,
      display: 'inline-block',
      position: 'relative',
      backgroundColor: backgroundColor,
      fontFamily: baseTheme.fontFamily,
      transition: transitions.easeOut('200ms', 'height'),
      cursor: 'text'
    },
    input: {
      padding: 0,
      marginTop: 0,
      marginBottom: 24,
      lineHeight: '32px',
      height: 32,
      position: 'relative',
      display: 'inline-block',
      border: 'none',
      outline: 'none',
      backgroundColor: 'rgba(0,0,0,0)',
      color: props.disabled ? disabledTextColor : textColor,
      cursor: props.disabled ? 'not-allowed' : 'initial',
      font: 'inherit',
      appearance: 'textfield', // Improve type search style.
      WebkitTapHighlightColor: 'rgba(0,0,0,0)', // Remove mobile color flashing (deprecated style).
      float: 'left',
    },
    error: {
      position: 'absolute',
      bottom: -10,
      fontSize: 12,
      lineHeight: '12px',
      color: errorColor,
      transition: transitions.easeOut(),
    },
    floatingLabel: {
      color: hintColor,
      pointerEvents: 'none',
      top: 28
    },
    floatingLabelFocusStyle: {
      transform: 'scale(0.75) translate(0, -36px)'
    }
  };

  const hasValue = (props.value || state.chips).length > 0 || state.inputValue.length > 0
  if (hasValue) {
    styles.floatingLabel.color = fade(props.disabled ? disabledTextColor : floatingLabelColor, 0.5);
  }

  if (state.isFocused) {
    styles.floatingLabel.color = focusColor;
  }

  if (props.floatingLabelText) {
    styles.input.boxSizing = 'border-box';
  }

  if (state.errorText) {
    if (state.isFocused) {
      styles.floatingLabel.color = styles.error.color;
    }
  }

  return styles;
};

const defaultChipRenderer = ({ value, isFocused, isDisabled, handleClick, handleRequestDelete }, key) => (
  <Chip
    key={key}
    style={{ margin: '8px 8px 0 0', float: 'left', pointerEvents: isDisabled ? 'none' : undefined }}
    backgroundColor={isFocused ? blue300 : null}
    onTouchTap={handleClick}
    onRequestDelete={handleRequestDelete}
  >
    {value}
  </Chip>
)

class ChipInput extends React.Component {
  static contextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
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

  componentWillMount() {
    const {
      name,
      hintText,
      floatingLabelText
    } = this.props;

    this.setState({
      errorText: this.props.errorText
    })

    const uniqueId = `${name}-${hintText}-${floatingLabelText}-${Math.floor(Math.random() * 0xFFFF)}`;
    this.uniqueId = uniqueId.replace(/[^A-Za-z0-9-]/gi, '');
  }

  componentDidMount() {
    const handleKeyDown = this.autoComplete.handleKeyDown
    this.autoComplete.handleKeyDown = (event) => {
      if (event.keyCode === 13) {
        this.handleAddChip(event.target.value)
        this.autoComplete.setState({ searchText: '' })
        this.autoComplete.forceUpdate()
      } else {
        handleKeyDown(event)
      }
    }

    this.autoComplete.handleItemTouchTap = (event, child) => {
      const dataSource = this.autoComplete.props.dataSource;

      const index = parseInt(child.key, 10);
      const chosenRequest = dataSource[index];
      const searchText = this.autoComplete.chosenRequestText(chosenRequest);
  
  
      this.autoComplete.setState({
        searchText: '',
      });
      this.autoComplete.forceUpdate()
      this.autoComplete.close()

      setTimeout(() => this.focus(), 1)
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.disabled) {
      this.setState({ focusedChip: null })
    }
    if (nextProps.errorText !== this.props.errorText) {
      this.setState({
        errorText: nextProps.errorText
      })
    }
  }

  blur() {
    if (this.input) this.getInputNode().blur();
  }

  focus() {
    if (this.autoComplete) this.getInputNode().focus();
    if (this.state.focusedChip) {
      this.setState({ focusedChip: null })
    }
  }

  select() {
    if (this.input) this.getInputNode().select();
  }

  getValue() {
    return this.input ? this.getInputNode().value : undefined;
  }

  getInputNode() {
    return this.autoComplete.refs.searchTextField.getInputNode()
  }

  handleInputBlur = (event) => {
    if (!this.autoComplete.refs.menu) {
      this.setState({ isFocused: false, inputValue: '' })
      if (this.props.onBlur) this.props.onBlur(event)
    }
  }

  handleInputFocus = (event) => {
    if (this.props.disabled) {
      return;
    }
    this.setState({isFocused: true});
    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  }

  handleKeyDown = (event) => {
    if (event.keyCode === 13) { // enter
      this.handleAddChip(event.target.value)
    } else if (event.keyCode === 8 || event.keyCode === 46) {
      if (event.target.value === '') {
        const chips = this.props.value || this.state.chips
        if (this.state.focusedChip == null && event.keyCode === 8) {
          this.setState({ focusedChip: chips[chips.length - 1] })
        } else if (this.state.focusedChip) {
          const index = chips.indexOf(this.state.focusedChip)
          this.handleDeleteChip(this.state.focusedChip)
          if (event.keyCode === 8 && index > 0) {
            this.setState({ focusedChip: chips[index - 1] })
          } else if (event.keyCode === 46 && index < chips.length - 1) {
            this.setState({ focusedChip: chips[index + 1] })
          }
        }
      }
    } else if (event.keyCode === 37) {
      const chips = this.props.value || this.state.chips
      const index = chips.indexOf(this.state.focusedChip)
      if (index > 0) {
        this.setState({ focusedChip: chips[index - 1] })
      }
    } else if (event.keyCode === 39) {
      const chips = this.props.value || this.state.chips
      const index = chips.indexOf(this.state.focusedChip)
      if (index >= 0 && index < chips.length - 1) {
        this.setState({ focusedChip: chips[index + 1] })
      } else {
        this.setState({ focusedChip: null })
      }
    } else {
      this.setState({ focusedChip: null })
    }
  }

  handleAddChip (chip) {
    const chips = this.props.value || this.state.chips

    if (chip.trim().length > 0 && chips.indexOf(chip) === -1) {
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

  handleDeleteChip (chip) {
    if (this.props.value) {
      if (this.props.onRequestDelete) {
        this.props.onRequestDelete(chip)
      }
    } else {
      const chips = this.state.chips.filter((c) => c !== chip)
      if (chips.length !== this.state.chips.length) {
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

  render () {
    const {
      children,
      className,
      disabled,
      errorStyle,
      errorText, // eslint-disable-line no-unused-vars
      fullWidth, // eslint-disable-line no-unused-vars
      hintText,
      hintStyle,
      inputStyle,
      onBlur, // eslint-disable-line no-unused-vars
      onChange, // eslint-disable-line no-unused-vars
      onFocus, // eslint-disable-line no-unused-vars
      style,
      underlineDisabledStyle,
      underlineFocusStyle,
      underlineShow,
      underlineStyle,
      defaultValue = [],
      filter,
      value,
      dataSource,
      floatingLabelFixed,
      floatingLabelFocusStyle, // eslint-disable-line no-unused-vars
      floatingLabelStyle, // eslint-disable-line no-unused-vars
      floatingLabelText,
      onRequestAdd, // eslint-disable-line no-unused-vars
      onRequestDelete, // eslint-disable-line no-unused-vars
      chipRenderer = defaultChipRenderer,
      ...other,
    } = this.props;

    const {prepareStyles} = this.context.muiTheme;
    const styles = getStyles(this.props, this.context, this.state);
    const inputId = this.uniqueId;

    const inputProps = {
      id: inputId,
      ref: (elem) => this.input = elem,
      disabled: this.props.disabled,
      onBlur: this.handleInputBlur,
      onFocus: this.handleInputFocus,
      onKeyDown: this.handleKeyDown
    }

    const inputStyleMerged = Object.assign(styles.input, inputStyle);

    const hasInput = (this.props.value || this.state.chips).length > 0 || this.state.inputValue.length > 0
    const showHintText = hintText && !hasInput
    const shrinkFloatingLabel = floatingLabelText && (hasInput || this.state.isFocused)

    const errorTextElement = this.state.errorText && (
      <div style={prepareStyles(styles.error)}>{this.state.errorText}</div>
    )

    const floatingLabelTextElement = floatingLabelText && (
      <TextFieldLabel
        muiTheme={this.context.muiTheme}
        style={Object.assign(styles.floatingLabel, this.props.floatingLabelStyle)}
        shrinkStyle={Object.assign(styles.floatingLabelFocusStyle, this.props.floatingLabelFocusStyle)}
        htmlFor={inputId}
        shrink={shrinkFloatingLabel}
        disabled={disabled}
      >
        {floatingLabelText}
      </TextFieldLabel>
    )

    const overrideRootStyles = {}
    if (floatingLabelText) {
      overrideRootStyles.marginTop = 14
    }
    if (fullWidth) {
      overrideRootStyles.width = '100%'
    }
    if (disabled) {
      overrideRootStyles.cursor = 'not-allowed'
    }

    const chips = this.props.value || this.state.chips
    const autoCompleteData = (dataSource || []).filter((value) => chips.indexOf(value) < 0)

    const actualFilter = other.openOnFocus ? (search, key) => (search === '' || filter(search, key)) : filter

    return (
      <div
        style={prepareStyles(Object.assign(styles.root, style, overrideRootStyles))}
        onTouchTap={() => this.focus()}
      >
        <div>
          {floatingLabelTextElement}
          <div style={{ marginTop: floatingLabelText ? 12 : 0 }}>
            {chips.map((tag, i) => chipRenderer({
              value: tag,
              isDisabled: disabled,
              isFocused: this.state.focusedChip === tag,
              handleClick: () => this.setState({ focusedChip: tag }),
              handleRequestDelete: () => this.handleDeleteChip(tag)
            }, i))}
          </div>
        </div>
        {hintText ?
          <TextFieldHint
            muiTheme={this.context.muiTheme}
            show={showHintText && !(floatingLabelText && !this.state.isFocused)}
            style={Object.assign({ bottom: 20, pointerEvents: 'none' }, hintStyle)}
            text={hintText}
          /> :
          null
        }
        <AutoComplete
          {...other}
          {...inputProps}
          filter={actualFilter}
          style={inputStyleMerged}
          dataSource={autoCompleteData}
          menuProps={{
            onChange: (event, input) => this.handleAddChip(input)
          }}
          searchText={this.state.inputValue}
          underlineShow={false}
          onKeyUp={(event) => this.setState({ inputValue: event.target.value })}
          ref={(ref) => this.autoComplete = ref}
        />
        <TextFieldUnderline
          disabled={disabled}
          disabledStyle={underlineDisabledStyle}
          error={!!this.state.errorText}
          errorStyle={errorStyle}
          focus={this.state.isFocused}
          focusStyle={underlineFocusStyle}
          muiTheme={this.context.muiTheme}
          style={underlineStyle}
        />
        {errorTextElement}
      </div>
    )
  }
}

ChipInput.propTypes = {
  style: PropTypes.object,
  floatingLabelText: PropTypes.node,
  hintText: PropTypes.node,
  disabled: PropTypes.bool,
  defaultValue: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func,
  value: PropTypes.arrayOf(PropTypes.string),
  onRequestAdd: PropTypes.func,
  onRequestDelete: PropTypes.func,
  dataSource: PropTypes.arrayOf(PropTypes.string),
  onUpdateInput: PropTypes.func,
  openOnFocus: PropTypes.bool,
  chipRenderer: PropTypes.func
}

ChipInput.defaultProps = {
  filter: AutoComplete.caseInsensitiveFilter
}

export default ChipInput
