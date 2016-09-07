/**
 * Notice: Some code was adapted from Material-UI's text field.
 *         Copyright (c) 2014 Call-Em-All (https://github.com/callemall/material-ui)
 */
import React from 'react'
import ReactDOM from 'react-dom'
import TextFieldUnderline from 'material-ui/TextField/TextFieldUnderline'
import TextFieldHint from 'material-ui/TextField/TextFieldHint'
import transitions from 'material-ui/styles/transitions'
import Chip from 'material-ui/Chip'
import {blue300, indigo900} from 'material-ui/styles/colors'

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
      height: (props.rows - 1) * 24 + (props.floatingLabelText ? 72 : 48),
      display: 'inline-block',
      position: 'relative',
      backgroundColor: backgroundColor,
      fontFamily: baseTheme.fontFamily,
      transition: transitions.easeOut('200ms', 'height'),
      cursor: 'text'
    },
    input: {
      padding: 0,
      marginTop: 8,
      marginBottom: 16,
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
    }
  };

  if (props.floatingLabelText) {
    styles.input.boxSizing = 'border-box';

    if (!props.multiLine) {
      styles.input.marginTop = 14;
    }

    if (state.errorText) {
      styles.error.bottom = !props.multiLine ? styles.error.fontSize + 3 : 3;
    }
  }

  if (state.errorText) {
    if (state.isFocused) {
      styles.floatingLabel.color = styles.error.color;
    }
  }

  return styles;
};

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
    hasValue: false
  }

  constructor (props) {
    super(props)
    if (props.defaultValue) {
      this.state.chips = props.defaultValue
    }
  }

  blur() {
    if (this.input) this.getInputNode().blur();
  }

  focus() {
    if (this.input) this.getInputNode().focus();
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
    return (this.props.children || this.props.multiLine) ?
      this.input.getInputNode() : ReactDOM.findDOMNode(this.input);
  }

  handleInputBlur = (event) => {
    this.setState({isFocused: false});
    if (this.props.onBlur) this.props.onBlur(event);
  }

  handleInputChange = (event) => {
    this.setState({ hasValue: event.target.value !== '' });
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
      const input = event.target.value
      const chips = this.props.value || this.state.chips
      if (input.trim().length > 0) {
        if (chips.indexOf(input) === -1) {
          if (this.props.value) {
            if (this.props.onRequestAdd) {
              this.props.onRequestAdd(input)
            }
          } else {
            this.setState({ chips: [ ...chips, input ] })
            if (this.props.onChange) {
              this.props.onChange([ ...chips, input ])
            }
          }
        }
        this.setState({ hasValue: false })
        event.target.value = ''
      }
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
        this.props.onChange(chips)
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
      value,
      ...other,
    } = this.props;

    const inputProps = {
      ref: (elem) => this.input = elem,
      disabled: this.props.disabled,
      onBlur: this.handleInputBlur,
      onChange: this.handleInputChange,
      onFocus: this.handleInputFocus,
      onKeyDown: this.handleKeyDown
    }

    const styles = getStyles(this.props, this.context, this.state);
    const {prepareStyles} = this.context.muiTheme;
    const inputStyleMerged = Object.assign(styles.input, inputStyle);

    return (
      <div
        style={prepareStyles(Object.assign(styles.root, style))}
        onTouchTap={() => this.focus()}
      >
      <div>
        {(this.props.value || this.state.chips).map((tag) => (
          <Chip
            style={{ margin: '8px 8px 0 0', float: 'left' }}
            backgroundColor={this.state.focusedChip === tag ? blue300 : null}
            onTouchTap={() => { this.setState({ focusedChip: tag }) }}
            onRequestDelete={() => this.handleDeleteChip(tag)}
          >
            {tag}
          </Chip>
        ))}
        </div>
        {hintText ?
          <TextFieldHint
            muiTheme={this.context.muiTheme}
            show={(this.state.chips || this.props.chips).length === 0 && !this.state.hasValue}
            style={Object.assign({ bottom: 20, pointerEvents: 'none' }, hintStyle)}
            text={hintText}
          /> :
          null
        }
        <input
          {...other}
          {...inputProps}
          style={prepareStyles(inputStyleMerged)}
          type="text"
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
      </div>
    )
  }
}

ChipInput.propTypes = {
  children: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func,
}

export default ChipInput
