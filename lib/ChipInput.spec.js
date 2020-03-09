"use strict";

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _Chip = _interopRequireDefault(require("@material-ui/core/Chip"));

var _ChipInput = _interopRequireDefault(require("./ChipInput"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-env jest */

/*
  Since the tests do use a theme, we want to disable typography warnings
  per https://material-ui.com/style/typography/#migration-to-typography-v2.
 */
window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;
describe('uncontrolled mode', function () {
  it('matches the snapshot', function () {
    var tree = (0, _enzyme.mount)(_react["default"].createElement(_ChipInput["default"], {
      defaultValue: ['foo', 'bar']
    }));
    expect(tree).toMatchSnapshot();
  });
  it('displays the default value in chips', function () {
    var tree = (0, _enzyme.mount)(_react["default"].createElement(_ChipInput["default"], {
      defaultValue: ['foo', 'bar', 'foobar']
    }));
    expect(tree.find('Chip').map(function (chip) {
      return chip.text();
    })).toEqual(['foo', 'bar', 'foobar']);
  });
  it('displays added chips', function () {
    var tree = (0, _enzyme.mount)(_react["default"].createElement(_ChipInput["default"], {
      defaultValue: ['foo', 'bar']
    }));
    tree.find('input').getDOMNode().value = 'test';
    tree.find('input').simulate('keyDown', {
      keyCode: 13
    }); // press enter

    expect(tree.find('Chip').map(function (chip) {
      return chip.text();
    })).toEqual(['foo', 'bar', 'test']);
  });
  it('calls onChange when adding new chips', function () {
    var handleChange = jest.fn();
    var tree = (0, _enzyme.mount)(_react["default"].createElement(_ChipInput["default"], {
      onChange: handleChange
    }));
    tree.find('input').getDOMNode().value = 'foo';
    tree.find('input').simulate('keyDown', {
      keyCode: 13
    }); // press enter

    expect(handleChange).toBeCalledWith(['foo']);
    tree.find('input').getDOMNode().value = 'bar';
    tree.find('input').simulate('keyDown', {
      keyCode: 13
    }); // press enter

    expect(handleChange).toBeCalledWith(['foo', 'bar']);
  });
  it('can use key instead of keyCode', function () {
    var handleChange = jest.fn();
    var tree = (0, _enzyme.mount)(_react["default"].createElement(_ChipInput["default"], {
      onChange: handleChange
    }));
    tree.find('input').getDOMNode().value = 'foo';
    tree.find('input').simulate('keyDown', {
      key: 'Enter'
    });
    expect(handleChange).toBeCalledWith(['foo']);
  });
  it('can use custom keys to add chips', function () {
    var handleChange = jest.fn();
    var tree = (0, _enzyme.mount)(_react["default"].createElement(_ChipInput["default"], {
      onChange: handleChange,
      newChipKeys: ['Enter', 'Tab']
    }));
    tree.find('input').getDOMNode().value = 'foo';
    tree.find('input').simulate('keyDown', {
      key: 'Tab'
    });
    expect(handleChange).toBeCalledWith(['foo']);
    tree.find('input').getDOMNode().value = 'bar';
    tree.find('input').simulate('keyDown', {
      key: 'Enter'
    });
    expect(handleChange).toBeCalledWith(['foo', 'bar']);
  });
  it('calls onChange when deleting chips with backspace key', function () {
    var handleChange = jest.fn();
    var tree = (0, _enzyme.mount)(_react["default"].createElement(_ChipInput["default"], {
      defaultValue: ['foo', 'bar'],
      onChange: handleChange
    }));
    tree.find('input').simulate('keyDown', {
      keyCode: 8
    }); // backspace (to focus the chip)

    tree.find('input').simulate('keyDown', {
      keyCode: 8
    }); // backspace (to remove the chip)

    expect(handleChange).toBeCalledWith(['foo']);
  });
  it('calls onChange when deleting chips with delete key', function () {
    var handleChange = jest.fn();
    var tree = (0, _enzyme.mount)(_react["default"].createElement(_ChipInput["default"], {
      defaultValue: ['foo', 'bar'],
      onChange: handleChange
    }));
    tree.find('input').simulate('keyDown', {
      keyCode: 8
    }); // backspace (to focus the chip)

    tree.find('input').simulate('keyDown', {
      keyCode: 46
    }); // del (to remove the chip)

    expect(handleChange).toBeCalledWith(['foo']);
  });
  it('calls onChange when deleting chips by clicking on the remove button', function () {
    var handleChange = jest.fn();
    var tree = (0, _enzyme.mount)(_react["default"].createElement(_ChipInput["default"], {
      defaultValue: ['foo', 'bar'],
      onChange: handleChange
    }));
    tree.find('Cancel').first().simulate('click');
    expect(handleChange).toBeCalledWith(['bar']);
  });
  it('does not add empty chips', function () {
    var handleChange = jest.fn();
    var tree = (0, _enzyme.mount)(_react["default"].createElement(_ChipInput["default"], {
      onChange: handleChange
    }));
    tree.find('input').getDOMNode().value = ' ';
    tree.find('input').simulate('keyDown', {
      keyCode: 13
    }); // press enter

    expect(handleChange).not.toBeCalled();
  });
  it('does not add duplicate chips by default', function () {
    var handleChange = jest.fn();
    var tree = (0, _enzyme.mount)(_react["default"].createElement(_ChipInput["default"], {
      defaultValue: ['a'],
      onChange: handleChange
    }));
    tree.find('input').getDOMNode().value = 'a';
    tree.find('input').simulate('keyDown', {
      keyCode: 13
    }); // press enter

    expect(handleChange).not.toBeCalled();
  });
  it('does add duplicate chips if allowDuplicates is set to true', function () {
    var handleChange = jest.fn();
    var tree = (0, _enzyme.mount)(_react["default"].createElement(_ChipInput["default"], {
      defaultValue: ['a'],
      onChange: handleChange,
      allowDuplicates: true
    }));
    tree.find('input').getDOMNode().value = 'a';
    tree.find('input').simulate('keyDown', {
      keyCode: 13
    }); // press enter

    expect(handleChange).toBeCalledWith(['a', 'a']);
  });
  it('calls inputRef when it set', function () {
    var _inputRef;

    (0, _enzyme.mount)(_react["default"].createElement(_ChipInput["default"], {
      inputRef: function inputRef(ref) {
        _inputRef = ref;
      }
    }));
    expect(_inputRef.tagName.toLowerCase()).toBe('input');
  });
  it('calls onUpdateInput when the input changes', function () {
    var handleUpdateInput = jest.fn();
    var tree = (0, _enzyme.mount)(_react["default"].createElement(_ChipInput["default"], {
      onUpdateInput: handleUpdateInput
    }));
    tree.find('input').getDOMNode().value = 'foo';
    tree.find('input').simulate('change', {
      target: tree.find('input').getDOMNode()
    });
    expect(handleUpdateInput).toBeCalledWith(expect.objectContaining({
      target: expect.anything()
    }));
  });
  it('set defaultValue asynchronously after first render', function () {
    var tree = (0, _enzyme.mount)(_react["default"].createElement(_ChipInput["default"], null));
    tree.setProps({
      defaultValue: ['Foo', 'Bar']
    }); // in order to trigger a componentDidUpdate with Jest
    // see: https://github.com/airbnb/enzyme/issues/34#issuecomment-437284281

    tree.find('input').simulate('click');
    expect(tree.find('Chip').map(function (chip) {
      return chip.text();
    })).toEqual(['Foo', 'Bar']);
  });
  it('try to set defaultValue after a user input', function () {
    var tree = (0, _enzyme.mount)(_react["default"].createElement(_ChipInput["default"], null));
    tree.find('input').getDOMNode().value = 'Foo';
    tree.find('input').simulate('keyDown', {
      keyCode: 13
    }); // press enter

    tree.setProps({
      defaultValue: ['Foo', 'Bar']
    }); // in order to trigger a componentDidUpdate with Jest
    // see: https://github.com/airbnb/enzyme/issues/34#issuecomment-437284281

    tree.find('input').simulate('click');
    expect(tree.find('Chip').map(function (chip) {
      return chip.text();
    })).toEqual(['Foo']);
  });
});
describe('controlled mode', function () {
  it('clears the input when the value changes if clearInputValueOnChange is set', function () {
    var tree = (0, _enzyme.mount)(_react["default"].createElement(_ChipInput["default"], {
      value: ['foo'],
      clearInputValueOnChange: true
    }));
    tree.find('input').simulate('change', {
      target: {
        value: 'bar'
      }
    });
    tree.setProps({
      value: ['foo', 'bar']
    });
    expect(tree.find('input').getDOMNode().value).toBe('');
  });
  it('keeps the input when the value changes if clearInputValueOnChange is not set', function () {
    var tree = (0, _enzyme.mount)(_react["default"].createElement(_ChipInput["default"], {
      value: ['foo']
    }));
    tree.find('input').simulate('change', {
      target: {
        value: 'bar'
      }
    });
    tree.setProps({
      value: ['foo', 'bar']
    });
    expect(tree.find('input').getDOMNode().value).toBe('bar');
  });
  it('calls onAdd when adding new chips', function () {
    // using object chips to test that too
    var handleAdd = jest.fn();
    var tree = (0, _enzyme.mount)(_react["default"].createElement(_ChipInput["default"], {
      onAdd: handleAdd,
      value: [{
        text: 'a',
        value: 1
      }, {
        text: 'b',
        value: 2
      }],
      dataSourceConfig: {
        text: 'text',
        value: 'value'
      }
    }));
    tree.find('input').getDOMNode().value = 'foo';
    tree.find('input').simulate('keyDown', {
      keyCode: 13
    }); // press enter

    expect(handleAdd).toBeCalledWith({
      text: 'foo',
      value: 'foo'
    });
  });
  it('calls onDelete when deleting chips with backspace key', function () {
    // using object chips to test that too
    var handleDelete = jest.fn();
    var tree = (0, _enzyme.mount)(_react["default"].createElement(_ChipInput["default"], {
      onDelete: handleDelete,
      value: [{
        text: 'a',
        value: 1
      }, {
        text: 'b',
        value: 2
      }],
      dataSourceConfig: {
        text: 'text',
        value: 'value'
      }
    }));
    tree.find('input').simulate('keyDown', {
      keyCode: 8
    }); // backspace (to focus the chip)

    tree.find('input').simulate('keyDown', {
      keyCode: 8
    }); // backspace (to remove the chip)

    expect(handleDelete).toBeCalledWith({
      text: 'b',
      value: 2
    }, 1); // chip value (object if dataSourceConfig is used) and index
  });
  it('calls onChange when deleting chips with delete key', function () {
    // using object chips to test that too
    var handleDelete = jest.fn();
    var tree = (0, _enzyme.mount)(_react["default"].createElement(_ChipInput["default"], {
      onDelete: handleDelete,
      value: [{
        text: 'a',
        value: 1
      }, {
        text: 'b',
        value: 2
      }],
      dataSourceConfig: {
        text: 'text',
        value: 'value'
      }
    }));
    tree.find('input').simulate('keyDown', {
      keyCode: 8
    }); // backspace (to focus the chip)

    tree.find('input').simulate('keyDown', {
      keyCode: 46
    }); // del (to remove the chip)

    expect(handleDelete).toBeCalledWith({
      text: 'b',
      value: 2
    }, 1); // chip value (object if dataSourceConfig is used) and index
  });
  it('calls onChange when deleting chips by clicking on the remove button', function () {
    // using object chips to test that too (this is a test for issue #112)
    var handleDelete = jest.fn();
    var tree = (0, _enzyme.mount)(_react["default"].createElement(_ChipInput["default"], {
      onDelete: handleDelete,
      value: [{
        text: 'a',
        value: 1
      }, {
        text: 'b',
        value: 2
      }],
      dataSourceConfig: {
        text: 'text',
        value: 'value'
      }
    }));
    tree.find('Cancel').first().simulate('click');
    expect(handleDelete).toBeCalledWith({
      text: 'a',
      value: 1
    }, 0); // chip value (object if dataSourceConfig is used) and index
  });
});
describe('chip focusing', function () {
  function getFocusedChip(tree) {
    return tree.find('Chip').filterWhere(function (chip) {
      return chip.getDOMNode().style.backgroundColor !== '';
    });
  }

  function focusChip(tree, name) {
    tree.find('Chip').filterWhere(function (chip) {
      return chip.text() === name;
    }).simulate('click');
  }

  it('focuses a chip on click', function () {
    var tree = (0, _enzyme.mount)(_react["default"].createElement(_ChipInput["default"], {
      defaultValue: ['foo', 'bar']
    }));
    tree.find('Chip').at(1).simulate('click');
    expect(getFocusedChip(tree).length).toBe(1);
    expect(getFocusedChip(tree).text()).toBe('bar');
  });
  it('focuses the last chip when pressing backspace', function () {
    var tree = (0, _enzyme.mount)(_react["default"].createElement(_ChipInput["default"], {
      defaultValue: ['a', 'b', 'c']
    }));
    tree.find('input').simulate('keyDown', {
      keyCode: 8
    }); // backspace

    expect(getFocusedChip(tree).text()).toBe('c');
  });
  it('focuses the last chip when pressing the left arrow key if the input is empty', function () {
    var tree = (0, _enzyme.mount)(_react["default"].createElement(_ChipInput["default"], {
      defaultValue: ['a', 'b', 'c']
    }));
    tree.find('input').simulate('keyDown', {
      keyCode: 37
    }); // arrow left

    expect(getFocusedChip(tree).text()).toBe('c'); // don't focus the chip if the input is not empty

    tree.find('input').getDOMNode().value = 'd';
    tree.find('input').simulate('keyDown');
    expect(getFocusedChip(tree).length).toBe(0);
    tree.find('input').simulate('keyDown', {
      keyCode: 37,
      target: {
        value: 'd'
      }
    }); // arrow left

    expect(getFocusedChip(tree).length).toBe(0);
  });
  it('unfocuses the focused chip while adding a new chip', function () {
    var tree = (0, _enzyme.mount)(_react["default"].createElement(_ChipInput["default"], {
      defaultValue: ['foo', 'bar']
    }));
    focusChip(tree, 'foo');
    tree.find('input').simulate('keyDown');
    expect(getFocusedChip(tree).length).toBe(0);
  });
  it('unfocuses the focused chip on blur', function () {
    var tree = (0, _enzyme.mount)(_react["default"].createElement(_ChipInput["default"], {
      defaultValue: ['foo', 'bar']
    }));
    focusChip(tree, 'foo');
    tree.find('input').simulate('blur');
    expect(getFocusedChip(tree).length).toBe(0);
  });
  it('unfocuses the focused chip when switching to disabled state', function () {
    var tree = (0, _enzyme.mount)(_react["default"].createElement(_ChipInput["default"], {
      defaultValue: ['foo', 'bar']
    }));
    focusChip(tree, 'foo');
    tree.setProps({
      disabled: true
    });
    expect(getFocusedChip(tree).length).toBe(0);
  });
  it('moves the focus to the left when pressing the left arrow key', function () {
    var tree = (0, _enzyme.mount)(_react["default"].createElement(_ChipInput["default"], {
      defaultValue: ['a', 'b', 'c']
    }));
    focusChip(tree, 'b');
    tree.find('input').simulate('keyDown', {
      keyCode: 37
    }); // arrow left

    expect(getFocusedChip(tree).text()).toBe('a'); // keep the first element focused when pressing left if the first element is already focused

    tree.find('input').simulate('keyDown', {
      keyCode: 37
    }); // arrow left

    expect(getFocusedChip(tree).text()).toBe('a');
  });
  it('moves the focus to the right when pressing the right arrow key', function () {
    var tree = (0, _enzyme.mount)(_react["default"].createElement(_ChipInput["default"], {
      defaultValue: ['a', 'b', 'c']
    }));
    focusChip(tree, 'b');
    tree.find('input').simulate('keyDown', {
      keyCode: 39
    }); // arrow right

    expect(getFocusedChip(tree).text()).toBe('c'); // unfocus all chips if the right arrow key is pressed when focusing the last chip

    tree.find('input').simulate('keyDown', {
      keyCode: 39
    }); // arrow right

    expect(getFocusedChip(tree).length).toBe(0);
  });
  it('focuses the chip to the left when removing a chip by pressing backspace', function () {
    var tree = (0, _enzyme.mount)(_react["default"].createElement(_ChipInput["default"], {
      defaultValue: ['a', 'b', 'c']
    }));
    focusChip(tree, 'b');
    tree.find('input').simulate('keyDown', {
      keyCode: 8
    }); // backspace

    expect(getFocusedChip(tree).text()).toBe('a');
  });
  it('focuses the chip at the previously focused position when removing a chip by pressing delete', function () {
    var tree = (0, _enzyme.mount)(_react["default"].createElement(_ChipInput["default"], {
      defaultValue: ['a', 'b', 'c']
    }));
    focusChip(tree, 'b');
    tree.find('input').simulate('keyDown', {
      keyCode: 46
    }); // delete

    expect(getFocusedChip(tree).text()).toBe('c');
  });
});
describe('placeholder', function () {
  it('displays a placeholder', function () {
    var tree = (0, _enzyme.mount)(_react["default"].createElement(_ChipInput["default"], {
      placeholder: "Placeholder"
    }));
    expect(tree.find('input').getDOMNode().getAttribute('placeholder')).toBe('Placeholder');
  });
  it('is hidden if there are chips', function () {
    var tree = (0, _enzyme.mount)(_react["default"].createElement(_ChipInput["default"], {
      placeholder: "Placeholder",
      value: ['foo']
    }));
    expect(tree.find('input').getDOMNode().getAttribute('placeholder')).toBe(null);
  });
  it('is hidden if there is a floating label', function () {
    var tree = (0, _enzyme.mount)(_react["default"].createElement(_ChipInput["default"], {
      placeholder: "Placeholder",
      label: "Floating label"
    }));
    expect(tree.find('input').getDOMNode().getAttribute('placeholder')).toBe(null);
  });
  it('is visible if the floating label is floating', function () {
    var tree = (0, _enzyme.mount)(_react["default"].createElement(_ChipInput["default"], {
      placeholder: "Placeholder",
      label: "Floating label"
    }));
    tree.find('input').simulate('focus');
    expect(tree.find('InputLabel').prop('shrink')).toBe(true);
    expect(tree.find('input').getDOMNode().getAttribute('placeholder')).toBe('Placeholder');
  });
  it('is visible if the floating label is explicitly floating with shrink=true', function () {
    var tree = (0, _enzyme.mount)(_react["default"].createElement(_ChipInput["default"], {
      placeholder: "Placeholder",
      label: "Floating label",
      InputLabelProps: {
        shrink: true
      }
    }));
    expect(tree.find('InputLabel').prop('shrink')).toBe(true);
    expect(tree.find('input').getDOMNode().getAttribute('placeholder')).toBe('Placeholder');
  });
});
describe('floating label', function () {
  it('is displayed', function () {
    var tree = (0, _enzyme.mount)(_react["default"].createElement(_ChipInput["default"], {
      label: "Floating label"
    }));
    expect(tree.find('InputLabel').text()).toBe('Floating label');
    expect(tree.find('InputLabel').prop('shrink')).toBe(false);
  });
  it('shrinks if there are chips', function () {
    var tree = (0, _enzyme.mount)(_react["default"].createElement(_ChipInput["default"], {
      label: "Floating label",
      defaultValue: ['asdf']
    }));
    expect(tree.find('InputLabel').prop('shrink')).toBe(true);
  });
  it('shrinks if there are no chips but text input', function () {
    var tree = (0, _enzyme.mount)(_react["default"].createElement(_ChipInput["default"], {
      label: "Floating label"
    }));
    tree.find('input').getDOMNode().value = 'foo';
    tree.find('input').simulate('change');
    expect(tree.find('InputLabel').prop('shrink')).toBe(true);
  });
});
describe('helper text', function () {
  it('is displayed', function () {
    var tree = (0, _enzyme.mount)(_react["default"].createElement(_ChipInput["default"], {
      helperText: "Helper text"
    }));
    expect(tree.find('FormHelperText').text()).toBe('Helper text');
  });
});
describe('custom chips', function () {
  it('calls a chip renderer for every chip', function () {
    var chipRenderer = jest.fn(function (_ref, key) {
      var text = _ref.text;
      return _react["default"].createElement(_Chip["default"], {
        key: key,
        label: text.toUpperCase()
      });
    });
    var tree = (0, _enzyme.mount)(_react["default"].createElement(_ChipInput["default"], {
      value: ['a', 'b'],
      chipRenderer: chipRenderer
    }));
    expect(chipRenderer).toHaveBeenCalledTimes(2);
    expect(tree.find('Chip').map(function (chip) {
      return chip.text();
    })).toEqual(['A', 'B']);
    expect(chipRenderer.mock.calls[0][0]).toEqual({
      value: 'a',
      text: 'a',
      chip: 'a',
      className: expect.any(String),
      isDisabled: false,
      isFocused: false,
      handleClick: expect.any(Function),
      handleDelete: expect.any(Function)
    });
  });
});
describe('blurBehavior modes', function () {
  it('clears the input on blur', function () {
    var tree = (0, _enzyme.mount)(_react["default"].createElement(_ChipInput["default"], {
      value: ['a', 'b']
    }));
    tree.find('input').simulate('change', {
      target: {
        value: 'foo'
      }
    });
    tree.find('input').simulate('blur');
    expect(tree.find('input').getDOMNode().value).toBe('');
  });
  it('does not clear the input on blur with blurBehavior set to ignore', function () {
    var tree = (0, _enzyme.mount)(_react["default"].createElement(_ChipInput["default"], {
      value: ['a', 'b'],
      blurBehavior: "ignore"
    }));
    tree.find('input').simulate('change', {
      target: {
        value: 'foo'
      }
    });
    tree.find('input').simulate('blur');
    expect(tree.find('input').getDOMNode().value).toBe('foo');
  });
  it('adds the input on blur with blurBehavior set to add with timeout', function () {
    var handleChange = jest.fn();
    jest.useFakeTimers();
    var tree = (0, _enzyme.mount)(_react["default"].createElement(_ChipInput["default"], {
      defaultValue: ['a', 'b'],
      blurBehavior: "add",
      delayBeforeAdd: true,
      onChange: handleChange
    }));
    tree.find('input').getDOMNode().value = 'blur';
    tree.find('input').simulate('blur');
    jest.runAllTimers();
    expect(tree.find('input').getDOMNode().value).toBe('');
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(handleChange.mock.calls[0][0]).toEqual(['a', 'b', 'blur']);
    tree.update();
    expect(tree.find('Chip').map(function (chip) {
      return chip.text();
    })).toEqual(['a', 'b', 'blur']);
  });
  it('adds the input on blur with blurBehavior set to add without timeout', function () {
    var handleChange = jest.fn();
    jest.useFakeTimers();
    var tree = (0, _enzyme.mount)(_react["default"].createElement(_ChipInput["default"], {
      defaultValue: ['a', 'b'],
      blurBehavior: "add",
      onChange: handleChange
    }));
    tree.find('input').getDOMNode().value = 'blur';
    tree.find('input').simulate('blur');
    jest.runAllTimers();
    expect(tree.find('input').getDOMNode().value).toBe('');
    expect(setTimeout).toHaveBeenCalledTimes(0);
    expect(handleChange.mock.calls[0][0]).toEqual(['a', 'b', 'blur']);
    tree.update();
    expect(tree.find('Chip').map(function (chip) {
      return chip.text();
    })).toEqual(['a', 'b', 'blur']);
  });
});
describe('keys', function () {
  it('calls onKeyDown prop', function () {
    var keyPressed = null;
    var tree = (0, _enzyme.mount)(_react["default"].createElement(_ChipInput["default"], {
      value: ['a', 'b'],
      onKeyDown: function onKeyDown(e) {
        keyPressed = e.keyCode;
      }
    }));
    tree.find('input').simulate('keyDown', {
      keyCode: 40,
      // down
      metaKey: false,
      ctrlKey: false,
      altKey: false
    });
    expect(keyPressed).toBe(40);
  });
  it('calls onKeyUp prop', function () {
    var keyPressed = null;
    var tree = (0, _enzyme.mount)(_react["default"].createElement(_ChipInput["default"], {
      value: ['a', 'b'],
      onKeyUp: function onKeyUp(e) {
        keyPressed = e.keyCode;
      }
    }));
    tree.find('input').simulate('keyUp', {
      keyCode: 123,
      metaKey: false,
      ctrlKey: false,
      altKey: false
    });
    expect(keyPressed).toBe(123);
  });
  it('calls onKeyPress prop', function () {
    var keyPressed = null;
    var tree = (0, _enzyme.mount)(_react["default"].createElement(_ChipInput["default"], {
      value: ['a', 'b'],
      onKeyPress: function onKeyPress(e) {
        keyPressed = e.keyCode;
      }
    }));
    tree.find('input').simulate('keyPress', {
      keyCode: 321,
      metaKey: false,
      ctrlKey: false,
      altKey: false
    });
    expect(keyPressed).toBe(321);
  });
  it('stops when onKeyDown prevents the default', function () {
    var preventDefault = false;

    function handleKeyDown(e) {
      if (preventDefault) {
        e.preventDefault();
      }
    }

    var tree = (0, _enzyme.mount)(_react["default"].createElement(_ChipInput["default"], {
      onKeyDown: handleKeyDown,
      newChipKeyCodes: null
    }) // This will raise an exception if the code reaches that part
    );
    var input = tree.find('input');
    expect(function () {
      return input.simulate('keyDown', {});
    }).toThrow();
    preventDefault = true;
    expect(function () {
      return input.simulate('keyDown', {});
    }).toBeDefined();
  });
  it('prevents default when chip is added', function () {
    var tree = (0, _enzyme.mount)(_react["default"].createElement(_ChipInput["default"], null));
    var prevented = false;
    tree.find('input').simulate('keyDown', {
      keyCode: 13,
      metaKey: false,
      ctrlKey: false,
      altKey: false,
      target: {
        value: 'non-empty'
      },
      preventDefault: function preventDefault() {
        prevented = true;
      }
    });
    expect(prevented).toBe(true);
  });
});
describe('controlled text input', function () {
  it('uses the input value provided by the inputValue prop', function () {
    var tree = (0, _enzyme.mount)(_react["default"].createElement(_ChipInput["default"], {
      inputValue: "hello world"
    }));
    expect(tree.find('input').getDOMNode().value).toEqual('hello world');
  });
  it('uses the input value provided by the inputValue prop', function () {
    var handleUpdateInput = jest.fn();
    var tree = (0, _enzyme.mount)(_react["default"].createElement(_ChipInput["default"], {
      onUpdateInput: handleUpdateInput
    }));
    tree.find('input').simulate('change', {
      target: {
        value: 'hello world!'
      }
    });
    expect(handleUpdateInput).toHaveBeenCalled();
  });
});
it('should have a className prefix', function () {
  expect(_ChipInput["default"].options.name).toBe('WAMuiChipInput');
});