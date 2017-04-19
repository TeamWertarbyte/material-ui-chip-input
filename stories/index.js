import React from 'react'
import { storiesOf, action, linkTo } from '@kadira/storybook'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import Avatar from 'material-ui/Avatar'
import Chip from 'material-ui/Chip'
import AutoComplete from 'material-ui/AutoComplete'
import { green800, green300 } from 'material-ui/styles/colors'
import ChipInput from '../src/ChipInput'
import ControlledChipInput from './ControlledChipInput'
import ClipboardExample from './ClipboardExample'

function themed(children) {
  return (
    <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
      <div style={{ fontFamily: 'Roboto, sans-serif' }}>
        {children}
      </div>
    </MuiThemeProvider>
  )
}

storiesOf('ChipInput', module)
  .add('with some chips', () => themed(
    <ChipInput
      defaultValue={['foo', 'bar']}
      fullWidth
      onChange={action('onChange')}
    />
  ))
  .add('with many chips', () => themed(
    <ChipInput
      defaultValue={[...Array(25).keys()].map((c) => `Chip ${c}`)}
      onChange={action('onChange')}
      fullWidth
    />
  ))
  .add('with hintText', () => themed(
    <ChipInput
      hintText="Hint text"
      fullWidth
    />
  ))
  .add('with auto complete', () => themed(
    <ChipInput
      fullWidth
      dataSource={['alpha', 'beta']}
      hintText="Try typing a..."
    />
  ))
  .add('with auto complete, open on focus', () => themed(
    <ChipInput
      fullWidth
      openOnFocus
      dataSource={['alpha', 'beta']}
      hintText="Try typing a..."
    />
  ))
  .add('with auto complete, custom filter, open on focus', () => themed(
    <ChipInput
      fullWidth
      openOnFocus
      filter={AutoComplete.fuzzyFilter}
      dataSource={['alpha', 'beta']}
      hintText="Try typing apha..."
    />
  ))
  .add('with floating label', () => themed(
    <ChipInput
      floatingLabelText="Floating label"
      fullWidth
    />
  ))
  .add('with floating label and hint text', () => themed(
    <ChipInput
      floatingLabelText="Floating label"
      hintText="Hint text"
      fullWidth
    />
  ))
  .add('disabled', () => themed(
    <ChipInput
      defaultValue={['foo', 'bar']}
      floatingLabelText="Disabled input"
      disabled
      fullWidth
    />
  ))
  .add('with custom width', () => themed(
    <ChipInput
      defaultValue={['foo', 'bar']}
      floatingLabelText="A chip input with a width of 321px"
      style={{ width: 321 }}
    />
  ))
  .add('with custom chips', () => themed(
    <ChipInput
      defaultValue={['foo', 'bar']}
      fullWidth
      chipRenderer={({ value, isFocused, isDisabled, handleClick, handleRequestDelete, defaultStyle }, key) => (
        <Chip
          key={key}
          style={{ ...defaultStyle, pointerEvents: isDisabled ? 'none' : undefined }}
          backgroundColor={isFocused ? green800 : green300}
          onTouchTap={handleClick}
          onRequestDelete={handleRequestDelete}
        >
          <Avatar size={32}>{value[0].toUpperCase()}</Avatar>
          {value}
        </Chip>
      )}
    />
  ))
  .add('with errorText', () => themed(
    <ChipInput
      errorText="This is an error."
    />
  ))
  .add('without underline', () => themed(
    <ChipInput
      defaultValue={['foo', 'bar']}
      fullWidth
      underlineShow={false}
    />
  ))
  .add('create tags with comma, space and enter', () => themed(
    <ChipInput
      newChipKeyCodes={[13, 188, 32]}
    />
  ))
  .add('controlled input', () => themed(
    <ControlledChipInput />
  ))
  .add('uncontrolled verbose log', () => themed(
    <ChipInput
      defaultValue={['foo', 'bar']}
      onChange={action('onChange')}
      onUpdateInput={action('onUpdateInput')}
      onRequestDelete={action('onRequestDelete')}
      onRequestAdd={action('onRequestAdd')}
      onTouchTap={action('onTouchTap')}
    />
  ))
  .add('controlled verbose log', () => themed(
    <ChipInput
      value={['foo', 'bar']}
      onChange={action('onChange')}
      onUpdateInput={action('onUpdateInput')}
      onRequestDelete={action('onRequestDelete')}
      onRequestAdd={action('onRequestAdd')}
      onTouchTap={action('onTouchTap')}
    />
  ))
  .add('objects as chips, uncontrolled', () => themed(
    <ChipInput
      dataSource={[{ label: 'Chip 1', id: 'one' }, { label: 'Chip 2', id: 'two' }]}
      dataSourceConfig={{ text: 'label', value: 'id' }}
      defaultValue={[{ label: 'Chip 1', id: 'one' }]}
      onChange={action('onChange')}
      onUpdateInput={action('onUpdateInput')}
      onRequestDelete={action('onRequestDelete')}
      onRequestAdd={action('onRequestAdd')}
      onTouchTap={action('onTouchTap')}
    />
  ))
  .add('objects as chips, controlled', () => themed(
    <ChipInput
      dataSource={[{ label: 'Chip 1', id: 'one' }, { label: 'Chip 2', id: 'two' }]}
      dataSourceConfig={{ text: 'label', value: 'id' }}
      value={[{ label: 'Chip 1', id: 'one' }]}
      onChange={action('onChange')}
      onUpdateInput={action('onUpdateInput')}
      onRequestDelete={action('onRequestDelete')}
      onRequestAdd={action('onRequestAdd')}
      onTouchTap={action('onTouchTap')}
    />
  ))
  .add('controlled input with auto complete', () => themed(
    <ControlledChipInput
      openOnFocus
      dataSource={['foo', 'bar']}
      inputProps={{ fullWidth: true, }}
    />
  ))
  .add('with fullWidthInput', () => themed(
    <ChipInput
      floatingLabelText='The input is always full-width here'
      fullWidth
      fullWidthInput
    />
  ))
  .add('with clipboard manipulation', () => themed(
    <ClipboardExample
      onPaste={action('onPaste')}
      onChange={action('onChange')}
      onUpdateInput={action('onUpdateInput')}
      onRequestDelete={action('onRequestDelete')}
      onRequestAdd={action('onRequestAdd')}
      onTouchTap={action('onTouchTap')}
    />
  ))
  .add('add text input value on blur', () => themed(
    <ControlledChipInput
      addOnBlur
    />
  ))
  .add('single form field', () => themed(
    <form>
      <ChipInput
        onChange={action('onChange')}
        fullWidth
      />
    </form>
  ))
