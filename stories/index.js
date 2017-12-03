import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Avatar from 'material-ui/Avatar'
import Chip from 'material-ui/Chip'
// import AutoComplete from 'material-ui/AutoComplete'
import { green } from 'material-ui/colors'
import ChipInput from '../src/ChipInput'
// import ControlledChipInput from './ControlledChipInput'
// import ClipboardExample from './ClipboardExample'

storiesOf('ChipInput', module)
  .addDecorator((story) =>
    <div style={{ fontFamily: 'Roboto, sans-serif' }}>
      {story()}
    </div>
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
  /*
  .add('with custom chip container styles', () =>
    <ChipInput
      fullWidth
      onChange={action('onChange')}
      chipContainerStyle={{ overflow: 'auto', maxHeight: '56px' }}
      defaultValue={[...Array(100).keys()].map((c) => `Chip ${c}`)}
    />
  )
  */
  .add('with placeholder', () =>
    <ChipInput
      placeholder='Placeholder'
      fullWidth
    />
  )
  /*
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
  */
  .add('with floating label', () =>
    <ChipInput
      label='Floating label'
      fullWidth
    />
  )
  .add('with label and placeholder', () =>
    <ChipInput
      label='Floating label'
      placeholder='Placeholder'
      fullWidth
    />
  )
  .add('disabled', () =>
    <ChipInput
      defaultValue={['foo', 'bar']}
      label='Disabled input'
      disabled
      fullWidth
    />
  )
  .add('with custom width', () =>
    <ChipInput
      defaultValue={['foo', 'bar']}
      label='A chip input with a width of 321px'
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
          style={{ ...defaultStyle, pointerEvents: isDisabled ? 'none' : undefined, backgroundColor: isFocused ? green[800] : green[300] }}
          onClick={handleClick}
          onRequestDelete={handleRequestDelete}
          label={value}
          avatar={<Avatar size={32}>{value[0].toUpperCase()}</Avatar>}
        />
      )}
    />
  )
  .add('with helperText', () =>
    <ChipInput
      helperText='This text is here to help you.'
    />
  )
  .add('with error style', () =>
    <ChipInput
      value={['One', 'Two']}
      helperText='At least three chips required.'
      error
    />
  )
  .add('without underline', () =>
    <ChipInput
      defaultValue={['foo', 'bar']}
      fullWidth
      disableUnderline
    />
  )
  /*
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
  */
  .add('with fullWidthInput', () =>
    <ChipInput
      label='The input is always full-width here'
      fullWidth
      fullWidthInput
    />
  )
  /*
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
  */
  .add('with duplicates allowed', () =>
    <ChipInput
      defaultValue={['foo', 'bar', 'foo', 'bar']}
      allowDuplicates
    />
  )
  /*
  .add('with onBeforeRequestAdd returning false', () =>
    <ChipInput
      defaultValue={['foo', 'bar', 'foo', 'bar']}
      onBeforeRequestAdd={() => false}
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
  */
