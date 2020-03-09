"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultChipRenderer = exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Input = _interopRequireDefault(require("@material-ui/core/Input"));

var _FilledInput = _interopRequireDefault(require("@material-ui/core/FilledInput/FilledInput"));

var _OutlinedInput = _interopRequireDefault(require("@material-ui/core/OutlinedInput"));

var _InputLabel = _interopRequireDefault(require("@material-ui/core/InputLabel"));

var _Chip = _interopRequireDefault(require("@material-ui/core/Chip"));

var _withStyles = _interopRequireDefault(require("@material-ui/core/styles/withStyles"));

var _blue = _interopRequireDefault(require("@material-ui/core/colors/blue"));

var _FormControl = _interopRequireDefault(require("@material-ui/core/FormControl"));

var _FormHelperText = _interopRequireDefault(require("@material-ui/core/FormHelperText"));

var _classnames = _interopRequireDefault(require("classnames"));

var _reactSortablejs = require("react-sortablejs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var variantComponent = {
  standard: _Input["default"],
  filled: _FilledInput["default"],
  outlined: _OutlinedInput["default"]
};

var styles = function styles(theme) {
  var light = theme.palette.type === "light";
  var bottomLineColor = light ? "rgba(0, 0, 0, 0.42)" : "rgba(255, 255, 255, 0.7)";
  return {
    root: {},
    inputRoot: {
      display: "inline-flex",
      flexWrap: "wrap",
      flex: 1,
      marginTop: 0,
      minWidth: 70,
      "&$outlined,&$filled": {
        boxSizing: "border-box"
      },
      "&$outlined": {
        paddingTop: 14
      },
      "&$filled": {
        paddingTop: 28
      }
    },
    input: {
      display: "inline-block",
      textOverflow: "ellipsis",
      overflow: "hidden",
      whiteSpace: "nowrap",
      appearance: "none",
      // Remove border in Safari, doesn't seem to break anything in other browsers
      WebkitTapHighlightColor: "rgba(0,0,0,0)",
      // Remove mobile color flashing (deprecated style).
      "float": "left",
      flex: 1
    },
    chipContainer: {
      display: "flex",
      flexFlow: "row wrap",
      cursor: "text",
      marginBottom: -2,
      minHeight: 40,
      "&$labeled&$standard": {
        marginTop: 18
      }
    },
    outlined: {
      "& input": {
        height: 16,
        paddingTop: 4,
        paddingBottom: 12,
        marginTop: 4,
        marginBottom: 4
      }
    },
    standard: {},
    filled: {
      "& input": {
        height: 22,
        marginBottom: 4,
        marginTop: 4,
        paddingTop: 0
      },
      "$marginDense & input": {
        height: 26
      }
    },
    labeled: {},
    label: {
      top: 4,
      "&$outlined&:not($labelShrink)": {
        top: 2,
        "$marginDense &": {
          top: 5
        }
      },
      "&$filled&:not($labelShrink)": {
        top: 15,
        "$marginDense &": {
          top: 20
        }
      }
    },
    labelShrink: {
      top: 0
    },
    helperText: {
      marginBottom: -20
    },
    focused: {},
    disabled: {},
    underline: {
      "&:after": {
        borderBottom: "2px solid ".concat(theme.palette.primary[light ? "dark" : "light"]),
        left: 0,
        bottom: 0,
        // Doing the other way around crash on IE 11 "''" https://github.com/cssinjs/jss/issues/242
        content: '""',
        position: "absolute",
        right: 0,
        transform: "scaleX(0)",
        transition: theme.transitions.create("transform", {
          duration: theme.transitions.duration.shorter,
          easing: theme.transitions.easing.easeOut
        }),
        pointerEvents: "none" // Transparent to the hover style.

      },
      "&$focused:after": {
        transform: "scaleX(1)"
      },
      "&$error:after": {
        borderBottomColor: theme.palette.error.main,
        transform: "scaleX(1)" // error is always underlined in red

      },
      "&:before": {
        borderBottom: "1px solid ".concat(bottomLineColor),
        left: 0,
        bottom: 0,
        // Doing the other way around crash on IE 11 "''" https://github.com/cssinjs/jss/issues/242
        content: '"\\00a0"',
        position: "absolute",
        right: 0,
        transition: theme.transitions.create("border-bottom-color", {
          duration: theme.transitions.duration.shorter
        }),
        pointerEvents: "none" // Transparent to the hover style.

      },
      "&:hover:not($disabled):not($focused):not($error):before": {
        borderBottom: "2px solid ".concat(theme.palette.text.primary),
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": {
          borderBottom: "1px solid ".concat(bottomLineColor)
        }
      },
      "&$disabled:before": {
        borderBottomStyle: "dotted"
      }
    },
    error: {
      "&:after": {
        backgroundColor: theme.palette.error.main,
        transform: "scaleX(1)" // error is always underlined in red

      }
    },
    chip: {
      margin: "0 8px 8px 0",
      "float": "left"
    },
    marginDense: {}
  };
};

var keyCodes = {
  BACKSPACE: 8,
  DELETE: 46,
  LEFT_ARROW: 37,
  RIGHT_ARROW: 39
};

var ChipInput = /*#__PURE__*/function (_React$Component) {
  _inherits(ChipInput, _React$Component);

  function ChipInput(props) {
    var _this;

    _classCallCheck(this, ChipInput);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ChipInput).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "state", {
      chips: [],
      errorText: undefined,
      focusedChip: null,
      inputValue: "",
      isClean: true,
      isFocused: false,
      chipsUpdated: false,
      prevPropsValue: []
    });

    _defineProperty(_assertThisInitialized(_this), "focus", function () {
      _this.actualInput.focus();

      if (_this.state.focusedChip != null) {
        _this.setState({
          focusedChip: null
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleInputBlur", function (event) {
      if (_this.props.onBlur) {
        _this.props.onBlur(event);
      }

      _this.setState({
        isFocused: false
      });

      if (_this.state.focusedChip != null) {
        _this.setState({
          focusedChip: null
        });
      }

      var value = event.target.value;

      switch (_this.props.blurBehavior) {
        case "add":
          if (_this.props.delayBeforeAdd) {
            // Lets assume that we only want to add the existing content as chip, when
            // another event has not added a chip within 200ms .
            // e.g. onSelection Callback in Autocomplete case
            var numChipsBefore = (_this.props.value || _this.state.chips).length;
            _this.inputBlurTimeout = setTimeout(function () {
              var numChipsAfter = (_this.props.value || _this.state.chips).length;

              if (numChipsBefore === numChipsAfter) {
                _this.handleAddChip(value);
              } else {
                _this.clearInput();
              }
            }, 150);
          } else {
            _this.handleAddChip(value);
          }

          break;

        case "clear":
          _this.clearInput();

          break;
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleInputFocus", function (event) {
      _this.setState({
        isFocused: true
      });

      if (_this.props.onFocus) {
        _this.props.onFocus(event);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleKeyDown", function (event) {
      var focusedChip = _this.state.focusedChip;
      _this._keyPressed = false;
      _this._preventChipCreation = false;

      if (_this.props.onKeyDown) {
        // Needed for arrow controls on menu in autocomplete scenario
        _this.props.onKeyDown(event); // Check if the callback marked the event as isDefaultPrevented() and skip further actions
        // enter key for example should not always add the current value of the inputField


        if (event.isDefaultPrevented()) {
          return;
        }
      }

      var chips = _this.props.value || _this.state.chips;

      if (_this.props.newChipKeyCodes.indexOf(event.keyCode) >= 0 || _this.props.newChipKeys.indexOf(event.key) >= 0) {
        var result = _this.handleAddChip(event.target.value);

        if (result !== false) {
          event.preventDefault();
        }

        return;
      }

      switch (event.keyCode) {
        case keyCodes.BACKSPACE:
          if (event.target.value === "") {
            if (focusedChip != null) {
              _this.handleDeleteChip(chips[focusedChip], focusedChip);

              if (focusedChip > 0) {
                _this.setState({
                  focusedChip: focusedChip - 1
                });
              }
            } else {
              _this.setState({
                focusedChip: chips.length - 1
              });
            }
          }

          break;

        case keyCodes.DELETE:
          if (event.target.value === "" && focusedChip != null) {
            _this.handleDeleteChip(chips[focusedChip], focusedChip);

            if (focusedChip <= chips.length - 1) {
              _this.setState({
                focusedChip: focusedChip
              });
            }
          }

          break;

        case keyCodes.LEFT_ARROW:
          if (focusedChip == null && event.target.value === "" && chips.length) {
            _this.setState({
              focusedChip: chips.length - 1
            });
          } else if (focusedChip != null && focusedChip > 0) {
            _this.setState({
              focusedChip: focusedChip - 1
            });
          }

          break;

        case keyCodes.RIGHT_ARROW:
          if (focusedChip != null && focusedChip < chips.length - 1) {
            _this.setState({
              focusedChip: focusedChip + 1
            });
          } else {
            _this.setState({
              focusedChip: null
            });
          }

          break;

        default:
          _this.setState({
            focusedChip: null
          });

          break;
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleKeyUp", function (event) {
      if (!_this._preventChipCreation && (_this.props.newChipKeyCodes.indexOf(event.keyCode) >= 0 || _this.props.newChipKeys.indexOf(event.key) >= 0) && _this._keyPressed) {
        _this.clearInput();
      } else {
        _this.updateInput(event.target.value);
      }

      if (_this.props.onKeyUp) {
        _this.props.onKeyUp(event);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleKeyPress", function (event) {
      _this._keyPressed = true;

      if (_this.props.onKeyPress) {
        _this.props.onKeyPress(event);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleUpdateInput", function (e) {
      if (_this.props.inputValue == null) {
        _this.updateInput(e.target.value);
      }

      if (_this.props.onUpdateInput) {
        _this.props.onUpdateInput(e);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "setActualInputRef", function (ref) {
      _this.actualInput = ref;

      if (_this.props.inputRef) {
        _this.props.inputRef(ref);
      }
    });

    if (props.defaultValue) {
      _this.state.chips = props.defaultValue;
    }

    _this.labelRef = _react["default"].createRef();
    _this.input = _react["default"].createRef();
    return _this;
  }

  _createClass(ChipInput, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.variant === "outlined") {
        this.labelNode = _reactDom["default"].findDOMNode(this.labelRef.current);
        this.forceUpdate();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      clearTimeout(this.inputBlurTimeout);
    }
  }, {
    key: "blur",

    /**
     * Blurs this component.
     * @public
     */
    value: function blur() {
      if (this.input) this.actualInput.blur();
    }
    /**
     * Focuses this component.
     * @public
     */

  }, {
    key: "handleAddChip",

    /**
     * Handles adding a chip.
     * @param {string|object} chip Value of the chip, either a string or an object (if dataSourceConfig is set)
     * @returns True if the chip was added (or at least `onAdd` was called), false if adding the chip was prevented
     */
    value: function handleAddChip(chip) {
      var _this2 = this;

      if (this.props.onBeforeAdd && !this.props.onBeforeAdd(chip)) {
        this._preventChipCreation = true;
        return false;
      }

      this.clearInput();
      var chips = this.props.value || this.state.chips;

      if (this.props.dataSourceConfig) {
        if (typeof chip === "string") {
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

        return true;
      }

      if (chip.trim().length > 0) {
        if (this.props.allowDuplicates || chips.indexOf(chip) === -1) {
          if (this.props.value && this.props.onAdd) {
            this.props.onAdd(chip);
          } else {
            this.updateChips([].concat(_toConsumableArray(this.state.chips), [chip]));
          }
        }

        return true;
      }

      return false;
    }
  }, {
    key: "handleDeleteChip",
    value: function handleDeleteChip(chip, i) {
      if (!this.props.value) {
        var chips = this.state.chips.slice();
        var changed = chips.splice(i, 1); // remove the chip at index i

        if (changed) {
          var focusedChip = this.state.focusedChip;

          if (this.state.focusedChip === i) {
            focusedChip = null;
          } else if (this.state.focusedChip > i) {
            focusedChip = this.state.focusedChip - 1;
          }

          this.updateChips(chips, {
            focusedChip: focusedChip
          });
        }
      } else if (this.props.onDelete) {
        this.props.onDelete(chip, i);
      }
    }
  }, {
    key: "updateChips",
    value: function updateChips(chips) {
      var additionalUpdates = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      this.setState(_objectSpread({
        chips: chips,
        chipsUpdated: true
      }, additionalUpdates));

      if (this.props.onChange) {
        this.props.onChange(chips);
      }
    }
    /**
     * Clears the text field for adding new chips.
     * This only works in uncontrolled input mode, i.e. if the inputValue prop is not used.
     * @public
     */

  }, {
    key: "clearInput",
    value: function clearInput() {
      this.updateInput("");
    }
  }, {
    key: "updateInput",
    value: function updateInput(value) {
      this.setState({
        inputValue: value
      });
    }
    /**
     * Set the reference to the actual input, that is the input of the Input.
     * @param {object} ref - The reference
     */

  }, {
    key: "render",
    value: function render() {
      var _this3 = this,
          _cx2;

      var _this$props = this.props,
          allowDuplicates = _this$props.allowDuplicates,
          alwaysShowPlaceholder = _this$props.alwaysShowPlaceholder,
          blurBehavior = _this$props.blurBehavior,
          children = _this$props.children,
          _this$props$chipRende = _this$props.chipRenderer,
          chipRenderer = _this$props$chipRende === void 0 ? defaultChipRenderer : _this$props$chipRende,
          classes = _this$props.classes,
          className = _this$props.className,
          clearInputValueOnChange = _this$props.clearInputValueOnChange,
          dataSource = _this$props.dataSource,
          dataSourceConfig = _this$props.dataSourceConfig,
          defaultValue = _this$props.defaultValue,
          delayBeforeAdd = _this$props.delayBeforeAdd,
          disabled = _this$props.disabled,
          disableUnderline = _this$props.disableUnderline,
          error = _this$props.error,
          filter = _this$props.filter,
          FormHelperTextProps = _this$props.FormHelperTextProps,
          fullWidth = _this$props.fullWidth,
          fullWidthInput = _this$props.fullWidthInput,
          helperText = _this$props.helperText,
          id = _this$props.id,
          _this$props$InputProp = _this$props.InputProps,
          InputProps = _this$props$InputProp === void 0 ? {} : _this$props$InputProp,
          inputRef = _this$props.inputRef,
          _this$props$InputLabe = _this$props.InputLabelProps,
          InputLabelProps = _this$props$InputLabe === void 0 ? {} : _this$props$InputLabe,
          inputValue = _this$props.inputValue,
          label = _this$props.label,
          newChipKeyCodes = _this$props.newChipKeyCodes,
          newChipKeys = _this$props.newChipKeys,
          onBeforeAdd = _this$props.onBeforeAdd,
          onAdd = _this$props.onAdd,
          onBlur = _this$props.onBlur,
          onDelete = _this$props.onDelete,
          onChange = _this$props.onChange,
          onFocus = _this$props.onFocus,
          onKeyDown = _this$props.onKeyDown,
          onKeyPress = _this$props.onKeyPress,
          onKeyUp = _this$props.onKeyUp,
          onUpdateInput = _this$props.onUpdateInput,
          placeholder = _this$props.placeholder,
          readOnly = _this$props.readOnly,
          required = _this$props.required,
          rootRef = _this$props.rootRef,
          value = _this$props.value,
          variant = _this$props.variant,
          other = _objectWithoutProperties(_this$props, ["allowDuplicates", "alwaysShowPlaceholder", "blurBehavior", "children", "chipRenderer", "classes", "className", "clearInputValueOnChange", "dataSource", "dataSourceConfig", "defaultValue", "delayBeforeAdd", "disabled", "disableUnderline", "error", "filter", "FormHelperTextProps", "fullWidth", "fullWidthInput", "helperText", "id", "InputProps", "inputRef", "InputLabelProps", "inputValue", "label", "newChipKeyCodes", "newChipKeys", "onBeforeAdd", "onAdd", "onBlur", "onDelete", "onChange", "onFocus", "onKeyDown", "onKeyPress", "onKeyUp", "onUpdateInput", "placeholder", "readOnly", "required", "rootRef", "value", "variant"]);

      var chips = value || this.state.chips;
      var actualInputValue = inputValue != null ? inputValue : this.state.inputValue;
      var hasInput = (this.props.value || actualInputValue).length > 0 || actualInputValue.length > 0;
      var shrinkFloatingLabel = InputLabelProps.shrink != null ? InputLabelProps.shrink : label != null && (hasInput || this.state.isFocused || chips.length > 0);
      var chipComponents = chips.map(function (chip, i) {
        var value = dataSourceConfig ? chip[dataSourceConfig.value] : chip;
        return chipRenderer({
          value: value,
          text: dataSourceConfig ? chip[dataSourceConfig.text] : chip,
          chip: chip,
          isDisabled: !!disabled,
          isReadOnly: readOnly,
          isFocused: _this3.state.focusedChip === i,
          handleClick: function handleClick() {
            return _this3.setState({
              focusedChip: i
            });
          },
          handleDelete: function handleDelete() {
            return _this3.handleDeleteChip(chip, i);
          },
          className: classes.chip
        }, i);
      });
      var InputMore = {};

      if (variant === "outlined") {
        InputMore.notched = shrinkFloatingLabel;
        InputMore.labelWidth = shrinkFloatingLabel && this.labelNode && this.labelNode.offsetWidth || 0;
      }

      if (variant !== "standard") {
        InputMore.startAdornment = _react["default"].createElement(_reactSortablejs.ReactSortable, {
          list: chips,
          setList: updateChips
        }, chipComponents);
      } else {
        InputProps.disableUnderline = true;
      }

      var InputComponent = variantComponent[variant];
      return _react["default"].createElement(_FormControl["default"], _extends({
        ref: rootRef,
        fullWidth: fullWidth,
        className: (0, _classnames["default"])(className, classes.root, _defineProperty({}, classes.marginDense, other.margin === "dense")),
        error: error,
        required: required,
        onClick: this.focus,
        disabled: disabled,
        variant: variant
      }, other), label && _react["default"].createElement(_InputLabel["default"], _extends({
        htmlFor: id,
        classes: {
          root: (0, _classnames["default"])(classes[variant], classes.label),
          shrink: classes.labelShrink
        },
        shrink: shrinkFloatingLabel,
        focused: this.state.isFocused,
        variant: variant,
        ref: this.labelRef
      }, InputLabelProps), label), _react["default"].createElement("div", {
        className: (0, _classnames["default"])(classes[variant], classes.chipContainer, (_cx2 = {}, _defineProperty(_cx2, classes.focused, this.state.isFocused), _defineProperty(_cx2, classes.underline, !disableUnderline && variant === "standard"), _defineProperty(_cx2, classes.disabled, disabled), _defineProperty(_cx2, classes.labeled, label != null), _defineProperty(_cx2, classes.error, error), _cx2))
      }, variant === "standard" && chipComponents, _react["default"].createElement(InputComponent, _extends({
        ref: this.input,
        classes: {
          input: (0, _classnames["default"])(classes.input, classes[variant]),
          root: (0, _classnames["default"])(classes.inputRoot, classes[variant])
        },
        id: id,
        value: actualInputValue,
        onChange: this.handleUpdateInput,
        onKeyDown: this.handleKeyDown,
        onKeyPress: this.handleKeyPress,
        onKeyUp: this.handleKeyUp,
        onFocus: this.handleInputFocus,
        onBlur: this.handleInputBlur,
        inputRef: this.setActualInputRef,
        disabled: disabled,
        fullWidth: fullWidthInput,
        placeholder: !hasInput && (shrinkFloatingLabel || label == null) || alwaysShowPlaceholder ? placeholder : null,
        readOnly: readOnly
      }, InputProps, InputMore))), helperText && _react["default"].createElement(_FormHelperText["default"], _extends({}, FormHelperTextProps, {
        className: FormHelperTextProps ? (0, _classnames["default"])(FormHelperTextProps.className, classes.helperText) : classes.helperText
      }), helperText));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      var newState = null;

      if (props.value && props.value.length !== state.prevPropsValue.length) {
        newState = {
          prevPropsValue: props.value
        };

        if (props.clearInputValueOnChange) {
          newState.inputValue = "";
        }
      } // if change detection is only needed for clearInputValueOnChange


      if (props.clearInputValueOnChange && props.value && props.value.length !== state.prevPropsValue.length) {
        newState = {
          prevPropsValue: props.value,
          inputValue: ""
        };
      }

      if (props.disabled) {
        newState = _objectSpread({}, newState, {
          focusedChip: null
        });
      }

      if (!state.chipsUpdated && props.defaultValue) {
        newState = _objectSpread({}, newState, {
          chips: props.defaultValue
        });
      }

      return newState;
    }
  }]);

  return ChipInput;
}(_react["default"].Component);

ChipInput.propTypes = {
  /** Allows duplicate chips if set to true. */
  allowDuplicates: _propTypes["default"].bool,

  /** If true, the placeholder will always be visible. */
  alwaysShowPlaceholder: _propTypes["default"].bool,

  /** Behavior when the chip input is blurred: `'clear'` clears the input, `'add'` creates a chip and `'ignore'` keeps the input. */
  blurBehavior: _propTypes["default"].oneOf(["clear", "add", "ignore"]),

  /** A function of the type `({ value, text, chip, isFocused, isDisabled, isReadOnly, handleClick, handleDelete, className }, key) => node` that returns a chip based on the given properties. This can be used to customize chip styles.  Each item in the `dataSource` array will be passed to `chipRenderer` as arguments `chip`, `value` and `text`. If `dataSource` is an array of objects and `dataSourceConfig` is present, then `value` and `text` will instead correspond to the object values defined in `dataSourceConfig`. If `dataSourceConfig` is not set and `dataSource` is an array of objects, then a custom `chipRenderer` must be set. `chip` is always the raw value from `dataSource`, either an object or a string. */
  chipRenderer: _propTypes["default"].func,

  /** Whether the input value should be cleared if the `value` prop is changed. */
  clearInputValueOnChange: _propTypes["default"].bool,

  /** Data source for auto complete. This should be an array of strings or objects. */
  dataSource: _propTypes["default"].array,

  /** Config for objects list dataSource, e.g. `{ text: 'text', value: 'value' }`. If not specified, the `dataSource` must be a flat array of strings or a custom `chipRenderer` must be set to handle the objects. */
  dataSourceConfig: _propTypes["default"].shape({
    text: _propTypes["default"].string.isRequired,
    value: _propTypes["default"].string.isRequired
  }),

  /** The chips to display by default (for uncontrolled mode). */
  defaultValue: _propTypes["default"].array,

  /** Whether to use `setTimeout` to delay adding chips in case other input events like `onSelection` need to fire first */
  delayBeforeAdd: _propTypes["default"].bool,

  /** Disables the chip input if set to true. */
  disabled: _propTypes["default"].bool,

  /** Disable the input underline. Only valid for 'standard' variant */
  disableUnderline: _propTypes["default"].bool,

  /** Props to pass through to the `FormHelperText` component. */
  FormHelperTextProps: _propTypes["default"].object,

  /** If true, the chip input will fill the available width. */
  fullWidth: _propTypes["default"].bool,

  /** If true, the input field will always be below the chips and fill the available space. By default, it will try to be beside the chips. */
  fullWidthInput: _propTypes["default"].bool,

  /** Helper text that is displayed below the input. */
  helperText: _propTypes["default"].node,

  /** Props to pass through to the `InputLabel`. */
  InputLabelProps: _propTypes["default"].object,

  /** Props to pass through to the `Input`. */
  InputProps: _propTypes["default"].object,

  /** Use this property to pass a ref callback to the native input component. */
  inputRef: _propTypes["default"].func,

  /** The input value (enables controlled mode for the text input if set). */
  inputValue: _propTypes["default"].string,

  /* The content of the floating label. */
  label: _propTypes["default"].node,

  /** The key codes (`KeyboardEvent.keyCode`) used to determine when to create a new chip. */
  newChipKeyCodes: _propTypes["default"].arrayOf(_propTypes["default"].number),

  /** The keys (`KeyboardEvent.key`) used to determine when to create a new chip. */
  newChipKeys: _propTypes["default"].arrayOf(_propTypes["default"].string),

  /** Callback function that is called when a new chip was added (in controlled mode). */
  onAdd: _propTypes["default"].func,

  /** Callback function that is called with the chip to be added and should return true to add the chip or false to prevent the chip from being added without clearing the text input. */
  onBeforeAdd: _propTypes["default"].func,

  /** Callback function that is called when the chips change (in uncontrolled mode). */
  onChange: _propTypes["default"].func,

  /** Callback function that is called when a new chip was removed (in controlled mode). */
  onDelete: _propTypes["default"].func,

  /** Callback function that is called when the input changes. */
  onUpdateInput: _propTypes["default"].func,

  /** A placeholder that is displayed if the input has no values. */
  placeholder: _propTypes["default"].string,

  /** Makes the chip input read-only if set to true. */
  readOnly: _propTypes["default"].bool,

  /** The chips to display (enables controlled mode if set). */
  value: _propTypes["default"].array,

  /** The variant of the Input component */
  variant: _propTypes["default"].oneOf(["outlined", "standard", "filled"])
};
ChipInput.defaultProps = {
  allowDuplicates: false,
  blurBehavior: "clear",
  clearInputValueOnChange: false,
  delayBeforeAdd: false,
  disableUnderline: false,
  newChipKeyCodes: [13],
  newChipKeys: ["Enter"],
  variant: "standard"
};

var _default = (0, _withStyles["default"])(styles, {
  name: "WAMuiChipInput"
})(ChipInput);

exports["default"] = _default;

var defaultChipRenderer = function defaultChipRenderer(_ref, key) {
  var value = _ref.value,
      text = _ref.text,
      isFocused = _ref.isFocused,
      isDisabled = _ref.isDisabled,
      isReadOnly = _ref.isReadOnly,
      handleClick = _ref.handleClick,
      handleDelete = _ref.handleDelete,
      className = _ref.className;
  return _react["default"].createElement(_Chip["default"], {
    key: key,
    className: className,
    style: {
      pointerEvents: isDisabled || isReadOnly ? "none" : undefined,
      backgroundColor: isFocused ? _blue["default"][300] : undefined
    },
    onClick: handleClick,
    onDelete: handleDelete,
    label: text
  });
};

exports.defaultChipRenderer = defaultChipRenderer;