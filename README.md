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
| Name | Type | Default | Description |
| --- | --- | --- | --- |
| allowDuplicates | `bool` | `false` | Allows duplicate chips if set to true. |
| chipRenderer | `function` | | A function of the type `({ value, text, chip, isFocused, isDisabled, handleClick, handleDelete, className }, key) => node` that returns a chip based on the given properties. This can be used to customize chip styles.  Each item in the `dataSource` array will be passed to `chipRenderer` as arguments `chip`, `value` and `text`. If `dataSource` is an array of objects and `dataSourceConfig` is present, then `value` and `text` will instead correspond to the object values defined in `dataSourceConfig`. If `dataSourceConfig` is not set and `dataSource` is an array of objects, then a custom `chipRenderer` must be set. `chip` is always the raw value from `dataSource`, either an object or a string.|
| classes | `object` | | Extends the styles applied to this component. |
| clearOnBlur | `bool` | `true` | If true, clears the input value after the component loses focus. |
| dataSource | `array` | | Data source for auto complete. This should be an array of strings or objects.|
| dataSourceConfig | `object` | | Config for objects list dataSource, e.g. `{ text: 'text', value: 'value' }`. If not specified, the `dataSource` must be a flat array of strings or a custom `chipRenderer` must be set to handle the objects. |
| defaultValue | `string[]` | | The chips to display by default (for uncontrolled mode). |
| disabled | `bool` | `false` | Disables the chip input if set to true. |
| helperText | `node` | | The helper text to display. |
| inputRef | `function` | Use that property to pass a ref callback to the native input component. |
| fullWidth | `bool` | `false` | If true, the chip input will fill the available width. |
| fullWidthInput | `bool` | `false` | If true, the input field will always be below the chips and fill the available space. By default, it will try to be beside the chips. |
| label | `node` | | The content of the floating label. |
| newChipKeyCodes | `number[]` | `[13]` (enter key) | The key codes used to determine when to create a new chip. |
| onBeforeAdd | `function` | | Callback function that is called with the chip to be added and should return true to add the chip or false to prevent the chip from being added without clearing the text input. |
| onBlur | `function` | | Callback function that is called with `event` when the input loses focus, where `event.target.value` is the current value of the text input. |
| onChange | `function` | | Callback function that is called when the chips change (in uncontrolled mode). |
| onAdd | `function` | | Callback function that is called when a new chip was added (in controlled mode). |
| onDelete | `function` | | Callback function that is called when a new chip was removed (in controlled mode). |
| onUpdateInput | `function` | | Callback function that is called when the input changes (useful for auto complete). |
| openOnFocus | `bool` | `false` | Opens the auto complete list on focus if set to true. |
| placeholder | `node` | | A short placeholder that is displayed if the input has no values. |
| value | `string[]` | | The chips to display (enables controlled mode if set). |


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
