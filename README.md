# material-ui-chip-input
This project provides a [chip input field][chipspec] for [Material-UI][mui]. It is inspired by [Angular Material's chip input][angular-chips].

![Demo](demo.gif)

[chipspec]: https://material.google.com/components/chips.html#chips-behavior
[mui]: http://www.material-ui.com/#/
[angular-chips]: https://material.angularjs.org/latest/demo/chips

## Installation
```shell
npm i --save material-ui-chip-input
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
  onRequestAdd={(chip) => handleAddChip(chip)}
  onRequestDelete={(chip) => handleDeleteChip(chip)}
/>
```

## Properties
Coming _very_ soon.

## Credits
The code for the input component was adapted from Material UI's `TextField` that we all know and love.

## License
The scripts included in this repository are licensed under the MIT.
