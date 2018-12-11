'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultChipRenderer = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Input = require('@material-ui/core/Input');

var _Input2 = _interopRequireDefault(_Input);

var _FilledInput = require('@material-ui/core/FilledInput/FilledInput');

var _FilledInput2 = _interopRequireDefault(_FilledInput);

var _OutlinedInput = require('@material-ui/core/OutlinedInput');

var _OutlinedInput2 = _interopRequireDefault(_OutlinedInput);

var _InputLabel = require('@material-ui/core/InputLabel');

var _InputLabel2 = _interopRequireDefault(_InputLabel);

var _Chip = require('@material-ui/core/Chip');

var _Chip2 = _interopRequireDefault(_Chip);

var _withStyles = require('@material-ui/core/styles/withStyles');

var _withStyles2 = _interopRequireDefault(_withStyles);

var _blue = require('@material-ui/core/colors/blue');

var _blue2 = _interopRequireDefault(_blue);

var _FormControl = require('@material-ui/core/FormControl');

var _FormControl2 = _interopRequireDefault(_FormControl);

var _FormHelperText = require('@material-ui/core/FormHelperText');

var _FormHelperText2 = _interopRequireDefault(_FormHelperText);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Notice: Some code was adapted from Material-UI's text field.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *         Copyright (c) 2014 Call-Em-All (https://github.com/callemall/material-ui)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var variantComponent = {
  standard: _Input2.default,
  filled: _FilledInput2.default,
  outlined: _OutlinedInput2.default
};

var styles = function styles(theme) {
  var light = theme.palette.type === 'light';
  var bottomLineColor = light ? 'rgba(0, 0, 0, 0.42)' : 'rgba(255, 255, 255, 0.7)';

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
        backgroundImage: 'linear-gradient(to right, ' + bottomLineColor + ' 33%, transparent 0%)',
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
  };
};

var ChipInput = function (_React$Component) {
  _inherits(ChipInput, _React$Component);

  function ChipInput(props) {
    _classCallCheck(this, ChipInput);

    var _this = _possibleConstructorReturn(this, (ChipInput.__proto__ || Object.getPrototypeOf(ChipInput)).call(this, props));

    _this.state = {
      chips: [],
      errorText: undefined,
      focusedChip: null,
      inputValue: '',
      isClean: true,
      isFocused: false
    };

    _this.focus = function () {
      _this.actualInput.focus();
      if (_this.state.focusedChip != null) {
        _this.setState({ focusedChip: null });
      }
    };

    _this.handleInputBlur = function (event) {
      if (_this.props.onBlur) {
        _this.props.onBlur(event);
      }
      _this.setState({ isFocused: false });
      if (_this.state.focusedChip != null) {
        _this.setState({ focusedChip: null });
      }
      if (_this.props.blurBehavior === 'add') {
        // Lets assume that we only want to add the existing content as chip, when
        // another event has not added a chip within 200ms .
        // e.g. onSelection Callback in Autocomplete case
        var numChipsBefore = (_this.props.value || _this.state.chips).length;
        var value = event.target.value;
        _this.inputBlurTimeout = setTimeout(function () {
          var numChipsAfter = (_this.props.value || _this.state.chips).length;
          if (numChipsBefore === numChipsAfter) {
            _this.handleAddChip(value);
          } else {
            _this.clearInput();
          }
        }, 150);
      } else if (_this.props.blurBehavior === 'clear') {
        _this.clearInput();
      }
    };

    _this.handleInputFocus = function (event) {
      _this.setState({ isFocused: true });
      if (_this.props.onFocus) {
        _this.props.onFocus(event);
      }
    };

    _this.handleKeyDown = function (event) {
      var focusedChip = _this.state.focusedChip;

      _this.setState({ keyPressed: false, preventChipCreation: false });
      if (_this.props.onKeyDown) {
        // Needed for arrow controls on menu in autocomplete scenario
        _this.props.onKeyDown(event);
        // Check if the callback marked the event as isDefaultPrevented() and skip further actions
        // enter key for example should not always add the current value of the inputField
        if (event.isDefaultPrevented()) {
          return;
        }
      }

      if (_this.props.newChipKeyCodes.indexOf(event.keyCode) >= 0) {
        var result = _this.handleAddChip(event.target.value);
        if (result !== false) {
          event.preventDefault();
        }
      } else if (event.keyCode === 8 || event.keyCode === 46) {
        if (event.target.value === '') {
          var chips = _this.props.value || _this.state.chips;
          if (focusedChip == null && event.keyCode === 8) {
            _this.setState({ focusedChip: chips.length - 1 });
          } else if (focusedChip != null) {
            var _chips = _this.props.value || _this.state.chips;
            var value = _chips[focusedChip];
            _this.handleDeleteChip(value, focusedChip);
            if (event.keyCode === 8 && focusedChip > 0) {
              _this.setState({ focusedChip: focusedChip - 1 });
            } else if (event.keyCode === 46 && focusedChip <= _chips.length - 1) {
              _this.setState({ focusedChip: focusedChip });
            }
          }
        }
      } else if (event.keyCode === 37) {
        var _chips2 = _this.props.value || _this.state.chips;
        if (focusedChip == null && event.target.value === '' && _chips2.length) {
          return _this.setState({ focusedChip: _chips2.length - 1 });
        }
        if (focusedChip != null && focusedChip > 0) {
          _this.setState({ focusedChip: focusedChip - 1 });
        }
      } else if (event.keyCode === 39) {
        var _chips3 = _this.props.value || _this.state.chips;
        if (focusedChip != null && focusedChip < _chips3.length - 1) {
          _this.setState({ focusedChip: focusedChip + 1 });
        } else {
          _this.setState({ focusedChip: null });
        }
      } else {
        _this.setState({ focusedChip: null });
      }
    };

    _this.handleKeyUp = function (event) {
      if (!_this.state.preventChipCreation && _this.props.newChipKeyCodes.indexOf(event.keyCode) > 0 && _this.state.keyPressed) {
        _this.clearInput();
      } else {
        _this.setState({ inputValue: event.target.value });
      }
      if (_this.props.onKeyUp) {
        _this.props.onKeyUp(event);
      }
    };

    _this.handleKeyPress = function (event) {
      _this.setState({ keyPressed: true });
      if (_this.props.onKeyPress) {
        _this.props.onKeyPress(event);
      }
    };

    _this.handleUpdateInput = function (e) {
      var value = e.target.value;
      if (_this.props.format) {
        value = _this.props.format(value);
      }
      _this.setState({ inputValue: value });

      if (_this.props.onUpdateInput) {
        e.target.value = value;
        _this.props.onUpdateInput(e);
      }
    };

    _this.setActualInputRef = function (ref) {
      _this.actualInput = ref;
      if (_this.props.inputRef) {
        _this.props.inputRef(ref);
      }
    };

    if (props.defaultValue) {
      _this.state.chips = props.defaultValue;
    }
    _this.labelRef = _react2.default.createRef();
    _this.input = _react2.default.createRef();
    return _this;
  }

  _createClass(ChipInput, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.variant === 'outlined') {
        this.labelNode = _reactDom2.default.findDOMNode(this.labelRef.current);
        this.forceUpdate();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearTimeout(this.inputBlurTimeout);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.disabled) {
        this.setState({ focusedChip: null });
      }

      // Lets assume that if the chips have changed, the inputValue should be empty
      // otherwise, we would need to make inputValue a controlled value. which is quite messy
      if (nextProps.value && this.props.clearInputValueOnChange && nextProps.value.length !== this.props.value.length) {
        this.setState({ inputValue: '' });
      }
    }

    /**
     * Blurs this component.
     * @public
     */

  }, {
    key: 'blur',
    value: function blur() {
      if (this.input) this.actualInput.blur();
    }

    /**
     * Focuses this component.
     * @public
     */

  }, {
    key: 'handleAddChip',


    /**
     * Handles adding a chip.
     * @param {string|object} chip Value of the chip, either a string or an object (if dataSourceConfig is set)
     * @returns True if the chip was added (or at least `onAdd` was called), false if adding the chip was prevented
     */
    value: function handleAddChip(chip) {
      var _this2 = this;

      if (this.props.onBeforeAdd && !this.props.onBeforeAdd(chip)) {
        this.setState({ preventChipCreation: true });
        return false;
      }
      this.setState({ inputValue: '' });
      var chips = this.props.value || this.state.chips;

      if (this.props.dataSourceConfig) {
        if (typeof chip === 'string') {
          var _chip;

          chip = (_chip = {}, _defineProperty(_chip, this.props.dataSourceConfig.text, chip), _defineProperty(_chip, this.props.dataSourceConfig.value, chip), _chip);
        }

        if (this.props.allowDuplicates || !chips.some(function (c) {
          return c[_this2.props.dataSourceConfig.value] === chip[_this2.props.dataSourceConfig.value];
        })) {
          if (this.props.value && this.props.onAdd) {
            this.props.onAdd(chip);
          } else {
            this.updateChips([].concat(_toConsumableArray(this.state.chips), [chip]));
          }
        }
      } else if (chip.trim().length > 0) {
        if (this.props.allowDuplicates || chips.indexOf(chip) === -1) {
          if (this.props.value && this.props.onAdd) {
            this.props.onAdd(chip);
          } else {
            this.updateChips([].concat(_toConsumableArray(this.state.chips), [chip]));
          }
        }
      } else {
        return false;
      }
      return true;
    }
  }, {
    key: 'handleDeleteChip',
    value: function handleDeleteChip(chip, i) {
      if (this.props.value) {
        if (this.props.onDelete) {
          this.props.onDelete(chip, i);
        }
      } else {
        var chips = this.state.chips.slice();
        var changed = chips.splice(i, 1); // remove the chip at index i
        if (changed) {
          var focusedChip = this.state.focusedChip;
          if (this.state.focusedChip === i) {
            focusedChip = null;
          } else if (this.state.focusedChip > i) {
            focusedChip = this.state.focusedChip - 1;
          }
          this.updateChips(chips, { focusedChip: focusedChip });
        }
      }
    }
  }, {
    key: 'updateChips',
    value: function updateChips(chips) {
      var additionalUpdates = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      this.setState(_extends({ chips: chips }, additionalUpdates));
      if (this.props.onChange) {
        this.props.onChange(chips);
      }
    }

    /**
     * Clears the text field for adding new chips.
     * @public
     */

  }, {
    key: 'clearInput',
    value: function clearInput() {
      this.setState({ inputValue: '' });
    }

    /**
     * Set the reference to the actual input, that is the input of the Input.
     * @param {object} ref - The reference
     */

  }, {
    key: 'render',
    value: function render() {
      var _this3 = this,
          _cx;

      var _props = this.props,
          allowDuplicates = _props.allowDuplicates,
          blurBehavior = _props.blurBehavior,
          children = _props.children,
          _props$chipRenderer = _props.chipRenderer,
          chipRenderer = _props$chipRenderer === undefined ? defaultChipRenderer : _props$chipRenderer,
          classes = _props.classes,
          className = _props.className,
          clearInputValueOnChange = _props.clearInputValueOnChange,
          defaultValue = _props.defaultValue,
          dataSource = _props.dataSource,
          dataSourceConfig = _props.dataSourceConfig,
          disabled = _props.disabled,
          disableUnderline = _props.disableUnderline,
          error = _props.error,
          filter = _props.filter,
          FormHelperTextProps = _props.FormHelperTextProps,
          fullWidth = _props.fullWidth,
          fullWidthInput = _props.fullWidthInput,
          helperText = _props.helperText,
          id = _props.id,
          _props$InputProps = _props.InputProps,
          InputProps = _props$InputProps === undefined ? {} : _props$InputProps,
          inputRef = _props.inputRef,
          _props$InputLabelProp = _props.InputLabelProps,
          InputLabelProps = _props$InputLabelProp === undefined ? {} : _props$InputLabelProp,
          label = _props.label,
          newChipKeyCodes = _props.newChipKeyCodes,
          onBeforeAdd = _props.onBeforeAdd,
          onAdd = _props.onAdd,
          onBlur = _props.onBlur,
          onDelete = _props.onDelete,
          onChange = _props.onChange,
          onFocus = _props.onFocus,
          onKeyDown = _props.onKeyDown,
          onKeyPress = _props.onKeyPress,
          onKeyUp = _props.onKeyUp,
          onUpdateInput = _props.onUpdateInput,
          placeholder = _props.placeholder,
          required = _props.required,
          rootRef = _props.rootRef,
          value = _props.value,
          variant = _props.variant,
          other = _objectWithoutProperties(_props, ['allowDuplicates', 'blurBehavior', 'children', 'chipRenderer', 'classes', 'className', 'clearInputValueOnChange', 'defaultValue', 'dataSource', 'dataSourceConfig', 'disabled', 'disableUnderline', 'error', 'filter', 'FormHelperTextProps', 'fullWidth', 'fullWidthInput', 'helperText', 'id', 'InputProps', 'inputRef', 'InputLabelProps', 'label', 'newChipKeyCodes', 'onBeforeAdd', 'onAdd', 'onBlur', 'onDelete', 'onChange', 'onFocus', 'onKeyDown', 'onKeyPress', 'onKeyUp', 'onUpdateInput', 'placeholder', 'required', 'rootRef', 'value', 'variant']);

      var chips = this.props.value || this.state.chips;

      var hasInput = (this.props.value || this.state.chips).length > 0 || this.state.inputValue.length > 0;
      var shrinkFloatingLabel = InputLabelProps.shrink != null ? InputLabelProps.shrink : label != null && (hasInput || this.state.isFocused);

      var chipComponents = chips.map(function (tag, i) {
        var value = dataSourceConfig ? tag[dataSourceConfig.value] : tag;
        return chipRenderer({
          value: value,
          text: dataSourceConfig ? tag[dataSourceConfig.text] : tag,
          chip: tag,
          isDisabled: !!disabled,
          isFocused: _this3.state.focusedChip === i,
          handleClick: function handleClick() {
            return _this3.setState({ focusedChip: i });
          },
          handleDelete: function handleDelete() {
            return _this3.handleDeleteChip(value, i);
          },
          className: classes.chip
        }, i);
      });

      var InputMore = {};
      if (variant === 'outlined') {
        if (InputLabelProps && typeof InputLabelProps.shrink !== 'undefined') {
          InputMore.notched = InputLabelProps.shrink;
        }

        InputMore.labelWidth = shrinkFloatingLabel && this.labelNode && this.labelNode.offsetWidth || 0;
      }

      if (variant !== 'standard') {
        InputMore.startAdornment = _react2.default.createElement(
          _react2.default.Fragment,
          null,
          chipComponents
        );
      } else {
        InputProps.disableUnderline = true;
      }

      var InputComponent = variantComponent[variant];

      return _react2.default.createElement(
        _FormControl2.default,
        _extends({
          ref: rootRef,
          fullWidth: fullWidth,
          className: (0, _classnames2.default)(className, classes.root),
          error: error,
          required: required,
          onClick: this.focus,
          disabled: disabled,
          variant: variant
        }, other),
        label && _react2.default.createElement(
          _InputLabel2.default,
          _extends({
            htmlFor: id,
            classes: { root: (0, _classnames2.default)(classes[variant], classes.label), shrink: classes.labelShrink },
            shrink: shrinkFloatingLabel,
            focused: this.state.isFocused,
            variant: variant,
            ref: this.labelRef
          }, InputLabelProps),
          label
        ),
        _react2.default.createElement(
          'div',
          {
            className: (0, _classnames2.default)(classes[variant], classes.chipContainer, (_cx = {}, _defineProperty(_cx, classes.inkbar, !disableUnderline && variant === 'standard'), _defineProperty(_cx, classes.focused, this.state.isFocused), _defineProperty(_cx, classes.underline, !disableUnderline && variant === 'standard'), _defineProperty(_cx, classes.disabled, disabled), _defineProperty(_cx, classes.labeled, label != null), _defineProperty(_cx, classes.error, error), _cx))
          },
          variant === 'standard' && chipComponents,
          _react2.default.createElement(InputComponent, _extends({
            ref: this.input,
            classes: {
              input: (0, _classnames2.default)(classes.input, classes[variant]),
              root: (0, _classnames2.default)(classes.inputRoot, classes[variant])
            },
            id: id,
            value: this.state.inputValue,
            onChange: this.handleUpdateInput,
            onKeyDown: this.handleKeyDown,
            onKeyPress: this.handleKeyPress,
            onKeyUp: this.handleKeyUp,
            onFocus: this.handleInputFocus,
            onBlur: this.handleInputBlur,
            inputRef: this.setActualInputRef,
            disabled: disabled,
            fullWidth: fullWidthInput,
            placeholder: !hasInput && (shrinkFloatingLabel || label == null) ? placeholder : null
          }, InputProps, InputMore))
        ),
        helperText && _react2.default.createElement(
          _FormHelperText2.default,
          _extends({}, FormHelperTextProps, {
            className: FormHelperTextProps ? (0, _classnames2.default)(FormHelperTextProps.className, classes.helperText) : classes.helperText
          }),
          helperText
        )
      );
    }
  }]);

  return ChipInput;
}(_react2.default.Component);

ChipInput.propTypes = {
  /** Allows duplicate chips if set to true. */
  allowDuplicates: _propTypes2.default.bool,
  /** Behavior when the chip input is blurred: `'clear'` clears the input, `'add'` creates a chip and `'ignore'` keeps the input. */
  blurBehavior: _propTypes2.default.oneOf(['clear', 'add', 'ignore']),
  /** A function of the type `({ value, text, chip, isFocused, isDisabled, handleClick, handleDelete, className }, key) => node` that returns a chip based on the given properties. This can be used to customize chip styles.  Each item in the `dataSource` array will be passed to `chipRenderer` as arguments `chip`, `value` and `text`. If `dataSource` is an array of objects and `dataSourceConfig` is present, then `value` and `text` will instead correspond to the object values defined in `dataSourceConfig`. If `dataSourceConfig` is not set and `dataSource` is an array of objects, then a custom `chipRenderer` must be set. `chip` is always the raw value from `dataSource`, either an object or a string. */
  chipRenderer: _propTypes2.default.func,
  /** Whether the input value should be cleared if the `value` prop is changed. */
  clearInputValueOnChange: _propTypes2.default.bool,
  /** Data source for auto complete. This should be an array of strings or objects. */
  dataSource: _propTypes2.default.array,
  /** Config for objects list dataSource, e.g. `{ text: 'text', value: 'value' }`. If not specified, the `dataSource` must be a flat array of strings or a custom `chipRenderer` must be set to handle the objects. */
  dataSourceConfig: _propTypes2.default.shape({
    text: _propTypes2.default.string.isRequired,
    value: _propTypes2.default.string.isRequired
  }),
  /** The chips to display by default (for uncontrolled mode). */
  defaultValue: _propTypes2.default.array,
  /** Disables the chip input if set to true. */
  disabled: _propTypes2.default.bool,
  /** Disable the input underline. Only valid for 'standard' variant */
  disableUnderline: _propTypes2.default.bool,
  /** Props to pass through to the `FormHelperText` component. */
  FormHelperTextProps: _propTypes2.default.object,
  /** If true, the chip input will fill the available width. */
  fullWidth: _propTypes2.default.bool,
  /** If true, the input field will always be below the chips and fill the available space. By default, it will try to be beside the chips. */
  fullWidthInput: _propTypes2.default.bool,
  /** Helper text that is displayed below the input. */
  helperText: _propTypes2.default.node,
  /** Props to pass through to the `InputLabel`. */
  InputLabelProps: _propTypes2.default.object,
  /** Props to pass through to the `Input`. */
  InputProps: _propTypes2.default.object,
  /** Use this property to pass a ref callback to the native input component. */
  inputRef: _propTypes2.default.func,
  /* The content of the floating label. */
  label: _propTypes2.default.node,
  /** The key codes used to determine when to create a new chip. */
  newChipKeyCodes: _propTypes2.default.arrayOf(_propTypes2.default.number),
  /** Callback function that is called when a new chip was added (in controlled mode). */
  onAdd: _propTypes2.default.func,
  /** Callback function that is called with the chip to be added and should return true to add the chip or false to prevent the chip from being added without clearing the text input. */
  onBeforeAdd: _propTypes2.default.func,
  /** Callback function that is called when the chips change (in uncontrolled mode). */
  onChange: _propTypes2.default.func,
  /** Callback function that is called when a new chip was removed (in controlled mode). */
  onDelete: _propTypes2.default.func,
  /** Callback function that is called when the input changes. */
  onUpdateInput: _propTypes2.default.func,
  /** A placeholder that is displayed if the input has no values. */
  placeholder: _propTypes2.default.string,
  /** The chips to display (enables controlled mode if set). */
  value: _propTypes2.default.array,
  /** The variant of the Input component */
  variant: _propTypes2.default.oneOf(['outlined', 'standard', 'filled'])
};

ChipInput.defaultProps = {
  allowDuplicates: false,
  blurBehavior: 'clear',
  clearInputValueOnChange: false,
  disableUnderline: false,
  newChipKeyCodes: [13],
  variant: 'standard'
};

exports.default = (0, _withStyles2.default)(styles)(ChipInput);
var defaultChipRenderer = exports.defaultChipRenderer = function defaultChipRenderer(_ref, key) {
  var value = _ref.value,
      text = _ref.text,
      isFocused = _ref.isFocused,
      isDisabled = _ref.isDisabled,
      handleClick = _ref.handleClick,
      handleDelete = _ref.handleDelete,
      className = _ref.className;
  return _react2.default.createElement(_Chip2.default, {
    key: key,
    className: className,
    style: { pointerEvents: isDisabled ? 'none' : undefined, backgroundColor: isFocused ? _blue2.default[300] : undefined },
    onClick: handleClick,
    onDelete: handleDelete,
    label: text
  });
};