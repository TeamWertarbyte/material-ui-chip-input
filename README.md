# Support for MUI v4 or MUI v5

After maintaining this project for over 3 years, we chose not to add support for MUI v4+ since it would require significant changes and there is already [a built-in chip input](https://v4.mui.com/components/autocomplete/#multiple-values). The same component is also [available for MUI v5](https://mui.com/material-ui/react-autocomplete/#multiple-values), and there are some alternatives like [mui-chips-input](https://github.com/viclafouch/mui-chips-input).

---

# material-ui-chip-input

[![Build Status](https://travis-ci.org/TeamWertarbyte/material-ui-chip-input.svg?branch=next)](https://travis-ci.org/TeamWertarbyte/material-ui-chip-input)
[![Coverage Status](https://coveralls.io/repos/github/TeamWertarbyte/material-ui-chip-input/badge.svg?branch=next)](https://coveralls.io/github/TeamWertarbyte/material-ui-chip-input?branch=next)

This project provides a [chip input field][chipspec] for [Material-UI][mui]. It is inspired by [Angular Material's chip input][angular-chips].

![Demo](demo.gif)

If you want to try the component yourself instead of watching a gif, head over to [the storybook][gh-pages] for a live demo!

## Installation
```shell
npm i --save material-ui-chip-input@next
```
**Note:** This is the version for Material-UI 1.0.0 or later. If you are still using Material-UI 0.x, you can use our [legacy version][legacy].

## Usage
The component supports either controlled or uncontrolled input mode. If you use the controlled mode (by setting the `value` attribute), the `onChange` callback won't be called.

```jsx
import ChipInput from 'material-ui-chip-input'

// uncontrolled input
<ChipInput
  defaultValue={['foo', 'bar']}
  onChange={(chips) => handleChange(chips)}
/>

// controlled input
<ChipInput
  value={yourChips}
  onAdd={(chip) => handleAddChip(chip)}
  onDelete={(chip, index) => handleDeleteChip(chip, index)}
/>
```

## Properties
|Name|Type|Default|Description|
|---|---|---|---|
|allowDuplicates|`bool`|`false`|Allows duplicate chips if set to true.|
|alwaysShowPlaceholder|`bool`||If true, the placeholder will always be visible.|
|blurBehavior|`enum`|`'clear'`|Behavior when the chip input is blurred: `'clear'` clears the input, `'add'` creates a chip, `'add-or-clear'` either creates a chip or clears the input on failure (see: `onBeforeAdd`), and `'ignore'` keeps the input.|
|chipRenderer|`func`||A function of the type `({ value, text, chip, isFocused, isDisabled, isReadOnly, handleClick, handleDelete, className }, key) => node` that returns a chip based on the given properties. This can be used to customize chip styles.  Each item in the `dataSource` array will be passed to `chipRenderer` as arguments `chip`, `value` and `text`. If `dataSource` is an array of objects and `dataSourceConfig` is present, then `value` and `text` will instead correspond to the object values defined in `dataSourceConfig`. If `dataSourceConfig` is not set and `dataSource` is an array of objects, then a custom `chipRenderer` must be set. `chip` is always the raw value from `dataSource`, either an object or a string.|
|clearInputValueOnChange|`bool`|`false`|Whether the input value should be cleared if the `value` prop is changed.|
|dataSource|`array`||Data source for auto complete. This should be an array of strings or objects.|
|dataSourceConfig|`shape`||Config for objects list dataSource, e.g. `{ text: 'text', value: 'value' }`. If not specified, the `dataSource` must be a flat array of strings or a custom `chipRenderer` must be set to handle the objects.|
|defaultValue|`array`||The chips to display by default (for uncontrolled mode).|
|delayBeforeAdd|`bool`|`false`|Use `setTimeout` 150ms delay before adding chips in case other input callbacks like `onSelection` need to fire first.|
|disabled|`bool`||Disables the chip input if set to true.|
|disableUnderline|`bool`|`false`|If `true`, the input will not have an underline.|
|FormHelperTextProps|`object`||Props to pass through to the `FormHelperText` component.|
|fullWidth|`bool`||If true, the chip input will fill the available width.|
|fullWidthInput|`bool`||If true, the input field will always be below the chips and fill the available space. By default, it will try to be beside the chips.|
|helperText|`node`||Helper text that is displayed below the input.|
|InputLabelProps|`object`||Props to pass through to the `InputLabel`.|
|InputProps|`object`||Props to pass through to the [`Input`](https://material-ui.com/api/input/).|
|inputRef|`func`||Use this property to pass a ref callback to the native input component.|
|inputValue|`string`||The input value (enables controlled mode for the text input if set).|
|label|`node`||The content of the floating label.|
|newChipKeyCodes|`arrayOf`|`[13]`|The key codes (`KeyboardEvent.keyCode`) used to determine when to create a new chip.|
|newChipKeys|`arrayOf`|`['Enter']`|The keys (`KeyboardEvent.key`) used to determine when to create a new chip.|
|onAdd|`func`||Callback function that is called when a new chip was added (in controlled mode).|
|onBeforeAdd|`func`||Callback function that is called with the chip to be added and should return true to add the chip or false to prevent the chip from being added without clearing the text input.|
|onChange|`func`||Callback function that is called when the chips change (in uncontrolled mode).|
|onDelete|`func`||Callback function that is called when a new chip was removed (in controlled mode).|
|onUpdateInput|`func`||Callback function that is called when the input changes.|
|placeholder|`string`||A placeholder that is displayed if the input has no values.|
|readOnly|`bool`||Makes the chip input read-only if set to true.|
|value|`array`||The chips to display (enables controlled mode if set).|
|variant | `enum` | `'standard'` | Sets the variant for the input. Values `'standard'`, `'outlined'`, `'filled'`|

Any other properties supplied will be [spread to the root element](https://material-ui-next.com/guides/api/#spread). The properties of [&lt;FormControl /&gt;](https://material-ui-next.com/api/form-control/) are also available.

## CSS API
You can customize the class names used by `ChipInput` with the `classes` property. It accepts the following keys:
* `root`
* `inputRoot`
* `input`
* `chipContainer`
* `label`
* `helperText`
* `chip`

Have a look at [this guide](https://material-ui-next.com/customization/overrides/#overriding-with-classes) for more detail.

## Credits
The code for the input component was adapted from Material UI's [Text Field][mui-text-field] that we all know and love.

## License
The files included in this repository are licensed under the MIT license.

[chipspec]: https://material.google.com/components/chips.html#chips-behavior
[mui]: http://www.material-ui.com/#/
[angular-chips]: https://material.angularjs.org/latest/demo/chips
[mui-text-field]: https://material-ui-next.com/api/text-field/
[gh-pages]: https://teamwertarbyte.github.io/material-ui-chip-input/
[legacy]: https://github.com/TeamWertarbyte/material-ui-chip-input/tree/legacy
