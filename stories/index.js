import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
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

storiesOf('ChipInput', module)
  .addDecorator((story) =>
    <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
      <div style={{ fontFamily: 'Roboto, sans-serif' }}>
        {story()}
      </div>
    </MuiThemeProvider>
  )
  .add('with some chips', () =>
    <ChipInput
      defaultValue={['foo', 'bar']}
      fullWidth
      onChange={action('onChange')}
    />
  )
  .add('with many chips', () =>
    <ChipInput
      defaultValue={[...Array(25).keys()].map((c) => `Chip ${c}`)}
      onChange={action('onChange')}
      fullWidth
    />
  )
  .add('with custom chip container styles', () =>
    <ChipInput
      fullWidth
      onChange={action('onChange')}
      chipContainerStyle={{ overflow: 'auto', maxHeight: '56px' }}
      defaultValue={[...Array(100).keys()].map((c) => `Chip ${c}`)}
    />
  )
  .add('with hintText', () =>
    <ChipInput
      hintText='Hint text'
      fullWidth
    />
  )
  .add('with auto complete', () =>
    <ChipInput
      fullWidth
      dataSource={['alpha', 'beta']}
      hintText='Try typing a...'
    />
  )
  .add('with auto complete, open on focus', () =>
    <ChipInput
      fullWidth
      openOnFocus
      dataSource={['alpha', 'beta']}
      hintText='Try typing a...'
    />
  )
  .add('with auto complete, custom filter, open on focus', () =>
    <ChipInput
      fullWidth
      openOnFocus
      filter={AutoComplete.fuzzyFilter}
      dataSource={['alpha', 'beta']}
      hintText='Try typing apha...'
    />
  )
  .add('with floating label', () =>
    <ChipInput
      floatingLabelText='Floating label'
      fullWidth
    />
  )
  .add('with floating label and hint text', () =>
    <ChipInput
      floatingLabelText='Floating label'
      hintText='Hint text'
      fullWidth
    />
  )
  .add('disabled', () =>
    <ChipInput
      defaultValue={['foo', 'bar']}
      floatingLabelText='Disabled input'
      disabled
      fullWidth
    />
  )
  .add('with custom width', () =>
    <ChipInput
      defaultValue={['foo', 'bar']}
      floatingLabelText='A chip input with a width of 321px'
      style={{ width: 321 }}
    />
  )
  .add('with custom chips', () =>
    <ChipInput
      defaultValue={['foo', 'bar']}
      fullWidth
      chipRenderer={({ value, isFocused, isDisabled, handleClick, handleRequestDelete, defaultStyle }, key) => (
        <Chip
          key={key}
          style={{ ...defaultStyle, pointerEvents: isDisabled ? 'none' : undefined }}
          backgroundColor={isFocused ? green800 : green300}
          onClick={handleClick}
          onRequestDelete={handleRequestDelete}
        >
          <Avatar size={32}>{value[0].toUpperCase()}</Avatar>
          {value}
        </Chip>
      )}
    />
  )
  .add('with errorText', () =>
    <ChipInput
      errorText='This is an error.'
    />
  )
  .add('with errorStyle', () =>
    <ChipInput
      errorText='This is an error.'
      errorStyle={{ color: 'purple' }}
    />
  )
  .add('without underline', () =>
    <ChipInput
      defaultValue={['foo', 'bar']}
      fullWidth
      underlineShow={false}
    />
  )
  .add('create tags with comma, space and enter', () =>
    <ChipInput
      newChipKeyCodes={[13, 188, 32]}
    />
  )
  .add('controlled input', () =>
    <ControlledChipInput />
  )
  .add('uncontrolled verbose log', () =>
    <ChipInput
      defaultValue={['foo', 'bar']}
      onChange={action('onChange')}
      onUpdateInput={action('onUpdateInput')}
      onRequestDelete={action('onRequestDelete')}
      onRequestAdd={action('onRequestAdd')}
      onClick={action('onClick')}
    />
  )
  .add('controlled verbose log', () =>
    <ChipInput
      value={['foo', 'bar']}
      onChange={action('onChange')}
      onUpdateInput={action('onUpdateInput')}
      onRequestDelete={action('onRequestDelete')}
      onRequestAdd={action('onRequestAdd')}
      onClick={action('onClick')}
    />
  )
  .add('objects as chips, uncontrolled', () =>
    <ChipInput
      dataSource={[{ label: 'Chip 1', id: 'one' }, { label: 'Chip 2', id: 'two' }]}
      dataSourceConfig={{ text: 'label', value: 'id' }}
      defaultValue={[{ label: 'Chip 1', id: 'one' }]}
      onChange={action('onChange')}
      onUpdateInput={action('onUpdateInput')}
      onRequestDelete={action('onRequestDelete')}
      onRequestAdd={action('onRequestAdd')}
      onClick={action('onClick')}
    />
  )
  .add('objects as chips, controlled', () =>
    <ChipInput
      dataSource={[{ label: 'Chip 1', id: 'one' }, { label: 'Chip 2', id: 'two' }]}
      dataSourceConfig={{ text: 'label', value: 'id' }}
      value={[{ label: 'Chip 1', id: 'one' }]}
      onChange={action('onChange')}
      onUpdateInput={action('onUpdateInput')}
      onRequestDelete={action('onRequestDelete')}
      onRequestAdd={action('onRequestAdd')}
      onClick={action('onClick')}
    />
  )
  .add('controlled input with auto complete', () =>
    <ControlledChipInput
      openOnFocus
      dataSource={['foo', 'bar']}
      inputProps={{ fullWidth: true }}
    />
  )
  .add('with fullWidthInput', () =>
    <ChipInput
      floatingLabelText='The input is always full-width here'
      fullWidth
      fullWidthInput
    />
  )
  .add('with clipboard manipulation', () =>
    <ClipboardExample
      onPaste={action('onPaste')}
      onChange={action('onChange')}
      onUpdateInput={action('onUpdateInput')}
      onRequestDelete={action('onRequestDelete')}
      onRequestAdd={action('onRequestAdd')}
      onClick={action('onClick')}
    />
  )
  .add('add text input value on blur', () =>
    <ControlledChipInput
      addOnBlur
    />
  )
  .add('in a form', () =>
    <form onSubmit={e => { e.preventDefault(); action('onSubmit')() }}>
      <ChipInput
        onChange={action('onChange')}
        floatingLabelText='This is a single chip input inside a form. Note that pressing Enter does not submit the form if a chip is being added.'
        fullWidth
      />
    </form>
  )
  .add('with duplicates allowed', () =>
    <ChipInput
      defaultValue={['foo', 'bar', 'foo', 'bar']}
      allowDuplicates
    />
  )
  .add('tabbing between fields', () =>
    <form>
      <ChipInput
        floatingLabelText='"Tab" key selects the next field when there is no active chip.'
        newChipKeyCodes={[9, 13]}
        fullWidth
      />
      <br />
      <input type='text' />
    </form>
  )
